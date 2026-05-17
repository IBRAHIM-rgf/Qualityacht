// Script de migration v4 - Ajout colonne sub_region pour pages sous-région
require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log('Migration v4 : sub_region pour pages sous-région\n');

  try {
    console.log('1. Ajout colonne sub_region...');
    await sql`
      ALTER TABLE yacht_selections
      ADD COLUMN IF NOT EXISTS sub_region VARCHAR(100)
    `;
    console.log('   ✓ Colonne sub_region ajoutée');

    console.log('2. Création index sub_region...');
    await sql`CREATE INDEX IF NOT EXISTS idx_yacht_sel_sub_region ON yacht_selections(sub_region)`;
    console.log('   ✓ Index créé');

    console.log('3. Vérification...');
    const result = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(sub_region) as with_sub_region
      FROM yacht_selections
    `;
    console.log(`   ✓ ${result[0].total} entrées, ${result[0].with_sub_region} avec sub_region`);

    console.log('\n✓ Migration v4 terminée');
  } catch (error) {
    console.error('Erreur migration:', error.message);
    process.exit(1);
  }
}

migrate();

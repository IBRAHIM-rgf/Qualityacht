// Script de migration v3 - Ajout régions et options
require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log('Migration v3 : Régions et options additionnelles\n');

  try {
    // Ajouter les nouvelles colonnes
    console.log('1. Ajout colonnes région et options...');

    await sql`
      ALTER TABLE yacht_selections
      ADD COLUMN IF NOT EXISTS region VARCHAR(100),
      ADD COLUMN IF NOT EXISTS pets_allowed BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS groups_allowed BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS water_toys BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS extra_info TEXT
    `;
    console.log('   ✓ Colonnes ajoutées');

    // Créer index pour la région
    console.log('2. Création index région...');
    await sql`CREATE INDEX IF NOT EXISTS idx_yacht_sel_region ON yacht_selections(region)`;
    console.log('   ✓ Index créé');

    // Vérifier
    const result = await sql`SELECT COUNT(*) as count FROM yacht_selections`;
    console.log(`\n✓ Migration terminée ! (${result[0].count} entrées dans la table)`);

  } catch (error) {
    console.error('Erreur migration:', error.message);
    process.exit(1);
  }
}

migrate();

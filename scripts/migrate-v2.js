// Script de migration v2
require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log('Migration v2 : Yacht Selections enrichies\n');

  try {
    // Supprimer l'ancienne table
    console.log('1. Suppression ancienne table...');
    await sql`DROP TABLE IF EXISTS yacht_selections`;
    console.log('   ✓ Table supprimée');

    // Créer la nouvelle table
    console.log('2. Création nouvelle table...');
    await sql`
      CREATE TABLE yacht_selections (
        id SERIAL PRIMARY KEY,
        yacht_id VARCHAR(255) UNIQUE NOT NULL,
        yacht_name VARCHAR(255),
        is_visible BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        display_order INTEGER DEFAULT 0,
        category VARCHAR(100),
        tags TEXT[],
        custom_title VARCHAR(255),
        custom_description TEXT,
        custom_price VARCHAR(100),
        custom_highlights TEXT[],
        internal_notes TEXT,
        contact_info TEXT,
        commission_rate DECIMAL(5,2),
        cached_data JSONB,
        cached_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    console.log('   ✓ Table créée');

    // Créer les index
    console.log('3. Création des index...');
    await sql`CREATE INDEX idx_yacht_sel_visible ON yacht_selections(is_visible)`;
    await sql`CREATE INDEX idx_yacht_sel_featured ON yacht_selections(is_featured)`;
    await sql`CREATE INDEX idx_yacht_sel_order ON yacht_selections(display_order)`;
    await sql`CREATE INDEX idx_yacht_sel_category ON yacht_selections(category)`;
    console.log('   ✓ Index créés');

    // Vérifier
    const result = await sql`SELECT COUNT(*) as count FROM yacht_selections`;
    console.log(`\n✓ Migration terminée ! Table prête (${result[0].count} entrées)`);

  } catch (error) {
    console.error('Erreur migration:', error.message);
    process.exit(1);
  }
}

migrate();

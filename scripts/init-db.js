// Script pour initialiser la table yacht_selections dans Neon
require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function initDatabase() {
  console.log('Connexion à Neon...');

  try {
    // Créer la table
    await sql`
      CREATE TABLE IF NOT EXISTS yacht_selections (
        id SERIAL PRIMARY KEY,
        yacht_id VARCHAR(255) UNIQUE NOT NULL,
        yacht_name VARCHAR(255),
        is_visible BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        display_order INTEGER DEFAULT 0,
        category VARCHAR(100),
        custom_tags TEXT[],
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    console.log('✓ Table yacht_selections créée');

    // Créer les index
    await sql`CREATE INDEX IF NOT EXISTS idx_yacht_selections_visible ON yacht_selections(is_visible)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_yacht_selections_featured ON yacht_selections(is_featured)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_yacht_selections_order ON yacht_selections(display_order)`;
    console.log('✓ Index créés');

    // Vérifier
    const result = await sql`SELECT COUNT(*) as count FROM yacht_selections`;
    console.log(`✓ Table prête (${result[0].count} entrées)`);

    console.log('\n🎉 Base de données initialisée avec succès !');
  } catch (error) {
    console.error('Erreur:', error.message);
    process.exit(1);
  }
}

initDatabase();

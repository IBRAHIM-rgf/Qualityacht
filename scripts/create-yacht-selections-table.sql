-- ============================================
-- Script de création de la table yacht_selections
-- Base de données : Neon (Vercel Postgres)
-- ============================================

-- Supprimer la table si elle existe (ATTENTION: perte de données)
-- DROP TABLE IF EXISTS yacht_selections;

-- Créer la table des présélections de yachts
CREATE TABLE IF NOT EXISTS yacht_selections (
  id SERIAL PRIMARY KEY,
  yacht_id VARCHAR(255) UNIQUE NOT NULL,      -- ID Ankor du yacht (URI)
  yacht_name VARCHAR(255),                     -- Nom du yacht (cache)
  is_visible BOOLEAN DEFAULT true,             -- Toggle visibilité sur le site
  is_featured BOOLEAN DEFAULT false,           -- Mise en avant (featured)
  display_order INTEGER DEFAULT 0,             -- Ordre d'affichage
  category VARCHAR(100),                       -- Catégorie personnalisée
  custom_tags TEXT[],                          -- Tags additionnels
  notes TEXT,                                  -- Notes internes admin
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances des requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_yacht_selections_visible
  ON yacht_selections(is_visible);

CREATE INDEX IF NOT EXISTS idx_yacht_selections_featured
  ON yacht_selections(is_featured);

CREATE INDEX IF NOT EXISTS idx_yacht_selections_order
  ON yacht_selections(display_order);

CREATE INDEX IF NOT EXISTS idx_yacht_selections_category
  ON yacht_selections(category);

-- Fonction pour auto-update du timestamp updated_at
CREATE OR REPLACE FUNCTION update_yacht_selections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at automatiquement
DROP TRIGGER IF EXISTS yacht_selections_updated_at ON yacht_selections;
CREATE TRIGGER yacht_selections_updated_at
  BEFORE UPDATE ON yacht_selections
  FOR EACH ROW
  EXECUTE FUNCTION update_yacht_selections_updated_at();

-- ============================================
-- Commentaires de documentation
-- ============================================
COMMENT ON TABLE yacht_selections IS 'Table des présélections de yachts pour l''affichage sur le site';
COMMENT ON COLUMN yacht_selections.yacht_id IS 'URI unique du yacht provenant de l''API Ankor';
COMMENT ON COLUMN yacht_selections.is_visible IS 'Si true, le yacht est affiché sur le site public';
COMMENT ON COLUMN yacht_selections.is_featured IS 'Si true, le yacht est mis en avant (affiché en priorité)';
COMMENT ON COLUMN yacht_selections.display_order IS 'Ordre d''affichage (0 = premier)';
COMMENT ON COLUMN yacht_selections.category IS 'Catégorie personnalisée (luxe, sport, famille, etc.)';

-- ============================================
-- Requêtes utiles pour la gestion
-- ============================================

-- Voir tous les yachts visibles triés par ordre
-- SELECT * FROM yacht_selections WHERE is_visible = true ORDER BY display_order ASC;

-- Voir les statistiques
-- SELECT
--   COUNT(*) as total,
--   COUNT(*) FILTER (WHERE is_visible = true) as visible,
--   COUNT(*) FILTER (WHERE is_featured = true) as featured
-- FROM yacht_selections;

-- Réinitialiser l'ordre de tous les yachts
-- UPDATE yacht_selections SET display_order = id;

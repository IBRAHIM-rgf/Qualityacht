-- ============================================
-- Migration v2 : Yacht Selections avec infos enrichies
-- ============================================

-- Supprimer l'ancienne table si nécessaire
DROP TABLE IF EXISTS yacht_selections;

-- Nouvelle table avec infos enrichies
CREATE TABLE yacht_selections (
  id SERIAL PRIMARY KEY,
  yacht_id VARCHAR(255) UNIQUE NOT NULL,
  yacht_name VARCHAR(255),

  -- Visibilité et affichage
  is_visible BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,

  -- Catégorisation
  category VARCHAR(100),
  tags TEXT[],

  -- Infos enrichies (custom par l'admin)
  custom_title VARCHAR(255),           -- Titre personnalisé
  custom_description TEXT,             -- Description perso (FR)
  custom_price VARCHAR(100),           -- Prix affiché custom
  custom_highlights TEXT[],            -- Points forts custom

  -- Notes internes (non visibles publiquement)
  internal_notes TEXT,
  contact_info TEXT,                   -- Info contact propriétaire
  commission_rate DECIMAL(5,2),        -- Taux commission

  -- Cache des données Ankor (pour affichage rapide sans re-fetch)
  cached_data JSONB,
  cached_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_yacht_sel_visible ON yacht_selections(is_visible);
CREATE INDEX idx_yacht_sel_featured ON yacht_selections(is_featured);
CREATE INDEX idx_yacht_sel_order ON yacht_selections(display_order);
CREATE INDEX idx_yacht_sel_category ON yacht_selections(category);

-- Trigger auto-update updated_at
CREATE OR REPLACE FUNCTION update_yacht_sel_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS yacht_sel_updated ON yacht_selections;
CREATE TRIGGER yacht_sel_updated
  BEFORE UPDATE ON yacht_selections
  FOR EACH ROW
  EXECUTE FUNCTION update_yacht_sel_timestamp();

-- Commentaires
COMMENT ON TABLE yacht_selections IS 'Yachts sélectionnés pour affichage sur le site avec infos enrichies';
COMMENT ON COLUMN yacht_selections.cached_data IS 'Snapshot JSON des données Ankor pour affichage rapide';
COMMENT ON COLUMN yacht_selections.custom_highlights IS 'Points forts personnalisés (array de strings)';

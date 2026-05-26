-- ============================================
-- Migration v3 : Yacht Selections avec ankor_region + light_data
-- Rétrocompatible : ajoute uniquement des colonnes, ne supprime rien
-- ============================================

-- Région native renvoyée par Ankor (source de vérité, immuable)
-- Ex: 'caribbean', 'west-mediterranean', 'indian-ocean'...
ALTER TABLE yacht_selections
  ADD COLUMN IF NOT EXISTS ankor_region VARCHAR(50);

-- Snapshot allégé pour affichage admin/listes publiques (~2 KB/yacht)
-- { name, description, hero_image, length, guests, cabins, crew, type, location, year, price }
ALTER TABLE yacht_selections
  ADD COLUMN IF NOT EXISTS light_data JSONB;

-- Index pour filtrer rapidement par région native
CREATE INDEX IF NOT EXISTS idx_yacht_sel_ankor_region
  ON yacht_selections(ankor_region);

CREATE INDEX IF NOT EXISTS idx_yacht_sel_region
  ON yacht_selections(region);

CREATE INDEX IF NOT EXISTS idx_yacht_sel_sub_region
  ON yacht_selections(sub_region);

COMMENT ON COLUMN yacht_selections.ankor_region IS 'Région native renvoyée par Ankor (immuable, source de vérité)';
COMMENT ON COLUMN yacht_selections.light_data IS 'Snapshot allégé : description + 1ère photo + meta. Affichage rapide sans appel Ankor.';

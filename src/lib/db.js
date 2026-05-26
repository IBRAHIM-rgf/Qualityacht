// src/lib/db.js - Client Neon (Vercel Postgres) v2

import { neon } from '@neondatabase/serverless';

// Connexion Neon (variable auto-injectée par Vercel)
const sql = neon(process.env.DATABASE_URL);

/**
 * Récupère toutes les sélections de yachts
 */
export async function getYachtSelections() {
  try {
    const rows = await sql`
      SELECT * FROM yacht_selections
      ORDER BY display_order ASC, created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Erreur getYachtSelections:', error);
    return [];
  }
}

/**
 * Récupère les IDs des yachts visibles
 */
export async function getVisibleYachtIds() {
  try {
    const rows = await sql`
      SELECT yacht_id, display_order FROM yacht_selections
      WHERE is_visible = true
      ORDER BY display_order ASC
    `;
    return rows.map(r => r.yacht_id);
  } catch (error) {
    console.error('Erreur getVisibleYachtIds:', error);
    return [];
  }
}

/**
 * Récupère les IDs des yachts mis en avant (featured)
 */
export async function getFeaturedYachtIds() {
  try {
    const rows = await sql`
      SELECT yacht_id FROM yacht_selections
      WHERE is_featured = true AND is_visible = true
    `;
    return rows.map(r => r.yacht_id);
  } catch (error) {
    console.error('Erreur getFeaturedYachtIds:', error);
    return [];
  }
}

/**
 * Récupère une sélection par yacht_id
 */
export async function getYachtSelectionById(yacht_id) {
  try {
    const rows = await sql`
      SELECT * FROM yacht_selections
      WHERE yacht_id = ${yacht_id}
      LIMIT 1
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Erreur getYachtSelectionById:', error);
    return null;
  }
}

/**
 * Ajoute un yacht à la sélection avec ses données Ankor en cache
 */
export async function addYachtToSelection(data) {
  const {
    yacht_id,
    yacht_name,
    cached_data = null,
    region = null,
    sub_region = null,
    pets_allowed = false,
    groups_allowed = false,
    water_toys = false,
    extra_info = null,
  } = data;

  try {
    // Compter les yachts existants pour l'ordre
    const countResult = await sql`SELECT COUNT(*) as count FROM yacht_selections`;
    const nextOrder = parseInt(countResult[0].count) || 0;

    const rows = await sql`
      INSERT INTO yacht_selections (
        yacht_id, yacht_name, is_visible, is_featured, display_order,
        cached_data, cached_at, region, sub_region, pets_allowed, groups_allowed, water_toys, extra_info
      )
      VALUES (
        ${yacht_id}, ${yacht_name}, true, false, ${nextOrder},
        ${cached_data ? JSON.stringify(cached_data) : null}, NOW(),
        ${region}, ${sub_region}, ${pets_allowed}, ${groups_allowed}, ${water_toys}, ${extra_info}
      )
      ON CONFLICT (yacht_id) DO NOTHING
      RETURNING *
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Erreur addYachtToSelection:', error);
    throw error;
  }
}

/**
 * Met à jour les infos enrichies d'un yacht
 */
export async function updateYachtEnrichedData(yacht_id, data) {
  const {
    custom_title = null,
    custom_description = null,
    custom_price = null,
    custom_highlights = null,
    internal_notes = null,
    contact_info = null,
    commission_rate = null,
    category = null,
    tags = null,
    region = null,
    sub_region = null,
    pets_allowed = null,
    groups_allowed = null,
    water_toys = null,
    extra_info = null,
  } = data;

  try {
    const rows = await sql`
      UPDATE yacht_selections
      SET
        custom_title = COALESCE(${custom_title}, custom_title),
        custom_description = COALESCE(${custom_description}, custom_description),
        custom_price = COALESCE(${custom_price}, custom_price),
        custom_highlights = COALESCE(${custom_highlights}, custom_highlights),
        internal_notes = COALESCE(${internal_notes}, internal_notes),
        contact_info = COALESCE(${contact_info}, contact_info),
        commission_rate = COALESCE(${commission_rate}, commission_rate),
        category = COALESCE(${category}, category),
        tags = COALESCE(${tags}, tags),
        region = COALESCE(${region}, region),
        sub_region = COALESCE(${sub_region}, sub_region),
        pets_allowed = COALESCE(${pets_allowed}, pets_allowed),
        groups_allowed = COALESCE(${groups_allowed}, groups_allowed),
        water_toys = COALESCE(${water_toys}, water_toys),
        extra_info = COALESCE(${extra_info}, extra_info),
        updated_at = NOW()
      WHERE yacht_id = ${yacht_id}
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Erreur updateYachtEnrichedData:', error);
    throw error;
  }
}

/**
 * Met à jour la visibilité d'un yacht
 */
export async function updateYachtVisibility(yacht_id, is_visible) {
  try {
    const rows = await sql`
      UPDATE yacht_selections
      SET is_visible = ${is_visible}, updated_at = NOW()
      WHERE yacht_id = ${yacht_id}
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Erreur updateYachtVisibility:', error);
    throw error;
  }
}

/**
 * Met à jour le statut featured d'un yacht
 */
export async function updateYachtFeatured(yacht_id, is_featured) {
  try {
    const rows = await sql`
      UPDATE yacht_selections
      SET is_featured = ${is_featured}, updated_at = NOW()
      WHERE yacht_id = ${yacht_id}
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Erreur updateYachtFeatured:', error);
    throw error;
  }
}

/**
 * Met à jour l'ordre d'affichage de plusieurs yachts (bulk)
 */
export async function updateYachtOrder(updates) {
  try {
    for (const { yacht_id, display_order } of updates) {
      await sql`
        UPDATE yacht_selections
        SET display_order = ${display_order}, updated_at = NOW()
        WHERE yacht_id = ${yacht_id}
      `;
    }
    return { success: true };
  } catch (error) {
    console.error('Erreur updateYachtOrder:', error);
    throw error;
  }
}

/**
 * Supprime un yacht de la sélection
 */
export async function removeYachtFromSelection(yacht_id) {
  try {
    await sql`
      DELETE FROM yacht_selections
      WHERE yacht_id = ${yacht_id}
    `;
    return { success: true };
  } catch (error) {
    console.error('Erreur removeYachtFromSelection:', error);
    throw error;
  }
}

/**
 * Statistiques des sélections
 */
export async function getSelectionStats() {
  try {
    const stats = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE is_visible = true) as visible,
        COUNT(*) FILTER (WHERE is_featured = true) as featured,
        COUNT(DISTINCT category) FILTER (WHERE category IS NOT NULL) as categories,
        COUNT(DISTINCT region) FILTER (WHERE region IS NOT NULL) as regions
      FROM yacht_selections
    `;
    return stats[0];
  } catch (error) {
    console.error('Erreur getSelectionStats:', error);
    return { total: 0, visible: 0, featured: 0, categories: 0, regions: 0 };
  }
}

/**
 * Vérifie si un yacht est déjà dans la sélection
 */
export async function isYachtSelected(yacht_id) {
  try {
    const rows = await sql`
      SELECT 1 FROM yacht_selections WHERE yacht_id = ${yacht_id} LIMIT 1
    `;
    return rows.length > 0;
  } catch (error) {
    console.error('Erreur isYachtSelected:', error);
    return false;
  }
}

/**
 * Récupère les yachts sélectionnés avec leurs données enrichies
 */
export async function getSelectedYachtsWithData() {
  try {
    const rows = await sql`
      SELECT
        yacht_id, yacht_name, is_visible, is_featured, display_order,
        category, tags, custom_title, custom_description, custom_price,
        custom_highlights, internal_notes, cached_data,
        region, sub_region, pets_allowed, groups_allowed, water_toys, extra_info,
        created_at, updated_at
      FROM yacht_selections
      ORDER BY display_order ASC
    `;
    return rows;
  } catch (error) {
    console.error('Erreur getSelectedYachtsWithData:', error);
    return [];
  }
}

/**
 * Récupère les yachts de test (table test_yachts, séparée des sélections prod).
 * Utilisée par les pages de test pour éviter de re-fetch Ankor à chaque rendu.
 * Données seedées via scripts/seed-test-yachts.js.
 */
export async function getTestYachts() {
  try {
    const rows = await sql`
      SELECT yacht_id, cached_data FROM test_yachts ORDER BY created_at ASC
    `;
    return rows.map((r) => {
      const cached = typeof r.cached_data === 'string' ? JSON.parse(r.cached_data) : (r.cached_data || {});
      return { id: r.yacht_id, ...cached };
    });
  } catch (error) {
    console.error('Erreur getTestYachts:', error);
    return [];
  }
}

/**
 * Récupère les IDs des yachts déjà sélectionnés
 */
export async function getSelectedYachtIds() {
  try {
    const rows = await sql`
      SELECT yacht_id FROM yacht_selections
    `;
    return rows.map(r => r.yacht_id);
  } catch (error) {
    console.error('Erreur getSelectedYachtIds:', error);
    return [];
  }
}

export default sql;

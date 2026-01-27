// src/lib/db.js - Client Neon (Vercel Postgres)

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
 * Crée ou met à jour une sélection de yacht (upsert)
 */
export async function upsertYachtSelection(data) {
  const {
    yacht_id,
    yacht_name = null,
    is_visible = true,
    is_featured = false,
    display_order = 0,
    category = null,
    custom_tags = null,
    notes = null
  } = data;

  try {
    const rows = await sql`
      INSERT INTO yacht_selections (yacht_id, yacht_name, is_visible, is_featured, display_order, category, custom_tags, notes)
      VALUES (${yacht_id}, ${yacht_name}, ${is_visible}, ${is_featured}, ${display_order}, ${category}, ${custom_tags}, ${notes})
      ON CONFLICT (yacht_id)
      DO UPDATE SET
        yacht_name = COALESCE(EXCLUDED.yacht_name, yacht_selections.yacht_name),
        is_visible = EXCLUDED.is_visible,
        is_featured = EXCLUDED.is_featured,
        display_order = EXCLUDED.display_order,
        category = EXCLUDED.category,
        custom_tags = EXCLUDED.custom_tags,
        notes = EXCLUDED.notes,
        updated_at = NOW()
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Erreur upsertYachtSelection:', error);
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
  // updates = [{ yacht_id, display_order }, ...]
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
 * Supprime une sélection de yacht
 */
export async function deleteYachtSelection(yacht_id) {
  try {
    await sql`
      DELETE FROM yacht_selections
      WHERE yacht_id = ${yacht_id}
    `;
    return { success: true };
  } catch (error) {
    console.error('Erreur deleteYachtSelection:', error);
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
        COUNT(DISTINCT category) FILTER (WHERE category IS NOT NULL) as categories
      FROM yacht_selections
    `;
    return stats[0];
  } catch (error) {
    console.error('Erreur getSelectionStats:', error);
    return { total: 0, visible: 0, featured: 0, categories: 0 };
  }
}

export default sql;

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
    light_data = null,
    ankor_region = null,
    region = null,
    sub_region = null,
    pets_allowed = false,
    groups_allowed = false,
    water_toys = false,
    extra_info = null,
  } = data;

  try {
    const countResult = await sql`SELECT COUNT(*) as count FROM yacht_selections`;
    const nextOrder = parseInt(countResult[0].count) || 0;

    const rows = await sql`
      INSERT INTO yacht_selections (
        yacht_id, yacht_name, is_visible, is_featured, display_order,
        cached_data, light_data, cached_at, ankor_region,
        region, sub_region, pets_allowed, groups_allowed, water_toys, extra_info
      )
      VALUES (
        ${yacht_id}, ${yacht_name}, true, false, ${nextOrder},
        ${cached_data ? JSON.stringify(cached_data) : null},
        ${light_data ? JSON.stringify(light_data) : null},
        NOW(), ${ankor_region},
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
        custom_highlights, internal_notes, cached_data, light_data, ankor_region,
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
 * Récupère un yacht de la sélection prod (yacht_selections) avec full_data.
 * Source de vérité utilisée par les fiches publiques yacht-detail-v6.
 */
export async function getSelectionYachtFullByName(name) {
  try {
    const pattern = `%${name}%`;
    const rows = await sql`
      SELECT yacht_id, yacht_name, cached_data, light_data, full_data, region, sub_region
      FROM yacht_selections
      WHERE yacht_name ILIKE ${pattern}
         OR cached_data->>'name' ILIKE ${pattern}
         OR light_data->>'name' ILIKE ${pattern}
      LIMIT 1
    `;
    if (!rows[0]) return null;
    const r = rows[0];
    const cached = typeof r.cached_data === 'string' ? JSON.parse(r.cached_data) : (r.cached_data || {});
    const light = typeof r.light_data === 'string' ? JSON.parse(r.light_data) : (r.light_data || {});
    const full = typeof r.full_data === 'string' ? JSON.parse(r.full_data) : (r.full_data || null);
    // Reconstruire le mapping affichable (priorité cached > light)
    const merged = { ...light, ...cached };
    return {
      id: r.yacht_id,
      name: r.yacht_name || merged.name,
      region: r.region,
      subRegion: r.sub_region,
      ...merged,
      // L'image principale et la galerie viennent de full.blueprint.images si dispo
      images: full?.blueprint?.images?.length
        ? [full.blueprint.images[0], ...full.blueprint.images.slice(1)]
        : (merged.images || (light.hero_image ? [light.hero_image] : [])),
      full,
    };
  } catch (error) {
    console.error('Erreur getSelectionYachtFullByName:', error);
    return null;
  }
}

/**
 * Récupère un yacht test avec ses données Ankor complètes (full_data).
 * Cherche par nom (ILIKE). Utilisé par yacht-detail-v6 pour exploiter
 * description, blueprint, amenities, toys, entertainment, tenders, crew, pricing.
 */
export async function getTestYachtFullByName(name) {
  try {
    const pattern = `%${name}%`;
    const rows = await sql`
      SELECT yacht_id, cached_data, full_data
      FROM test_yachts
      WHERE cached_data->>'name' ILIKE ${pattern}
      LIMIT 1
    `;
    if (!rows[0]) return null;
    const r = rows[0];
    const cached = typeof r.cached_data === 'string' ? JSON.parse(r.cached_data) : (r.cached_data || {});
    const full = typeof r.full_data === 'string' ? JSON.parse(r.full_data) : (r.full_data || null);
    return { id: r.yacht_id, ...cached, full };
  } catch (error) {
    console.error('Erreur getTestYachtFullByName:', error);
    return null;
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

/**
 * Bulk upsert : insère ou met à jour plusieurs yachts d'un coup.
 * Idempotent : si yacht_id existe déjà, on met à jour light_data + ankor_region
 * sans toucher aux choix admin (region, sub_region, custom_*).
 */
export async function bulkUpsertYachts(yachts) {
  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  const countResult = await sql`SELECT COUNT(*) as count FROM yacht_selections`;
  let nextOrder = parseInt(countResult[0].count) || 0;

  for (const y of yachts) {
    if (!y.yacht_id || !y.yacht_name) {
      skipped++;
      continue;
    }
    try {
      const result = await sql`
        INSERT INTO yacht_selections (
          yacht_id, yacht_name, is_visible, is_featured, display_order,
          cached_data, light_data, full_data, cached_at, ankor_region, region
        )
        VALUES (
          ${y.yacht_id}, ${y.yacht_name}, true, false, ${nextOrder},
          ${y.cached_data ? JSON.stringify(y.cached_data) : null},
          ${y.light_data ? JSON.stringify(y.light_data) : null},
          ${y.full_data ? JSON.stringify(y.full_data) : null},
          NOW(), ${y.ankor_region}, ${y.ankor_region}
        )
        ON CONFLICT (yacht_id) DO UPDATE
        SET
          yacht_name = EXCLUDED.yacht_name,
          cached_data = COALESCE(EXCLUDED.cached_data, yacht_selections.cached_data),
          light_data = COALESCE(EXCLUDED.light_data, yacht_selections.light_data),
          full_data = COALESCE(EXCLUDED.full_data, yacht_selections.full_data),
          ankor_region = COALESCE(EXCLUDED.ankor_region, yacht_selections.ankor_region),
          cached_at = NOW(),
          updated_at = NOW()
        RETURNING (xmax = 0) AS inserted
      `;
      if (result[0]?.inserted) {
        inserted++;
        nextOrder++;
      } else {
        updated++;
      }
    } catch (err) {
      console.error(`bulkUpsertYachts erreur sur ${y.yacht_id}:`, err.message);
      skipped++;
    }
  }

  return { inserted, updated, skipped, total: yachts.length };
}

/**
 * Migration : ajoute ankor_region + light_data si elles n'existent pas.
 * Safe à appeler plusieurs fois.
 */
export async function ensureV3Schema() {
  await sql`ALTER TABLE yacht_selections ADD COLUMN IF NOT EXISTS ankor_region VARCHAR(50)`;
  await sql`ALTER TABLE yacht_selections ADD COLUMN IF NOT EXISTS light_data JSONB`;
  await sql`ALTER TABLE yacht_selections ADD COLUMN IF NOT EXISTS full_data JSONB`;
  await sql`CREATE INDEX IF NOT EXISTS idx_yacht_sel_ankor_region ON yacht_selections(ankor_region)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_yacht_sel_region ON yacht_selections(region)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_yacht_sel_sub_region ON yacht_selections(sub_region)`;
  return { ok: true };
}

/**
 * Table de présence admin : chaque admin ping toutes les 30s pour signaler qu'il est là.
 * Permet d'afficher "X sessions actives" en haut du panel admin.
 */
export async function ensureAdminSessionsSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      session_token TEXT PRIMARY KEY,
      last_seen_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_admin_sessions_last_seen ON admin_sessions(last_seen_at)`;
}

/**
 * Upsert présence + retourne le nombre de sessions admin actives (vues dans la dernière minute).
 */
export async function heartbeatAdmin(sessionToken) {
  await ensureAdminSessionsSchema();
  await sql`
    INSERT INTO admin_sessions (session_token, last_seen_at)
    VALUES (${sessionToken}, NOW())
    ON CONFLICT (session_token) DO UPDATE SET last_seen_at = NOW()
  `;
  // Nettoyage : supprime les sessions inactives depuis +10 min
  await sql`DELETE FROM admin_sessions WHERE last_seen_at < NOW() - INTERVAL '10 minutes'`;
  // Compte les sessions actives (heartbeat < 1 min)
  const rows = await sql`
    SELECT COUNT(*)::int as nb FROM admin_sessions
    WHERE last_seen_at > NOW() - INTERVAL '1 minute'
  `;
  return { activeCount: rows[0]?.nb || 0 };
}

export default sql;

// src/app/api/admin/yachts/migrate/route.js
// Migration v3 : ajoute les colonnes ankor_region + light_data
// et backfill depuis cached_data pour les yachts existants.

import { NextResponse } from 'next/server';
import { guardAdminRoute } from '@/lib/adminAuth';

export async function POST(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  try {

    // Chargement APRES la garde : aucun module susceptible d'ouvrir une connexion
    // n'est initialise avant que l'authentification soit etablie.
    const { default: sql, ensureV3Schema  } = await import('@/lib/db');
    const { extractLightData, inferAnkorRegion } = await import('@/lib/yachtCache');
    await ensureV3Schema();

    // Backfill : pour chaque yacht avec cached_data mais sans light_data, on extrait
    const toMigrate = await sql`
      SELECT yacht_id, cached_data
      FROM yacht_selections
      WHERE cached_data IS NOT NULL
        AND (light_data IS NULL OR ankor_region IS NULL)
    `;

    let backfilled = 0;
    for (const row of toMigrate) {
      try {
        const cached = typeof row.cached_data === 'string'
          ? JSON.parse(row.cached_data)
          : row.cached_data;
        const lightData = extractLightData(cached);
        const ankorRegion = inferAnkorRegion(cached);

        await sql`
          UPDATE yacht_selections
          SET
            light_data = COALESCE(${lightData ? JSON.stringify(lightData) : null}::jsonb, light_data),
            ankor_region = COALESCE(${ankorRegion}, ankor_region)
          WHERE yacht_id = ${row.yacht_id}
        `;
        backfilled++;
      } catch (e) {
        console.error(`Backfill erreur ${row.yacht_id}:`, e.message);
      }
    }

    const stats = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE light_data IS NOT NULL) as with_light_data,
        COUNT(*) FILTER (WHERE ankor_region IS NOT NULL) as with_ankor_region,
        pg_size_pretty(pg_total_relation_size('yacht_selections')) as table_size
      FROM yacht_selections
    `;

    return NextResponse.json({
      success: true,
      schema_updated: true,
      backfilled,
      stats: stats[0],
    });
  } catch (error) {
    console.error('Erreur POST /api/admin/yachts/migrate:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}

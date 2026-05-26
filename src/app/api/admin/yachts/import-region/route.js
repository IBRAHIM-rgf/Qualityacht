// src/app/api/admin/yachts/import-region/route.js
// Bulk import : fetch Ankor pour une région et upsert dans yacht_selections.
// Stocke uniquement light_data (description + 1ère photo + meta), pas cached_data complet.

import { NextResponse } from 'next/server';
import { ensureV3Schema, bulkUpsertYachts } from '@/lib/db';
import { fetchYachtsForDestination } from '@/lib/yachts';
import { extractLightData, inferAnkorRegion } from '@/lib/yachtCache';

function checkAuth(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (!process.env.ADMIN_SECRET_TOKEN) return false;
  return token === process.env.ADMIN_SECRET_TOKEN;
}

/**
 * POST /api/admin/yachts/import-region?token=xxx&region=caribbean
 * Idempotent : ré-exécutable, met à jour light_data sans toucher aux choix admin existants.
 */
export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');

    if (!region) {
      return NextResponse.json({ error: 'region requis (ex: caribbean)' }, { status: 400 });
    }

    await ensureV3Schema();

    const { yachts, totalYachts } = await fetchYachtsForDestination(region);

    if (!yachts || yachts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Aucun yacht trouvé sur Ankor pour cette région',
        region,
        total: 0,
        inserted: 0,
        updated: 0,
      });
    }

    const payload = yachts.map(y => ({
      yacht_id: y.id,
      yacht_name: y.name,
      cached_data: null,
      light_data: extractLightData(y),
      full_data: y._rawEntity || null,
      ankor_region: inferAnkorRegion(y) || region,
    }));

    const stats = await bulkUpsertYachts(payload);

    return NextResponse.json({
      success: true,
      region,
      totalFromAnkor: totalYachts,
      ...stats,
    });
  } catch (error) {
    console.error('Erreur POST /api/admin/yachts/import-region:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}

// src/app/api/admin/yachts/sync/route.js - Synchronisation avec Ankor

import { NextResponse } from 'next/server';
import { guardAdminRoute } from '@/lib/adminAuth';

/**
 * POST /api/admin/yachts/sync - Synchronise les yachts Ankor avec la base
 * Crée des entrées pour les nouveaux yachts qui ne sont pas encore dans la base
 */
export async function POST(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  try {

    // Chargement APRES la garde : aucun module susceptible d'ouvrir une connexion
    // n'est initialise avant que l'authentification soit etablie.
    const { getYachtSelections, upsertYachtSelection } = await import('@/lib/db');
    const { fetchYachtsWithFilters } = await import('@/lib/yachts');
    // 1. Récupérer tous les yachts depuis Ankor
    const { yachts: ankorYachts } = await fetchYachtsWithFilters({});

    if (!ankorYachts || ankorYachts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Aucun yacht trouvé sur Ankor',
        added: 0,
        total: 0
      });
    }

    // 2. Récupérer les sélections existantes
    const existingSelections = await getYachtSelections();
    const existingIds = new Set(existingSelections.map(s => s.yacht_id));

    // 3. Identifier les nouveaux yachts
    const newYachts = ankorYachts.filter(yacht => !existingIds.has(yacht.id));

    // 4. Créer des entrées pour les nouveaux yachts
    let added = 0;
    for (const yacht of newYachts) {
      try {
        await upsertYachtSelection({
          yacht_id: yacht.id,
          yacht_name: yacht.name,
          is_visible: true,  // Par défaut visible
          is_featured: false,
          display_order: existingSelections.length + added,
          category: null,
          notes: null
        });
        added++;
      } catch (err) {
        console.error(`Erreur sync yacht ${yacht.id}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synchronisation terminée`,
      added,
      total: ankorYachts.length,
      existing: existingSelections.length
    });

  } catch (error) {
    console.error('Erreur POST /api/admin/yachts/sync:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}

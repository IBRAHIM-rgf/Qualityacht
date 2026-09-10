// src/app/api/admin/yachts/route.js - API Admin pour les présélections V2

import { NextResponse } from 'next/server';
import { guardAdminRoute } from '@/lib/adminAuth';

/**
 * GET /api/admin/yachts - Récupère toutes les sélections avec leurs données
 */
export async function GET(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  try {

    // Chargement APRES la garde : aucun module susceptible d'ouvrir une connexion
    // n'est initialise avant que l'authentification soit etablie.
    const {
    getYachtSelections,
    getSelectionStats,
    addYachtToSelection,
    updateYachtVisibility,
    updateYachtFeatured,
    updateYachtOrder,
    updateYachtEnrichedData,
    removeYachtFromSelection,
    getSelectedYachtsWithData,
    ensureV3Schema,
  } = await import('@/lib/db');
    const { extractLightData, inferAnkorRegion } = await import('@/lib/yachtCache');
    // Auto-migration idempotente : garantit que les colonnes (dont `handicaps`)
    // existent dès l'ouverture du panel admin. ALTER ... IF NOT EXISTS = no-op si déjà là.
    await ensureV3Schema();

    const [selections, stats] = await Promise.all([
      getSelectedYachtsWithData(),
      getSelectionStats()
    ]);

    return NextResponse.json({
      selections,
      stats
    });
  } catch (error) {
    console.error('Erreur GET /api/admin/yachts:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/yachts - Ajouter un yacht à la sélection
 * Body: { yacht_id, yacht_name, cached_data }
 */
export async function POST(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  try {

    // Chargement APRES la garde : aucun module susceptible d'ouvrir une connexion
    // n'est initialise avant que l'authentification soit etablie.
    const {
    getYachtSelections,
    getSelectionStats,
    addYachtToSelection,
    updateYachtVisibility,
    updateYachtFeatured,
    updateYachtOrder,
    updateYachtEnrichedData,
    removeYachtFromSelection,
    getSelectedYachtsWithData,
    ensureV3Schema,
  } = await import('@/lib/db');
    const { extractLightData, inferAnkorRegion } = await import('@/lib/yachtCache');
    const data = await request.json();

    if (!data.yacht_id) {
      return NextResponse.json(
        { error: 'yacht_id requis' },
        { status: 400 }
      );
    }

    const lightData = data.light_data ?? extractLightData(data.cached_data);
    const ankorRegion = data.ankor_region ?? inferAnkorRegion(data.cached_data);
    const finalRegion = data.region || ankorRegion || null;

    const result = await addYachtToSelection({
      yacht_id: data.yacht_id,
      yacht_name: data.yacht_name,
      cached_data: data.cached_data || null,
      light_data: lightData,
      ankor_region: ankorRegion,
      region: finalRegion,
      sub_region: data.sub_region || null,
      regions: Array.isArray(data.regions) ? data.regions : undefined,
      sub_regions: Array.isArray(data.sub_regions) ? data.sub_regions : undefined,
      pets_allowed: data.pets_allowed || false,
      groups_allowed: data.groups_allowed || false,
      water_toys: data.water_toys || false,
      extra_info: data.extra_info || null,
    });

    return NextResponse.json({
      success: true,
      selection: result
    });
  } catch (error) {
    console.error('Erreur POST /api/admin/yachts:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/yachts - Mises à jour partielles
 * Body: { action: 'visibility' | 'featured' | 'order' | 'enrich', ... }
 */
export async function PATCH(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  try {

    // Chargement APRES la garde : aucun module susceptible d'ouvrir une connexion
    // n'est initialise avant que l'authentification soit etablie.
    const {
    getYachtSelections,
    getSelectionStats,
    addYachtToSelection,
    updateYachtVisibility,
    updateYachtFeatured,
    updateYachtOrder,
    updateYachtEnrichedData,
    removeYachtFromSelection,
    getSelectedYachtsWithData,
    ensureV3Schema,
  } = await import('@/lib/db');
    const { extractLightData, inferAnkorRegion } = await import('@/lib/yachtCache');
    const data = await request.json();
    const { action } = data;

    switch (action) {
      case 'visibility': {
        const { yacht_id, is_visible } = data;
        if (!yacht_id) {
          return NextResponse.json({ error: 'yacht_id requis' }, { status: 400 });
        }
        const result = await updateYachtVisibility(yacht_id, is_visible);
        return NextResponse.json({ success: true, selection: result });
      }

      case 'featured': {
        const { yacht_id, is_featured } = data;
        if (!yacht_id) {
          return NextResponse.json({ error: 'yacht_id requis' }, { status: 400 });
        }
        const result = await updateYachtFeatured(yacht_id, is_featured);
        return NextResponse.json({ success: true, selection: result });
      }

      case 'order': {
        const { updates } = data;
        if (!updates || !Array.isArray(updates)) {
          return NextResponse.json({ error: 'updates requis (array)' }, { status: 400 });
        }
        await updateYachtOrder(updates);
        return NextResponse.json({ success: true });
      }

      case 'enrich': {
        const {
          yacht_id,
          custom_title,
          custom_description,
          custom_price,
          category,
          categories,
          handicaps,
          internal_notes,
          region,
          sub_region,
          regions,
          sub_regions,
          pets_allowed,
          groups_allowed,
          water_toys,
          extra_info,
        } = data;
        if (!yacht_id) {
          return NextResponse.json({ error: 'yacht_id requis' }, { status: 400 });
        }
        const result = await updateYachtEnrichedData(yacht_id, {
          custom_title,
          custom_description,
          custom_price,
          category,
          categories,
          handicaps,
          internal_notes,
          region,
          sub_region,
          regions: Array.isArray(regions) ? regions : undefined,
          sub_regions: Array.isArray(sub_regions) ? sub_regions : undefined,
          pets_allowed,
          groups_allowed,
          water_toys,
          extra_info,
        });
        return NextResponse.json({ success: true, selection: result });
      }

      default:
        return NextResponse.json(
          { error: 'Action non reconnue' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Erreur PATCH /api/admin/yachts:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/yachts - Supprimer un yacht de la sélection
 * Query: ?yacht_id=xxx
 */
export async function DELETE(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  try {

    // Chargement APRES la garde : aucun module susceptible d'ouvrir une connexion
    // n'est initialise avant que l'authentification soit etablie.
    const {
    getYachtSelections,
    getSelectionStats,
    addYachtToSelection,
    updateYachtVisibility,
    updateYachtFeatured,
    updateYachtOrder,
    updateYachtEnrichedData,
    removeYachtFromSelection,
    getSelectedYachtsWithData,
    ensureV3Schema,
  } = await import('@/lib/db');
    const { extractLightData, inferAnkorRegion } = await import('@/lib/yachtCache');
    const { searchParams } = new URL(request.url);
    const yacht_id = searchParams.get('yacht_id');

    if (!yacht_id) {
      return NextResponse.json(
        { error: 'yacht_id requis' },
        { status: 400 }
      );
    }

    await removeYachtFromSelection(yacht_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE /api/admin/yachts:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

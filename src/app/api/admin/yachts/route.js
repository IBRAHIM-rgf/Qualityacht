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
    // Migration idempotente AVANT toute ecriture (client 2026-09-14).
    // Les colonnes `regions` / `sub_regions` manquaient en production : le panel
    // charge ses donnees cote serveur depuis la base, sans passer par le GET de
    // cette route, donc ensureV3Schema() n'y tournait jamais et l'INSERT echouait
    // en 500. ALTER ... IF NOT EXISTS = no-op si les colonnes sont deja la.
    await ensureV3Schema();
    const data = await request.json();

    if (!data.yacht_id) {
      return NextResponse.json(
        { error: 'yacht_id requis' },
        { status: 400 }
      );
    }

    // Ajout depuis la recherche admin : cached_data n'est qu'un resume Ankor
    // (pas de _rawEntity). On complete avec le detail du yacht avant stockage,
    // comme avant, pour conserver photos, description, tarifs.
    let cachedData = data.cached_data || null;
    if (cachedData && !cachedData._rawEntity && data.yacht_id) {
      try {
        const { fetchYachtCardByUri } = await import('@/lib/yachts');
        const full = await fetchYachtCardByUri(data.yacht_id, cachedData);
        if (full) cachedData = { ...cachedData, ...full };
      } catch (e) {
        console.error('Enrichissement Ankor a l ajout impossible, resume conserve:', e?.message);
      }
    }
    data.cached_data = cachedData;

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
    const { serializeCharterPrices, normalizeCharterPrices } = await import('@/lib/charterPrices');
    const { cleanCategories, normalizeAdminExtra } = await import('@/lib/adminCategories');
    const { normalizeCharterModel } = await import('@/lib/charterModel');
    // Meme garantie que sur le POST : les mises a jour ecrivent aussi dans
    // `regions` / `sub_regions`.
    await ensureV3Schema();
    const data = await request.json();
    const { action } = data;

    switch (action) {
      // Corbeille (client 2026-11-03) : le bateau est cache et range dans la corbeille ;
      // « restore » le remet avec sa visibilite d'avant.
      case 'trash':
      case 'restore': {
        const { yacht_id } = data;
        if (!yacht_id) return NextResponse.json({ error: 'yacht_id requis' }, { status: 400 });
        const { getYachtSelectionById } = await import('@/lib/db');
        const row = await getYachtSelectionById(yacht_id);
        if (!row) return NextResponse.json({ error: 'Yacht introuvable' }, { status: 404 });
        const prev = normalizeAdminExtra(row.admin_extra);
        if (action === 'trash') {
          const extra = normalizeAdminExtra({ ...prev, trash: { at: new Date().toISOString(), wasVisible: !!row.is_visible } });
          await updateYachtVisibility(yacht_id, false);
          await updateYachtEnrichedData(yacht_id, { admin_extra: extra });
          return NextResponse.json({ success: true, admin_extra: extra, is_visible: false });
        }
        const wasVisible = !!prev.trash?.wasVisible;
        const { trash, ...rest } = prev;
        const extra = normalizeAdminExtra(rest);
        await updateYachtEnrichedData(yacht_id, { admin_extra: extra });
        if (wasVisible) await updateYachtVisibility(yacht_id, true);
        return NextResponse.json({ success: true, admin_extra: extra, is_visible: wasVisible });
      }

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
          custom_pricing,
          day_charter,
          charter_model,
          overrides,
          admin_extra,
        } = data;
        if (!yacht_id) {
          return NextResponse.json({ error: 'yacht_id requis' }, { status: 400 });
        }
        // admin_extra (client 2026-11-03) : fusion avec l'existant (corbeille conservee) et
        // « saved_by » = couleur de la personne qui enregistre la fiche + date/heure serveur.
        let mergedAdminExtra;
        const { saved_by } = data;
        if ((admin_extra && typeof admin_extra === 'object' && !Array.isArray(admin_extra)) || saved_by) {
          const { getYachtSelectionById } = await import('@/lib/db');
          const row = await getYachtSelectionById(yacht_id);
          const prev = normalizeAdminExtra(row?.admin_extra);
          const next = admin_extra && typeof admin_extra === 'object' && !Array.isArray(admin_extra) ? admin_extra : {};
          mergedAdminExtra = normalizeAdminExtra({
            ...prev,
            ...next,
            trash: prev.trash,
            saved: saved_by ? { color: saved_by, at: new Date().toISOString() } : prev.saved,
          });
        }
        const result = await updateYachtEnrichedData(yacht_id, {
          custom_title,
          custom_description,
          custom_price,
          category,
          // Liste definitive des categories (client 2026-11-01) : cles retirees effacees.
          categories: Array.isArray(categories) ? cleanCategories(categories) : categories,
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
          // Fiches de prix par type de charter (client 2026-10-31) : objet complet, undefined = inchange.
          // Tableau = cartes de tarifs Ankor (pre-remplissage enregistre, client 2026-11-03).
          custom_pricing: Array.isArray(custom_pricing)
            ? serializeCharterPrices(normalizeCharterPrices(custom_pricing))
            // Correctif 2026-11-04 : l'admin envoie { version: 2, types } ; on serialise les
            // types (avant, l'objet etait re-enveloppe et tous les tarifs etaient effaces).
            : (custom_pricing && typeof custom_pricing === 'object'
              ? serializeCharterPrices(custom_pricing.types && typeof custom_pricing.types === 'object' ? custom_pricing.types : custom_pricing)
              : undefined),
          // Day Charter : seule la case est stockee ici (les prix sont dans l'onglet Day).
          day_charter: day_charter && typeof day_charter === 'object' ? { enabled: day_charter.enabled === true } : undefined,
          // Modele tarifaire charter (client 2026-10-15) : objet normalise, undefined = inchange.
          charter_model: charter_model && typeof charter_model === 'object' && !Array.isArray(charter_model) ? normalizeCharterModel(charter_model) : undefined,
          // Fiche bateau : champs modifies uniquement ({} = retour aux donnees d'origine), undefined = inchange.
          overrides: overrides && typeof overrides === 'object' && !Array.isArray(overrides) ? overrides : undefined,
          // Suivi des envois + contact central agent (admin uniquement), undefined = inchange.
          admin_extra: mergedAdminExtra,
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

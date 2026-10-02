// src/app/api/admin/yachts/details/route.js — Fiche bateau pre-remplie (client 2026-10-02).
// Renvoie les informations d'origine du bateau (Ankor ou saisie manuelle), les
// modifications deja enregistrees et les tarifs Ankor convertis en cartes de tarifs.

import { NextResponse } from 'next/server';
import { guardAdminRoute } from '@/lib/adminAuth';

export async function GET(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  try {
    const { ensureV3Schema, getYachtSelectionById } = await import('@/lib/db');
    const { extractYachtSource, normalizeOverrides, ankorPricingToRateRows } = await import('@/lib/yachtOverrides');
    await ensureV3Schema();

    const { searchParams } = new URL(request.url);
    const yacht_id = searchParams.get('yacht_id');
    if (!yacht_id) return NextResponse.json({ error: 'yacht_id requis' }, { status: 400 });

    const row = await getYachtSelectionById(yacht_id);
    if (!row) return NextResponse.json({ error: 'Yacht introuvable' }, { status: 404 });

    // Lignes sans detail Ankor en base (anciens ajouts) : detail recharge a la volee.
    let extraCard = null;
    const parse = (raw) => {
      if (!raw) return {};
      if (typeof raw === 'string') { try { return JSON.parse(raw) || {}; } catch { return {}; } }
      return raw;
    };
    const hasDetail = !!parse(row.cached_data)._rawEntity || !!row.full_data;
    if (!hasDetail && !String(yacht_id).startsWith('manual-')) {
      try {
        const { fetchYachtCardByUri } = await import('@/lib/yachts');
        extraCard = await fetchYachtCardByUri(yacht_id);
      } catch (e) {
        console.error('Detail Ankor indisponible pour la fiche:', e?.message);
      }
    }

    const { _pricing, ...source } = extractYachtSource(row, extraCard);
    return NextResponse.json({
      source,
      overrides: normalizeOverrides(row.overrides),
      ankorRates: ankorPricingToRateRows(_pricing),
    });
  } catch (error) {
    console.error('Erreur GET /api/admin/yachts/details:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

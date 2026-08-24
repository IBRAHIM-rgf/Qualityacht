// src/app/api/admin/yachts/apply-whitelist/route.js
// Applique une whitelist : pour les yachts d'une région donnée,
//   - is_visible = true pour ceux dont le nom matche la liste (ILIKE)
//   - is_visible = false pour TOUS les autres yachts de cette région
// Permet à l'admin de ne publier qu'une sélection validée parmi les imports Ankor.

import { NextResponse } from 'next/server';
import { guardAdminRoute } from '@/lib/adminAuth';

export async function POST(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  try {

    // Chargement APRES la garde : aucun module susceptible d'ouvrir une connexion
    // n'est initialise avant que l'authentification soit etablie.
    const { default: sql } = await import('@/lib/db');
    const body = await request.json();
    const { region, names } = body;
    if (!region) {
      return NextResponse.json({ error: 'region requis (ex: caribbean)' }, { status: 400 });
    }
    if (!Array.isArray(names)) {
      return NextResponse.json({ error: 'names doit être un tableau de strings' }, { status: 400 });
    }

    const cleanNames = names.map(n => String(n || '').trim()).filter(Boolean);
    if (cleanNames.length === 0) {
      return NextResponse.json({ error: 'names ne peut pas être vide' }, { status: 400 });
    }

    // 1) Tous les yachts de la région
    const allInRegion = await sql`
      SELECT yacht_id, yacht_name, is_visible
      FROM yacht_selections
      WHERE region = ${region}
    `;

    // 2) Pour chaque nom de la whitelist, on cherche un match ILIKE en BDD
    const matchedIds = new Set();
    const notFound = [];
    const ambiguous = []; // plusieurs matches pour un nom
    for (const name of cleanNames) {
      const pattern = `%${name}%`;
      const matches = await sql`
        SELECT yacht_id, yacht_name
        FROM yacht_selections
        WHERE region = ${region} AND yacht_name ILIKE ${pattern}
      `;
      if (matches.length === 0) {
        notFound.push(name);
      } else if (matches.length > 1) {
        // On essaie d'abord un match exact (case-insensitive)
        const exact = matches.find(m => m.yacht_name.toUpperCase().trim() === name.toUpperCase().trim());
        if (exact) {
          matchedIds.add(exact.yacht_id);
        } else {
          ambiguous.push({ name, candidates: matches.map(m => m.yacht_name) });
          matches.forEach(m => matchedIds.add(m.yacht_id));
        }
      } else {
        matchedIds.add(matches[0].yacht_id);
      }
    }

    // 3) is_visible = true pour les match, false pour les autres
    const idsToShow = [...matchedIds];
    const idsToHide = allInRegion.filter(y => !matchedIds.has(y.yacht_id)).map(y => y.yacht_id);

    let shownChanged = 0;
    let hiddenChanged = 0;

    if (idsToShow.length > 0) {
      const res = await sql`
        UPDATE yacht_selections
        SET is_visible = true, updated_at = NOW()
        WHERE yacht_id = ANY(${idsToShow}) AND is_visible = false
        RETURNING yacht_id
      `;
      shownChanged = res.length;
    }
    if (idsToHide.length > 0) {
      const res = await sql`
        UPDATE yacht_selections
        SET is_visible = false, updated_at = NOW()
        WHERE yacht_id = ANY(${idsToHide}) AND is_visible = true
        RETURNING yacht_id
      `;
      hiddenChanged = res.length;
    }

    return NextResponse.json({
      success: true,
      region,
      whitelist_count: cleanNames.length,
      total_in_region: allInRegion.length,
      shown: idsToShow.length,
      hidden: idsToHide.length,
      shown_changed: shownChanged,
      hidden_changed: hiddenChanged,
      not_found: notFound,
      ambiguous,
    });
  } catch (error) {
    console.error('Erreur POST /api/admin/yachts/apply-whitelist:', error);
    return NextResponse.json({ error: 'Erreur serveur', details: error.message }, { status: 500 });
  }
}

// src/lib/halalYachts.js — Bateaux coches « Halal Charter » dans l'admin (client 2026-10-04),
// pour les listes « Halal-Friendly Yachts » des pages /charters/halal/<region>.
// Bateau retenu : visible + categorie 'halal' + region cochee (caribbean, bahamas...).

import { fetchVisibleYachts, selectionRegions } from '@/lib/yachts';
import { getYachtSelections } from '@/lib/db';

function parseList(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') { try { const v = JSON.parse(raw); return Array.isArray(v) ? v : []; } catch { return []; } }
  return [];
}

export async function getHalalYachts(region) {
  try {
    const selections = await getYachtSelections();
    const ids = new Set(
      (selections || [])
        .filter((s) => s.is_visible && parseList(s.categories).includes('halal') && selectionRegions(s).includes(region))
        .map((s) => s.yacht_id)
    );
    if (!ids.size) return [];
    const { yachts } = await fetchVisibleYachts({});
    return (yachts || []).filter((y) => ids.has(y.id));
  } catch (e) {
    console.error('getHalalYachts error:', e);
    return [];
  }
}

// src/lib/categoryYachts.js — Bateaux d'une categorie charter (admin) pour une region /
// sous-region (client 2026-10-04) : pages ouvertes par les 8 cases des pages Day Charter,
// Last Minute, Only Couple (Caraibes / Bahamas) et flottes Sports.
// Bateau retenu : visible + region cochee + sous-region cochee (si demandee)
// + categorie cochee (si demandee) + case Day Charter cochee (si dayCharter).

import { fetchVisibleYachts, selectionRegions, selectionSubRegions } from '@/lib/yachts';
import { getYachtSelections } from '@/lib/db';

function parseList(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') { try { const v = JSON.parse(raw); return Array.isArray(v) ? v : []; } catch { return []; } }
  return [];
}

export async function getCategoryYachts({ region, subRegion = null, category = null, dayCharter = false }) {
  try {
    const selections = await getYachtSelections();
    const ids = new Set(
      (selections || [])
        .filter((s) => {
          if (!s.is_visible || !selectionRegions(s).includes(region)) return false;
          if (subRegion && !selectionSubRegions(s).includes(subRegion)) return false;
          if (category && !parseList(s.categories).includes(category)) return false;
          return true;
        })
        .map((s) => s.yacht_id)
    );
    if (!ids.size) return [];
    const { yachts } = await fetchVisibleYachts({});
    return (yachts || []).filter((y) => ids.has(y.id) && (!dayCharter || y.dayCharter?.enabled));
  } catch (e) {
    console.error('getCategoryYachts error:', e);
    return [];
  }
}

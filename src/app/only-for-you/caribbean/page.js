// /only-for-you/caribbean — page Caraibes de tous les bateaux « Only for You »
// (client 2026-10-02). Ouverte par les 6 boutons « Explore in the Caribbean » de
// /only-for-you. Bateaux = coches « Only for You » (ou un de ses 6 types) ET
// « Caraibes » dans l'admin. Meme modele que les pages sous-regions Caraibes,
// avec un filtre par type de voilier.

import SubregionClient from '../../charters/destinations/carabbean/_shared/SubregionClient';
import { fetchVisibleYachts, selectionRegions } from '@/lib/yachts';
import { getYachtSelections } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Only for You — The Caribbean | Qualityacht',
};

const HERO_IMAGE = '/media/client/lydie/2026-09-10/only-for-you/hero-sailing-trimaran.jpg';

// Les 6 types (memes cles que l'admin, categories « only-for-you/... »).
const TYPES = [
  { value: 'only-for-you/classic-sailing-yacht', label: 'Classic Sailing Yacht' },
  { value: 'only-for-you/catamaran',             label: 'Catamaran' },
  { value: 'only-for-you/trimaran',              label: 'Trimaran' },
  { value: 'only-for-you/sport-classic',         label: 'Sport Classic Yacht' },
  { value: 'only-for-you/traditional',           label: 'Traditional Sailboat' },
  { value: 'only-for-you/regatta',               label: 'Sailboat Regatta' },
];
const OFY_KEYS = new Set(['only-for-you', ...TYPES.map((t) => t.value)]);
const BOAT_GROUPS = [{ label: 'Only for You', options: TYPES }];

function parseList(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') { try { const v = JSON.parse(raw); return Array.isArray(v) ? v : []; } catch { return []; } }
  return [];
}

const config = {
  name: 'Caribbean',
  heroImage: HERO_IMAGE,
  heroImageOriginal: HERO_IMAGE,
  topIslands: TYPES.map((t) => t.label),
  boatGroups: BOAT_GROUPS,
  filterByBoatClass: true,
};

// ?type=<slug> (bouton « Explore in the Caribbean » d'un type, client 2026-10-04) :
// le filtre « Boat Class » arrive pre-selectionne sur ce type (modifiable).
export default async function OnlyForYouCaribbeanPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const wanted = typeof sp.type === 'string' ? `only-for-you/${sp.type}` : '';
  const initialBoatClass = TYPES.some((t) => t.value === wanted) ? wanted : '';
  try {
    const selections = await getYachtSelections();
    // Types Only for You de chaque bateau coche Caraibes.
    const typesById = new Map();
    for (const s of selections || []) {
      if (!s.is_visible || !selectionRegions(s).includes('caribbean')) continue;
      const cats = parseList(s.categories);
      if (!cats.some((c) => OFY_KEYS.has(c))) continue;
      typesById.set(s.yacht_id, cats.filter((c) => c.startsWith('only-for-you/')));
    }
    const { yachts: all } = await fetchVisibleYachts({});
    const yachts = (all || [])
      .filter((y) => typesById.has(y.id))
      .map((y) => ({ ...y, boatClasses: typesById.get(y.id) }));
    return <SubregionClient {...config} initialBoatClass={initialBoatClass} initialData={yachts} totalYachts={yachts.length} />;
  } catch (error) {
    console.error('Only for You Caribbean page error:', error);
    return <SubregionClient {...config} initialBoatClass={initialBoatClass} initialData={[]} totalYachts={0} />;
  }
}

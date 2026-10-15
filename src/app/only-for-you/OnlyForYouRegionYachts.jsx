// Liste des yachts « Only for You » d'une region, filtre « Boat Class » pre-selectionne
// sur un type de voilier. Extrait de /only-for-you/caribbean (client 2026-10-15 : ce
// modele s'applique a toutes les cases destination de Only for You).
// Bateaux = coches « Only for You » (ou un de ses 6 types) ET la region dans l'admin.

import SubregionClient from '../charters/destinations/carabbean/_shared/SubregionClient';
import { fetchVisibleYachts, selectionRegions } from '@/lib/yachts';
import { getYachtSelections } from '@/lib/db';

// Les 6 types (memes cles que l'admin, categories « only-for-you/... »).
export const OFY_TYPES = [
  { value: 'only-for-you/classic-sailing-yacht', label: 'Classic Sailing Yacht' },
  { value: 'only-for-you/catamaran',             label: 'Catamaran' },
  { value: 'only-for-you/trimaran',              label: 'Trimaran' },
  { value: 'only-for-you/sport-classic',         label: 'Sport Classic Yacht' },
  { value: 'only-for-you/traditional',           label: 'Traditional Sailboat' },
  { value: 'only-for-you/regatta',               label: 'Sailboat Regatta' },
];
const OFY_KEYS = new Set(['only-for-you', ...OFY_TYPES.map((t) => t.value)]);
const BOAT_GROUPS = [{ label: 'Only for You', options: OFY_TYPES }];

function parseList(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') { try { const v = JSON.parse(raw); return Array.isArray(v) ? v : []; } catch { return []; } }
  return [];
}

// region : cle de region de l'admin (null = aucune region -> liste vide).
// type   : slug du type de voilier (ex. 'catamaran') pre-selectionne, ou ''.
// fleetTitle : titre de la liste hors Caraibes (ex. « Yachts in Africa ») ; absent = defaut Caraibes.
export default async function OnlyForYouRegionYachts({ region, name, heroImage, type = '', fleetTitle, guideArticle = '' }) {
  const wanted = type ? `only-for-you/${type}` : '';
  const initialBoatClass = OFY_TYPES.some((t) => t.value === wanted) ? wanted : '';
  const config = {
    name,
    heroImage,
    heroImageOriginal: heroImage,
    topIslands: OFY_TYPES.map((t) => t.label),
    boatGroups: BOAT_GROUPS,
    filterByBoatClass: true,
    ...(fleetTitle ? { fleetTitle, hideCaribbeanDestination: true, guideArticle } : {}),
  };
  if (!region) return <SubregionClient {...config} initialBoatClass={initialBoatClass} initialData={[]} totalYachts={0} />;
  try {
    const selections = await getYachtSelections();
    // Types Only for You de chaque bateau coche dans la region.
    const typesById = new Map();
    for (const s of selections || []) {
      if (!s.is_visible || !selectionRegions(s).includes(region)) continue;
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
    console.error(`Only for You ${name} page error:`, error);
    return <SubregionClient {...config} initialBoatClass={initialBoatClass} initialData={[]} totalYachts={0} />;
  }
}

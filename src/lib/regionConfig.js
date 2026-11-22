// ══ Regions de destination — source unique (client 2026-11-22) ══
// Pour chaque region : identifiant stable (celui enregistre en base dans
// yachts.regions), libelle francais (interface admin), libelle anglais (fiches de
// tarifs « Title — 2 (Region) ») et une couleur unique, identique partout :
// cases a cocher de l'admin, indicateurs a gauche des miniatures, etiquettes des
// fiches bateau et info-bulles. Toujours comparer par identifiant, jamais par nom.
// « Océan Pacifique » (pacific-ocean) et « Océanie » (oceania) sont deux regions
// distinctes. « Antarctique » / « Antarctica » = une seule region : antarctica.

export const REGIONS = [
  { id: 'arctic', fr: 'Arctique', en: 'Arctic', color: '#9AD9FF' },
  { id: 'antarctica', fr: 'Antarctique', en: 'Antarctica', color: '#E3ECFF' },
  { id: 'bahamas', fr: 'Bahamas', en: 'Bahamas', color: '#5CF2CF' },
  { id: 'central-america', fr: 'Amérique Centrale', en: 'Central America', color: '#F2D249' },
  { id: 'east-asia', fr: "Asie de l'Est", en: 'East Asia', color: '#E255E0' },
  { id: 'east-mediterranean', fr: 'Méditerranée Est', en: 'East Mediterranean', color: '#FF6B6B' },
  { id: 'indian-ocean', fr: 'Océan Indien', en: 'Indian Ocean', color: '#9D86FF' },
  { id: 'indonesia', fr: 'Indonésie', en: 'Indonesia', color: '#B5E550' },
  { id: 'north-america', fr: 'Amérique du Nord', en: 'North America', color: '#4D7CFF' },
  { id: 'pacific-ocean', fr: 'Océan Pacifique', en: 'Pacific Ocean', color: '#1FB5A8' },
  { id: 'arabian-gulf', fr: "Golfe d'Oman", en: 'Gulf of Oman', color: '#E9C29A' },
  { id: 'south-east-asia', fr: 'Asie du Sud-Est', en: 'South East Asia', color: '#FFA94D' },
  { id: 'west-mediterranean', fr: 'Méditerranée Ouest', en: 'West Mediterranean', color: '#FF7EB6' },
  { id: 'africa', fr: 'Afrique', en: 'Africa', color: '#C9893D' },
  { id: 'northern-europe', fr: 'Europe du Nord', en: 'Northern Europe', color: '#B9C3D6' },
  { id: 'caribbean', fr: 'Caraïbes', en: 'Caribbean', color: '#00C8F0' },
  { id: 'oceania', fr: 'Océanie', en: 'Oceania', color: '#3DDC5A' },
];

const BY_ID = Object.fromEntries(REGIONS.map((r) => [r.id, r]));
const BY_EN = Object.fromEntries(REGIONS.map((r) => [r.en, r]));

export const regionById = (id) => BY_ID[id] || null;
export const regionByEn = (en) => BY_EN[en] || null;
export const regionColor = (id) => BY_ID[id]?.color || null;

/** { id: libelle francais } dans l'ordre de la liste (cases a cocher de l'admin). */
export const REGION_LABELS_FR = Object.fromEntries(REGIONS.map((r) => [r.id, r.fr]));

/** Identifiants de regions d'un bateau : connus, sans doublon, dans l'ordre enregistre. */
export function yachtRegionIds(regions) {
  const seen = new Set();
  return (Array.isArray(regions) ? regions : []).filter((id) => BY_ID[id] && !seen.has(id) && seen.add(id));
}

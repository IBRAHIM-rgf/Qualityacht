// Les 8 cases « Caribbean Islands » (memes photos et iles que les pages Caraibes) avec
// la cle de sous-region de l'admin (client 2026-10-04). Sert aux pages ouvertes par
// ces cases dans les parcours Last Minute et Only Couple : /<parcours>/<slug>.

export const CARIBBEAN_SUBREGIONS = [
  { slug: 'greater-antilles',      key: 'greater-antilles',      name: 'Greater Antilles',      image: '/images/pagesCaraibes/greater_antilles.png',  imageOld: '/images/destinations/gretar antilles-original.jpg',     islands: ['Cuba', 'Hispaniola', 'Jamaica', 'Puerto Rico'] },
  { slug: 'leeward-islands',       key: 'leeward-islands',       name: 'Leeward Islands',       image: '/images/pagesCaraibes/leeward_island.png',    imageOld: '/images/destinations/Leeward Islands-original.jpg',     islands: ['Anguilla', 'Saint-Martin / Sint Maarten', 'Saint-Barthélemy', 'Saba & Saint-Eustache', 'Saint-Kitts & Nevis', 'Antigua & Barbuda', 'Montserrat', 'Guadeloupe'] },
  { slug: 'leeward-antilles',      key: 'leeward-antilles',      name: 'Leeward Antilles',      image: '/images/pagesCaraibes/leeward_antilles.png',  imageOld: '/images/destinations/The Leeward Antilles-original.jpg', islands: ['Aruba', 'Bonaire', 'Curaçao', 'Saint Thomas (USVI)', 'Saint Croix (USVI)', 'Saint John (USVI)', 'Saint James (USVI)', 'Buck Island (USVI)', 'Tortola (BVI)', 'Peter Island (BVI)', 'Jost Van Dyke (BVI)', 'Virgin Gorda (BVI)', 'Anegada (BVI)'] },
  { slug: 'windward-islands',      key: 'windward-islands',      name: 'Windward Islands',      image: '/images/pagesCaraibes/windward_island.png',   imageOld: '/images/destinations/the Windward Islands-original.jpg', islands: ['Dominica', 'Martinique', 'Saint Lucia', 'Saint Vincent & the Grenadines', 'Mustique', 'Canouan', 'Bequia', 'Tobago Cays', 'Grenada', 'Carriacou', 'Barbados'] },
  { slug: 'turks-caicos',          key: 'turks-caicos',          name: 'Turks & Caicos',        image: '/images/pagesCaraibes/turks_caicos.png',      imageOld: '/images/destinations/Turks and Caicos-original.jpg',    islands: ['Providenciales', 'Grand Turk', 'South Caicos', 'West Caicos'] },
  { slug: 'trinidad-tobago',       key: 'trinidad-tobago',       name: 'Trinidad & Tobago',     image: '/images/pagesCaraibes/unnamed.jpg',           imageOld: '/images/destinations/Trinidad and Tobago-original.jpg', islands: ['Trinidad', 'Tobago'] },
  { slug: 'grand-cayman',          key: 'grand-cayman',          name: 'Grand Cayman',          image: '/images/pagesCaraibes/grand_cayman.png',      imageOld: '/images/destinations/Cayman Islands-original.jpg',      islands: ['Grand Cayman', 'Cayman Brac', 'Little Cayman'] },
  { slug: 'emerging-destinations', key: 'emerging-destinations', name: 'Emerging Destinations', image: '/images/pagesCaraibes/emergencyfilter.jpg',   imageOld: '/images/pagesCaraibes/emergency.png',                    islands: ['Barbuda', 'Petite Martinique', 'Redonda', 'Aves Island', 'Sombrero Island'] },
];

const BY_NAME = new Map(CARIBBEAN_SUBREGIONS.map((s) => [s.name, s]));

/** Adresse de la page d'une case dans un parcours (base = '/charters/last-minute/caribbean'...). */
export function caribbeanCaseHref(base, name) {
  const s = BY_NAME.get(name);
  return s ? `${base}/${s.slug}` : undefined;
}

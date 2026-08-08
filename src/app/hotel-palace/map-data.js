// Donnees de la carte monde de /hotel-palace.
//
// WORLD_DESTINATIONS : les 16 destinations de charters/destinationsData posees sur la
// carte monde. `title` reprend EXACTEMENT le titre de destinationsData (source unique
// des 16) : c'est la cle de rapprochement, ne pas le renommer ici.
//
// `coords` = point d'ancrage APPROXIMATIF de la zone de charter (un hub reconnaissable),
// PAS un centroide officiel. Une zone comme "Africa" ou "Pacific Ocean" n'a pas de
// centre unique : le point est la pour situer la zone sur le globe, il s'ajuste
// librement sans rien casser.
//
// `ready` : seules les Caraibes sont zoomables, ce sont les seules dont les sous-regions
// sont definies (SUBREGIONS ci-dessous). Les 15 autres sont posees sur la carte et
// annoncees a venir. Pour en ouvrir une : lui ajouter ses sous-regions et passer
// `ready: true`.
//
// AUCUN emoji.

export const WORLD_VIEW = { center: [20, -25], zoom: 4 };

export const WORLD_DESTINATIONS = [
  { title: 'Arctic',                label: 'Arctic',                coords: [78.2, 15.6],    anchor: 'Svalbard',            ready: false },
  { title: 'Northern Europe',       label: 'Northern Europe',       coords: [60.4, 5.3],     anchor: 'Norwegian fjords',    ready: false },
  { title: 'Western Mediterranean', label: 'Western Mediterranean', coords: [43.6, 7.3],     anchor: 'French Riviera',      ready: false },
  { title: 'Eastern Mediterranean', label: 'Eastern Mediterranean', coords: [37.0, 25.3],    anchor: 'Aegean Sea',          ready: false },
  { title: 'North America',         label: 'North America',         coords: [41.2, -71.5],   anchor: 'New England',         ready: false },
  { title: 'Bahamas',               label: 'Bahamas',               coords: [24.7, -76.8],   anchor: 'Exumas',              ready: false },
  { title: 'Caraïbes',              label: 'Caribbean',             coords: [16.0, -66.0],   anchor: 'Lesser Antilles',     ready: true, region: 'caribbean' },
  { title: 'Central America',       label: 'Central America',       coords: [9.3, -82.2],    anchor: 'Bocas del Toro',      ready: false },
  { title: 'Pacific Ocean',         label: 'Pacific Ocean',         coords: [-17.6, -149.4], anchor: 'French Polynesia',    ready: false },
  { title: 'Oceania',               label: 'Oceania',               coords: [-20.3, 148.9],  anchor: 'Whitsundays',         ready: false },
  { title: 'Indonesia',             label: 'Indonesia',             coords: [-8.4, 116.5],   anchor: 'Bali & Komodo',       ready: false },
  { title: 'South East Asia',       label: 'South East Asia',       coords: [8.0, 98.3],     anchor: 'Andaman Sea',         ready: false },
  { title: 'East Asia',             label: 'East Asia',             coords: [34.0, 132.0],   anchor: 'Seto Inland Sea',     ready: false },
  { title: 'Oman Gulf',             label: 'Oman Gulf',             coords: [23.6, 58.5],    anchor: 'Muscat',              ready: false },
  { title: 'Indian Ocean',          label: 'Indian Ocean',          coords: [3.2, 73.2],     anchor: 'Maldives',            ready: false },
  { title: 'Africa',                label: 'Africa',                coords: [-6.2, 39.3],    anchor: 'Zanzibar',            ready: false },
];

// ── CARAIBES ─────────────────────────────────────────────────────────────────────
// Vue d'ensemble de la zone une fois qu'on a clique dessus.
export const CARIBBEAN_VIEW = {
  label: 'Caribbean',
  center: [16, -68],
  bounds: [[9.5, -85.0], [23.5, -58.0]],
};

// Les 8 sous-regions Caraibes du site (memes slugs et memes noms que
// art-culture/caribbean/data.js et CaribbeanExplore — source unique du decoupage).
//
// 7 d'entre elles sont des zones geographiques : elles ont un `polygons` (contours
// approximatifs englobant les iles principales, repris de test-region-map).
// "Emerging Destinations" n'en a pas : ses iles sont eparpillees d'un bout a l'autre de
// l'arc (Barbuda, Petite Martinique, Redonda, Aves, Sombrero) — un polygone les
// reliant n'aurait aucun sens geographique. Elle est donc posee en points isoles
// (EMERGING_POINTS), et se selectionne en cliquant un de ses points.
//
// `polygons` est une LISTE de contours, pas un contour unique : une sous-region peut
// etre faite de plusieurs paquets d'iles separes par de la haute mer. C'est le cas des
// Leeward Antilles (les ABC au large du Venezuela + les Iles Vierges, 800 km plus au
// nord) : un contour unique reliant les deux couvrirait une immense diagonale d'ocean
// et une partie du Venezuela.
export const SUBREGIONS = [
  {
    slug: 'greater-antilles',
    name: 'Greater Antilles',
    color: '#B03E00',
    description: 'Cuba, Hispaniola, Jamaica, Puerto Rico, Caymans',
    polygons: [
      [
        [23.3, -85.0], [23.4, -77.0], [20.7, -73.5], [19.7, -67.8], [18.6, -65.2],
        [17.5, -65.5], [17.6, -69.0], [17.6, -74.5], [17.4, -78.5], [19.2, -80.0],
        [19.6, -84.5],
      ],
    ],
  },
  {
    slug: 'leeward-islands',
    name: 'Leeward Islands',
    color: '#d39478',
    description: 'Anguilla, St-Martin, St-Barth, Saba, St Eustatius, St Kitts & Nevis, Antigua & Barbuda, Montserrat, Guadeloupe',
    polygons: [
      [
        [18.6, -63.3], [18.3, -62.3], [17.7, -62.4], [17.3, -62.5], [16.7, -61.6],
        [15.8, -61.4], [15.9, -61.9], [16.7, -62.3], [17.5, -63.3], [18.2, -63.4],
      ],
    ],
  },
  {
    slug: 'leeward-antilles',
    name: 'Leeward Antilles',
    color: '#B87333',
    description: 'Aruba, Bonaire, Curaçao, US & British Virgin Islands',
    // 2 contours : les ABC, puis les Iles Vierges. Le site range les USVI et les BVI
    // dans cette sous-region (cf. art-culture/caribbean/data.js), il faut donc les
    // dessiner : sans ce second contour, Tortola, Virgin Gorda et St Thomas — parmi les
    // mouillages les plus frequentes de l'arc — n'appartiendraient a aucune zone.
    polygons: [
      [
        [12.7, -70.2], [12.6, -69.7], [12.4, -68.5], [12.3, -68.1], [11.9, -68.4],
        [12.0, -69.5], [12.3, -70.1],
      ],
      [
        [18.9, -65.15], [18.9, -64.2], [17.6, -64.4], [17.6, -65.15],
      ],
    ],
  },
  {
    slug: 'windward-islands',
    name: 'Windward Islands',
    color: '#c2622a',
    description: 'Dominica, Martinique, Saint Lucia, St Vincent & the Grenadines, Grenada, Barbados',
    polygons: [
      [
        [15.7, -61.5], [15.5, -61.1], [14.8, -60.8], [13.7, -60.8], [13.2, -59.3],
        [11.9, -61.4], [12.0, -61.9], [12.8, -61.5], [13.3, -61.4], [14.6, -61.3],
        [15.3, -61.6],
      ],
    ],
  },
  {
    slug: 'turks-caicos',
    name: 'Turks & Caicos',
    color: '#5e7ec9',
    description: 'Providenciales, Grand Turk, South, North & Middle Caicos',
    polygons: [[[22.1, -72.5], [22.1, -71.0], [21.3, -71.0], [21.3, -72.5]]],
  },
  {
    slug: 'trinidad-tobago',
    name: 'Trinidad & Tobago',
    color: '#8e44ad',
    description: 'Trinidad, Tobago',
    polygons: [
      [
        [11.4, -60.9], [11.1, -60.4], [10.0, -60.7], [10.0, -61.9], [10.8, -62.0],
        [11.2, -60.9],
      ],
    ],
  },
  {
    slug: 'grand-cayman',
    name: 'Grand Cayman',
    color: '#e67e22',
    description: 'Grand Cayman, Cayman Brac, Little Cayman',
    polygons: [[[19.85, -81.6], [19.85, -79.7], [19.25, -79.7], [19.25, -81.6]]],
  },
  {
    slug: 'emerging-destinations',
    name: 'Emerging Destinations',
    color: '#27ae60',
    description: 'Barbuda, Petite Martinique, Redonda, Aves, Sombrero',
    polygons: null, // iles eparpillees : voir EMERGING_POINTS
  },
];

// Les iles de "Emerging Destinations", posees une par une (coords de test-region-map).
export const EMERGING_POINTS = [
  { name: 'Barbuda',           coords: [17.63, -61.81] },
  { name: 'Petite Martinique', coords: [12.53, -61.39] },
  { name: 'Redonda',           coords: [16.94, -62.34] },
  { name: 'Aves Island',       coords: [15.67, -63.62] },
  { name: 'Sombrero Island',   coords: [18.59, -63.43] },
];

// ── HOTELS & PALACES ─────────────────────────────────────────────────────────────
// VIDE : a remplir sous-region par sous-region, cle = slug de SUBREGIONS.
// Forme attendue de chaque entree :
//   { name: 'Nom de l'etablissement', island: 'Ile', type: 'Palace' | 'Hotel' | 'Villa',
//     signature: true|false, desc: 'Texte de presentation.' }
// Tant qu'une sous-region est absente ou vide, la carte l'annonce "Selection coming soon"
// (aucun contenu invente).
export const HOTELS_BY_SUB = {
  'greater-antilles': [],
  'leeward-islands': [],
  'leeward-antilles': [],
  'windward-islands': [],
  'turks-caicos': [],
  'trinidad-tobago': [],
  'grand-cayman': [],
  'emerging-destinations': [],
};

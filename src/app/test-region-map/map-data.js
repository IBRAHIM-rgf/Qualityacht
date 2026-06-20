// Coordonnées hardcodées des sous-régions et aéroports principaux Caraïbes.
// Pour la démo. Sources : Wikipedia + IATA.

export const REGION_VIEWS = {
  caribbean: {
    label: 'Caraïbes',
    center: [16, -68],  // [lat, lng] centre approximatif
    zoom: 5,
    bounds: [[8, -90], [27, -56]],
  },
};

// Sous-régions Caraïbes en POLYGONES (approximatifs, englobent les îles principales).
// `center` gardé pour le zoom auto. `polygon` = liste [lat, lng] qui dessine la zone.
export const SUB_REGIONS = {
  'greater-antilles': {
    label: 'Greater Antilles',
    color: '#B03E00',
    center: [20, -76],
    description: 'Cuba, Hispaniola (Haïti & Rép. Dominicaine), Jamaïque, Porto Rico, Caïmans',
    polygon: [
      [23.3, -85.0],   // NW Cuba
      [23.4, -77.0],   // NE Cuba
      [20.7, -73.5],   // N Hispaniola
      [19.7, -67.8],   // N Porto Rico
      [18.6, -65.2],   // E Porto Rico
      [17.5, -65.5],   // S Porto Rico
      [17.6, -69.0],   // S Rép. Dom.
      [17.6, -74.5],   // S Haïti
      [17.4, -78.5],   // S Jamaïque
      [19.2, -80.0],   // Caïmans
      [19.6, -84.5],   // SW Cuba
    ],
  },
  'leeward-islands': {
    label: 'Leeward Islands',
    color: '#d39478',
    center: [17.3, -62.4],
    description: 'Anguilla, St-Martin, St-Barth, Saba, St-Eustache, St-Kitts & Nevis, Antigua & Barbuda, Montserrat, Guadeloupe',
    polygon: [
      [18.6, -63.3],   // N Anguilla
      [18.3, -62.3],   // E Anguilla / Barbuda
      [17.7, -62.4],   // St-Barth
      [17.3, -62.5],   // St-Kitts
      [16.7, -61.6],   // S Antigua
      [15.8, -61.4],   // S Guadeloupe
      [15.9, -61.9],   // W Guadeloupe
      [16.7, -62.3],   // Montserrat
      [17.5, -63.3],   // Saba
      [18.2, -63.4],   // St-Martin
    ],
  },
  'windward-islands': {
    label: 'Windward Islands',
    color: '#c2622a',
    center: [13.5, -61.2],
    description: 'Dominique, Martinique, Sainte-Lucie, St-Vincent & Grenadines, Grenade, Barbade',
    polygon: [
      [15.7, -61.5],   // N Dominique
      [15.5, -61.1],   // E Dominique
      [14.8, -60.8],   // Martinique
      [13.7, -60.8],   // Ste-Lucie
      [13.2, -59.3],   // Barbade
      [11.9, -61.4],   // S Grenade
      [12.0, -61.9],   // SW Grenade
      [12.8, -61.5],   // Carriacou
      [13.3, -61.4],   // SVG
      [14.6, -61.3],   // W Martinique
      [15.3, -61.6],   // W Dominique
    ],
  },
  'leeward-antilles': {
    label: 'Leeward Antilles (ABC)',
    color: '#B87333',
    center: [12.3, -68.9],
    description: 'Aruba, Bonaire, Curaçao',
    polygon: [
      [12.7, -70.2],   // NW Aruba
      [12.6, -69.7],
      [12.4, -68.5],
      [12.3, -68.1],   // Bonaire
      [11.9, -68.4],
      [12.0, -69.5],   // S Curaçao
      [12.3, -70.1],   // S Aruba
    ],
  },
  'turks-caicos': {
    label: 'Turks & Caicos',
    color: '#5e7ec9',
    center: [21.7, -71.8],
    description: 'Providenciales, Grand Turk, South & West Caicos',
    polygon: [
      [22.1, -72.5],
      [22.1, -71.0],
      [21.3, -71.0],
      [21.3, -72.5],
    ],
  },
  'trinidad-tobago': {
    label: 'Trinidad & Tobago',
    color: '#8e44ad',
    center: [10.7, -61.3],
    description: 'Trinidad, Tobago',
    polygon: [
      [11.4, -60.9],   // N Tobago
      [11.1, -60.4],   // E Tobago
      [10.0, -60.7],   // SE Trinidad
      [10.0, -61.9],   // SW Trinidad
      [10.8, -62.0],   // NW Trinidad
      [11.2, -60.9],   // back
    ],
  },
  'bvi': {
    label: 'British Virgin Islands',
    color: '#27ae60',
    center: [18.5, -64.5],
    description: 'Tortola, Virgin Gorda, Anegada, Jost Van Dyke',
    polygon: [
      [18.85, -64.85],
      [18.75, -64.0],
      [18.30, -64.30],
      [18.25, -64.85],
    ],
  },
  'grand-cayman': {
    label: 'Grand Cayman',
    color: '#e67e22',
    center: [19.4, -81.3],
    description: 'Grand Cayman, Cayman Brac, Little Cayman',
    polygon: [
      [19.85, -81.6],
      [19.85, -79.7],
      [19.25, -79.7],
      [19.25, -81.6],
    ],
  },
};

// Aéroports principaux Caraïbes avec coordonnées GPS exactes (lat, lng).
// `size` : large | medium | light | stol (pour pictogramme/couleur)
// `subRegion` : à quelle sous-région il appartient
export const AIRPORTS = [
  // Greater Antilles
  { code: 'HAV', name: 'José Martí Intl', island: 'Cuba',                     coords: [22.989, -82.409], size: 'large', subRegion: 'greater-antilles' },
  { code: 'VRA', name: 'Juan Gualberto Gómez', island: 'Cuba',                coords: [23.034, -81.435], size: 'medium', subRegion: 'greater-antilles' },
  { code: 'CYL', name: 'Cayo Largo', island: 'Cuba',                          coords: [21.616, -81.546], size: 'light', subRegion: 'greater-antilles' },
  { code: 'PUJ', name: 'Punta Cana Intl', island: 'Rép. Dominicaine',         coords: [18.567, -68.363], size: 'all', subRegion: 'greater-antilles' },
  { code: 'SDQ', name: 'Las Américas Intl', island: 'Rép. Dominicaine',       coords: [18.430, -69.668], size: 'all', subRegion: 'greater-antilles' },
  { code: 'LRM', name: 'Casa de Campo / La Romana Intl', island: 'Rép. Dominicaine', coords: [18.451, -68.911], size: 'medium', subRegion: 'greater-antilles' },
  { code: 'PAP', name: 'Toussaint Louverture Intl', island: 'Haïti',          coords: [18.580, -72.293], size: 'medium', subRegion: 'greater-antilles' },
  { code: 'CAP', name: 'Cap-Haïtien Intl', island: 'Haïti',                   coords: [19.733, -72.195], size: 'light', subRegion: 'greater-antilles' },
  { code: 'MBJ', name: 'Sangster Intl', island: 'Jamaïque',                   coords: [18.504, -77.913], size: 'all', subRegion: 'greater-antilles' },
  { code: 'KIN', name: 'Norman Manley Intl', island: 'Jamaïque',              coords: [17.936, -76.787], size: 'all', subRegion: 'greater-antilles' },
  { code: 'OCJ', name: 'Ian Fleming Intl', island: 'Jamaïque',                coords: [18.404, -76.969], size: 'light', subRegion: 'greater-antilles' },
  { code: 'SJU', name: 'Luis Muñoz Marín Intl', island: 'Porto Rico',         coords: [18.439, -66.001], size: 'all', subRegion: 'greater-antilles' },
  { code: 'SIG', name: 'Fernando Luis Ribas Dominicci', island: 'Porto Rico', coords: [18.456, -66.098], size: 'light', subRegion: 'greater-antilles' },
  { code: 'PSE', name: 'Mercedita', island: 'Porto Rico',                     coords: [18.008, -66.563], size: 'medium', subRegion: 'greater-antilles' },

  // Leeward Islands
  { code: 'AXA', name: 'Clayton J. Lloyd Intl', island: 'Anguilla',           coords: [18.205, -63.055], size: 'light', subRegion: 'leeward-islands' },
  { code: 'SXM', name: 'Princess Juliana Intl', island: 'St-Martin',          coords: [18.041, -63.109], size: 'all', subRegion: 'leeward-islands' },
  { code: 'SFG', name: 'Grand Case', island: 'St-Martin',                     coords: [18.099, -63.047], size: 'medium', subRegion: 'leeward-islands' },
  { code: 'SBH', name: 'Gustavia', island: 'Saint-Barthélemy',                coords: [17.904, -62.844], size: 'stol', subRegion: 'leeward-islands' },
  { code: 'SAB', name: 'Juancho E. Yrausquin', island: 'Saba',                coords: [17.645, -63.220], size: 'stol', subRegion: 'leeward-islands' },
  { code: 'EUX', name: 'F.D. Roosevelt', island: 'Saint-Eustache',            coords: [17.496, -62.979], size: 'light', subRegion: 'leeward-islands' },
  { code: 'SKB', name: 'Robert L. Bradshaw Intl', island: 'St-Kitts',         coords: [17.311, -62.719], size: 'all', subRegion: 'leeward-islands' },
  { code: 'NEV', name: 'Vance W. Amory Intl', island: 'Nevis',                coords: [17.205, -62.590], size: 'light', subRegion: 'leeward-islands' },
  { code: 'ANU', name: 'V.C. Bird Intl', island: 'Antigua',                   coords: [17.137, -61.793], size: 'all', subRegion: 'leeward-islands' },
  { code: 'BBQ', name: 'Codrington', island: 'Barbuda',                       coords: [17.635, -61.829], size: 'light', subRegion: 'leeward-islands' },
  { code: 'MNI', name: 'John A. Osborne', island: 'Montserrat',               coords: [16.791, -62.193], size: 'light', subRegion: 'leeward-islands' },
  { code: 'PTP', name: 'Pointe-à-Pitre Intl', island: 'Guadeloupe',           coords: [16.265, -61.531], size: 'all', subRegion: 'leeward-islands' },

  // Windward Islands
  { code: 'DOM', name: 'Douglas-Charles', island: 'Dominique',                coords: [15.547, -61.300], size: 'medium', subRegion: 'windward-islands' },
  { code: 'DCF', name: 'Canefield', island: 'Dominique',                      coords: [15.336, -61.392], size: 'light', subRegion: 'windward-islands' },
  { code: 'FDF', name: 'Aimé Césaire Intl', island: 'Martinique',             coords: [14.591, -61.003], size: 'all', subRegion: 'windward-islands' },
  { code: 'UVF', name: 'Hewanorra Intl', island: 'Sainte-Lucie',              coords: [13.733, -60.953], size: 'all', subRegion: 'windward-islands' },
  { code: 'SLU', name: 'George F.L. Charles', island: 'Sainte-Lucie',         coords: [14.020, -60.992], size: 'light', subRegion: 'windward-islands' },
  { code: 'SVD', name: 'Argyle Intl', island: 'St-Vincent',                   coords: [13.156, -61.149], size: 'medium', subRegion: 'windward-islands' },
  { code: 'MQS', name: 'Mustique', island: 'Mustique',                        coords: [12.888, -61.180], size: 'light', subRegion: 'windward-islands' },
  { code: 'CIW', name: 'Canouan', island: 'Canouan',                          coords: [12.699, -61.342], size: 'medium', subRegion: 'windward-islands' },
  { code: 'GND', name: 'Maurice Bishop Intl', island: 'Grenade',              coords: [12.004, -61.786], size: 'all', subRegion: 'windward-islands' },
  { code: 'CRU', name: 'Lauriston', island: 'Carriacou',                      coords: [12.476, -61.480], size: 'light', subRegion: 'windward-islands' },
  { code: 'BGI', name: 'Grantley Adams Intl', island: 'Barbade',              coords: [13.075, -59.493], size: 'all', subRegion: 'windward-islands' },

  // Leeward Antilles (ABC)
  { code: 'AUA', name: 'Queen Beatrix Intl', island: 'Aruba',                 coords: [12.501, -70.015], size: 'all', subRegion: 'leeward-antilles' },
  { code: 'BON', name: 'Flamingo Intl', island: 'Bonaire',                    coords: [12.131, -68.269], size: 'medium', subRegion: 'leeward-antilles' },
  { code: 'CUR', name: 'Curaçao Intl', island: 'Curaçao',                     coords: [12.189, -68.960], size: 'all', subRegion: 'leeward-antilles' },

  // Turks & Caicos
  { code: 'PLS', name: 'Providenciales Intl', island: 'Providenciales',       coords: [21.774, -72.266], size: 'medium', subRegion: 'turks-caicos' },
  { code: 'GDT', name: 'Grand Turk Intl', island: 'Grand Turk',               coords: [21.444, -71.142], size: 'light', subRegion: 'turks-caicos' },

  // Trinidad & Tobago
  { code: 'POS', name: 'Piarco Intl', island: 'Trinidad',                     coords: [10.595, -61.337], size: 'all', subRegion: 'trinidad-tobago' },
  { code: 'TAB', name: 'A.N.R. Robinson Intl', island: 'Tobago',              coords: [11.150, -60.832], size: 'medium', subRegion: 'trinidad-tobago' },
];

// Îles des 7 groupes "Destinations by Region" de caribbean-v15.
// Markers complémentaires aux aéroports (forme différente, plus discrète).
export const ISLAND_GROUPS = [
  { id: 'greater-antilles',  label: 'Greater Antilles',      color: '#B03E00' },
  { id: 'leeward-islands',   label: 'Leeward Islands',       color: '#d39478' },
  { id: 'leeward-antilles',  label: 'Leeward Antilles',      color: '#B87333' },
  { id: 'windward-islands',  label: 'Windward Islands',      color: '#c2622a' },
  { id: 'turks-caicos',      label: 'Turks & Caicos',        color: '#5e7ec9' },
  { id: 'trinidad-tobago',   label: 'Trinidad & Tobago',     color: '#8e44ad' },
  { id: 'emerging',          label: 'Emerging Destinations', color: '#27ae60' },
];

export const ISLANDS = [
  // Greater Antilles
  { name: 'Cuba',          group: 'greater-antilles', coords: [22.00, -79.50] },
  { name: 'Hispaniola',    group: 'greater-antilles', coords: [18.85, -71.50] },
  { name: 'Jamaica',       group: 'greater-antilles', coords: [18.10, -77.30] },
  { name: 'Puerto Rico',   group: 'greater-antilles', coords: [18.20, -66.60] },

  // Leeward Islands
  { name: 'Anguilla',                       group: 'leeward-islands', coords: [18.22, -63.07] },
  { name: 'Saint-Martin / Sint Maarten',    group: 'leeward-islands', coords: [18.07, -63.05] },
  { name: 'Saint-Barthélemy',               group: 'leeward-islands', coords: [17.90, -62.83] },
  { name: 'Saba & Saint-Eustache',          group: 'leeward-islands', coords: [17.55, -63.20] },
  { name: 'Saint-Kitts & Nevis',            group: 'leeward-islands', coords: [17.25, -62.65] },
  { name: 'Antigua & Barbuda',              group: 'leeward-islands', coords: [17.10, -61.80] },
  { name: 'Montserrat',                     group: 'leeward-islands', coords: [16.74, -62.19] },
  { name: 'Guadeloupe',                     group: 'leeward-islands', coords: [16.27, -61.55] },

  // Leeward Antilles (ABC)
  { name: 'Aruba',         group: 'leeward-antilles', coords: [12.52, -69.97] },
  { name: 'Bonaire',       group: 'leeward-antilles', coords: [12.18, -68.27] },
  { name: 'Curaçao',       group: 'leeward-antilles', coords: [12.17, -68.99] },
  // US Virgin Islands (USVI)
  { name: 'Saint Thomas (USVI)', group: 'leeward-antilles', coords: [18.343, -64.930] },
  { name: 'Saint Croix (USVI)',  group: 'leeward-antilles', coords: [17.728, -64.785] },
  { name: 'Saint John (USVI)',   group: 'leeward-antilles', coords: [18.350, -64.736] },
  { name: 'Saint James (USVI)',  group: 'leeward-antilles', coords: [18.318, -64.839] },
  { name: 'Buck Island (USVI)',  group: 'leeward-antilles', coords: [17.789, -64.620] },
  // British Virgin Islands (BVI)
  { name: 'Tortola (BVI)',       group: 'leeward-antilles', coords: [18.428, -64.624] },
  { name: 'Peter Island (BVI)',  group: 'leeward-antilles', coords: [18.362, -64.580] },
  { name: 'Jost Van Dyke (BVI)', group: 'leeward-antilles', coords: [18.450, -64.750] },
  { name: 'Virgin Gorda (BVI)',  group: 'leeward-antilles', coords: [18.479, -64.421] },
  { name: 'Anegada (BVI)',       group: 'leeward-antilles', coords: [18.722, -64.328] },

  // Windward Islands
  { name: 'Dominica',                      group: 'windward-islands', coords: [15.41, -61.37] },
  { name: 'Martinique',                    group: 'windward-islands', coords: [14.65, -61.02] },
  { name: 'Saint Lucia',                   group: 'windward-islands', coords: [13.91, -60.98] },
  { name: 'Saint Vincent & the Grenadines', group: 'windward-islands', coords: [13.25, -61.20] },
  { name: 'Mustique',                      group: 'windward-islands', coords: [12.88, -61.18] },
  { name: 'Canouan',                       group: 'windward-islands', coords: [12.70, -61.34] },
  { name: 'Bequia',                        group: 'windward-islands', coords: [12.99, -61.24] },
  { name: 'Tobago Cays',                   group: 'windward-islands', coords: [12.63, -61.35] },
  { name: 'Grenada',                       group: 'windward-islands', coords: [12.11, -61.68] },
  { name: 'Carriacou',                     group: 'windward-islands', coords: [12.49, -61.45] },
  { name: 'Barbados',                      group: 'windward-islands', coords: [13.19, -59.54] },

  // Turks & Caicos
  { name: 'Providenciales',  group: 'turks-caicos', coords: [21.78, -72.27] },
  { name: 'Grand Turk',      group: 'turks-caicos', coords: [21.46, -71.13] },
  { name: 'South Caicos',    group: 'turks-caicos', coords: [21.50, -71.52] },
  { name: 'West Caicos',     group: 'turks-caicos', coords: [21.71, -72.46] },

  // Trinidad & Tobago
  { name: 'Trinidad',  group: 'trinidad-tobago', coords: [10.69, -61.22] },
  { name: 'Tobago',    group: 'trinidad-tobago', coords: [11.18, -60.74] },

  // Grand Cayman
  { name: 'Grand Cayman', group: 'grand-cayman', coords: [19.31, -81.25] },
  { name: 'Cayman Brac',  group: 'grand-cayman', coords: [19.72, -79.83] },
  { name: 'Little Cayman', group: 'grand-cayman', coords: [19.68, -80.04] },

  // Emerging Destinations
  { name: 'Barbuda',           group: 'emerging', coords: [17.63, -61.81] },
  { name: 'Petite Martinique', group: 'emerging', coords: [12.53, -61.39] },
  { name: 'Redonda',           group: 'emerging', coords: [16.94, -62.34] },
  { name: 'Aves Island',       group: 'emerging', coords: [15.67, -63.62] },
  { name: 'Sombrero Island',   group: 'emerging', coords: [18.59, -63.43] },
];

export const SIZE_COLORS = {
  large:  '#B03E00',  // grand jet
  all:    '#c2622a',  // tous types
  medium: '#d39478',  // moyen
  light:  '#acb0cd',  // léger
  stol:   '#5e7ec9',  // STOL
};

export const SIZE_LABELS = {
  large:  'Grands jets',
  all:    'Tous jets',
  medium: 'Jets moyens',
  light:  'Jets légers',
  stol:   'STOL uniquement',
};

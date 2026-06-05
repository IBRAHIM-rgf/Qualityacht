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

// Centres approximatifs des 8 sous-régions Caraïbes (cercles/zones sur la carte).
export const SUB_REGIONS = {
  'greater-antilles': {
    label: 'Greater Antilles',
    color: '#B03E00',
    center: [20, -76],
    radius: 600000,  // mètres (rayon du cercle)
    description: 'Cuba, Hispaniola (Haïti & Rép. Dominicaine), Jamaïque, Porto Rico, Caïmans',
  },
  'leeward-islands': {
    label: 'Leeward Islands',
    color: '#d39478',
    center: [17.5, -62.5],
    radius: 200000,
    description: 'Anguilla, St-Martin, St-Barth, Saba, St-Eustache, St-Kitts & Nevis, Antigua & Barbuda, Montserrat, Guadeloupe',
  },
  'windward-islands': {
    label: 'Windward Islands',
    color: '#c2622a',
    center: [13.5, -61.2],
    radius: 200000,
    description: 'Dominique, Martinique, Sainte-Lucie, St-Vincent & Grenadines, Grenade, Barbade',
  },
  'leeward-antilles': {
    label: 'Leeward Antilles (ABC)',
    color: '#B87333',
    center: [12.3, -68.9],
    radius: 150000,
    description: 'Aruba, Bonaire, Curaçao',
  },
  'turks-caicos': {
    label: 'Turks & Caicos',
    color: '#5e7ec9',
    center: [21.7, -71.8],
    radius: 90000,
    description: 'Providenciales, Grand Turk, South & West Caicos',
  },
  'trinidad-tobago': {
    label: 'Trinidad & Tobago',
    color: '#8e44ad',
    center: [10.7, -61.3],
    radius: 100000,
    description: 'Trinidad, Tobago',
  },
  'bvi': {
    label: 'British Virgin Islands',
    color: '#27ae60',
    center: [18.5, -64.5],
    radius: 60000,
    description: 'Tortola, Virgin Gorda, Anegada, Jost Van Dyke',
  },
  'grand-cayman': {
    label: 'Grand Cayman',
    color: '#e67e22',
    center: [19.4, -81.3],
    radius: 50000,
    description: 'Grand Cayman, Cayman Brac, Little Cayman',
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

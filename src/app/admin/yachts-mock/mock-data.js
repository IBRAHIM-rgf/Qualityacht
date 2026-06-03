// Données mock pour la maquette admin v2. Pas de connexion BDD.

// 5 yachts en BDD (3 publiés + 2 en stock masqués)
export const mockBddYachts = [
  {
    id: 'mock-1',
    name: 'ASTRA',
    image: '/images/yachts/yatch2.jpeg',
    length: '52m',
    guests: 12,
    cabins: 6,
    region: 'caribbean',
    sub_region: 'leeward-islands',
    is_visible: true,
    is_featured: true,
    custom_title: '',
    custom_price: '180 000 €/sem',
  },
  {
    id: 'mock-2',
    name: 'BLUE STAR',
    image: '/images/yachts/yatch2.jpeg',
    length: '38m',
    guests: 10,
    cabins: 5,
    region: 'caribbean',
    sub_region: 'greater-antilles',
    is_visible: true,
    is_featured: false,
    custom_title: '',
    custom_price: '95 000 €/sem',
  },
  {
    id: 'mock-3',
    name: 'MONTE CARLO',
    image: '/images/yachts/yatch2.jpeg',
    length: '65m',
    guests: 14,
    cabins: 7,
    region: 'west-mediterranean',
    sub_region: null,
    is_visible: true,
    is_featured: false,
    custom_title: '',
    custom_price: '320 000 €/sem',
  },
  {
    id: 'mock-4',
    name: 'SILENT WAVE',
    image: '/images/yachts/yatch2.jpeg',
    length: '42m',
    guests: 10,
    cabins: 5,
    region: 'caribbean',
    sub_region: 'windward-islands',
    is_visible: false,
    is_featured: false,
    custom_title: '',
    custom_price: '120 000 €/sem',
  },
  {
    id: 'mock-5',
    name: 'NORTH WIND',
    image: '/images/yachts/yatch2.jpeg',
    length: '48m',
    guests: 12,
    cabins: 6,
    region: 'caribbean',
    sub_region: null,
    is_visible: false,
    is_featured: false,
    custom_title: '',
    custom_price: '150 000 €/sem',
  },
];

// 3 yachts dans Ankor non importés en BDD (pour onglet "Recherche Ankor")
// + 1 doublon (ASTRA déjà importé) pour montrer le cas "déjà en BDD"
export const mockAnkorResults = [
  {
    id: 'ankor-ASTRA',
    name: 'ASTRA',
    image: '/images/yachts/yatch2.jpeg',
    length: '52m',
    guests: 12,
    region: 'caribbean',
    pricePerWeek: '180 000 €',
    alreadyInBdd: true,  // doublon avec mock-1
  },
  {
    id: 'ankor-OCEAN-DREAM',
    name: 'OCEAN DREAM',
    image: '/images/yachts/yatch2.jpeg',
    length: '58m',
    guests: 12,
    region: 'caribbean',
    pricePerWeek: '210 000 €',
    alreadyInBdd: false,
  },
  {
    id: 'ankor-ROYAL-FLUSH',
    name: 'ROYAL FLUSH',
    image: '/images/yachts/yatch2.jpeg',
    length: '72m',
    guests: 14,
    region: 'west-mediterranean',
    pricePerWeek: '450 000 €',
    alreadyInBdd: false,
  },
  {
    id: 'ankor-SEA-EAGLE',
    name: 'SEA EAGLE',
    image: '/images/yachts/yatch2.jpeg',
    length: '40m',
    guests: 10,
    region: 'east-mediterranean',
    pricePerWeek: '110 000 €',
    alreadyInBdd: false,
  },
];

export const REGION_LABELS = {
  'caribbean': 'Caraïbes',
  'bahamas': 'Bahamas',
  'west-mediterranean': 'Méditerranée Ouest',
  'east-mediterranean': 'Méditerranée Est',
  'indian-ocean': 'Océan Indien',
};

export const SUB_REGION_LABELS = {
  'greater-antilles': 'Greater Antilles',
  'leeward-islands': 'Leeward Islands',
  'windward-islands': 'Windward Islands',
  'leeward-antilles': 'Leeward Antilles',
  'turks-caicos': 'Turks & Caicos',
  'trinidad-tobago': 'Trinidad & Tobago',
  'bvi': 'British Virgin Islands',
  'grand-cayman': 'Grand Cayman',
};

export const SUB_REGIONS_BY_REGION = {
  caribbean: ['greater-antilles', 'leeward-islands', 'windward-islands', 'leeward-antilles', 'turks-caicos', 'trinidad-tobago', 'bvi', 'grand-cayman'],
};

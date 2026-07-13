// Les 8 sous-regions Caraibes (memes noms/photos que CaribbeanExplore), utilisees par
// les pages Discovery de /historic-sites/caribbean-v3/[section].
// activities : A REMPLIR — une entree = { name, meta } affichee dans la sous-region.
export const SUBREGIONS = [
  {
    slug: 'greater-antilles',
    name: 'Greater Antilles',
    img: '/images/destinations/gretar antilles-original.jpg',
    islands: ['Cuba', 'Hispaniola', 'Jamaica', 'Puerto Rico'],
    activities: [],
  },
  {
    slug: 'leeward-islands',
    name: 'Leeward Islands',
    img: '/images/destinations/Leeward Islands-original.jpg',
    islands: [
      'Anguilla',
      'Saint-Martin / Sint Maarten',
      'Saint-Barthélemy',
      'Saba & Saint-Eustache',
      'Saint-Kitts & Nevis',
      'Antigua & Barbuda',
      'Montserrat',
      'Guadeloupe',
    ],
    activities: [],
  },
  {
    slug: 'leeward-antilles',
    name: 'Leeward Antilles',
    img: '/images/destinations/The Leeward Antilles-original.jpg',
    islands: ['Aruba', 'Bonaire', 'Curaçao', 'US Virgin Islands', 'British Virgin Islands'],
    activities: [],
  },
  {
    slug: 'windward-islands',
    name: 'Windward Islands',
    img: '/images/destinations/the Windward Islands-original.jpg',
    islands: [
      'Dominica',
      'Martinique',
      'Saint Lucia',
      'Saint Vincent & the Grenadines',
      'Grenada',
      'Barbados',
    ],
    activities: [],
  },
  {
    slug: 'turks-caicos',
    name: 'Turks & Caicos',
    img: '/images/destinations/Turks and Caicos-original.jpg',
    islands: ['Providenciales', 'Grand Turk', 'South Caicos', 'West Caicos'],
    activities: [],
  },
  {
    slug: 'trinidad-tobago',
    name: 'Trinidad & Tobago',
    img: '/images/destinations/Trinidad and Tobago-original.jpg',
    islands: ['Trinidad', 'Tobago'],
    activities: [],
  },
  {
    slug: 'grand-cayman',
    name: 'Grand Cayman',
    img: '/images/destinations/Cayman Islands-original.jpg',
    islands: ['Grand Cayman', 'Cayman Brac', 'Little Cayman'],
    activities: [],
  },
  {
    slug: 'emerging-destinations',
    name: 'Emerging Destinations',
    img: '/images/pagesCaraibes/emergencyfilter.jpg',
    islands: ['Barbuda', 'Petite Martinique', 'Redonda', 'Aves Island', 'Sombrero Island'],
    activities: [],
  },
];

// Les 3 sections de la card v3. Le titre sert d'intitule de la page Discovery.
export const SECTIONS = {
  monuments: { title: 'Historic Monuments', eyebrow: 'Caribbean · Ashore' },
  hiking: { title: 'Hiking', eyebrow: 'Caribbean · By Land' },
  cycling: { title: 'Cycling', eyebrow: 'Caribbean · By Land' },
};

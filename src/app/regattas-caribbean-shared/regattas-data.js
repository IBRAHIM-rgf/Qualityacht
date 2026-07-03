// Donnees partagees pour les 2 propositions de page regatta calendar 2027.

export const REGATTA_CATEGORIES = [
  { key: 'offshore',    icon: '🌊', label: 'Offshore',     color: '#1a7ab8' },
  { key: 'junior',      icon: '🧒', label: 'Juniors',      color: '#2e7d50' },
  { key: 'women',       icon: '👩', label: 'Women',        color: '#c4366d' },
  { key: 'classic',     icon: '⚓', label: 'Classic',      color: '#c9922a' },
  { key: 'traditional', icon: '🪵', label: 'Traditional',  color: '#B87333' },
  { key: 'superyacht',  icon: '🛥', label: 'Superyacht',   color: '#d64f3b' },
  { key: 'multihull',   icon: '🔀', label: 'Multihull',    color: '#0d7a6b' },
  { key: 'unesco',      icon: '🏛', label: 'UNESCO',       color: '#6b3fa0' },
];

// Categories & types de bateaux du circuit regatta caribeen.
// Sert d'options groupees (optgroup) dans le filtre des pages event regatta.
// label = nom de la categorie (optgroup), options = modeles de bateaux.
export const REGATTA_BOAT_GROUPS = [
  {
    label: 'Monotypes IRC / ORC — Fleet Racing',
    options: [
      { value: 'j24',     label: 'J/24 — 7.3 m · entry-level one-design' },
      { value: 'j80',     label: 'J/80 — 7.9 m · sporty, popular' },
      { value: 'j120',    label: 'J/120 — 11.4 m · high performance' },
      { value: 'farr40',  label: 'Farr 40 — 12.2 m · pro / competition' },
      { value: 'tp52',    label: 'TP52 — 15.8 m · Rolex TP52 Series' },
      { value: 'swan45',  label: 'Swan 45 — 13.7 m · prestige IRC A' },
    ],
  },
  {
    label: 'Multihulls — Speed & Spectacle',
    options: [
      { value: 'gunboat',  label: 'Racing catamaran (Gunboat 55/62) — 15-18 m' },
      { value: 'trimaran', label: 'Sport trimaran (Corsair / Dragonfly) — 8-9 m' },
    ],
  },
];

export const MONTHS_2027 = [
  { key: 'january',   label: 'January',   order: 1 },
  { key: 'february',  label: 'February',  order: 2 },
  { key: 'march',     label: 'March',     order: 3 },
  { key: 'april',     label: 'April',     order: 4 },
  { key: 'may',       label: 'May',       order: 5 },
  { key: 'june',      label: 'June',      order: 6 },
  { key: 'july',      label: 'July',      order: 7 },
  { key: 'august',    label: 'August',    order: 8 },
  { key: 'september', label: 'September', order: 9 },
  { key: 'october',   label: 'October',   order: 10 },
  { key: 'november',  label: 'November',  order: 11 },
  { key: 'december',  label: 'December',  order: 12 },
];

// Universes thematiques pour Proposition B
export const REGATTA_UNIVERSES = [
  {
    key: 'offshore',
    title: 'Offshore Racing',
    icon: '🌊',
    tagline: 'High-stakes blue-water competition',
    categories: ['offshore'],
  },
  {
    key: 'classic',
    title: 'Classic & Tradition',
    icon: '⚓',
    tagline: 'Vintage yachts and heritage craft',
    categories: ['classic', 'traditional', 'unesco'],
  },
  {
    key: 'luxury',
    title: 'Luxury & Superyacht',
    icon: '🛥',
    tagline: '100+ ft yachts, invitation only',
    categories: ['superyacht'],
  },
  {
    key: 'family',
    title: 'Juniors & Women',
    icon: '🧒',
    tagline: 'Next-gen sailors and women-led crews',
    categories: ['junior', 'women'],
  },
];

export const REGATTAS_2027 = [
  // ── JANUARY ──
  {
    id: 'barbados-sailing-week',
    name: 'Barbados Sailing Week & Mount Gay Round Barbados',
    dates: 'Jan 15 — 22',
    month: 'january',
    island: 'Barbados — Carlisle Bay',
    categories: ['offshore', 'junior'],
    description: {
      island: "Barbados comes alive in peak season. Bridgetown and its historic UNESCO-listed marine area buzz with activity. Mount Gay Rum — the world's oldest rum (since 1703) — is ever-present: the Mount Gay parties are legendary after each race day. The west coast beaches (Holetown, Speightstown) and south coast (Dover Beach, Oistins Fish Fry on Friday nights) vibrate with crews from around the world.",
      race: 'The highlight is the Mount Gay Round Barbados Race (approx. Jan 21): a full circumnavigation of the island offshore. This is followed by the "Rum to Spice Race" (Jan 22), connecting Barbados to Grenada. Dinghy classes for under-16s, kiteboards and wing foils.',
      nightlife: "Oistins Fish Fry on Fridays is a must — fresh fish, calypso music, rum, sunset views. Bridgetown's Harbour Lights and Boat Yard are hotspots for festive nights.",
    },
    footer: 'Island Tour + Offshore Race · Sponsored by Mount Gay Rum',
  },
  {
    id: 'grenada-sailing-week',
    name: 'Grenada Sailing Week',
    dates: 'Jan 31 — Feb 5',
    month: 'january',
    island: 'Grenada & Carriacou',
    categories: ['offshore'],
    boatTypes: 'All types (monohulls, multihulls)',
    level: 'Beginner to Intermediate',
    audience: 'Amateurs',
    description: {
      island: "Kicks off in Carriacou — Grenada's sister island, accessible by ferry from St. George's. Totally relaxed atmosphere: beach barbecues every evening, live local music. Grenada is the \"Isle of Spice\" — nutmeg and cinnamon scent the docks. 12+ nationalities.",
      race: 'Starting in Carriacou, the race goes around the island, followed by offshore to Grenada, then coastal races along the south coast. Lush green hills, pristine beaches, steady trade winds.',
      nightlife: "Gouyave's Fish Friday: fresh seafood and music every Friday. Beach BBQs, Caribbean concerts every night. The Aquarium Restaurant on Magazine Beach.",
    },
    footer: '12+ Countries · Beginners Welcome · Multi-Island',
  },
  // ── FEBRUARY ──
  {
    id: 'caribbean-multihull-challenge',
    name: 'Caribbean Multihull Challenge',
    dates: 'Feb 3 — 7',
    month: 'february',
    island: 'Sint Maarten — Simpson Bay',
    categories: ['multihull'],
    boatTypes: 'Multihulls — Diam 24, 60 ft catamarans',
    level: 'Intermediate to Very High',
    audience: 'Amateurs & Professionals',
    description: {
      island: 'Sint Maarten = fiscal paradise and financial hub (Dutch side). Cultural side: 37 beaches, casinos, French-side terraces in Marigot.',
      race: 'Exclusively for catamarans and trimarans (all sizes). Constant trade winds, perfect for fast multihulls.',
      nightlife: 'Lively nights split between Dutch-side casinos and French-side Marigot. Boardwalk dining at Simpson Bay.',
    },
    footer: 'Multihulls only · Trade-wind racing',
  },
  {
    id: 'rorc-caribbean-600',
    name: 'RORC Caribbean 600',
    dates: 'Feb 22',
    month: 'february',
    island: 'Antigua — 11-island circuit',
    categories: ['offshore'],
    boatTypes: 'Monohulls (IRC, Class40), multihulls',
    level: 'High',
    audience: 'Professionals & experienced amateurs',
    description: {
      island: 'Base at English Harbour — UNESCO-listed natural port, "living museum of sailing." 18th edition.',
      race: '600 non-stop miles around 11 islands (Anguilla, Barbuda, Nevis, St. Kitts, Saba, St. Barth, Guadeloupe). Expert level: IRC Offshore, Class40, multihulls. 500+ sailors from 30 nations.',
      nightlife: "Commodore's evening at the Reef Restaurant (view of Nelson's Dockyard, UNESCO). Prize ceremony with engraved English Harbour rum bottles. Lively bars at Cloggies.",
    },
    footer: '500+ sailors · 30 nations · Expert offshore',
  },
  {
    id: 'schoelcher-juniors-feb',
    name: 'Schoelcher International Sailing Week — Juniors',
    dates: 'February 2027',
    month: 'february',
    island: 'Schoelcher, Martinique',
    categories: ['junior'],
    description: {
      island: "Family-friendly Caribbean French island. Beaches of Anse Dufour and Anse Noire, Creole gastronomy. Welcoming Yacht Club community.",
      race: 'Optimist, Laser, Open BIC, Sunfish, Beach Cats. Beginners and confirmed competitors welcome.',
      nightlife: 'Family-oriented evening events. Creole BBQs, music on the beach. Day-trip to Saint-Pierre (UNESCO candidate).',
    },
    footer: 'Beginners welcome · All youth classes',
  },
  // ── MARCH ──
  {
    id: 'st-maarten-heineken',
    name: 'St. Maarten Heineken Regatta',
    dates: 'Mar 4 — 7',
    month: 'march',
    island: 'Sint Maarten — Simpson Bay',
    categories: ['offshore'],
    boatTypes: 'All types (monohulls, multihulls, cruising yachts)',
    level: 'Beginner to High',
    audience: 'Everyone',
    description: {
      island: 'The largest regatta in the Caribbean: 20,000+ visitors, 37 countries. Slogan: "Serious Fun." Regatta Village at Simpson Bay (sponsors, sailors, spectators).',
      race: '47th edition. 4 race committees: from Olympic level to charter crews.',
      nightlife: 'Concerts with international artists (Shaggy, Black Eyed Peas, Akon have played). Spectator boat option: Saturday/Sunday lunch + bar.',
    },
    footer: 'Largest Caribbean regatta · 37 countries',
  },
  {
    id: 'st-barths-bucket',
    name: 'St. Barths Bucket Regatta',
    dates: 'Mar 18 — 21',
    month: 'march',
    island: 'Saint-Barthélemy — Gustavia',
    categories: ['superyacht'],
    boatTypes: 'Superyachts (80+ ft)',
    level: 'Very High',
    audience: 'Owners & pro crews',
    description: {
      island: 'Invitation only. 100+ ft yachts: Perini Navi, Baltic, Dubois, Royal Huisman. Luxury hotels: Eden Rock, Cheval Blanc, Le Toiny.',
      race: '4 races (Thursday → Sunday). Private parties on superyacht decks every evening.',
      nightlife: 'Nikki Beach, Shellona, Le Tï St Barth, luxury boutiques in Gustavia. Jet-set nautical scene.',
    },
    footer: 'Invitation only · 100+ ft yachts',
  },
  {
    id: 'stir',
    name: 'St. Thomas International Regatta (STIR)',
    dates: 'Late March 2027',
    month: 'march',
    island: 'St. Thomas, USVI',
    categories: ['offshore', 'junior'],
    description: {
      island: 'Nicknamed "Crown Jewel of Caribbean Racing." Charlotte Amalie (USVI capital), duty-free shopping, St. Thomas Yacht Club.',
      race: '3 days of varied coastal races. Junior dinghy classes.',
      nightlife: 'Magens Bay and Coki Point beaches. Yacht Club gatherings.',
    },
    footer: '"Crown Jewel of Caribbean Racing"',
  },
  // ── APRIL ──
  {
    id: 'bvi-spring-regatta',
    name: 'BVI Spring Regatta & Sailing Festival',
    dates: 'Mar 29 — Apr 4',
    month: 'april',
    island: 'Tortola, BVI',
    categories: ['offshore', 'women'],
    boatTypes: 'All types (monohulls, multihulls)',
    level: 'Intermediate',
    audience: 'Amateurs & Professionals',
    description: {
      island: '54th edition. Base at Nanny Cay Marina. BVI = world leader in offshore financial services.',
      race: 'Scrub Island Invitational (11 miles), Round Tortola Race (36 miles), 3 days of fleet racing. 18 classes (beach cats to multihulls), 470+ sailors from 16 countries.',
      nightlife: 'BBQ at Scrub Island (pool + live music). Regatta village every evening. Anchorages at Norman Island, Peter Island, Salt Island (wreck snorkeling).',
    },
    footer: '470+ sailors · 16 countries · 54th edition',
  },
  {
    id: 'antigua-classic',
    name: 'Antigua Classic Yacht Regatta',
    dates: 'Mid-April 2027',
    month: 'april',
    island: 'Antigua — English Harbour',
    categories: ['classic', 'unesco'],
    description: {
      island: 'Founded in 1987 by skippers around a rum. English Harbour = UNESCO heritage, "living museum of sailing."',
      race: 'Elegance contest in the morning, races in the afternoon. Categories: Classics, Vintage, Spirit of Tradition. Gig Racing (old gigs and yoles) on the final day.',
      nightlife: "Shirley Heights prize-giving (sunset + steel band). Caribbean Night at Pillars Restaurant (Admiral's Inn). Traditional Cream Tea.",
    },
    footer: 'Since 1987 · UNESCO heritage venue',
  },
  {
    id: 'antigua-sailing-week',
    name: 'Antigua Sailing Week',
    dates: 'Apr 21 — 25',
    month: 'april',
    island: 'Antigua — English Harbour',
    categories: ['offshore', 'women'],
    boatTypes: 'All types (monohulls, multihulls, classics)',
    level: 'Beginner to Very High',
    audience: 'All levels',
    description: {
      island: '58th edition (since 1967): the oldest regatta in the Caribbean. 100+ yachts, 1500 participants, 5000 spectators, 24 countries.',
      race: 'Point-to-point format around Antigua (new coast each day: Nonsuch Bay, Little Jumby Bay, Ffryes Beach). Suited to cruisers and racer-cruisers.',
      nightlife: 'Prize ceremony presided by the Governor General of Antigua. Shirley Heights Sunday: sunset + steel band (sacred ritual). English Harbour rum, Carib Beer, Antiguan joy.',
    },
    footer: '58th edition · Oldest Caribbean regatta',
  },
  {
    id: 'voiles-st-barth',
    name: 'Les Voiles de St. Barth',
    dates: 'Mid-April 2027',
    month: 'april',
    island: 'Saint-Barthélemy — Gustavia',
    categories: ['offshore'],
    boatTypes: 'Monohulls (IRC, Class40), multihulls, maxi yachts',
    level: 'Intermediate to High',
    audience: 'Amateurs & Professionals',
    description: {
      island: 'Maxi & cruiser-racer pursuit racing. Constant trade winds, clear waters. "Private club" atmosphere, international jet-set.',
      race: 'Pursuit races around St. Barth. Classes: Maxis, racer-cruisers. Rockstar regatta crews.',
      nightlife: 'Some of the most impressive dock parties on the circuit. Gustavia: gourmet restaurants, luxury boutiques, mythical beaches (Shell Beach, St. Jean).',
    },
    footer: 'Maxi yachts · Pursuit format',
  },
  {
    id: 'svg-sailing-week',
    name: 'SVG Sailing Week',
    dates: 'Late March — Early April',
    month: 'april',
    island: 'St. Vincent & the Grenadines',
    categories: ['offshore'],
    description: {
      island: 'Archipelago: Bequia, Mayreau, Tobago Cays (one of the most beautiful marine parks).',
      race: 'Combines races and island hopping. Turquoise lagoons, sea turtles in the wild.',
      nightlife: 'Bequia: traditional shipyards, whaling heritage. Tobago Cays: bonfire on the beach.',
    },
    footer: 'Island-hopping format · Marine park',
  },
  // ── JUNE ──
  {
    id: 'ior-st-thomas',
    name: 'International Optimist Regatta (IOR)',
    dates: 'Mid-June 2027',
    month: 'june',
    island: 'St. Thomas Yacht Club, USVI',
    categories: ['junior', 'women'],
    description: {
      island: 'Since 1993: largest junior regatta in the Caribbean. 100+ young sailors from 7+ countries (USVI, Puerto Rico, Antigua, Martinique, Trinidad).',
      race: 'Programme 3-in-1: Mon-Wed TOTE Clinic (intensive training with 10 international coaches, Advanced and Green Fleet for beginners). Thu TOTE Team Race. Fri-Sun IOR (official regatta). Alumni: Olympic medalists and America\'s Cup winners.',
      nightlife: 'Family-oriented. Charlotte Amalie, beaches at Magens Bay and Coki Beach. Founders Trophy for Best Female Sailor.',
    },
    footer: '100+ sailors · Founders Trophy (Women)',
  },
  // ── JULY-AUGUST ──
  {
    id: 'tour-yoles-rondes',
    name: 'Tour de Martinique des Yoles Rondes',
    dates: 'Late July — Early August 2027',
    month: 'july',
    island: 'Martinique — full island tour (8 stages)',
    categories: ['traditional', 'unesco', 'junior'],
    boatTypes: 'Traditional boats (Gommier, Yole), monohulls',
    level: 'Beginner to Intermediate',
    audience: 'Locals & amateurs',
    description: {
      island: 'Founded in 1985: national sporting event in Martinique (followed by almost the entire population). UNESCO heritage 2020. 8 stages: Fort-de-France, Le Diamant, Rivière-Pilote, Anses d\'Arlet, Sainte-Anne...',
      race: 'The Yole Ronde: 8-9 meter boat carved with an axe from local pear wood, no keel or rudder. Balance maintained by sailor-barreurs on planks ("bouts dehors"). 15 crews in 2027.',
      nightlife: 'Tens of thousands of spectators on the docks. 300 escort boats follow the race. Festive popular festival at each stage arrival: music, rum, manger-créole, vidé (festive parade). Bébé Yoles races for children.',
    },
    footer: 'UNESCO heritage 2020 · 8 stages',
  },
  {
    id: 'regate-gommiers',
    name: 'Régate de Gommiers — Martinique',
    dates: 'July — August season',
    month: 'july',
    island: 'Martinique — Sainte-Marie, Le Vauclin, Le Robert',
    categories: ['traditional', 'junior'],
    description: {
      island: 'The Gommier: traditional Martinican fishermen pirogue, carved from the trunk of the red gum tree. Multi-generational tradition.',
      race: 'Parallel to Yoles Rondes, more accessible and family-oriented.',
      nightlife: 'Bébé Gommiers for children (6-15 years): technical and cultural introduction.',
    },
    footer: 'Family-friendly · Bébé Gommiers',
  },
  // ── AUGUST ──
  {
    id: 'aruba-regatta',
    name: 'Aruba International Regatta',
    dates: 'August 2027',
    month: 'august',
    island: 'Aruba — Outside cyclone zone',
    categories: ['offshore', 'junior'],
    description: {
      island: 'Unique advantage: Aruba is outside the cyclone corridor → waters navigable year-round. Among the most consistent winds in the Caribbean.',
      race: 'Constant trade winds 15-25 knots. Cruisers, racers, and junior dinghy classes.',
      nightlife: 'White sand beaches, lively nights in Oranjestad. Growing international participation.',
    },
    footer: 'Outside cyclone zone · Year-round navigable',
  },
  // ── NOVEMBER ──
  {
    id: 'mango-bowl',
    name: 'Mango Bowl Regatta',
    dates: 'November 2027',
    month: 'november',
    island: 'St. Lucia — Rodney Bay Marina',
    categories: ['offshore'],
    description: {
      island: 'Organizer: St. Lucia Yacht Club. End-of-season relaxed atmosphere. Rodney Bay Marina = one of the most beautiful in the Caribbean.',
      race: 'Coastal and offshore races in the waters between St. Lucia and the Grenadines. Pitons (UNESCO) in the background.',
      nightlife: 'November in St. Lucia: calm after the cyclone season, warm water, constant trade winds. Sunset cocktails at Rodney Bay.',
    },
    footer: 'End-of-season · UNESCO Pitons',
  },

  // ══ AJOUTS : regates de la liste qui n'avaient pas encore de card ══
  {
    id: 'st-maarten-regatta',
    name: 'St. Maarten Regatta',
    dates: 'March 2027',
    month: 'march',
    island: 'Saint-Martin / Sint Maarten',
    categories: ['offshore'],
    boatTypes: 'All types (monohulls, multihulls)',
    level: 'Beginner to High',
    audience: 'All levels',
    description: {
      island: 'Dual-nation island (French Saint-Martin & Dutch Sint Maarten): 37 beaches, casinos, Marigot terraces.',
      race: 'Open to all types of boats, from beginners to advanced crews. Steady trade winds.',
    },
    footer: 'All levels · Trade-wind racing',
  },
  {
    id: 'loro-piana-superyacht',
    name: 'Loro Piana Superyacht Regatta',
    dates: 'March 2027',
    month: 'march',
    island: 'Virgin Gorda, BVI',
    categories: ['superyacht'],
    boatTypes: 'Superyachts (100+ ft)',
    level: 'Very High',
    audience: 'Owners & pro crews',
    description: {
      island: "Hosted around Virgin Gorda (BVI). Invitation-only gathering of the world's finest sailing superyachts.",
      race: '100+ ft yachts with professional crews. Elegance and performance on the water.',
    },
    footer: 'Invitation only · 100+ ft yachts',
  },
  {
    id: 'nelsons-cup',
    name: "Nelson's Cup Series",
    dates: 'March 2027',
    month: 'march',
    island: 'Antigua — English Harbour',
    categories: ['classic', 'offshore'],
    boatTypes: 'Classic & modern (monohulls / multihulls)',
    level: 'Intermediate',
    audience: 'All levels',
    description: {
      island: "Based at Nelson's Dockyard, English Harbour (UNESCO). Warm-up series ahead of the Antigua season.",
      race: 'Mix of classic and modern yachts. Coastal races in Antiguan waters.',
    },
    footer: 'English Harbour · UNESCO venue',
  },
  {
    id: 'cap-martinique',
    name: 'Cap Martinique',
    dates: 'April 2027',
    month: 'april',
    island: 'La Trinité-sur-Mer → Martinique',
    categories: ['offshore'],
    boatTypes: 'Monohulls 30–40 ft (IRC, TCC 0.977–1.081)',
    level: 'Intermediate to High',
    audience: 'Amateurs',
    description: {
      island: 'Transatlantic race from La Trinité-sur-Mer (Brittany) to Martinique.',
      race: 'Double-handed offshore crossing for 30–40 ft monohulls (IRC).',
    },
    footer: 'Transatlantic · Double-handed',
  },
  {
    id: 'jolly-harbour-regatta',
    name: 'Jolly Harbour Yacht Club Regatta',
    dates: 'November 2026',
    month: 'november',
    island: 'Antigua — Jolly Harbour',
    categories: ['offshore'],
    boatTypes: 'Monohulls, multihulls (all sizes)',
    level: 'Beginner to Intermediate',
    audience: 'Amateurs',
    description: {
      island: 'Friendly end-of-year regatta hosted by Jolly Harbour Yacht Club, on the west coast of Antigua.',
      race: 'Relaxed coastal races open to all sizes of monohulls and multihulls.',
    },
    footer: 'Season opener · Amateur-friendly',
  },
];

// Helper : regroupe les regattes par mois.
export function groupByMonth(regattas) {
  const grouped = {};
  for (const r of regattas) {
    if (!grouped[r.month]) grouped[r.month] = [];
    grouped[r.month].push(r);
  }
  return grouped;
}

// Helper : retourne les categories info d'une regatta sous forme d'objets.
export function getCategoryInfo(catKey) {
  return REGATTA_CATEGORIES.find((c) => c.key === catKey);
}

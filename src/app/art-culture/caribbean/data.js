// Donnees de /art-culture/caribbean.
//  - SUBREGIONS : les 8 sous-regions Caraibes (memes noms/photos que CaribbeanExplore).
//  - ART     : ce qui etait deja sur la page (musees, galeries, expositions, sites),
//              chaque ile rattachee a sa sous-region.
//  - CULTURE : le calendrier fourni par le client (saison, periode culturelle, mois de
//              charter conseilles, niveau VIP, note), chaque destination rattachee a sa
//              sous-region.
// AUCUN emoji.

export const SUBREGIONS = [
  { slug: 'greater-antilles', name: 'Greater Antilles', img: '/images/destinations/gretar antilles-original.jpg' },
  { slug: 'leeward-islands', name: 'Leeward Islands', img: '/images/destinations/Leeward Islands-original.jpg' },
  { slug: 'leeward-antilles', name: 'Leeward Antilles', img: '/images/destinations/The Leeward Antilles-original.jpg' },
  { slug: 'windward-islands', name: 'Windward Islands', img: '/images/destinations/the Windward Islands-original.jpg' },
  { slug: 'turks-caicos', name: 'Turks & Caicos', img: '/images/destinations/Turks and Caicos-original.jpg' },
  { slug: 'trinidad-tobago', name: 'Trinidad & Tobago', img: '/images/destinations/Trinidad and Tobago-original.jpg' },
  { slug: 'grand-cayman', name: 'Grand Cayman', img: '/images/destinations/Cayman Islands-original.jpg' },
  { slug: 'emerging-destinations', name: 'Emerging Destinations', img: '/images/pagesCaraibes/emergencyfilter.jpg' },
];

// ── ART : musees, galeries, expositions, sites (contenu deja present sur la page) ──
export const ART = [
  {
    island: 'St-Barth',
    sub: 'leeward-islands',
    venues: [
      {
        type: 'Exhibition',
        name: "Jean-Michel Othoniel — 'Beauty Saves the World'",
        signature: true,
        desc: "Some twenty previously unseen works — blown-glass sculptures, suspended installations, lithographs. A sensory journey conceived specifically for the island's natural landscape. A rare and entirely exclusive moment.",
      },
      {
        type: 'Gallery',
        name: 'Space Gallery — Gustavia',
        signature: true,
        desc: "The island's preeminent reference in Gustavia's Carré d'Or, with an outpost in SoHo, New York. Emerging and established artists, private viewings by appointment.",
      },
      {
        type: 'Exhibition',
        name: 'St Barth Art Week — November',
        signature: true,
        desc: 'Private openings, ephemeral installations in private villas and select venues across Gustavia. A confidential and highly curated event, reserved for collectors and initiates.',
      },
      {
        type: 'Exhibition',
        name: 'St Barth Photo Festival — Nov./Dec.',
        signature: true,
        desc: "The world's leading fashion photographers exhibit across the island's five-star hotels. Evening openings, solo shows in extraordinary settings.",
      },
      {
        type: 'Museum',
        name: 'Wall House Museum',
        signature: false,
        desc: 'Regularly rotating temporary exhibitions — photography, sculpture, contemporary painting. Historic building from the Swedish era (1784–1878) in Gustavia.',
      },
      {
        type: 'Museum',
        name: 'Musée Municipal de St-Barthélemy',
        signature: false,
        desc: 'History of the island under Swedish rule. Period objects, antique maps, authentic colonial architecture. Essential cultural context.',
      },
    ],
  },
  {
    island: 'Guadeloupe',
    sub: 'leeward-islands',
    venues: [
      {
        type: 'Museum',
        name: 'Mémorial ACTe (MACTe) — Pointe-à-Pitre',
        signature: true,
        desc: "The most ambitious museum ever dedicated to slavery and the slave trade. Spectacular architecture in silver steel on black granite. Permanent exhibition and international cultural programming. Member of UNESCO's Slave Route project.",
      },
      {
        type: 'Gallery',
        name: 'Kreol West Indies Gallery',
        signature: false,
        desc: 'Paintings, metal sculptures, street art, and eco-conscious objects. An integrated museum dedicated to the history and culture of Guadeloupe.',
      },
    ],
  },
  {
    island: 'Martinique',
    sub: 'windward-islands',
    venues: [
      {
        type: 'Museum',
        name: 'Musée de la Pagerie — Trois-Îlets',
        signature: false,
        desc: 'Birthplace of Empress Joséphine Bonaparte. Personal effects, period portraits, Empire-style furnishings. French-Caribbean imperial history set within an exceptional tropical estate.',
      },
      {
        type: 'Museum',
        name: 'Écomusée de Martinique — Pointe du Figuier',
        signature: false,
        desc: 'On the site of the former Carib chief Pilote. Amerindian and colonial collections — rare archaeological vestiges, immersive reconstructions. Former Ducanet distillery.',
      },
      {
        type: 'Museum',
        name: 'Musée du Rhum et de la Canne — Sainte-Marie',
        signature: false,
        desc: "Housed in the former Vatable distillery. Permanent exhibition: 'One Land, One Plant, One People.' The island's agricultural, cultural, and identity history across two floors.",
      },
    ],
  },
  {
    island: 'Antigua',
    sub: 'leeward-islands',
    venues: [
      {
        type: 'UNESCO Site',
        name: "Nelson's Dockyard Museum — English Harbour",
        signature: true,
        desc: "Within the Naval Officers' House of Nelson's Dockyard (1784–1787). Collections spanning the Arawak era to the 19th century. The dockyard is a UNESCO World Heritage Site. Guided tours, exceptional panorama.",
      },
      {
        type: 'Museum',
        name: "Museum of Antigua & Barbuda — St John's",
        signature: false,
        desc: 'Arawak pottery, colonial cartography, history of emancipation. Housed in an 18th-century English courthouse. A remarkable collection of Amerindian artefacts.',
      },
    ],
  },
  {
    island: 'St Kitts & Nevis',
    sub: 'leeward-islands',
    venues: [
      {
        type: 'UNESCO Site',
        name: 'Brimstone Hill Fortress — St Kitts',
        signature: true,
        desc: "Nicknamed the 'Gibraltar of the Caribbean.' British fortress dating to 1690, inscribed on the UNESCO World Heritage List. 360° panorama of neighbouring islands; integrated military museum.",
      },
      {
        type: 'Museum',
        name: 'Nelson Museum — Nevis',
        signature: false,
        desc: 'The largest collection of Admiral Nelson memorabilia in the New World — prints, porcelain, ship models. Managed by the Nevis Historical and Conservation Society.',
      },
    ],
  },
  {
    island: 'St-Martin / Sint Maarten',
    sub: 'leeward-islands',
    venues: [
      {
        type: 'Museum',
        name: 'Sint Maarten Museum — Philipsburg',
        signature: false,
        desc: 'The first museum on the Dutch side. Arawak pottery, the wreck of HMS Proselyte, history of Hurricane Luis (1995), colonial maritime crafts. An entirely volunteer-run, authentic collection.',
      },
    ],
  },
  {
    island: 'Jamaica',
    sub: 'greater-antilles',
    venues: [
      {
        type: 'Museum',
        name: 'National Gallery of Jamaica — Kingston',
        signature: true,
        desc: 'The largest public art museum in the English-speaking Caribbean. Permanent collection from the Taino era to the present — Edna Manley, Kapo, Barrington Watson. Retrospectives and thematic exhibitions year-round.',
      },
      {
        type: 'Exhibition',
        name: "'Of Wood and Water' — Scotiabank Collection (Summer 2026)",
        signature: true,
        desc: '40+ works exploring the Jamaican landscape across three geological chapters. NGJ × Scotiabank collaboration. Paintings, sculptures, mixed media.',
      },
      {
        type: 'Exhibition',
        name: 'ARAVARA — NGJ × KADIST (through Sept. 2026)',
        signature: true,
        desc: '10 international artists on time as a political structure — recurrence, collective memory. Presented simultaneously across four Caribbean countries.',
      },
      {
        type: 'Historic Site',
        name: 'Devon House — Kingston',
        signature: false,
        desc: "An 1881 estate built by George Stiebel, Jamaica's first Black millionaire. Restored Victorian architecture, gardens, artisan boutiques. National historic monument.",
      },
    ],
  },
  {
    island: 'Puerto Rico',
    sub: 'greater-antilles',
    venues: [
      {
        type: 'Museum',
        name: 'Museo de Arte de Puerto Rico — San Juan',
        signature: true,
        desc: '1,000 years of Puerto Rican art — colonial painting, modernism, contemporary Caribbean art. Monumental neoclassical building with sculpture garden. Internationally renowned temporary exhibitions.',
      },
      {
        type: 'Museum',
        name: 'Museo de las Américas — Old San Juan',
        signature: false,
        desc: 'Housed in the former Arsenal de la Puntilla. Collections on indigenous peoples, colonisation, and Afro-Puerto Rican identity. Excellent quality temporary exhibitions.',
      },
    ],
  },
  {
    island: 'Cuba',
    sub: 'greater-antilles',
    venues: [
      {
        type: 'Museum',
        name: 'Museo Nacional de Bellas Artes — Havana',
        signature: true,
        desc: "The world's largest collection of Caribbean art. Two buildings: Cuban art from all periods and an international collection. The absolute reference for any serious art collector.",
      },
    ],
  },
  {
    island: 'Barbados',
    sub: 'windward-islands',
    venues: [
      {
        type: 'Gallery',
        name: 'Gallery of Caribbean Art — Speightstown',
        signature: true,
        desc: 'The only gallery dedicated to art from across the entire region, from Haiti to Guyana. Rotating exhibitions by leading painters, sculptors, and photographers. Free admission.',
      },
      {
        type: 'Museum',
        name: 'Barbados Museum & Historical Society — Bridgetown',
        signature: false,
        desc: '500,000+ artefacts across seven galleries — Amerindian heritage, colonial era, rare books, historic photography. Housed in a former military prison at the British Garrison.',
      },
      {
        type: 'Gallery',
        name: 'National Art Gallery of Barbados',
        signature: false,
        desc: 'The national reference — Barbadian art from the 20th century to contemporary. Acquisitive collections, educational exhibitions, and an annual cultural programme.',
      },
    ],
  },
  {
    island: 'Grenada',
    sub: 'windward-islands',
    venues: [
      {
        type: 'Unique Site',
        name: 'Molinere Underwater Sculpture Park',
        signature: true,
        desc: "The world's first underwater museum (2006) by sculptor Jason deCaires Taylor. 75 pH-neutral cement sculptures at 5–8m depth. Ranked among the 25 Wonders of the World by National Geographic. Accessible by snorkelling, diving, or glass-bottom boat.",
      },
      {
        type: 'Museum',
        name: "Grenada National Museum — St George's",
        signature: false,
        desc: 'Housed in the former French Arsenal. Amerindian artefacts, French and British colonial-era objects, history of the 1979 Grenadian revolution.',
      },
    ],
  },
  {
    island: 'Dominica',
    sub: 'windward-islands',
    venues: [
      {
        type: 'Museum',
        name: 'Dominica Museum — Roseau',
        signature: false,
        desc: 'An 18th-century building. Collections on the indigenous Kalinago people, French and British colonisation, and Dominican Creole culture.',
      },
    ],
  },
  {
    island: 'Curaçao',
    sub: 'leeward-antilles',
    venues: [
      {
        type: 'Exhibition',
        name: "Exhibition 'Blue' — Contemporary Caribbean Art (through Aug. 1, 2026)",
        signature: true,
        desc: 'Artists from Curaçao and across the region in dialogue through works dominated by blue — collective aspiration, celebration, and island identity.',
      },
      {
        type: 'Museum',
        name: 'Museo Tula — Landhuis Knip',
        signature: false,
        desc: 'Dedicated to the 1795 slave revolt led by Tula. A powerful narrative of resistance in a restored plantation house, set amid the Curaçaoan countryside.',
      },
      {
        type: 'Museum',
        name: 'Curaçao Interactive Experience — Willemstad',
        signature: false,
        desc: 'The history and culture of Curaçao staged in an immersive format. Award-winning scenography. Ideal within the UNESCO colonial quarter of Willemstad.',
      },
    ],
  },
  {
    island: 'Aruba',
    sub: 'leeward-antilles',
    venues: [
      {
        type: 'Gallery',
        name: 'UNOCA — National Gallery',
        signature: false,
        desc: 'A showcase for local visual arts — painters, sculptors, artisans. A reflection of Aruban cultural diversity, blending Dutch, Latin, and Caribbean influences.',
      },
      {
        type: 'Exhibition / Fair',
        name: 'Aruba Art Fair — 8th Edition (Sept. 11–13, 2026)',
        signature: true,
        desc: 'The flagship event of the ABC Islands. International galleries, emerging and established artists, collectors from around the world.',
      },
    ],
  },
  {
    island: 'US Virgin Islands',
    sub: 'leeward-antilles',
    venues: [
      {
        type: 'Museum',
        name: 'Caribbean Museum Center for the Arts — St Croix',
        signature: false,
        desc: 'The only waterfront art museum in the USVI. Rotating exhibitions every eight weeks, permanent Caribbean collection. Workshops with award-winning artists, film, cultural programmes.',
      },
      {
        type: 'Museum',
        name: 'St Thomas Historical Trust Museum',
        signature: false,
        desc: 'History of St Thomas from Danish colonisation to the 1917 transfer to the United States. Highly personalised guided tours by expert volunteers; VIP format available.',
      },
    ],
  },
  {
    island: 'Turks & Caicos',
    sub: 'turks-caicos',
    venues: [
      {
        type: 'Museum',
        name: 'Turks & Caicos National Museum — Grand Turk',
        signature: true,
        desc: "Housed in Guinep Lodge, a bicentennial building. Rare pre-Columbian collections — including a duho (Lucayan ceremonial seat). History of the salt industry, postcards, maritime artefacts. Voted 'Best Little Museum in the Caribbean.'",
      },
    ],
  },
  {
    island: 'Trinidad & Tobago',
    sub: 'trinidad-tobago',
    venues: [
      {
        type: 'Museum',
        name: 'National Museum and Art Gallery — Port of Spain',
        signature: false,
        desc: 'Works by local and international artists — paintings, Amerindian artefacts, colonial history. A complete cultural memory of the archipelago.',
      },
    ],
  },
  {
    island: 'Cayman Islands',
    sub: 'grand-cayman',
    venues: [
      {
        type: 'Museum',
        name: 'Cayman Islands National Museum — George Town',
        signature: false,
        desc: 'Housed in the oldest public building in the Caymans (1830s). Natural history and cultural galleries, animatronic reconstructions, immersive audiovisuals. Exhibition on Ira Thompson, founder of the collections.',
      },
      {
        type: 'Gallery',
        name: 'National Gallery of the Cayman Islands',
        signature: false,
        desc: 'A collection illustrating the essence of Caymanian life — paintings, sculptures, contemporary local and international works. Annual cultural programming.',
      },
    ],
  },
];

// ── CULTURE : calendrier fourni par le client (CSV) ────────────────────────────
// season = fenetre de la saison ; period = ce qui s'y passe ; months = mois de charter
// conseilles ; vip = niveau VIP ; note = remarque commerciale.
// Ecarte du CSV : les lignes d'agregat / "regional planning bucket" (Lesser Antilles
// Aggregate, Greater Antilles Aggregate, Windward Islands, Leeward Islands, Dutch
// Caribbean, French Caribbean) et les doublons (Southern Grenadines = Grenadines,
// Saint Eustatius = St Eustatius) — ce ne sont pas des destinations.
export const CULTURE = [
  { name: 'Cuba', sub: 'greater-antilles', season: 'Jul-Aug', period: 'Carnival season', months: 'Jul-Aug', vip: 'High', note: 'Strong cultural immersion' },
  { name: 'Jamaica', sub: 'greater-antilles', season: 'Jul-Aug', period: 'Reggae / jerk / music events', months: 'Jul-Aug', vip: 'High', note: 'Excellent for music and gastronomy' },
  { name: 'Puerto Rico', sub: 'greater-antilles', season: 'Feb-Aug', period: 'Carnival / Campechada / summer cultural events', months: 'Feb-Aug', vip: 'High', note: 'Strong for private guides and air access' },
  { name: 'Dominican Republic', sub: 'greater-antilles', season: 'Feb-Aug', period: 'Carnival / merengue / summer festivals', months: 'Feb-Aug', vip: 'High', note: 'Very broad luxury and cultural product' },
  { name: 'Santo Domingo', sub: 'greater-antilles', season: 'Feb-Aug', period: 'Carnival / colonial heritage', months: 'Feb-Aug', vip: 'High', note: 'Use as cultural gateway' },
  { name: 'Haiti', sub: 'greater-antilles', season: 'Feb-Mar', period: 'Carnaval and cultural heritage season', months: 'Feb-Mar', vip: 'Medium', note: 'Use with specialized security planning' },
  { name: 'Isla de Vieques', sub: 'greater-antilles', season: 'Dec-Apr', period: 'Bioluminescence and beach season', months: 'Dec-Apr', vip: 'High', note: 'Great for yacht + private beach dinners' },
  { name: 'Isla de Culebra', sub: 'greater-antilles', season: 'Dec-Apr', period: 'Beach and marine season', months: 'Dec-Apr', vip: 'Medium', note: 'Quiet, yacht-friendly, limited infrastructure' },

  { name: 'Saint Barths', sub: 'leeward-islands', season: 'Mar', period: 'Bucket/regatta / elite yachting season', months: 'Mar', vip: 'Very High', note: 'Premier ultra-luxury charter island' },
  { name: 'Anguilla', sub: 'leeward-islands', season: 'Dec-Apr', period: 'Beaches, culinary events, discreet luxury', months: 'Jan-Apr', vip: 'High', note: 'Yacht-friendly, villas, private beaches' },
  { name: 'St Martin', sub: 'leeward-islands', season: 'Dec-Apr', period: 'Culinary and beach-season events', months: 'Dec-Apr', vip: 'High', note: 'Excellent villa and dining scene' },
  { name: 'Antigua', sub: 'leeward-islands', season: 'Apr-May', period: 'Sailing / regatta window', months: 'Apr-May', vip: 'High', note: 'Excellent for yacht charters and English Harbour' },
  { name: 'Saint Kitts', sub: 'leeward-islands', season: 'Dec-Apr', period: 'Music, heritage, and sailing season', months: 'Dec-Apr', vip: 'High', note: 'Good for culture + yachting' },
  { name: 'Nevis', sub: 'leeward-islands', season: 'Dec-Apr', period: 'Boutique cultural and plantation season', months: 'Dec-Apr', vip: 'High', note: 'Small luxury island' },
  { name: 'Saba', sub: 'leeward-islands', season: 'Dec-Apr', period: 'Eco-luxury, hiking, dive season', months: 'Dec-Apr', vip: 'Medium', note: 'Small-scale, private, quiet' },
  { name: 'St Eustatius', sub: 'leeward-islands', season: 'Dec-Apr', period: 'Heritage and dive season', months: 'Dec-Apr', vip: 'Medium', note: 'Great for expedition-style charters' },
  { name: 'Montserrat', sub: 'leeward-islands', season: 'Nov-Apr', period: 'Heritage and volcano-focused cultural events', months: 'Nov-Apr', vip: 'Medium', note: 'Best for niche expedition charters' },
  { name: 'Guadeloupe', sub: 'leeward-islands', season: 'Jan-Mar', period: 'Carnaval de Guadeloupe', months: 'Jan-Mar', vip: 'High', note: 'Major French-Caribbean carnival draw' },
  { name: 'Marie-Galante', sub: 'leeward-islands', season: 'Jan-Mar', period: 'Carnival / heritage season', months: 'Jan-Mar', vip: 'Medium', note: 'French Caribbean add-on' },

  { name: 'British Virgin Islands', sub: 'leeward-antilles', season: 'Dec-Apr', period: 'Yacht season / island events', months: 'Dec-Apr', vip: 'Very High', note: 'Classic superyacht destination' },
  { name: 'Tortola', sub: 'leeward-antilles', season: 'Dec-Apr', period: 'Yacht season and island events', months: 'Dec-Apr', vip: 'Very High', note: 'Key BVI hub' },
  { name: 'Virgin Gorda', sub: 'leeward-antilles', season: 'Dec-Apr', period: 'Sailing and beach season', months: 'Dec-Apr', vip: 'Very High', note: 'Iconic BVI luxury stop' },
  { name: 'Jost Van Dyke', sub: 'leeward-antilles', season: 'Dec-Apr', period: 'Beach bars, regatta season', months: 'Dec-Apr', vip: 'High', note: 'Classic charter stop in BVI' },
  { name: 'US Virgin Islands', sub: 'leeward-antilles', season: 'Dec-Apr', period: 'Yacht season / cultural events', months: 'Dec-Apr', vip: 'High', note: 'Excellent charter logistics' },
  { name: 'Aruba', sub: 'leeward-antilles', season: 'Jan-Apr', period: 'Island-wide cultural events', months: 'Jan-Apr', vip: 'High', note: 'Reliable premium infrastructure' },
  { name: 'Bonaire', sub: 'leeward-antilles', season: 'Jan-Apr', period: 'Dive and eco events', months: 'Jan-Apr', vip: 'High', note: 'Best for diving and eco-luxury' },
  { name: 'Curaçao', sub: 'leeward-antilles', season: 'Feb-Mar', period: 'Carnival', months: 'Feb-Mar', vip: 'High', note: 'Best paired with resort stays' },

  { name: 'Martinique', sub: 'windward-islands', season: 'Feb-Mar', period: 'Carnaval de Martinique', months: 'Feb-Mar', vip: 'Very High', note: 'One of the strongest carnival islands' },
  { name: 'Saint Lucia', sub: 'windward-islands', season: 'Jun-Aug', period: 'Jazz and cultural season', months: 'Jun-Aug', vip: 'High', note: 'Strong wellness and scenic luxury' },
  { name: 'Dominica', sub: 'windward-islands', season: 'Oct-Apr', period: 'Nature and Creole culture events', months: 'Oct-Apr', vip: 'Medium', note: 'Best as eco-luxury extension' },
  { name: 'Barbados', sub: 'windward-islands', season: 'Oct-Nov', period: 'Crop Over / Grand Kadooment', months: 'Oct-Nov', vip: 'High', note: 'Strong luxury hospitality' },
  { name: 'Grenada', sub: 'windward-islands', season: 'Aug-Oct', period: 'Spice and heritage festivals', months: 'Aug-Oct', vip: 'High', note: 'Good for culture + yacht' },
  { name: 'Carriacou', sub: 'windward-islands', season: 'Dec-Apr', period: 'Grenadines sailing season', months: 'Dec-Apr', vip: 'Medium', note: 'Strong for yachting stopovers' },
  { name: 'St Vincent and the Grenadines', sub: 'windward-islands', season: 'Dec-Apr', period: 'Grenadines cruising and cultural events', months: 'Dec-Apr', vip: 'High', note: 'Strong sailing and island-hopping' },
  { name: 'The Grenadines', sub: 'windward-islands', season: 'Dec-Apr', period: 'Sailing and secluded cove season', months: 'Dec-Apr', vip: 'Very High', note: 'Excellent for ultra-luxury multi-island routes' },
  { name: 'Mustique', sub: 'windward-islands', season: 'Dec-Apr', period: 'Private social season', months: 'Dec-Apr', vip: 'Very High', note: 'Ultra-private, access-controlled' },

  { name: 'Turks and Caicos', sub: 'turks-caicos', season: 'Dec-Apr', period: 'Beach and resort season', months: 'Dec-Apr', vip: 'High', note: 'Very strong luxury beach market' },
  { name: 'Providenciales', sub: 'turks-caicos', season: 'Dec-Apr', period: 'Luxury beach season', months: 'Dec-Apr', vip: 'High', note: 'Core Turks and Caicos charter base' },
  { name: 'Grand Turk', sub: 'turks-caicos', season: 'Dec-Apr', period: 'Beach and cruise season', months: 'Dec-Apr', vip: 'High', note: 'Strong access point in TCI' },
  { name: 'South Caicos', sub: 'turks-caicos', season: 'Dec-Apr', period: 'Fishing and eco season', months: 'Dec-Apr', vip: 'Medium', note: 'Good for boutique charter' },
  { name: 'North Caicos', sub: 'turks-caicos', season: 'Dec-Apr', period: 'Eco and wetland season', months: 'Dec-Apr', vip: 'Medium', note: 'Best for nature clients' },
  { name: 'Middle Caicos', sub: 'turks-caicos', season: 'Dec-Apr', period: 'Nature and cave season', months: 'Dec-Apr', vip: 'Medium', note: 'Quiet luxury extension' },

  { name: 'Trinidad and Tobago', sub: 'trinidad-tobago', season: 'Feb-Mar', period: 'Carnival', months: 'Feb-Mar', vip: 'Very High', note: 'One of the strongest Caribbean carnivals' },
  { name: 'Tobago', sub: 'trinidad-tobago', season: 'Jun-Aug', period: 'Heritage and sports festivals', months: 'Jun-Aug', vip: 'Medium', note: 'Good for culture and nature' },

  { name: 'Cayman Islands', sub: 'grand-cayman', season: 'Jan-Apr', period: 'Luxury festivals and marine events', months: 'Jan-Apr', vip: 'High', note: 'Very strong premium travel market' },
  { name: 'Grand Cayman', sub: 'grand-cayman', season: 'Dec-Apr', period: 'Luxury finance and beach season', months: 'Dec-Apr', vip: 'Very High', note: 'Main Cayman luxury base' },
  { name: 'Cayman Brac', sub: 'grand-cayman', season: 'Dec-Apr', period: 'Dive and bluff-season', months: 'Dec-Apr', vip: 'Medium', note: 'Excellent for adventure and diving' },
  { name: 'Little Cayman', sub: 'grand-cayman', season: 'Dec-Apr', period: 'Dive and booby pond season', months: 'Dec-Apr', vip: 'Medium', note: 'Tiny, exclusive, nature-heavy' },

  { name: 'Barbuda', sub: 'emerging-destinations', season: 'Dec-Apr', period: 'Seclusion and beach events', months: 'Dec-Apr', vip: 'High', note: 'Private beach clubs and ultra-discreet charters' },
  { name: 'Petite Martinique', sub: 'emerging-destinations', season: 'Dry season', period: 'Grenadines cultural stopovers', months: 'Dry season', vip: 'Medium', note: 'Best as an exclusive yacht add-on' },
  { name: 'Redonda', sub: 'emerging-destinations', season: 'Dry season', period: 'Conservation / expedition access only', months: 'Dry season', vip: 'Low', note: 'No standard public events' },
  { name: 'Aves Island', sub: 'emerging-destinations', season: 'Dry season', period: 'Permit-based nature access', months: 'Dry season', vip: 'Low', note: 'Special access only' },
  { name: 'Sombrero Island', sub: 'emerging-destinations', season: 'Dry season', period: 'Permit-only access', months: 'Dry season', vip: 'Low', note: 'No standard cultural calendar' },
  { name: 'Treasure Cay / Abaco', sub: 'emerging-destinations', season: 'Dec-Apr', period: 'Sailing and beach season', months: 'Dec-Apr', vip: 'High', note: 'Bahamas extension for charter' },
  { name: 'Isla Mujeres', sub: 'emerging-destinations', season: 'Dec-Apr', period: 'Beach and resort events', months: 'Dec-Apr', vip: 'High', note: 'Strong charter add-on to Mexico / Yucatán' },
  { name: 'San Andrés', sub: 'emerging-destinations', season: 'Dec-Apr', period: 'Beach and island culture', months: 'Dec-Apr', vip: 'High', note: 'Can fit into Caribbean charter style' },
];

export const SECTIONS = {
  art: {
    title: 'Art',
    eyebrow: 'Caribbean · Museums, Galleries & Exhibitions',
    img: '/images/art-culture/kid-having-fun-jungle-party.jpg',
  },
  culture: {
    title: 'Culture',
    eyebrow: 'Caribbean · Carnivals, Festivals & Seasons',
    img: '/images/destinations/the Windward Islands-original.jpg',
  },
};

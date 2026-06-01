// Configs partagées pour les 7 pages de sous-régions Caraïbes.
// Chaque entrée définit le contenu spécifique (hero, îles, texte) que
// SubregionClient consomme. Modifier le rendu UI = éditer SubregionClient.

export const CARIBBEAN_SUBREGIONS = {
  'greater-antilles': {
    name: 'Greater Antilles',
    heroImage: '/images/destinations/greater antillesNB.jpg',
    heroImageOriginal: '/images/destinations/gretar antilles-original.jpg',
    topIslands: ['Cuba', 'Puerto Rico', 'Jamaica', 'Cayman Islands'],
    subTitle: 'Where Culture Meets Adventure',
    intro: "The Greater Antilles—home to Cuba, Puerto Rico, Jamaica, and the Cayman Islands—stand as the Caribbean's premier yachting destination.",
    extraParagraphs: [
      { text: 'This archipelago offers an unmatched blend of rich cultural heritage and breathtaking natural beauty, making it the ideal setting for a luxury yacht charter experience.' },
      { heading: 'A Journey Through History and Tradition', text: "From Cuba's iconic colonial ruins and legendary cigar lounges to Puerto Rico's vibrant fusion of Spanish and Caribbean influences, every port delivers a unique, immersive cultural experience." },
      { heading: 'Unparalleled Natural Wonders', text: "The Greater Antilles also boast some of the world's most stunning natural attractions: the second-largest coral reef system off Cuba's coast, Puerto Rico's pristine beaches and hidden islands, and Jamaica's mystical Blue Mountains and bioluminescent bays. These landscapes create the perfect backdrop for an unforgettable adventure." },
      { italic: true, text: "Ready to set sail for an experience beyond compare? Let's make it happen." },
    ],
  },
  'leeward-islands': {
    name: 'Leeward Islands',
    heroImage: '/images/pagesCaraibes/leeward_island.png',
    heroImageOriginal: '/images/destinations/Leeward Islands-original.jpg',
    topIslands: ['Anguilla', 'St Martin', 'St Barths', 'Antigua', 'St Kitts'],
    subTitle: 'Tropical Elegance and Pristine Anchorages',
    intro: 'The Leeward Islands stretch from Anguilla to Guadeloupe, offering some of the most refined yachting waters in the Caribbean — from the celebrity glamour of St Barths to the tranquil bays of Antigua.',
    extraParagraphs: [
      { text: 'Every island has its own character: the sophisticated nightlife of St Martin, the regatta heritage of Antigua, the pristine beaches of St Kitts and Nevis.' },
      { heading: 'A Sailor\'s Playground', text: 'Steady trade winds, sheltered coves and short passages between islands make the Leewards a natural choice for both relaxed cruises and demanding regattas. World-class marinas welcome the largest superyachts year-round.' },
      { heading: 'Refined Onshore Experiences', text: 'Michelin-level dining, designer boutiques, secluded beach clubs and luxury wellness retreats line each anchorage. The Leeward Islands set the standard for understated Caribbean elegance.' },
      { italic: true, text: 'Discover why discerning yacht charterers return to the Leewards year after year.' },
    ],
  },
  'leeward-antilles': {
    name: 'Leeward Antilles',
    heroImage: '/images/pagesCaraibes/leeward_antilles.png',
    heroImageOriginal: '/images/destinations/The Leeward Antilles-original.jpg',
    topIslands: ['Aruba', 'Bonaire', 'Curaçao'],
    subTitle: 'The ABC Islands — Diving, Heritage and Calm Waters',
    intro: 'Aruba, Bonaire and Curaçao — the ABC Islands — sit just off the coast of Venezuela, sheltered from the hurricane belt and known worldwide for their pristine reefs and Dutch colonial heritage.',
    extraParagraphs: [
      { text: 'Outside the main hurricane corridor, the ABC Islands offer reliable year-round chartering with calm seas and steady breezes.' },
      { heading: 'World-Class Diving and Snorkelling', text: "Bonaire's marine park is a global benchmark for shore diving, with healthy reefs accessible mere metres from the beach. Curaçao adds dramatic wall dives, while Aruba's wrecks attract experienced divers." },
      { heading: 'Colonial Charm and Vibrant Culture', text: "Willemstad's UNESCO-listed waterfront, Oranjestad's pastel facades and the lively local cuisine combine European refinement with Caribbean warmth." },
      { italic: true, text: 'A serene alternative for those seeking quieter Caribbean waters with depth and history.' },
    ],
  },
  'windward-islands': {
    name: 'Windward Islands',
    heroImage: '/images/pagesCaraibes/windward_island.png',
    heroImageOriginal: '/images/destinations/the Windward Islands-original.jpg',
    topIslands: ['Dominica', 'Martinique', 'St Lucia', 'St Vincent', 'Grenadines'],
    subTitle: 'Lush Landscapes and the Grenadines',
    intro: 'From the volcanic peaks of Dominica to the secluded anchorages of the Tobago Cays, the Windward Islands offer the most dramatic and unspoilt yachting in the Eastern Caribbean.',
    extraParagraphs: [
      { text: 'Dense rainforest, dormant volcanoes, hidden waterfalls and uninhabited islets — the Windwards reward charters who want adventure as much as relaxation.' },
      { heading: 'The Legendary Grenadines', text: 'Mustique, Bequia, Canouan, Mayreau and the Tobago Cays form a yachting paradise of turquoise lagoons and powder-white sand bars. Anchor between palm-fringed islets and snorkel directly off the swim platform.' },
      { heading: 'St Lucia and Martinique', text: "St Lucia's iconic Pitons and Martinique's French gastronomy bookend the chain with cultural and visual highlights you'll find nowhere else." },
      { italic: true, text: 'The Windwards remain the ultimate sailing destination for those chasing untamed beauty.' },
    ],
  },
  'turks-caicos': {
    name: 'Turks & Caicos',
    heroImage: '/images/pagesCaraibes/turks_caicos.png',
    heroImageOriginal: '/images/destinations/Turks and Caicos-original.jpg',
    topIslands: ['Providenciales', 'Grand Turk', 'South Caicos', 'West Caicos'],
    subTitle: 'Crystal Waters and the World\'s Best Beaches',
    intro: 'Turks & Caicos is a constellation of 40 islands and cays surrounded by the third-largest barrier reef on the planet — and home to Grace Bay, consistently ranked the world\'s finest beach.',
    extraParagraphs: [
      { text: 'Calm shallow waters, world-class diving and a discreet ultra-luxury hospitality scene make Turks & Caicos a favourite among private yacht owners.' },
      { heading: 'Diving the Wall', text: "The Turks & Caicos wall plunges from shallow reef to 7,000+ feet, offering some of the Caribbean's most thrilling drift dives. Migrating humpback whales pass through from January to April." },
      { heading: 'Secluded Cays and Quiet Anchorages', text: 'Beyond Providenciales, dozens of uninhabited cays offer perfect anchorages — Pine Cay, Parrot Cay and Salt Cay deliver privacy at the highest level.' },
      { italic: true, text: 'When discretion and beauty matter equally, Turks & Caicos delivers.' },
    ],
  },
  'trinidad-tobago': {
    name: 'Trinidad & Tobago',
    heroImage: '/images/pagesCaraibes/unnamed.jpg',
    heroImageOriginal: '/images/destinations/Trinidad and Tobago-original.jpg',
    topIslands: ['Trinidad', 'Tobago'],
    subTitle: 'Carnival Spirit and Rainforest Wilderness',
    intro: 'Trinidad & Tobago combines the vibrant pulse of the Caribbean\'s most famous Carnival with the untouched wilderness of the oldest protected rainforest in the western hemisphere.',
    extraParagraphs: [
      { text: 'A yacht charter here unlocks two contrasting worlds — Trinidad\'s industrious energy and Tobago\'s laid-back beach culture, all within a short crossing.' },
      { heading: 'World-Class Birdwatching and Diving', text: "Tobago's Buccoo Reef and Pigeon Point shelter rare species and pristine corals, while inland the Asa Wright Nature Centre attracts ornithologists from across the globe." },
      { heading: 'A Carnival Like No Other', text: 'For charters timed around Carnival (February–March), Trinidad becomes the cultural capital of the Caribbean — steel pan, calypso and soca on every corner.' },
      { italic: true, text: 'For an authentic, less-travelled Caribbean experience, look south.' },
    ],
  },
  'grand-cayman': {
    name: 'Grand Cayman',
    heroImage: '/images/pagesCaraibes/grand_cayman.png',
    heroImageOriginal: '/images/destinations/Cayman Islands-original.jpg',
    topIslands: ['Grand Cayman', 'Cayman Brac', 'Little Cayman'],
    subTitle: 'Stingrays, Sunken Wrecks and Seven Mile Beach',
    intro: 'The Cayman Islands sit south of Cuba in the Western Caribbean, famed for their crystal visibility, the iconic Stingray City sandbar and the elegant calm of Seven Mile Beach.',
    extraParagraphs: [
      { text: 'A discreet luxury destination, the Caymans deliver world-class dining, spa retreats and some of the safest, most regulated waters in the Caribbean for private yachting.' },
      { heading: 'The Drift Diver\'s Paradise', text: "Steep walls, the famous USS Kittiwake wreck and pristine reefs around Little Cayman's Bloody Bay attract divers from every continent." },
      { heading: 'Refined Onshore Living', text: 'George Town\'s polished restaurants, the discreet villas of Rum Point and the boutique resorts of Seven Mile Beach pair perfectly with crewed yacht charter itineraries.' },
      { italic: true, text: 'A destination where privacy, comfort and underwater beauty meet effortlessly.' },
    ],
  },
};

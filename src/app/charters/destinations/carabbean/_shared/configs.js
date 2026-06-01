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
    subTitle: 'A Premier Tropical Paradise',
    intro: 'Renowned as one of the most relaxed yet exclusive destinations in the Caribbean, the Leeward Islands in the Lesser Antilles offer a premier tropical paradise for luxury yacht charters.',
    extraParagraphs: [
      { text: 'From the glamorous shores of St. Barts to the untamed beauty of St. Kitts and Nevis, the natural splendor of Anguilla, and the world-famous honeymoon retreats of Antigua and Barbuda, the Leeward Islands deliver a multifaceted blue-water experience.' },
      { text: "Beyond pristine islands, turquoise waters, and secluded beaches—home to some of the planet's best diving and snorkeling spots—this region also boasts high-end boutique shopping, vibrant nightlife, and a rich tapestry of history and culture." },
      { italic: true, text: 'An unparalleled setting for sophisticated sailing adventures and unforgettable luxury escapes.' },
    ],
  },
  'leeward-antilles': {
    name: 'Leeward Antilles',
    heroImage: '/images/pagesCaraibes/leeward_antilles.png',
    heroImageOriginal: '/images/destinations/The Leeward Antilles-original.jpg',
    topIslands: ['Aruba', 'Bonaire', 'Curaçao'],
    subTitle: 'A Stunning Trio of Tropical Islands',
    intro: 'Located in the southern Caribbean, just off the coast of South America, the Leeward Antilles form a stunning trio of tropical islands: Aruba, Bonaire, and Curaçao. Each island offers a unique experience, making them ideal destinations for a luxury yacht charter.',
    extraParagraphs: [
      { heading: 'Aruba', text: 'Just 30 kilometers long and 9 kilometers wide, Aruba is easy to explore by sea. Drop anchor and discover rugged national parks, sea turtle nesting sites, jade-green waters, and the vibrant Dutch-inspired capital of Oranjestad.' },
      { heading: 'Bonaire', text: 'Bonaire is famous for its pastel landscapes and salt flats, home to graceful flamingos. The island is a paradise for nature lovers and divers seeking pristine underwater adventures.' },
      { heading: 'Curaçao', text: 'Curaçao charms visitors with its colorful, chocolate-box style, secluded beaches, and UNESCO-listed cities rich in history and culture. Its warm atmosphere and architectural heritage make it a must-visit for an unforgettable yacht journey.' },
    ],
  },
  'windward-islands': {
    name: 'Windward Islands',
    heroImage: '/images/pagesCaraibes/windward_island.png',
    heroImageOriginal: '/images/destinations/the Windward Islands-original.jpg',
    topIslands: ['Dominica', 'Martinique', 'St Lucia', 'St Vincent', 'Grenadines'],
    subTitle: "Caribbean's Premier Destination",
    intro: 'Nestled in the heart of the Lesser Antilles, the Windward Islands epitomize the ultimate Caribbean yachting experience. With their calm turquoise waters, palm-fringed white-sand beaches, and lush volcanic landscapes, these islands provide a breathtaking backdrop for luxury yacht charters.',
    extraParagraphs: [
      { text: 'World-class snorkeling and diving reveal vibrant coral reefs and exotic marine life, while secluded coves and dense tropical rainforests offer adventure and tranquility. The Windward Islands are a dream destination for discerning yacht charterers seeking exclusivity and refinement.' },
      { text: 'A rich Caribbean culture, delectable cuisine, and historic landmarks blend seamlessly with French sophistication, boutique hotels, and high-end resorts. Every detail is crafted to deliver a luxurious experience, combining local charm with international elegance.' },
      { italic: true, text: 'A paradise where excellence is the standard.' },
    ],
  },
  'turks-caicos': {
    name: 'Turks & Caicos',
    heroImage: '/images/pagesCaraibes/turks_caicos.png',
    heroImageOriginal: '/images/destinations/Turks and Caicos-original.jpg',
    topIslands: ['Providenciales', 'Grand Turk', 'South Caicos', 'West Caicos'],
    subTitle: 'Cays, Whales and Colonial Charm',
    intro: 'Just 200 miles of low-lying sand cays, humpback whale waters, and colonial charm make the southern Bahamian archipelago of Turks and Caicos an unparalleled destination. Chartering a yacht here offers clients an exclusive escape into a world far removed from the ordinary. There\'s a certain allure to the jungle-covered ruins, the parrot-filled cays, and the mirage-like beaches that make the name Turks and Caicos roll off the tongue with a sense of wonder.',
    extraParagraphs: [
      { text: 'The numbers alone are impressive: a short hop from Miami, 40 distinct cays strung like pearls across gentle blue waters, and the third-largest coral reef system on the planet. Yet, despite these staggering credentials, Turks and Caicos remains refreshingly off the mass tourism radar. And that\'s precisely the appeal—from the bold dive sites of West Caicos to the juice cocktails of Providenciales, here\'s how to charter a luxury yacht experience in Turks and Caicos.' },
      { heading: 'Why Charter a Yacht?', text: 'A private yacht charter in Turks and Caicos isn\'t just about travel—it\'s about crafting an unforgettable journey. Whether you\'re exploring secluded dive spots, indulging in world-class cuisine onboard, or sipping sunset cocktails on pristine beaches, every moment is tailored to perfection. This is where luxury meets adventure, and exclusivity is the standard.' },
      { italic: true, text: 'Ready to elevate your next getaway? Here\'s how to charter the ultimate Turks and Caicos experience.' },
    ],
  },
  'trinidad-tobago': {
    name: 'Trinidad & Tobago',
    heroImage: '/images/pagesCaraibes/unnamed.jpg',
    heroImageOriginal: '/images/destinations/Trinidad and Tobago-original.jpg',
    topIslands: ['Trinidad', 'Tobago'],
    subTitle: 'The Best of the Southern Caribbean',
    intro: 'Experience the ultimate in luxury with a yacht charter in Trinidad and Tobago, a premier destination in the Southern Caribbean. Whether you\'re seeking lively entertainment, juice cocktails, stargazing on deck, hidden beaches, or natural wonders, these twin islands offer an unforgettable yachting experience.',
    extraParagraphs: [
      { text: 'With a rich history, welcoming locals, stunning cruising grounds, abundant marine life, and world-class diving sites, Trinidad and Tobago is an ideal choice for a Caribbean yacht charter. Add in the perfect climate, vibrant culture, and delicious cuisine, and it\'s easy to see why charter experts highly recommend this breathtaking corner of the world.' },
    ],
  },
  'grand-cayman': {
    name: 'Grand Cayman',
    heroImage: '/images/pagesCaraibes/grand_cayman.png',
    heroImageOriginal: '/images/destinations/Cayman Islands-original.jpg',
    topIslands: ['Grand Cayman', 'Cayman Brac', 'Little Cayman'],
    subTitle: 'A Premier Destination for Private Yacht Charters',
    intro: 'Nestled in the heart of the Caribbean between Cuba and Jamaica, the Cayman Islands stand as a premier destination for private yacht charters. With their crystal-clear waters, pristine coral reefs, and unparalleled marine life, the islands offer an idyllic setting for bespoke luxury vacations at sea.',
    extraParagraphs: [
      { text: 'The archipelago—comprising Grand Cayman, Cayman Brac, and Little Cayman—attracts discerning yachtsmen with its unique blend of natural wonders and world-class amenities. Picture yourself cruising in gentle breezes, swimming alongside the iconic Cayman stingrays, exploring legendary shipwrecks, or anchoring off some of the world\'s most breathtaking white-sand beaches.' },
      { italic: true, text: "Whether you're drawn to the vibrant sophistication of Georgetown on Grand Cayman, the untouched beauty of Little Cayman, or the dramatic landscapes of Cayman Brac, this guide is your gateway to an unforgettable yacht charter experience, where every detail is tailored to your desires and comfort." },
    ],
  },
};

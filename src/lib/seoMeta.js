// src/lib/seoMeta.js — Titres et descriptions Google (SEO etape 3, client 2026-11-01).
// Pages qui n'avaient ni titre ni description propres (elles affichaient ceux par defaut
// du site). Textes en anglais americain business, soumis au client avant publication.
// Une page qui avait deja un titre le garde : seule sa description est ajoutee ici
// (`description` seule, sans `title`).

const SEO = {
  '/': {
    title: 'Luxury Yacht Charters & Yacht Sales | Qualityacht',
    description: 'Private luxury yacht charters, yacht sales and yacht management worldwide. Curated yachts in the Caribbean, the Bahamas, North America and beyond.',
  },
  '/airport': {
    title: 'Airports Near Your Yacht Charter | Qualityacht',
    description: 'Find the airports closest to your yacht charter destination, from the Caribbean and the Bahamas to the Mediterranean, with the jet sizes each one accepts.',
  },
  '/charters': {
    title: 'Yacht Charter Options | Qualityacht',
    description: 'Day charters, last-minute departures, couples, groups, pet-friendly, accessible and sports yacht charters. Find the private charter that fits your trip.',
  },
  '/charters/accessible': {
    title: 'Accessible Yacht Charters | Qualityacht',
    description: 'Accessible private yacht charters for guests with reduced mobility or specific needs, in the Caribbean, the Bahamas and North America.',
  },
  '/charters/accessible/bahamas': {
    title: 'Accessible Yacht Charters in the Bahamas | Qualityacht',
    description: 'Accessible yacht charters in the Bahamas: yachts suited to guests with specific needs, matched to the level of assistance each guest requires.',
  },
  '/charters/accessible/bahamas/yacht': {
    title: 'Accessible Yachts in the Bahamas | Qualityacht',
    description: 'Browse the accessible yachts available for charter in the Bahamas and request a quote for your dates.',
  },
  '/charters/accessible/caribbean': {
    title: 'Accessible Yacht Charters in the Caribbean | Qualityacht',
    description: 'Accessible yacht charters in the Caribbean: yachts suited to guests with specific needs, matched to the level of assistance each guest requires.',
  },
  '/charters/accessible/caribbean/yacht': {
    title: 'Accessible Yachts in the Caribbean | Qualityacht',
    description: 'Browse the accessible yachts available for charter in the Caribbean and request a quote for your dates.',
  },
  '/charters/accessible/north-america': {
    title: 'Accessible Yacht Charters in North America | Qualityacht',
    description: 'Accessible yacht charters in North America: yachts suited to guests with specific needs, matched to the level of assistance each guest requires.',
  },
  '/charters/accessible/north-america/yacht': {
    title: 'Accessible Yachts in North America | Qualityacht',
    description: 'Browse the accessible yachts available for charter in North America and request a quote for your dates.',
  },
  '/charters/carribbean': {
    title: 'Caribbean Yacht Charters | Qualityacht',
    description: 'Private yacht charters across the Caribbean: islands, itineraries and yachts selected by Qualityacht, from the Leeward Islands to Grand Cayman.',
  },
  '/charters/day-charter/bahamas': {
    title: 'Day Yacht Charters in the Bahamas | Qualityacht',
    description: 'Private day yacht charters in the Bahamas, from Nassau and Paradise Island to the Exumas. Choose your island group and the yacht for your day at sea.',
  },
  '/charters/day-charter/north-america': {
    description: 'Private day yacht charters in North America, from the East Coast and West Coast of the United States to Canada and Mexico.',
  },
  '/charters/destinations/africa': {
    title: 'Yacht Charters in Africa | Qualityacht',
    description: 'Browse the private yachts available for charter in Africa and request a quote for your dates.',
  },
  '/charters/destinations/antarctica': {
    description: 'Yacht charters to Antarctica. Browse the yachts available and request a quote for your voyage.',
  },
  '/charters/destinations/arctic': {
    title: 'Yacht Charters in the Arctic | Qualityacht',
    description: 'Browse the private yachts available for charter in the Arctic and request a quote for your dates.',
  },
  '/charters/destinations/arctic-northern-europe': {
    title: 'Yacht Charters in Northern Europe | Qualityacht',
    description: 'Browse the private yachts available for charter in Northern Europe and the Arctic and request a quote for your dates.',
  },
  '/charters/destinations/bahamas': {
    title: 'Bahamas Yacht Charters | Qualityacht',
    description: 'Private yacht charters in the Bahamas: Nassau, the Exumas, the Abacos, Eleuthera and more. Explore the islands and the yachts available.',
  },
  '/charters/destinations/carabbean/greater-antilles-v11': {
    title: 'Greater Antilles Yacht Charters | Qualityacht',
    description: 'Private yacht charters in the Greater Antilles: Cuba, Hispaniola, Jamaica and Puerto Rico. Browse the yachts available in the region.',
  },
  '/charters/destinations/carabbean/leeward-islands-v11': {
    title: 'Leeward Islands Yacht Charters | Qualityacht',
    description: 'Private yacht charters in the Leeward Islands: St. Barths, St. Martin, Anguilla, Antigua and more. Browse the yachts available in the region.',
  },
  '/charters/destinations/carabbean/leeward-antilles-v11': {
    title: 'Leeward Antilles Yacht Charters | Qualityacht',
    description: 'Private yacht charters in the Leeward Antilles: Aruba, Bonaire, Curaçao and the Virgin Islands. Browse the yachts available in the region.',
  },
  '/charters/destinations/carabbean/windward-islands-v11': {
    title: 'Windward Islands Yacht Charters | Qualityacht',
    description: 'Private yacht charters in the Windward Islands: Martinique, St. Lucia, the Grenadines and Grenada. Browse the yachts available in the region.',
  },
  '/charters/destinations/carabbean/turks-caicos-v11': {
    title: 'Turks & Caicos Yacht Charters | Qualityacht',
    description: 'Private yacht charters in Turks & Caicos. Browse the yachts available and request a quote for your dates.',
  },
  '/charters/destinations/carabbean/trinidad-tobago-v11': {
    title: 'Trinidad & Tobago Yacht Charters | Qualityacht',
    description: 'Private yacht charters in Trinidad & Tobago. Browse the yachts available and request a quote for your dates.',
  },
  '/charters/destinations/carabbean/grand-cayman-v11': {
    title: 'Grand Cayman Yacht Charters | Qualityacht',
    description: 'Private yacht charters in Grand Cayman and the Cayman Islands. Browse the yachts available and request a quote for your dates.',
  },
  '/charters/destinations/carabbean/emerging-destinations-v11': {
    title: 'Emerging Caribbean Destinations | Qualityacht',
    description: 'Private yacht charters to the Caribbean’s emerging destinations. Browse the yachts available and request a quote for your dates.',
  },
  '/charters/destinations/caribbean-v15/exploreyacht': {
    title: 'Caribbean Yacht Fleet | Qualityacht',
    description: 'Explore the private yachts available for charter in the Caribbean, with specifications, photos and rates, and request a quote.',
  },
  '/charters/destinations/central-america': {
    title: 'Yacht Charters in Central America | Qualityacht',
    description: 'Browse the private yachts available for charter in Central America and request a quote for your dates.',
  },
  '/charters/destinations/east-asia': {
    title: 'Yacht Charters in East Asia | Qualityacht',
    description: 'Browse the private yachts available for charter in East Asia and request a quote for your dates.',
  },
  '/charters/destinations/eastern-mediterranean': {
    title: 'Eastern Mediterranean Yacht Charters | Qualityacht',
    description: 'Browse the private yachts available for charter in the Eastern Mediterranean and request a quote for your dates.',
  },
  '/charters/destinations/greater-antilles': {
    title: 'Yacht Charters in the Greater Antilles | Qualityacht',
    description: 'Browse the private yachts available for charter in the Greater Antilles and request a quote for your dates.',
  },
  '/charters/destinations/indian-ocean': {
    title: 'Yacht Charters in the Indian Ocean | Qualityacht',
    description: 'Browse the private yachts available for charter in the Indian Ocean and request a quote for your dates.',
  },
  '/charters/destinations/indonesia': {
    title: 'Yacht Charters in Indonesia | Qualityacht',
    description: 'Browse the private yachts available for charter in Indonesia and request a quote for your dates.',
  },
  '/charters/destinations/north-america': {
    description: 'Private yacht charters in North America: the East Coast and West Coast of the United States, Canada and Mexico. Explore the regions and the yachts available.',
  },
  '/charters/destinations/oceania': {
    title: 'Yacht Charters in Oceania | Qualityacht',
    description: 'Browse the private yachts available for charter in Oceania and request a quote for your dates.',
  },
  '/charters/destinations/oman-gulf': {
    title: 'Yacht Charters in the Gulf of Oman | Qualityacht',
    description: 'Browse the private yachts available for charter in the Gulf of Oman and request a quote for your dates.',
  },
  '/charters/destinations/pacific-ocean': {
    title: 'Yacht Charters in the Pacific Ocean | Qualityacht',
    description: 'Browse the private yachts available for charter in the Pacific Ocean and request a quote for your dates.',
  },
  '/charters/destinations/south-east-asia': {
    title: 'Yacht Charters in Southeast Asia | Qualityacht',
    description: 'Browse the private yachts available for charter in Southeast Asia and request a quote for your dates.',
  },
  '/charters/destinations/western-mediterranean': {
    title: 'Western Mediterranean Yacht Charters | Qualityacht',
    description: 'Browse the private yachts available for charter in the Western Mediterranean and request a quote for your dates.',
  },
  '/charters/group': {
    title: 'Group Yacht Charters | Qualityacht',
    description: 'Private group yacht charters for families, friends and corporate parties, with the whole group aboard one yacht. Choose your destination.',
  },
  '/charters/last-minute': {
    title: 'Last-Minute Yacht Charters | Qualityacht',
    description: 'Last-minute private yacht charters with immediate departures. Choose your destination and see the yachts available now.',
  },
  '/charters/last-minute/bahamas': {
    description: 'Last-minute private yacht charters in the Bahamas. Choose your island group and see the yachts available for immediate departure.',
  },
  '/charters/only-couple': {
    title: 'Yacht Charters for Couples | Qualityacht',
    description: 'Private yacht charters designed for couples: honeymoons, anniversaries and getaways for two. Choose your destination.',
  },
  '/charters/only-couple/bahamas': {
    description: 'Private yacht charters for couples in the Bahamas. Choose your island group and the yacht for your getaway for two.',
  },
  '/charters/only-couple/carribbean': {
    title: 'Caribbean Yacht Charters for Couples | Qualityacht',
    description: 'Private yacht charters for couples in the Caribbean. Choose your islands and the yacht for your getaway for two.',
  },
  '/charters/pet-friendly': {
    title: 'Pet-Friendly Yacht Charters | Qualityacht',
    description: 'Pet-friendly private yacht charters: bring your pet aboard. Choose your destination and the yachts that welcome pets.',
  },
  '/charters/pet-friendly/bahamas': {
    description: 'Pet-friendly yacht charters in the Bahamas: bring your pet aboard. Choose your island group and the yachts that welcome pets.',
  },
  '/charters/pet-friendly/carribbean': {
    title: 'Pet-Friendly Caribbean Yacht Charters | Qualityacht',
    description: 'Pet-friendly yacht charters in the Caribbean: bring your pet aboard. Choose your islands and the yachts that welcome pets.',
  },
  '/charters/sports': {
    title: 'Sports Yacht Charters | Qualityacht',
    description: 'Sports yacht charters: fast cruising, tenders and watersports. Choose your destination and the yachts suited to an active charter.',
  },
  '/charters/sports/bahamas/fleet': {
    description: 'Browse the yachts available for sports charters in the Bahamas and request a quote for your dates.',
  },
  '/charters/sports/carribbean/fleet': {
    description: 'Browse the yachts available for sports charters in the Caribbean and request a quote for your dates.',
  },
  '/events/bahamas': {
    description: 'Cultural and nautical events in the Bahamas: Junkanoo, regattas, festivals and more. Plan a private yacht charter around the dates.',
  },
  '/events/north-america': {
    description: 'Cultural and nautical events in North America: carnivals, regattas, heritage celebrations and music. Plan a private yacht charter around the dates.',
  },
  '/management': {
    title: 'International Yacht Management | Qualityacht',
    description: 'International yacht management: berth and port management, shipyard planning, maintenance coordination and seasonal preservation.',
  },
  '/only-for-you': {
    title: 'Sailing Yacht Charters: Only for You | Qualityacht',
    description: 'Classic sailing yachts, catamarans, trimarans, sport classics, traditional sailboats and regattas. Choose the sailing charter that suits you.',
  },
  '/only-for-you/caribbean': {
    description: 'Sailing yacht charters in the Caribbean: classic yachts, catamarans, trimarans, traditional sailboats and regattas.',
  },
  '/privat-jet': {
    title: 'Private Jet Access to Your Yacht | Qualityacht',
    description: 'Private jet access to your yacht charter destination: airports and jet sizes accepted in each region, from the Caribbean to the Mediterranean.',
  },
  '/request-quote': {
    title: 'Request a Yacht Charter Quote | Qualityacht',
    description: 'Tell us your dates, destination and party size, and Qualityacht will propose the private yachts that fit your charter.',
  },
  '/request-quote-test-v10': {
    title: 'Request a Charter Quote | Qualityacht',
    description: 'Request a private yacht charter quote: share your dates, destination and party size, and we will propose the yachts that fit.',
  },
  '/sales': {
    title: 'Yachts for Sale | Qualityacht',
    description: 'Motor yachts, sailing yachts and water toys for sale. Browse the selection and contact Qualityacht for your purchase.',
  },
  '/yachts': {
    title: 'Luxury Yachts for Charter | Qualityacht',
    description: 'Browse the private luxury yachts available for charter with Qualityacht, with specifications, photos and rates by destination.',
  },
};

/** Metadonnees d'une page ({ title?, description }). */
export function seo(path) {
  return SEO[path] || {};
}

export default SEO;

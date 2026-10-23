// Donnees de /art-culture/north-america (client 2026-10-23), calquees sur /art-culture/bahamas.
//  - SUBREGIONS : les 20 sous-regions (East Coast US, West Coast US, Canada, Mexico).
//  - CULTURE : fichier client « America_Culture_Season_Charter_Cards » : une carte par
//              sous-region (niveau VIP, theme, saison, mois de charter, note).
//  - ART : en attente des contenus du client (card « Coming Soon » sur la page).
// Photos : photos North America deja sur le site, en attendant celles du client.
// AUCUN emoji.

const C = '/media/client/2026-10-16/north-america-cards';
const E = '/media/client/2026-10-22/north-america-eclat';
const H = '/media/client/halal-north-america/2026-10-22';

// [slug, nom, photo, groupe North America pour « Explore the Fleet »]
const SUB_RAW = [
  ['carolinas', 'Carolinas', `${C}/east-coast.jpg`, 'east-coast-united-states'],
  ['florida-east-coast', 'Florida — East Coast', `${C}/miami.jpg`, 'miami'],
  ['florida-west-coast', 'Florida — West Coast', '/media/client/2026-10-19/north-america-cta/miami-bay.jpg', 'east-coast-united-states'],
  ['florida-keys', 'Florida Keys', `${C}/miami.jpg`, 'east-coast-united-states'],
  ['georgia', 'Georgia', `${C}/east-coast.jpg`, 'east-coast-united-states'],
  ['middle-atlantic', 'Middle Atlantic', `${C}/east-coast.jpg`, 'east-coast-united-states'],
  ['new-england', 'New England', `${C}/east-coast.jpg`, 'east-coast-united-states'],
  ['california', 'California', `${C}/west-coast.jpg`, 'west-coast-united-states'],
  ['pacific-northwest', 'Pacific Northwest', `${C}/west-coast.jpg`, 'west-coast-united-states'],
  ['british-columbia', 'British Columbia', `${E}/vancouver.jpg`, 'canada'],
  ['ontario', 'Ontario', `${C}/canada.jpg`, 'canada'],
  ['quebec', 'Quebec', `${C}/canada.jpg`, 'canada'],
  ['nova-scotia', 'Nova Scotia', `${E}/vancouver.jpg`, 'canada'],
  ['sea-of-cortez', 'Sea of Cortez', `${E}/cenote.jpg`, 'mexico'],
  ['baja-california-sur', 'Baja California Sur', `${H}/gallery-5.jpg`, 'mexico'],
  ['mexican-caribbean', 'Mexican Caribbean', `${E}/cancun.jpg`, 'mexico'],
  ['yucatan-north-coast', 'Yucatan — North Coast', `${H}/gallery-4.jpg`, 'mexico'],
  ['pacific-mainland', 'Pacific Mainland', '/media/client/2026-10-19/north-america-cards/mexico-cenote.jpg', 'mexico'],
  ['costa-alegre', 'Costa Alegre', `${H}/gallery-5.jpg`, 'mexico'],
  ['oaxaca-pacific-coast', 'Oaxaca — Pacific Coast', `${E}/cancun.jpg`, 'mexico'],
];

export const SUBREGIONS = SUB_RAW.map(([slug, name, img]) => ({ slug, name, img }));

export const FLEET_BY_SUBREGION = Object.fromEntries(
  SUB_RAW.map(([slug, , , group]) => [slug, `/charters/destinations/north-america/${group}`])
);

export const ART = [];

// [niveau VIP, theme culturel, saison, charter, note] — textes du client, meme ordre.
const CULTURE_RAW = [
  ['High', 'Historic Charleston, Lowcountry cuisine and performing arts', 'MAR–MAY / SEP–NOV', 'LOCAL REVIEW', 'Heritage-rich coastal discovery'],
  ['Very High', 'Art museums, culinary gatherings and waterfront culture', 'NOV–APR', 'NOV–APR', 'Palm Beach and Miami cultural itineraries'],
  ['High', 'Sarasota art, estate architecture and coastal dining', 'NOV–APR', 'NOV–APR', 'Art-led Gulf Coast discovery'],
  ['High', 'Island heritage, literary history and local celebrations', 'NOV–APR', 'NOV–APR', 'Key West culture beyond the waterfront'],
  ['High', 'Savannah museums, live music and historic neighborhoods', 'MAR–MAY / SEP–NOV', 'LOCAL REVIEW', 'Southern heritage and creative traditions'],
  ['Very High', 'New York museums, live music and contemporary culture', 'MAY–SEP', 'MAY–SEP', 'Major-city culture within a summer cruise'],
  ['Very High', 'Maritime heritage, Newport mansions and summer music', 'JUN–SEP', 'JUN–SEP', 'Historic harbors and seasonal cultural life'],
  ['Very High', 'Modern art, architectural discovery and coastal gastronomy', 'MAY–SEP', 'MAY–SEP', 'Urban art and Pacific coastal experiences'],
  ['High', 'Seattle art, maritime identity and regional food culture', 'JUN–SEP', 'JUN–SEP', 'Creative cities and forest-framed waterways'],
  ['High', 'Victoria galleries, historic architecture and regional culture', 'JUN–SEP', 'JUN–SEP', 'Vancouver Island cultural discovery'],
  ['Very High', 'Toronto museums, jazz and Lake Ontario waterfront culture', 'JUN–SEP', 'JUN–SEP', 'Urban culture linked to Great Lakes cruising'],
  ['Very High', 'Montreal art, live music and historic city traditions', 'JUN–SEP', 'JUN–SEP', 'Distinctive francophone cultural experiences'],
  ['High', 'Halifax art, Cape Breton music and maritime heritage', 'JUN–SEP', 'JUN–SEP', 'Atlantic traditions and regional hospitality'],
  ['High', 'La Paz art, Loreto mission heritage and Baja cuisine', 'NOV–MAY', 'NOV–MAY', 'Desert-coast culture and local storytelling'],
  ['Very High', 'San José del Cabo galleries and historic-center discovery', 'NOV–MAY', 'NOV–MAY', 'Contemporary art and Baja cultural character'],
  ['Very High', 'Maya heritage, island celebrations and underwater art', 'DEC–APR', 'DEC–APR', 'Regional heritage and distinctive art encounters'],
  ['High', 'Holbox murals, coastal communities and local traditions', 'DEC–APR', 'LOCAL REVIEW', 'Bespoke cultural shore calls'],
  ['High', 'Puerto Vallarta galleries, culinary events and coastal culture', 'NOV–MAY', 'NOV–MAY', 'Gallery visits and regional dining'],
  ['High', 'Careyes sculpture, coastal architecture and living traditions', 'NOV–MAY', 'NOV–MAY', 'Artful landscapes and discreet cultural outings'],
  ['High', 'Casa Wabi, Oaxacan flavors and coastal celebrations', 'NOV–MAY', 'NOV–MAY', 'Contemporary art and regional creative identity'],
];

export const CULTURE = CULTURE_RAW.map(([vip, period, season, months, note], i) => ({
  name: SUBREGIONS[i].name, sub: SUBREGIONS[i].slug, vip, period, season, months, note,
}));

export const SECTIONS = {
  art: {
    title: 'Art',
    eyebrow: 'America · Galleries, Artists & Regional Expression',
    img: `${C}/east-coast.jpg`,
  },
  culture: {
    title: 'Culture',
    eyebrow: 'America · Heritage, Traditions & Celebrations',
    img: `${E}/vancouver.jpg`,
  },
};

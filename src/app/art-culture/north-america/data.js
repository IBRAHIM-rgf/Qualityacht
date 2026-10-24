// Donnees de /art-culture/north-america (client 2026-10-23), calquees sur /art-culture/bahamas.
//  - SUBREGIONS : les 20 sous-regions (East Coast US, West Coast US, Canada, Mexico).
//  - CULTURE : fichier client « America_Culture_Season_Charter_Cards » : une carte par
//              sous-region (niveau VIP, theme, saison, mois de charter, note).
//  - ART : fichier client « America_Art_Selection_Cards » : un lieu par sous-region.
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

// ART : fichier client « America_Art_Selection_Cards » (2026-10-23) : un lieu par sous-region
// (meme ordre que SUBREGIONS), textes repris tels quels ; ★ = Signature Selection.
const ART_RAW = [
  { index: 0, venues: [{"type": "Museum", "name": "Gibbes Museum of Art — Charleston", "signature": false, "desc": "American art rooted in Charleston’s cultural history. The collection and changing exhibitions connect the region’s artistic heritage with contemporary perspectives and a wider international conversation."}] },
  { index: 1, venues: [{"type": "Museum", "name": "Norton Museum of Art — West Palm Beach", "signature": true, "desc": "American, European, Chinese and contemporary art, alongside photography. Collection galleries, changing exhibitions and sculpture offer a considered introduction to Palm Beach County’s cultural landscape."}] },
  { index: 2, venues: [{"type": "Museum", "name": "The Ringling Museum of Art — Sarasota", "signature": true, "desc": "European painting, sculpture and decorative arts meet works from a wide range of cultures. Architecture and gardens enrich a visit to this distinctive museum on Sarasota’s bayfront estate."}] },
  { index: 3, venues: [{"type": "Museum", "name": "Key West Museum of Art & History — Key West", "signature": false, "desc": "Art and local history within the historic Custom House. Exhibitions illuminate the people, creative life and maritime identity of Key West, placing the island’s distinctive character in context."}] },
  { index: 4, venues: [{"type": "Museum", "name": "Telfair Museums — Savannah", "signature": false, "desc": "A museum group connecting art, architecture and local history. The contemporary Jepson Center and historic Telfair Academy offer complementary perspectives, while the Owens–Thomas House and Slave Quarters interprets Savannah’s past."}] },
  { index: 5, venues: [{"type": "Museum", "name": "The Museum of Modern Art — New York", "signature": true, "desc": "Modern and contemporary art across painting, sculpture, photography, film and design. Collection displays and changing exhibitions trace influential artistic ideas through works by artists from around the world."}] },
  { index: 6, venues: [{"type": "Museum", "name": "RISD Museum — Providence", "signature": false, "desc": "Art and design across periods, cultures and media, presented within the creative setting of the Rhode Island School of Design. A thoughtful encounter with craftsmanship, visual expression and the creative process."}] },
  { index: 7, venues: [{"type": "Museum", "name": "San Francisco Museum of Modern Art — San Francisco", "signature": true, "desc": "Modern and contemporary art, photography, architecture and design in expansive galleries. The collection and changing exhibitions connect international artistic practice with the creative culture of the Bay Area."}] },
  { index: 8, venues: [{"type": "Museum", "name": "Seattle Art Museum — Seattle", "signature": false, "desc": "A broad encounter with art from different cultures and periods. The downtown museum’s collections and changing exhibitions form part of a wider institution that also includes the Seattle Asian Art Museum and Olympic Sculpture Park."}] },
  { index: 9, venues: [{"type": "Museum", "name": "Art Gallery of Greater Victoria — Victoria", "signature": false, "desc": "A public art collection and changing exhibitions on Vancouver Island. The gallery offers encounters with regional and international art within an intimate setting, adding a cultural dimension to a Victoria visit."}] },
  { index: 10, venues: [{"type": "Museum", "name": "Art Gallery of Ontario — Toronto", "signature": true, "desc": "Historical and contemporary art across a substantial collection and a changing exhibition program. A major downtown cultural destination, offering varied perspectives on Canadian and international artistic expression."}] },
  { index: 11, venues: [{"type": "Museum", "name": "Montreal Museum of Fine Arts — Montreal", "signature": true, "desc": "Quebec, Canadian and international art across multiple pavilions. Collections and exhibitions bring visual art, history and design into dialogue, creating a varied introduction to Montreal’s cultural life."}] },
  { index: 12, venues: [{"type": "Museum", "name": "Art Gallery of Nova Scotia — Halifax", "signature": false, "desc": "Atlantic Canada’s largest art museum. Regional art and wider Canadian and international perspectives introduce Nova Scotia’s creative heritage through collections and changing exhibitions in downtown Halifax."}] },
  { index: 13, venues: [{"type": "Museum", "name": "Museo de Arte de Baja California Sur — La Paz", "signature": false, "desc": "A dedicated space for modern and contemporary art in central La Paz. Exhibitions introduce artistic practice connected to Baja California Sur alongside broader creative perspectives."}] },
  { index: 14, venues: [{"type": "Gallery District", "name": "Gallery District — San José del Cabo", "signature": false, "desc": "Painting, sculpture, photography and design across galleries in the historic center. The seasonal Art Walk brings the district to life; participating venues and current schedules should be checked before a visit."}] },
  { index: 15, venues: [{"type": "Underwater Museum", "name": "MUSA — Cancún & Isla Mujeres", "signature": false, "desc": "Underwater sculpture installations bring contemporary art into a marine setting. Visits depend on the chosen site and an authorized water-based excursion, with access shaped by sea conditions and the visitor’s activity requirements."}] },
  { index: 16, venues: [{"type": "Public Art", "name": "Holbox Murals — Holbox Island", "signature": false, "desc": "Village walls become an open-air setting for colorful murals reflecting island life, wildlife and Mexican culture. A leisurely walk reveals works by local and visiting artists; individual murals may change over time."}] },
  { index: 17, venues: [{"type": "Gallery", "name": "Galería Pacífico — Puerto Vallarta", "signature": false, "desc": "Established in 1987, the gallery presents painting and sculpture, primarily by Mexican artists and artists working in Mexico. An introduction to contemporary expression within Puerto Vallarta’s gallery scene."}] },
  { index: 18, venues: [{"type": "Sculpture", "name": "La Copa del Sol — Careyes", "signature": false, "desc": "A monumental sculptural work conceived by Careyes founder Gian Franco Brignone. Overlooking the Pacific, its striking form draws architecture, art and landscape into a single experience. Visiting arrangements require advance confirmation."}] },
  { index: 19, venues: [{"type": "Art Foundation", "name": "Fundación Casa Wabi — near Puerto Escondido", "signature": true, "desc": "Contemporary art, architecture and coastal landscape within a complex designed by Tadao Ando. The foundation connects artistic projects with local communities; visits follow the foundation’s scheduled reservation system."}] },
];

export const ART = ART_RAW.map(({ index, venues }) => ({ island: SUBREGIONS[index].name, venues, sub: SUBREGIONS[index].slug }));

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
    eyebrow: 'America · Museums, Galleries & Exhibitions',
    img: '/media/client/2026-10-24/art-culture-north-america/art-statue.jpg',
  },
  culture: {
    title: 'Culture',
    eyebrow: 'America · Heritage, Traditions & Celebrations',
    img: '/media/client/2026-10-24/art-culture-north-america/culture-dancer.jpg',
  },
};

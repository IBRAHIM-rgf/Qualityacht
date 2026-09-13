// Donnees de /fine-food-dining/caribbean.
// Meme architecture que art-culture/caribbean : landing -> 2 cards -> sous-regions
// empilees et depliables.
//
//  - SUBREGIONS  : les 8 sous-regions Caraibes. Memes slugs, memes noms, memes photos
//                  que art-culture/caribbean/data.js et CaribbeanExplore : le decoupage
//                  Caraibes a UNE seule source sur le site, on ne le refait pas ici.
//  - FINE_FOOD   : produits, producteurs, marches, epicerie fine — par ile.
//  - DINING      : tables, chefs, beach clubs — par ile.
//    Les deux sont VIDES : aucun etablissement n'a encore ete valide par le client.
//    Une sous-region sans entree s'annonce "Nothing listed yet" et ne se deplie pas.
//  - PROVISIONING : les references qui livrent PARTOUT. Elles ne dependent d'aucune
//    sous-region, donc elles ne rentrent pas dans la pile : elles s'affichent au-dessus,
//    sur la seule section Fine Food.
//
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

// ── LIVRAISON PARTOUT ────────────────────────────────────────────────────────────
// Reference fournie par le client. Les categories, le magasin d'Antibes et la reserve
// sur la boutique en ligne viennent de froggygourmet.fr ; la livraison partout est ce
// que le client indique de son fournisseur (le site, lui, n'affiche aucune zone).
export const PROVISIONING = [
  {
    name: 'Froggy Gourmet',
    type: 'Fine Grocery',
    base: 'Antibes',
    url: 'https://www.froggygourmet.fr/shop',
    desc: 'Fine grocery for yacht provisioning, delivered wherever the yacht lies. Wines and champagnes, fish and seafood, meats and poultry, eggs and dairy, oils and vinegars, condiments and spreads, bakery, fruit and vegetables, dry, frozen, Asian and international ranges, and a dedicated luxury selection.',
    note: 'The online shop lists the Antibes stock only. The full range is ordered from the catalogue, the application, or by email.',
    // Photos fournies par le client (2026-09-13), dans l'ordre froggy 1, 2, 3.
    images: [
      '/media/client/lydie/2026-09-13/froggy/froggy-1.jpg',
      '/media/client/lydie/2026-09-13/froggy/froggy-2.jpg',
      '/media/client/lydie/2026-09-13/froggy/froggy-3.jpg',
    ],
  },
];

// ── FINE FOOD : produits, producteurs, marches, epicerie fine ────────────────────
// Forme attendue de chaque entree (identique a DINING) :
//   { island: 'St-Barth', sub: 'leeward-islands', venues: [
//       { type: 'Market' | 'Producer' | 'Fine Grocery' | 'Cellar',
//         name: 'Nom', signature: true|false, desc: 'Texte.' },
//   ] }
// `sub` doit valoir un slug de SUBREGIONS ci-dessus.
export const FINE_FOOD = [];

// ── DINING : tables, chefs, beach clubs ──────────────────────────────────────────
// Meme forme que FINE_FOOD. Types attendus :
//   'Restaurant' | 'Michelin' | 'Beach Club' | 'Private Chef' | 'Hotel Table'
export const DINING = [];

export const SECTIONS = {
  'fine-food': {
    title: 'Fine Food',
    eyebrow: 'Caribbean · Provisioning, Producers & Fine Grocery',
    img: '/images/halal/fruits_1440x800.jpg',
  },
  dining: {
    title: 'Dining',
    eyebrow: 'Caribbean · Tables, Chefs & Beach Clubs',
    img: '/images/new/17500856938825139008889514837436.jpg',
  },
};

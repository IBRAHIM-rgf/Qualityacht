// Donnees de /sales/motor — page complete facon globaljet.aero/fr/sales adaptee au
// monde MARITIME. Les 3 yachts sont REELS (annonces Ventura Europe), specs telles que
// publiees. Le reste (processus, publications, builders, ventes recentes) est le contenu
// de la page globaljet transpose au yachting. AUCUN emoji.

export const YACHTS = [
  {
    id: 'last-man-standing',
    name: 'Last Man Standing',
    type: 'Motor Yacht',
    builder: 'Astondoa',
    model: '102 GLX',
    year: 2003,
    length: '34 m',
    beam: '7 m',
    draft: '2 m',
    cabins: 4,
    crew: 2,
    engines: '2 × MTU 12V 396 TE94 — 2,200 hp',
    engineHours: '3,800',
    flag: 'British',
    location: 'Spain',
    price: '€ 2,200,000',
    priceNote: 'VAT paid',
    badge: 'For Sale',
    category: 'motor',
    img: '/images/Sales/last-man-standing.jpg',
    gallery: [
      '/images/Sales/last-man-standing.jpg',
      '/images/Sales/last-man-standing-2.jpg',
      '/images/Sales/last-man-standing-3.jpg',
      '/images/Sales/last-man-standing-4.jpg',
    ],
    tagline:
      'A commanding 34-metre Astondoa flagship, built for long, elegant Mediterranean cruising.',
    description:
      'Last Man Standing is a striking 34-metre Astondoa 102 GLX offering generous volumes across four guest cabins and accommodation for two crew. Powered by twin MTU 2,200 hp engines and lying in Spain under British flag, she is a proven, well-maintained motor yacht ready for her next owner. VAT paid.',
    highlights: [
      '34-metre Astondoa 102 GLX flagship',
      'Four guest cabins and two crew cabins',
      'Twin MTU 2,200 hp engines',
      'Lying in Spain under British flag',
      'VAT paid',
    ],
  },
  {
    id: 'pobedy-i',
    name: 'Pobedy I',
    type: 'Motor Yacht',
    builder: 'Maiora',
    model: '26',
    year: 2004,
    refit: 2025,
    length: '26.5 m',
    beam: '5.58 m',
    draft: '2.79 m',
    cabins: 4,
    crew: 2,
    engines: '2 × MTU 12V 2000 M91 — 1,500 hp',
    engineHours: '3,236',
    flag: 'Portuguese',
    location: 'Barcelona, Spain',
    price: '€ 1,195,000',
    priceNote: 'VAT paid',
    badge: 'Price Reduced',
    category: 'motor',
    img: '/images/Sales/pobedy-i.jpg',
    gallery: [
      '/images/Sales/pobedy-i.jpg',
      '/images/Sales/pobedy-i-2.jpg',
      '/images/Sales/pobedy-i-3.jpg',
      '/images/Sales/pobedy-i-4.jpg',
    ],
    tagline:
      'A freshly refitted 26.5-metre Maiora — timeless Italian lines, extensively updated in 2024-25.',
    description:
      'Pobedy I is a 26.5-metre Maiora 26 that has just benefited from an extensive 2024-25 refit. She offers four guest cabins, two crew cabins and twin MTU 1,500 hp engines. Berthed in Barcelona under Portuguese flag and recently repriced, she represents outstanding value in her class. VAT paid.',
    highlights: [
      'Extensive 2024-25 refit',
      'Four guest cabins and two crew cabins',
      'Twin MTU 1,500 hp engines',
      'Berthed in Barcelona under Portuguese flag',
      'Recently repriced — VAT paid',
    ],
  },
  {
    id: 's-kris',
    name: 'S Kris',
    type: 'Motor Yacht',
    builder: 'Riva',
    model: '52 Rivale',
    year: 2013,
    length: '16.12 m',
    beam: '4.57 m',
    draft: '1.40 m',
    cabins: 3,
    crew: 0,
    engines: '2 × MAN V10 — 1,100 hp',
    engineHours: '595',
    flag: 'British',
    location: 'South of Spain',
    price: '€ 700,000',
    priceNote: 'VAT paid',
    badge: 'For Sale',
    category: 'motor',
    img: '/images/Sales/s-kris.jpg',
    gallery: [
      '/images/Sales/s-kris.jpg',
      '/images/Sales/s-kris-2.jpg',
      '/images/Sales/s-kris-3.jpg',
      '/images/Sales/s-kris-4.jpg',
    ],
    tagline:
      'The iconic Riva 52 Rivale — a low-hours 2013 example, the definition of open-yacht elegance.',
    description:
      'S Kris is a beautifully kept Riva 52 Rivale from 2013 with only 595 engine hours. An icon of Italian design, she pairs open-yacht glamour with three comfortable cabins and twin MAN 1,100 hp engines. Lying in the south of Spain under British flag. VAT paid.',
    highlights: [
      'Iconic Riva 52 Rivale',
      'Only 595 engine hours',
      'Three comfortable cabins',
      'Twin MAN 1,100 hp engines',
      'Lying in the south of Spain — VAT paid',
    ],
  },
];

export function getYacht(id) {
  return YACHTS.find((y) => y.id === id) || null;
}

// Reference commerciale affichee sur la fiche et reprise dans le formulaire Sales.
// Source unique pour eviter que les deux endroits divergent.
export function getYachtRef(y) {
  if (!y) return null;
  return `QA-${y.id.slice(0, 3).toUpperCase()}-${y.year}`;
}

// Filtres par type (globaljet : onglets constructeurs -> ici types de yacht).
export const TYPE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'motor', label: 'Motor' },
  { key: 'sailing', label: 'Sailing' },
  { key: 'explorer', label: 'Explorer' },
];

// "Découvrez où nous publierons votre yacht" (globaljet : Executive Controller, AV Buyer,
// Amstat, Jetnet -> equivalents yachting).
export const PUBLICATIONS = [
  'YachtWorld',
  'BOAT International',
  'SuperYacht Times',
  'The Yacht Market',
];

// "Processus de vente" (16 etapes globaljet, transposees yachting).
export const SELLING_STEPS = [
  'Financial valuation and pricing of the yacht',
  'Signing of the exclusive central agency agreement',
  'Marketing and promotion strategy',
  'Review of offers received from prospective buyers',
  'Presentation of qualified offers to the seller',
  'A Letter of Intent (LOI) is drawn up with a deposit, stating the main terms of the transaction',
  'Start of the pre-purchase survey at an approved shipyard, supervised by Qualityacht',
  'Signing of the Memorandum of Agreement (MOA)',
  'Preliminary review of the logbooks and maintenance history of the yacht',
  'Drafting of the Memorandum of Agreement (MOA)',
  'Visual inspection of the yacht and sea trial',
  'Technical acceptance',
  "The buyer's deposit becomes non-refundable under the terms of the agreement",
  'Title and funds exchanged through an escrow agent, coordinated by Qualityacht',
  'Closing of the transaction',
  'Delivery of the yacht to the new owner',
];

// "Processus d'achat" (18 etapes globaljet, transposees yachting).
export const BUYING_STEPS = [
  'Signing of the exclusive buyer mandate',
  "Definition of the buyer's specification",
  'Analysis of yacht performance and specifications',
  'Market and availability study',
  'Presentation of the selected yachts',
  'Visual inspection',
  'Drafting of the purchase agreement (MOA)',
  'Sea trial and technical review of the selected yacht',
  'Refundable deposit placed in escrow',
  'Letter of Intent (LOI) establishing the terms of the transaction',
  'Price negotiation',
  'Preliminary review of logbooks and maintenance history by Qualityacht surveyors',
  'Pre-purchase survey at an approved shipyard, supervised by Qualityacht',
  'Yacht acceptance and sea trial',
  "The buyer's deposit becomes non-refundable after technical acceptance of the yacht",
  'Transfer of title and funds through an escrow agent, coordinated by Qualityacht',
  'Closing of the transaction',
  'Delivery of the yacht to the new owner',
];

// Annuaire des constructeurs (globaljet : galerie de modeles -> chantiers yachting).
export const BUILDERS = [
  'Riva',
  'Maiora',
  'Astondoa',
  'Benetti',
  'Sunseeker',
  'Ferretti',
  'Pershing',
  'Sanlorenzo',
  'Azimut',
  'Princess',
  'Heesen',
  'Perini Navi',
];

// "Ventes récentes" (vitrine) — exemples de transactions menees, a titre indicatif.
export const RECENT_SALES = [
  { name: 'Sunseeker 76 Yacht', year: 2018 },
  { name: 'Ferretti 850', year: 2016 },
  { name: 'Pershing 62', year: 2015 },
  { name: 'Azimut Grande 27M', year: 2019 },
  { name: 'Princess 68', year: 2017 },
  { name: 'Sanlorenzo SL96', year: 2014 },
];

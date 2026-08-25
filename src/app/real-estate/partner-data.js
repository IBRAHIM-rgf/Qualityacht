// ══ Real Estate — partenaire international ══
//
// Partenaire confirme : Gustave Immo (https://www.gustave-immo.com/).
// A ne pas confondre avec les agences francaises au nom voisin.
//
// Qualityacht reste le point de contact : les formulaires de ce lot envoient
// chez Qualityacht, jamais chez le partenaire. Les brochures, elles, restent
// hebergees chez Gustave Immo : aucun PDF n'est copie dans ce depot.
//
// Aucun prix n'est repris : ils changent. Aucun rendement, aucune fiscalite.
// Tracabilite des visuels : docs/research/gustave-immo-assets.md

export const PARTNER = {
  name: 'Gustave Immo',
  site: 'https://www.gustave-immo.com/',
  logo: '/images/partners/gustave-immo/logo.webp',
};

export const QUALITYACHT = {
  email: 'info@qualityacht.ch',
  phone: '+41 76 736 57 81',
  phoneHref: 'tel:+41767365781',
  whatsapp: 'https://wa.me/41767365781',
};

/** Message WhatsApp prerempli, cote Qualityacht uniquement. */
export function whatsappFor(projet, destination) {
  const t = `Hello Qualityacht, I would like to discuss ${projet} (${destination}).`;
  return `${QUALITYACHT.whatsapp}?text=${encodeURIComponent(t)}`;
}

// Les trois marches reels du partenaire.
export const MARKETS = [
  {
    id: 'dubai',
    name: 'Dubai',
    coords: [25.2048, 55.2708],
    cta: 'Explore Dubai',
    href: 'https://www.gustave-immo.com/dubai',
    desc: 'The partner’s most developed market, with a set of current residential programmes.',
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    coords: [31.6295, -7.9811],
    cta: 'Explore Marrakech',
    href: 'https://www.gustave-immo.com/marrakech',
    desc: 'A second market covered by the partner. No individual programme is confirmed at this stage.',
  },
  {
    id: 'batumi',
    name: 'Batumi',
    coords: [41.6168, 41.6367],
    cta: 'Explore Batumi',
    href: 'https://www.gustave-immo.com/batumi',
    desc: 'A third market covered by the partner. No individual programme is confirmed at this stage.',
  },
];

// Les cinq programmes publies par le partenaire pour Dubai.
// `developer` n'est renseigne que lorsqu'il est clairement indique a la source.
// Les brochures pointent vers le site du partenaire, jamais vers un fichier local.
export const DUBAI_PROGRAMMES = [
  {
    id: 'the-archive',
    name: 'The Archive',
    developer: 'Imtiaz Developments',
    image: '/images/partners/gustave-immo/the-archive.webp',
    brochure: 'https://www.gustave-immo.com/brochure/The_Archive_by_Imtiaz.pdf',
  },
  {
    id: 'the-greens',
    name: 'The Greens at Sobha Sanctuary',
    developer: 'Sobha',
    image: '/images/partners/gustave-immo/the-greens.webp',
    brochure: 'https://www.gustave-immo.com/brochure/THE_GREENS_AT_SOBHA_SANCTUARY.pdf',
  },
  {
    id: 'floarea-oasis',
    name: 'Floarea Oasis',
    developer: 'Mashriq Elite',
    image: '/images/partners/gustave-immo/floarea-oasis.webp',
    brochure: 'https://www.gustave-immo.com/brochure/Floarea_Oasis_by_Mashriq_Elite.pdf',
  },
  {
    id: 'piazza-roma-valencia',
    name: 'Piazza Roma & Valencia',
    developer: 'Damac Lagoons',
    image: '/images/partners/gustave-immo/piazza-roma-valencia.webp',
    brochure: 'https://www.gustave-immo.com/brochure/PIAZZA_ROMA_%26_VALENCIA.pdf',
  },
  {
    id: 'verdania-4',
    name: 'VERDAN1A 4',
    developer: null,
    image: '/images/partners/gustave-immo/verdania-4.webp',
    brochure: 'https://www.gustave-immo.com/brochure/VERDAN1A_4.pdf',
  },
];

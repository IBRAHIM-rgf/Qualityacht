// ══ Real Estate — partenaires ══
//
// Structure evolutive : PARTNERS est un tableau, pour pouvoir accueillir les
// partenaires Monaco a venir sans retoucher les composants. PARTNER reste
// exporte comme alias du partenaire principal, afin de ne rien casser chez les
// consommateurs existants (/invest-with-impact, /luxury-cars-racing).
//
// Qualityacht reste le point de contact : les formulaires envoient chez
// Qualityacht, jamais chez un partenaire. Les brochures restent hebergees chez
// le partenaire : aucun PDF n'est copie dans ce depot.
//
// Aucun prix, aucun rendement, aucune fiscalite. Rien n'est ajoute qui ne soit
// confirme par le site officiel du partenaire.
// Tracabilite des visuels : docs/research/gustave-immo-assets.md

export const PARTNERS = [
  {
    id: 'gustave-immo',
    name: 'Gustave Immo',
    site: 'https://www.gustave-immo.com/',
    logo: '/images/partners/gustave-immo/logo.webp',
    // Meme fichier, recadre de son vide : le carre 420x420 n'etait rempli qu'a 24%.
    logoWordmark: '/images/partners/gustave-immo/logo-wordmark.webp',
    logoWidth: 416,
    logoHeight: 118,
    // Wordmark blanc : il lui faut un fond sombre.
    logoPlate: 'dark',
    type: 'International real estate and investment introductions',
    markets: ['Dubai', 'Marrakech', 'Batumi'],
    // Les cinq programmes Dubai sont rattachees a ce partenaire via partnerId.
    hasProgrammes: true,
  },
  {
    id: 'bn-brickeys',
    name: 'BNBRICKEYS',
    site: 'https://www.bnbrickeys.com/',
    // Logo officiel recupere sur leur site puis stocke localement (aucun hotlink
    // du CDN externe), recadre de ses marges. Identite et couleurs inchangees.
    logo: '/images/partners/bn-brickeys/logo.webp',
    logoWordmark: '/images/partners/bn-brickeys/logo.webp',
    logoWidth: 760,
    logoHeight: 324,
    // « RICKEYS » est gris tres sombre (#3a3a3a) : 1,18:1 sur nos cartes, donc
    // illisible. Ce logo exige un fond clair pour rester fidele a l'identite du
    // partenaire plutot que d'etre recolore.
    logoPlate: 'light',
    // Formulation reprise de leur propre site : « luxury listings »,
    // « properties in Monaco and the surrounding areas ». Ni investissement,
    // ni rendement, ni garantie : leur site n'en parle pas.
    type: 'Luxury stays and curated properties in Monaco and the surrounding areas',
    markets: ['Monaco'],
    hasProgrammes: false,
  },
];

/** Partenaire principal — alias retrocompatible. */
export const PARTNER = PARTNERS[0];

/** Retrouve un partenaire par son id. */
export function partnerById(id) {
  return PARTNERS.find((p) => p.id === id) || null;
}

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

// Les marches couverts. `partnerIds` permet a un marche d'accueillir plusieurs
// partenaires — Monaco est prevu pour cela — sans creer de marqueurs superposes
// sur la carte. Aucun partenaire futur n'est invente ici.
export const MARKETS = [
  {
    id: 'dubai',
    partnerIds: ['gustave-immo'],
    name: 'Dubai',
    coords: [25.2048, 55.2708],
    cta: 'Explore Dubai',
    href: 'https://www.gustave-immo.com/dubai',
    desc: 'The partner’s most developed market, with a set of current residential programmes.',
  },
  {
    id: 'marrakech',
    partnerIds: ['gustave-immo'],
    name: 'Marrakech',
    coords: [31.6295, -7.9811],
    cta: 'Explore Marrakech',
    href: 'https://www.gustave-immo.com/marrakech',
    desc: 'A second market covered by the partner. No individual programme is confirmed at this stage.',
  },
  {
    id: 'batumi',
    partnerIds: ['gustave-immo'],
    name: 'Batumi',
    coords: [41.6168, 41.6367],
    cta: 'Explore Batumi',
    href: 'https://www.gustave-immo.com/batumi',
    desc: 'A third market covered by the partner. No individual programme is confirmed at this stage.',
  },
  {
    id: 'monaco',
    partnerIds: ['bn-brickeys'],
    name: 'Monaco',
    coords: [43.7384, 7.4246],
    cta: 'Visit BNBRICKEYS',
    href: 'https://www.bnbrickeys.com/',
    desc: 'Luxury stays and curated properties in Monaco and the surrounding areas. No individual property or price is confirmed at this stage.',
  },
];

// Les cinq programmes publies par Gustave Immo pour Dubai, rattaches par partnerId.
// `developer` n'est renseigne que lorsqu'il est clairement indique a la source.
// Les brochures pointent vers le site du partenaire, jamais vers un fichier local.
export const DUBAI_PROGRAMMES = [
  {
    id: 'the-archive',
    partnerId: 'gustave-immo',
    name: 'The Archive',
    developer: 'Imtiaz Developments',
    image: '/images/partners/gustave-immo/the-archive.webp',
    brochure: 'https://www.gustave-immo.com/brochure/The_Archive_by_Imtiaz.pdf',
  },
  {
    id: 'the-greens',
    partnerId: 'gustave-immo',
    name: 'The Greens at Sobha Sanctuary',
    developer: 'Sobha',
    image: '/images/partners/gustave-immo/the-greens.webp',
    brochure: 'https://www.gustave-immo.com/brochure/THE_GREENS_AT_SOBHA_SANCTUARY.pdf',
  },
  {
    id: 'floarea-oasis',
    partnerId: 'gustave-immo',
    name: 'Floarea Oasis',
    developer: 'Mashriq Elite',
    image: '/images/partners/gustave-immo/floarea-oasis.webp',
    brochure: 'https://www.gustave-immo.com/brochure/Floarea_Oasis_by_Mashriq_Elite.pdf',
  },
  {
    id: 'piazza-roma-valencia',
    partnerId: 'gustave-immo',
    name: 'Piazza Roma & Valencia',
    developer: 'Damac Lagoons',
    image: '/images/partners/gustave-immo/piazza-roma-valencia.webp',
    brochure: 'https://www.gustave-immo.com/brochure/PIAZZA_ROMA_%26_VALENCIA.pdf',
  },
  {
    id: 'verdania-4',
    partnerId: 'gustave-immo',
    name: 'VERDAN1A 4',
    developer: null,
    image: '/images/partners/gustave-immo/verdania-4.webp',
    brochure: 'https://www.gustave-immo.com/brochure/VERDAN1A_4.pdf',
  },
];

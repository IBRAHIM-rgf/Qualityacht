// Données partagées entre /privat-jet (grille) et /privat-jet/[slug] (page destination)

export const caribbeanJetGroups = [
  { island: 'Cuba', airports: ['José Martí International Airport (HAV) — large jets', 'Juan Gualberto Gómez Airport (VRA) — medium jets', 'Cayo Largo Airport (CYL) — light jets'] },
  { island: 'Dominican Republic', airports: ['Punta Cana International Airport (PUJ) — all jets', 'Casa de Campo International Airport (LRM) — medium jets', 'Las Américas International Airport (SDQ) — all jets', 'La Romana International Airport (LRM) — medium jets'] },
  { island: 'Haiti', airports: ['Toussaint Louverture International Airport (PAP) — medium jets', 'Cap-Haïtien International Airport (CAP) — light jets'] },
  { island: 'Jamaica', airports: ['Sangster International Airport (MBJ) — all jets', 'Norman Manley International Airport (KIN) — all jets', 'Ian Fleming International Airport (OCJ) — light jets'] },
  { island: 'Puerto Rico', airports: ['Luis Muñoz Marín International Airport (SJU) — all jets', 'Fernando Luis Ribas Dominicci Airport (SIG) — light jets', 'Mercedita Airport (PSE) — medium jets'] },
  { island: 'Anguilla', airports: ['Clayton J. Lloyd International Airport (AXA) — light jets'] },
  { island: 'Saint Martin / Sint Maarten', airports: ['Princess Juliana International Airport (SXM) — all jets', 'Grand Case Airport (SFG) — medium jets'] },
  { island: 'Saint Barthélemy', airports: ['Gustavia Airport (SBH) — STOL aircraft only'] },
  { island: 'Saba', airports: ['Juancho E. Yrausquin Airport (SAB) — STOL aircraft only'] },
  { island: 'Sint Eustatius', airports: ['F.D. Roosevelt Airport (EUX) — light jets'] },
  { island: 'Saint Kitts & Nevis', airports: ['Robert L. Bradshaw International Airport (SKB) — all jets', 'Vance W. Amory International Airport (NEV) — light jets'] },
  { island: 'Antigua & Barbuda', airports: ['V.C. Bird International Airport (ANU) — all jets', 'Barbuda Codrington Airport (BBQ) — light jets'] },
  { island: 'Montserrat', airports: ['John A. Osborne Airport (MNI) — light jets'] },
  { island: 'Guadeloupe', airports: ['Pointe-à-Pitre International Airport (PTP) — all jets'] },
  { island: 'Aruba', airports: ['Queen Beatrix International Airport (AUA) — all jets'] },
  { island: 'Bonaire', airports: ['Flamingo International Airport (BON) — medium jets'] },
  { island: 'Curaçao', airports: ['Curaçao International Airport (CUR) — all jets'] },
  { island: 'Dominica', airports: ['Douglas-Charles Airport (DOM) — medium jets', 'Canefield Airport (DCF) — light jets'] },
  { island: 'Martinique', airports: ['Aimé Césaire International Airport (FDF) — all jets'] },
  { island: 'Saint Lucia', airports: ['Hewanorra International Airport (UVF) — all jets', 'George F.L. Charles Airport (SLU) — light jets'] },
  { island: 'Saint Vincent & the Grenadines', airports: ['Argyle International Airport (SVD) — medium/large jets', 'Mustique Airport (MQS) — light jets', 'Canouan Airport (CIW) — medium jets'] },
  { island: 'Grenada', airports: ['Maurice Bishop International Airport (GND) — all jets', 'Lauriston Airport (CRU) — light jets'] },
  { island: 'Barbados', airports: ['Grantley Adams International Airport (BGI) — all jets'] },
  { island: 'Turks & Caicos', airports: ['Providenciales International Airport (PLS) — medium/large jets', 'Grand Turk International Airport (GDT) — light jets'] },
  { island: 'Trinidad & Tobago', airports: ['Piarco International Airport (POS) — all jets', 'A.N.R. Robinson International Airport (TAB) — medium jets'] },
  { island: 'British Virgin Islands (BVI)', airports: ['Terrance B. Lettsome International Airport (EIS) — Tortola — light jets', 'Virgin Gorda Airport (VIJ) — Virgin Gorda — STOL aircraft only'] },
  { island: 'US Virgin Islands (USVI)', airports: ['Cyril E. King Airport (STT) — St. Thomas — medium/large jets', 'Henry E. Rohlsen Airport (STX) — St. Croix — medium jets'] },
  { island: 'Barbuda', airports: ['Barbuda Codrington Airport (BBQ) — light jets'] },
  { island: 'Carriacou', airports: ['Lauriston Airport (CRU) — light jets'] },
  { island: 'Petite Martinique', airports: ['No airport — boat access only'] },
  { island: 'Redonda', airports: ['No airport'] },
  { island: 'Aves Island', airports: ['No airport'] },
  { island: 'Navassa Island', airports: ['No airport'] },
  { island: 'Sombrero Island', airports: ['No airport'] },
];

const comingSoon = [{ island: 'Coming Soon', airports: ['Information coming soon'] }];

// Ordre identique à /charters/destinations
// `image`     = photo de la card (grille /privat-jet) — PORTRAIT
// `heroImage` = photo du hero plein page sur /privat-jet/<slug> — PAYSAGE de preference (16:9, ~2880x1620)
// CONVENTION : fichier deposé dans /public/images/private_jet/hero/ avec le nom hero_<slug>.<ext>
// Si heroImage est absent (null), la photo de la card sert de fallback (rendu portrait haut).
export const destinations = [
  { slug: 'arctic',                 name: 'Arctic',                  image: '/images/private_jet/private_arctic.jpeg',                 heroImage: '/images/private_jet/hero/hero_arctic.jpg',                groups: comingSoon },
  { slug: 'bahamas',                name: 'Bahamas',                 image: '/images/private_jet/private_bahamas.jpeg',                heroImage: '/images/private_jet/hero/hero_bahamas.png',               groups: comingSoon },
  { slug: 'central-america',        name: 'Central America',         image: '/images/private_jet/private_central-america.jpeg',        heroImage: '/images/private_jet/hero/hero_central-america.jpg',       groups: comingSoon },
  { slug: 'east-asia',              name: 'East Asia',               image: '/images/private_jet/private_east-asia.jpeg',              heroImage: '/images/private_jet/hero/hero_east-asia.jpg',             groups: comingSoon },
  { slug: 'eastern-mediterranean',  name: 'Eastern Mediterranean',   image: '/images/private_jet/private_eastern-mediterranean.jpeg', heroImage: '/images/private_jet/hero/hero_eastern-mediterranean.jpg', groups: comingSoon },
  { slug: 'indian-ocean',           name: 'Indian Ocean',            image: '/images/private_jet/private_indian-ocean.jpeg',           heroImage: '/images/private_jet/hero/hero_indian-ocean.jpg',          groups: comingSoon },
  { slug: 'indonesia',              name: 'Indonesia',               image: '/images/private_jet/private_indonesia.jpeg',              heroImage: '/images/private_jet/hero/hero_indonesia.jpeg',            groups: comingSoon },
  { slug: 'north-america',          name: 'North America',           image: '/images/private_jet/private_nordamerica.jpeg',            heroImage: '/images/private_jet/hero/hero_north-america.png',         groups: comingSoon },
  { slug: 'pacific-ocean',          name: 'Pacific Ocean',           image: '/images/private_jet/private_pacific-ocean.jpeg',          heroImage: '/images/private_jet/hero/hero_pacific-ocean.jpg',         groups: comingSoon },
  { slug: 'oman-gulf',              name: 'Oman Gulf',               image: '/images/private_jet/private_oman-gulf.jpeg',              heroImage: '/images/private_jet/hero/hero_oman-gulf.jpeg',            groups: comingSoon },
  { slug: 'south-east-asia',        name: 'South East Asia',         image: '/images/private_jet/private_south-east-asia.jpeg',        heroImage: '/images/private_jet/hero/hero_south-east-asia.jpg',       groups: comingSoon },
  { slug: 'western-mediterranean',  name: 'Western Mediterranean',   image: '/images/private_jet/private_western-mediterranean.jpeg', heroImage: '/images/private_jet/hero/hero_western-mediterranean.jpg', groups: comingSoon },
  { slug: 'africa',                 name: 'Africa',                  image: '/images/private_jet/private_africa.jpeg',                 heroImage: '/images/private_jet/hero/hero_africa.jpeg',               groups: comingSoon },
  { slug: 'northern-europe',        name: 'Northern Europe',         image: '/images/private_jet/private_northern-europe.jpeg',        heroImage: '/images/private_jet/hero/hero_northern-europe.jpg',       groups: comingSoon },
  { slug: 'caribbean',              name: 'Caribbean',               image: '/images/private_jet/private_caribbean.jpg',                heroImage: '/images/private_jet/hero/hero_caribbean.jpg',             groups: caribbeanJetGroups, heroCropClass: 'h-[62vh] md:h-[80vh]', heroObjectPosition: '50% 42%' },
  { slug: 'oceania',                name: 'Oceania',                 image: '/images/private_jet/private_oceania.jpeg',                heroImage: '/images/private_jet/hero/hero_oceania.jpg',               groups: comingSoon },
];

export function getDestinationBySlug(slug) {
  return destinations.find(d => d.slug === slug) || null;
}

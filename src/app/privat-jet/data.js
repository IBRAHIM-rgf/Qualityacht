// Données partagées entre /privat-jet (grille) et /privat-jet/[slug] (page destination)

export const caribbeanJetGroups = [
  { island: 'Cuba', airports: ['Aéroport International José Martí (HAV) — grands jets privés', 'Aéroport Juan Gualberto Gómez (VRA) — jets privés moyens', 'Aéroport de Cayo Largo (CYL) — petits jets privés'] },
  { island: 'République Dominicaine', airports: ['Aéroport International de Punta Cana (PUJ) — tous jets privés', 'Aéroport International de Casa de Campo (LRM) — jets privés moyens', 'Aéroport International Las Américas (SDQ) — tous jets privés', 'Aéroport International de La Romana (LRM) — jets privés moyens'] },
  { island: 'Haïti', airports: ['Aéroport International Toussaint Louverture (PAP) — jets privés moyens', 'Aéroport International du Cap-Haïtien (CAP) — petits jets privés'] },
  { island: 'Jamaïque', airports: ['Aéroport International Sangster (MBJ) — tous jets privés', 'Aéroport International Norman Manley (KIN) — tous jets privés', 'Aéroport International Ian Fleming (OCJ) — petits jets privés'] },
  { island: 'Porto Rico', airports: ['Aéroport International Luis Muñoz Marín (SJU) — tous jets privés', 'Aéroport Fernando Luis Ribas Dominicci (SIG) — petits jets privés', 'Aéroport de Mercedita (PSE) — jets privés moyens'] },
  { island: 'Anguilla', airports: ['Aéroport International Clayton J. Lloyd (AXA) — petits jets privés'] },
  { island: 'Saint-Martin / Sint Maarten', airports: ['Aéroport International Princess Juliana (SXM) — tous jets privés', 'Aéroport de Grand Case (SFG) — jets privés moyens'] },
  { island: 'Saint-Barthélemy', airports: ['Aéroport de Gustavia (SBH) — avions STOL uniquement'] },
  { island: 'Saba', airports: ['Aéroport Juancho E. Yrausquin (SAB) — avions STOL uniquement'] },
  { island: 'Saint-Eustache', airports: ['Aéroport F.D. Roosevelt (EUX) — petits jets privés'] },
  { island: 'Saint-Kitts & Nevis', airports: ['Aéroport International Robert L. Bradshaw (SKB) — tous jets privés', 'Aéroport International Vance W. Amory (NEV) — petits jets privés'] },
  { island: 'Antigua & Barbuda', airports: ['Aéroport International V.C. Bird (ANU) — tous jets privés', 'Aéroport de Barbuda Codrington (BBQ) — petits jets privés'] },
  { island: 'Montserrat', airports: ['Aéroport John A. Osborne (MNI) — petits jets privés'] },
  { island: 'Guadeloupe', airports: ['Aéroport International de Pointe-à-Pitre (PTP) — tous jets privés'] },
  { island: 'Aruba', airports: ['Aéroport International Queen Beatrix (AUA) — tous jets privés'] },
  { island: 'Bonaire', airports: ['Aéroport International de Flamingo (BON) — jets privés moyens'] },
  { island: 'Curaçao', airports: ['Aéroport International de Curaçao (CUR) — tous jets privés'] },
  { island: 'Dominique', airports: ['Aéroport Douglas-Charles (DOM) — jets privés moyens', 'Aéroport de Canefield (DCF) — petits jets privés'] },
  { island: 'Martinique', airports: ['Aéroport International Aimé Césaire (FDF) — tous jets privés'] },
  { island: 'Sainte-Lucie', airports: ['Aéroport International Hewanorra (UVF) — tous jets privés', 'Aéroport George F.L. Charles (SLU) — petits jets privés'] },
  { island: 'Saint-Vincent & les Grenadines', airports: ['Aéroport International d\'Argyle (SVD) — jets privés moyens/grands', 'Aéroport de Mustique (MQS) — petits jets privés', 'Aéroport de Canouan (CIW) — jets privés moyens'] },
  { island: 'Grenade', airports: ['Aéroport International Maurice Bishop (GND) — tous jets privés', 'Aéroport de Lauriston (CRU) — petits jets privés'] },
  { island: 'Barbade', airports: ['Aéroport International Grantley Adams (BGI) — tous jets privés'] },
  { island: 'Turks & Caicos', airports: ['Aéroport International de Providenciales (PLS) — jets privés moyens/grands', 'Aéroport International de Grand Turk (GDT) — petits jets privés'] },
  { island: 'Trinité-et-Tobago', airports: ['Aéroport International de Piarco (POS) — tous jets privés', 'Aéroport International A.N.R. Robinson (TAB) — jets privés moyens'] },
  { island: 'Barbuda', airports: ['Aéroport de Barbuda Codrington (BBQ) — petits jets privés'] },
  { island: 'Carriacou', airports: ['Aéroport de Lauriston (CRU) — petits jets privés'] },
  { island: 'Petite Martinique', airports: ['Pas d\'aéroport — accès par bateau uniquement'] },
  { island: 'Redonda', airports: ['Pas d\'aéroport'] },
  { island: 'Aves Island', airports: ['Pas d\'aéroport'] },
  { island: 'Navassa Island', airports: ['Pas d\'aéroport'] },
  { island: 'Sombrero Island', airports: ['Pas d\'aéroport'] },
];

const comingSoon = [{ island: 'Coming Soon', airports: ['Information coming soon'] }];

// Ordre identique à /charters/destinations
export const destinations = [
  { slug: 'arctic',                 name: 'Arctic',                  image: '/images/private_jet/private_arctic.jpeg',                 groups: comingSoon },
  { slug: 'bahamas',                name: 'Bahamas',                 image: '/images/private_jet/private_bahamas.jpeg',                groups: comingSoon },
  { slug: 'central-america',        name: 'Central America',         image: '/images/private_jet/private_central-america.jpeg',        groups: comingSoon },
  { slug: 'east-asia',              name: 'East Asia',               image: '/images/private_jet/private_east-asia.jpeg',              groups: comingSoon },
  { slug: 'eastern-mediterranean',  name: 'Eastern Mediterranean',   image: '/images/private_jet/private_eastern-mediterranean.jpeg', groups: comingSoon },
  { slug: 'indian-ocean',           name: 'Indian Ocean',            image: '/images/private_jet/private_indian-ocean.jpeg',           groups: comingSoon },
  { slug: 'indonesia',              name: 'Indonesia',               image: '/images/private_jet/private_indonesia.jpeg',              groups: comingSoon },
  { slug: 'north-america',          name: 'North America',           image: '/images/private_jet/private_nordamerica.jpeg',            groups: comingSoon },
  { slug: 'pacific-ocean',          name: 'Pacific Ocean',           image: '/images/private_jet/private_pacific-ocean.jpeg',          groups: comingSoon },
  { slug: 'oman-gulf',              name: 'Oman Gulf',               image: '/images/private_jet/private_oman-gulf.jpeg',              groups: comingSoon },
  { slug: 'south-east-asia',        name: 'South East Asia',         image: '/images/private_jet/private_south-east-asia.jpeg',        groups: comingSoon },
  { slug: 'western-mediterranean',  name: 'Western Mediterranean',   image: '/images/private_jet/private_western-mediterranean.jpeg', groups: comingSoon },
  { slug: 'africa',                 name: 'Africa',                  image: '/images/private_jet/private_africa.jpeg',                 groups: comingSoon },
  { slug: 'northern-europe',        name: 'Northern Europe',         image: '/images/private_jet/private_northern-europe.jpeg',        groups: comingSoon },
  { slug: 'caribbean',              name: 'Caribbean',               image: '/images/private_jet/private_caribbean.jpg',                groups: caribbeanJetGroups },
  { slug: 'oceania',                name: 'Oceania',                 image: '/images/private_jet/private_oceania.jpeg',                groups: comingSoon },
];

export function getDestinationBySlug(slug) {
  return destinations.find(d => d.slug === slug) || null;
}

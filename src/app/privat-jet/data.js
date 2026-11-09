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

// Aeroports Bahamas par groupe d'iles (fichier client « privat jet bahamas.pdf », 2026-10-05).
// Type de jet : d'apres le tableau Large / Medium / Light du client.
export const bahamasJetGroups = [
  { island: 'Nassau & Paradise Island', airports: ['Lynden Pindling International Airport (NAS) — all jets'] },
  { island: 'Grand Bahama', airports: ['Grand Bahama International Airport (FPO) — all jets'] },
  { island: 'The Exumas', airports: ['Exuma International Airport (GGT) — all jets', 'Staniel Cay Airport (TYM) — light jets'] },
  { island: 'The Abacos', airports: ['Treasure Cay Airport (TCB) — all jets', 'Leonard M. Thompson International Airport (MHH) — medium & light jets'] },
  { island: 'Eleuthera & Harbour Island', airports: ["Governor's Harbour Airport (GHB) — all jets", 'Rock Sound Airport (RSD) — medium & light jets', 'North Eleuthera Airport (ELH) — medium & light jets'] },
  { island: 'Andros', airports: ['San Andros Airport (SAQ) — light jets', 'Congo Town Airport (TZN) — light jets', 'Andros Town Airport (ASD) — light jets'] },
  { island: 'Bimini & Berry Islands', airports: ['South Bimini Airport (BIM) — medium & light jets', 'Chub Cay Airport (CCZ) — medium & light jets', 'Great Harbour Cay Airport (GHC) — light jets'] },
  { island: 'Îles du Sud / Out Islands', airports: ['San Salvador International Airport (ZSA) — all jets', 'Inagua Airport (IGA) — medium & light jets', 'Stella Maris Airport (SML) — light jets', "Deadman's Cay Airport (LGI) — light jets", 'New Bight Airport (TBI) — light jets', 'Mayaguana Airport (MYG) — light jets'] },
];

// Aeroports Amerique du Nord — Mexique (fichier client « Region-Sub-RegionsAirportGateway-JetSize.csv », 2026-10-19).
export const northAmericaJetGroups = [
  { island: 'Sea of Cortez', airports: ['La Paz Airport (LAP) — La Paz, Espíritu Santo, Balandra — Light, Medium & Large Jets', 'Loreto International Airport (LTO) — Loreto — Aircraft-specific confirmation required'] },
  { island: 'Baja California Sur', airports: ['Cabo San Lucas Airport (CSL) — Cabo San Lucas — Light, Medium & Large Jets', 'Los Cabos International Airport (SJD) — San José del Cabo, East Cape — Light, Medium & Large Jets'] },
  { island: 'Mexican Caribbean', airports: ['Cancún International Airport (CUN) — Cancún, Isla Mujeres, Riviera Maya — Light, Medium & Large Jets'] },
  { island: 'Yucatán North Coast', airports: ['Mérida International Airport (MID) — Holbox, Río Lagartos, Celestún — Aircraft-specific confirmation required'] },
  { island: 'Pacific Mainland', airports: ['Puerto Vallarta Airport (PVR) — Puerto Vallarta, Punta Mita, Bahía de Banderas — Light, Medium & Large Jets'] },
  { island: 'Costa Alegre', airports: ['Playa de Oro Airport (ZLO) — Careyes, Chamela Bay, Manzanillo — Aircraft-specific confirmation required'] },
  { island: 'Oaxaca Pacific Coast', airports: ['Huatulco International Airport (HUX) — Huatulco — Light, Medium & Large Jets'] },
];

// Aeroports Mediterranee Est (fichier client « private-jet-airports-eastern-mediterranean.html », 2026-11-03).
export const easternMediterraneanJetGroups = [
  { island: 'Black Sea', airports: ['Sochi International Airport (AER) — large jets', 'Burgas Airport (BOJ) — medium jets', 'Varna Airport (VAR) — medium jets', 'Constanta Airport (CND) — medium jets'] },
  { island: 'Croatia', airports: ['Dubrovnik Airport (DBV) — large jets', 'Split Airport (SPU) — large jets', 'Zagreb Airport (ZAG) — large jets', 'Zadar Airport (ZAD) — medium jets', 'Pula Airport (PUY) — medium jets', 'Rijeka Airport (Krk) (RJK) — light jets', 'Losinj Airport (LSZ) — light jets'] },
  { island: 'Cyprus', airports: ['Larnaca International Airport (LCA) — large jets', 'Paphos International Airport (PFO) — large jets', 'Ercan Airport (Northern Cyprus) (ECN) — medium jets'] },
  { island: 'Italy – East Coast', airports: ['Venice Marco Polo Airport (VCE) — large jets', 'Bari Karol Wojtyla Airport (BRI) — large jets', 'Trieste Airport (TRS) — medium jets', 'Ravenna Airport (RAN) — light jets'] },
  { island: 'Greece', airports: ['Athens International Airport (ATH) — large jets', 'Thessaloniki Airport (SKG) — large jets', 'Heraklion Airport (Crete) (HER) — large jets', 'Rhodes International Airport (RHO) — large jets', 'Mykonos Airport (JMK) — medium jets', 'Santorini Airport (JTR) — medium jets', 'Corfu Airport (CFU) — medium jets', 'Kos Airport (KGS) — medium jets', 'Chania Airport (Crete) (CHQ) — medium jets', 'Paros Airport (PAS) — light jets', 'Skiathos Airport (JSI) — light jets', 'Kefalonia Airport (EFL) — light jets', 'Zakynthos Airport (ZTH) — light jets', 'Preveza / Lefkada Airport (PVK) — light jets', 'Kalamata Airport (KLX) — light jets'] },
  { island: 'Malta', airports: ['Malta International Airport (MLA) — large jets'] },
  { island: 'Montenegro', airports: ['Podgorica Airport (TGD) — large jets', 'Tivat Airport (TIV) — medium jets', 'Dubrovnik Airport (Croatia – closest to Herceg Novi) (DBV) — light jets'] },
  { island: 'Turkey', airports: ['Istanbul Airport (IST) — large jets', 'Antalya Airport (ANT) — large jets', 'Dalaman Airport (DLM) — large jets', 'Bodrum-Milas Airport (BJV) — medium jets', 'Izmir Airport (ADB) — medium jets', 'Sabiha Gokcen Airport (Istanbul) (SAW) — light jets', 'Gokcen Airport (near Bodrum) (BJV) — light jets'] },
  { island: 'Egypt', airports: ['Hurghada International Airport (HRG) — large jets', 'Sharm El Sheikh International Airport (SSH) — large jets', 'Cairo International Airport (CAI) — large jets', 'Marsa Alam International Airport (RMF) — medium jets', 'Borg El Arab Airport (Alexandria) (HBE) — medium jets', 'El Gouna Airport (EGH) — light jets'] },
  { island: 'Tunisia', airports: ['Tunis-Carthage Airport (TUN) — large jets', 'Enfidha-Hammamet Airport (NBE) — large jets', 'Djerba-Zarzis Airport (DJE) — medium jets', 'Monastir Airport (MIR) — medium jets', 'Sfax-Thyna Airport (SFA) — medium jets', 'Tabarka-Ain Draham Airport (TAE) — light jets', 'Tozeur-Nefta Airport (TOE) — light jets'] },
];

// Aeroports Ocean Indien (fichier client « indian_ocean_yacht_charter_airport_codes_by_aircraft_category.html », 2026-11-03).
// Un aeroport est liste dans chaque categorie de jet ou le client le mentionne (Large / Medium / Small).
export const indianOceanJetGroups = [
  // Tableau client du 2026-11-09 (pays / zone / region / destination / large, medium, small
  // jet), regroupe par zone ; partie « Arabian Sea / Gulf of Oman » retiree (client).
  { island: 'Maldives', airports: ['Velana International Airport (MLE) — large jets', 'Velana International Airport (MLE) — medium jets', 'Gan International Airport (GAN) — medium jets', 'Velana International Airport (MLE) — small jets', 'Dhangethi Airport — small jets', 'Villa Maamigili Airport (VAM) — small jets', 'Dharavandhoo Airport (DRV) — small jets', 'Dhaalu Airport (DDD) — small jets', 'Thimarafushi Airport (TMF) — small jets', 'Kadhdhoo Airport (KDO) — small jets', 'Gan International Airport (GAN) — small jets'] },
  { island: 'Seychelles', airports: ['Seychelles International Airport (SEZ) — large jets', 'Seychelles International Airport (SEZ) — medium jets', 'Seychelles International Airport (SEZ) — small jets', 'Praslin Island Airport (PRI) — small jets', 'Alphonse Airport (ALF) — small jets', 'Farquhar Airstrip — small jets', 'Cosmoledo Airstrip — small jets', 'Astove Airstrip — small jets', 'Aldabra Airstrip — small jets'] },
  { island: 'Mascarene Islands', airports: ['Sir Seewoosagur Ramgoolam International Airport (MRU) — large jets', 'Roland Garros Airport (RUN) — large jets', 'Dzaoudzi Pamandzi International Airport (DZA) — large jets', 'Sir Seewoosagur Ramgoolam International Airport (MRU) — medium jets', 'Roland Garros Airport (RUN) — medium jets', 'Dzaoudzi Pamandzi International Airport (DZA) — medium jets', 'Sir Seewoosagur Ramgoolam International Airport (MRU) — small jets', 'Rodrigues Island Airport (RRG) — small jets', 'Roland Garros Airport (RUN) — small jets', 'Dzaoudzi Pamandzi International Airport (DZA) — small jets'] },
  { island: 'Madagascar', airports: ['Ivato International Airport (TNR) — large jets', 'Fascene Airport (NOS) — medium jets', 'Arrachart Airport (DIE) — medium jets', 'Sainte-Marie Airport (SMS) — medium jets', 'Toliara Airport (TLE) — medium jets', 'Fascene Airport (NOS) — small jets', 'Arrachart Airport (DIE) — small jets', 'Sainte-Marie Airport (SMS) — small jets', 'Toliara Airport (TLE) — small jets'] },
  { island: 'Mozambique', airports: ['Vilankulo Airport (VNX) — large jets', 'Pemba Airport (POL) — large jets', 'Maputo International Airport (MPM) — large jets', 'Vilankulo Airport (VNX) — medium jets', 'Pemba Airport (POL) — medium jets', 'Inhambane Airport (INH) — medium jets', 'Vilankulo Airport (VNX) — small jets', 'Pemba Airport (POL) — small jets', 'Inhambane Airport (INH) — small jets'] },
  { island: 'Tanzania / East Africa', airports: ['Julius Nyerere International Airport (DAR) — large jets', 'Abeid Amani Karume International Airport (ZNZ) — medium jets', 'Pemba Airport (PMA) — medium jets', 'Julius Nyerere International Airport (DAR) — medium jets', 'Abeid Amani Karume International Airport (ZNZ) — small jets', 'Pemba Airport (PMA) — small jets', 'Mafia Airport (MFA) — small jets', 'Julius Nyerere International Airport (DAR) — small jets'] },
  { island: 'Sri Lanka', airports: ['Bandaranaike International Airport (CMB) — large jets', 'Bandaranaike International Airport (CMB) — medium jets', 'Mattala Rajapaksa International Airport (HRI) — medium jets', 'China Bay Airport (TCR) — medium jets', 'Batticaloa Airport (BTC) — medium jets', 'Jaffna International Airport (JAF) — medium jets', 'Bandaranaike International Airport (CMB) — small jets', 'Koggala Airport (KCT) — small jets', 'China Bay Airport (TCR) — small jets', 'Batticaloa Airport (BTC) — small jets', 'Jaffna International Airport (JAF) — small jets'] },
];

const comingSoon = [{ island: 'Coming Soon', airports: ['Information coming soon'] }];

// Ordre identique à /charters/destinations
// `image`     = photo de la card (grille /privat-jet) — PORTRAIT
// `heroImage` = photo du hero plein page sur /privat-jet/<slug> — PAYSAGE de preference (16:9, ~2880x1620)
// CONVENTION : fichier deposé dans /public/images/private_jet/hero/ avec le nom hero_<slug>.<ext>
// Si heroImage est absent (null), la photo de la card sert de fallback (rendu portrait haut).
export const destinations = [
  { slug: 'arctic',                 name: 'The Arctic',                  image: '/images/private_jet/private_arctic.jpeg',                 heroImage: '/images/private_jet/hero/hero_arctic-v2.jpg',                groups: comingSoon },
  { slug: 'bahamas',                name: 'Bahamas',                 image: '/images/private_jet/private_bahamas.jpeg',                heroImage: '/media/client/2026-10-09/hero-private-jet-bahamas.jpg', heroTitleClass: 'pb-16 md:pb-32',               groups: bahamasJetGroups },
  { slug: 'central-america',        name: 'Central America',         image: '/images/private_jet/private_central-america.jpeg',        heroImage: '/images/private_jet/hero/hero_central-america-v2.jpg',       groups: comingSoon },
  { slug: 'east-asia',              name: 'East Asia',               image: '/images/private_jet/private_east-asia.jpeg',              heroImage: '/images/private_jet/hero/hero_east-asia-v2.jpg',             groups: comingSoon },
  { slug: 'eastern-mediterranean',  name: 'Eastern Mediterranean',   image: '/images/private_jet/private_eastern-mediterranean.jpeg', heroImage: '/images/private_jet/hero/hero_eastern-mediterranean.jpg', heroTitleClass: 'pb-16 md:pb-32', groups: easternMediterraneanJetGroups },
  { slug: 'indian-ocean',           name: 'Indian Ocean',            image: '/images/private_jet/private_indian-ocean.jpeg',           heroImage: '/images/private_jet/hero/hero_indian-ocean-v2.jpg',          groups: indianOceanJetGroups },
  { slug: 'indonesia',              name: 'Indonesia',               image: '/images/private_jet/private_indonesia.jpeg',              heroImage: '/images/private_jet/hero/hero_indonesia.jpeg',            groups: comingSoon },
  { slug: 'north-america',          name: 'North America',           image: '/images/private_jet/private_nordamerica.jpeg',            heroImage: '/images/private_jet/hero/hero_north-america-v2.png',         groups: northAmericaJetGroups },
  { slug: 'pacific-ocean',          name: 'Pacific Ocean',           image: '/images/private_jet/private_pacific-ocean.jpeg',          heroImage: '/images/private_jet/hero/hero_pacific-ocean.jpg',         groups: comingSoon },
  { slug: 'oman-gulf',              name: 'Oman Gulf',               image: '/images/private_jet/private_oman-gulf.jpeg',              heroImage: '/images/private_jet/hero/hero_oman-gulf-v2.jpg',            groups: comingSoon },
  { slug: 'south-east-asia',        name: 'South East Asia',         image: '/images/private_jet/private_south-east-asia.jpeg',        heroImage: '/images/private_jet/hero/hero_south-east-asia-v2.jpg',       groups: comingSoon },
  { slug: 'western-mediterranean',  name: 'Western Mediterranean',   image: '/images/private_jet/private_western-mediterranean.jpeg', heroImage: '/images/private_jet/hero/hero_western-mediterranean-v2.jpg', groups: comingSoon },
  { slug: 'africa',                 name: 'Africa',                  image: '/images/private_jet/private_africa.jpeg',                 heroImage: '/images/private_jet/hero/hero_africa-v2.jpg',               groups: comingSoon },
  { slug: 'northern-europe',        name: 'Northern Europe',         image: '/images/private_jet/private_northern-europe.jpeg',        heroImage: '/images/private_jet/hero/hero_northern-europe-v2.jpg',       groups: comingSoon },
  { slug: 'caribbean',              name: 'Caribbean',               image: '/images/private_jet/private_caribbean.jpg',                heroImage: '/images/private_jet/hero/hero_caribbean.jpg',             groups: caribbeanJetGroups, heroObjectPosition: '50% 60%' },
  { slug: 'oceania',                name: 'Oceania',                 image: '/images/private_jet/private_oceania.jpeg',                heroImage: '/images/private_jet/hero/hero_oceania-v2.jpg',               groups: comingSoon },
  { slug: 'antarctica',             name: 'The Antarctica',              image: '/images/private_jet/private_antarctica.jpg',              heroImage: '/images/private_jet/private_antarctica.jpg',             groups: comingSoon },
];

export function getDestinationBySlug(slug) {
  return destinations.find(d => d.slug === slug) || null;
}

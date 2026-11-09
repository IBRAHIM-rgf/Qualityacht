// Cases « Indian Ocean » (client 2026-11-09), sur le modele de North America : 7 regions
// (tableau client, sans Arabian Sea / Gulf of Oman), chacune ouvre sa page
// /charters/destinations/indian-ocean/<slug> avec les bateaux de sa sous-region
// (admin : region « Ocean Indien » + sous-region `key`).
// Module sans 'use client' : partage avec les pages serveur.

// Photo provisoire (choix du client) : image Indian Ocean deja sur le site, en attendant
// les photos du client.
export const IO_CARD_PHOTO = '/images/destinations/animals/Indian-Ocean.jpg';

export const IO_GROUPS = [
  { name: 'Maldives', key: 'maldives', slug: 'maldives',
    places: ['North Malé Atoll', 'South Malé Atoll', 'North Ari Atoll', 'South Ari Atoll', 'Baa Atoll', 'Vaavu Atoll', 'Dhaalu Atoll', 'Thaa Atoll', 'Laamu Atoll', 'Addu Atoll'] },
  { name: 'Seychelles', key: 'seychelles', slug: 'seychelles',
    places: ['Mahé', 'Praslin', 'La Digue', 'Silhouette', 'Curieuse', 'Sainte Anne Marine Park', 'Amirantes', 'Alphonse Group', 'Farquhar Group', 'Cosmoledo', 'Astove', 'Aldabra'] },
  { name: 'Mascarene Islands', key: 'mascarene-islands', slug: 'mascarene-islands',
    places: ['Mauritius', 'Rodrigues', 'Réunion', 'Mayotte'] },
  { name: 'Madagascar', key: 'madagascar', slug: 'madagascar',
    places: ['Nosy Be', 'Mitsio Archipelago', 'Radama Islands', 'Nosy Iranja', 'Diego-Suarez / Antsiranana Bay', 'Sainte-Marie Island', 'Southwest Coast'] },
  { name: 'Mozambique', key: 'mozambique', slug: 'mozambique',
    places: ['Bazaruto Archipelago', 'Quirimbas Archipelago', 'Inhambane Coast', 'Pemba Coast'] },
  { name: 'Tanzania / East Africa', key: 'tanzania-east-africa', slug: 'tanzania-east-africa',
    places: ['Zanzibar Archipelago', 'Pemba Island', 'Mafia Island', 'Mainland Tanzanian Coast'] },
  { name: 'Sri Lanka', key: 'sri-lanka', slug: 'sri-lanka',
    places: ['Colombo', 'Galle', 'Mirissa', 'Trincomalee', 'Pasikuda', 'Jaffna Region'] },
];

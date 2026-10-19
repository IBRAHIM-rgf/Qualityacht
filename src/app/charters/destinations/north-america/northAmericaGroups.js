// Cases « North America » (client 2026-10-15) : 4 regions, chacune ouvre sa page
// /charters/destinations/north-america/<slug> avec les bateaux de sa sous-region
// (cochee dans l'admin : region « Amerique du Nord » + sous-region `key`).
// Module sans 'use client' : partage avec les pages serveur.

// Photo provisoire (choix du client) : image du hero North America, en attendant les
// photos de chaque case.
export const NA_CARD_PHOTO = '/media/client/2026-10-15/north-america-hero/poster.jpg';

// photoFiltered = image au repos (filtree) ; photo = image coloree au survol et en hero.
export const NA_GROUPS = [
  { name: 'East Coast United States', key: 'east-coast-us', slug: 'east-coast-united-states', photo: '/media/client/2026-10-16/north-america-cards/east-coast.jpg', photoFiltered: '/media/client/2026-10-19/north-america-cards/east-coast-filtered.jpg',
    places: ['Carolinas', 'Florida – East Coast', 'Florida – West Coast', 'Florida Keys', 'Georgia', 'Middle Atlantic', 'New England'] },
  { name: 'West Coast United States', key: 'west-coast-us', slug: 'west-coast-united-states', photo: '/media/client/2026-10-16/north-america-cards/west-coast.jpg', photoFiltered: '/media/client/2026-10-19/north-america-cards/west-coast-filtered.jpg',
    places: ['California', 'Pacific Northwest'] },
  { name: 'Canada', key: 'canada', slug: 'canada', photo: '/media/client/2026-10-16/north-america-cards/canada.jpg',
    places: ['British Columbia', 'Ontario', 'Quebec', 'Nova Scotia'] },
  { name: 'Miami', key: 'miami', slug: 'miami', photo: '/media/client/2026-10-16/north-america-cards/miami.jpg', photoFiltered: '/media/client/2026-10-19/north-america-cards/miami-filtered.jpg', places: ['Miami'] },
  { name: 'Mexico', key: 'mexico', slug: 'mexico', photo: '/media/client/2026-10-19/north-america-cards/mexico-cenote.jpg', photoFiltered: '/media/client/2026-10-19/north-america-cards/mexico-cenote-filtered.jpg',
    places: ['Sea of Cortez', 'Baja California Sur', 'Mexican Caribbean', 'Yucatán North Coast', 'Pacific Mainland', 'Costa Alegre', 'Oaxaca Pacific Coast'] },
];

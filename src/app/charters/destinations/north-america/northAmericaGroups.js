// Cases « North America » (client 2026-10-15) : 4 regions, chacune ouvre sa page
// /charters/destinations/north-america/<slug> avec les bateaux de sa sous-region
// (cochee dans l'admin : region « Amerique du Nord » + sous-region `key`).
// Module sans 'use client' : partage avec les pages serveur.

// Photo provisoire (choix du client) : image du hero North America, en attendant les
// photos de chaque case.
export const NA_CARD_PHOTO = '/media/client/2026-10-15/north-america-hero/poster.jpg';

export const NA_GROUPS = [
  { name: 'East Coast United States', key: 'east-coast-us', slug: 'east-coast-united-states', photo: '/media/client/2026-10-16/north-america-cards/east-coast.jpg',
    places: ['Carolinas', 'Florida – East Coast', 'Florida – West Coast', 'Florida Keys', 'Georgia', 'Middle Atlantic', 'New England'] },
  { name: 'West Coast United States', key: 'west-coast-us', slug: 'west-coast-united-states', photo: '/media/client/2026-10-16/north-america-cards/west-coast.jpg',
    places: ['California', 'Pacific Northwest'] },
  { name: 'Canada', key: 'canada', slug: 'canada', photo: '/media/client/2026-10-16/north-america-cards/canada.jpg',
    places: ['British Columbia', 'Ontario', 'Quebec', 'Nova Scotia'] },
  { name: 'Miami', key: 'miami', slug: 'miami', photo: '/media/client/2026-10-16/north-america-cards/miami.jpg', places: ['Miami'] },
];

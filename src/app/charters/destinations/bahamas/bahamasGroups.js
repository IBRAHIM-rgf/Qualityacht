// Groupes d'iles des Bahamas (cases « Bahamas Islands », « Destinations by Region »)
// et photos des cases. Module sans 'use client' : partage avec les pages serveur
// /charters/destinations/bahamas/[group] (client 2026-10-02).

export const CARDS = '/media/client/lydie/2026-09-28/bahamas-cards';
export const BAHAMAS_CARD_PHOTOS = 8;

// key : sous-region de l'admin (client 2026-10-04), pour les pages bateaux des cases.
export const GROUPS = [
  { name: 'Nassau & Paradise Island', key: 'nassau', islands: [
    ['New Providence', 25.03, -77.4],
    ['Nassau', 25.06, -77.35],
    ['Paradise Island', 25.08, -77.32],
    ['Rose Island', 25.1, -77.2]] },
  { name: 'Grand Bahama', key: 'grand-bahama', islands: [
    ['Freeport', 26.53, -78.7],
    ['Lucaya', 26.51, -78.65],
    ['West End', 26.69, -78.97]] },
  { name: 'The Exumas', key: 'exumas', islands: [
    ['Ship Channel Cay', 24.82, -76.83],
    ["Allan's Cay", 24.75, -76.84],
    ['Highborne Cay', 24.71, -76.82],
    ["Norman's Cay", 24.6, -76.81],
    ['Shroud Cay', 24.53, -76.79],
    ['Warderick Wells', 24.39, -76.63],
    ['Compass Cay', 24.26, -76.51],
    ['Big Major Cay', 24.18, -76.46],
    ['Staniel Cay', 24.17, -76.44],
    ['Sampson Cay', 24.21, -76.48],
    ['Musha Cay', 23.9, -76.26],
    ['Great Exuma', 23.55, -75.9],
    ['Georgetown', 23.51, -75.78],
    ['Stocking Island', 23.53, -75.76],
    ['Little Exuma', 23.45, -75.62]] },
  { name: 'The Abacos', key: 'abacos', islands: [
    ['Great Abaco', 26.4, -77.1],
    ['Marsh Harbour', 26.54, -77.06],
    ['Treasure Cay', 26.67, -77.29],
    ['Elbow Cay', 26.53, -76.96],
    ['Hope Town', 26.54, -76.96],
    ['Man-O-War Cay', 26.59, -77.01],
    ['Great Guana Cay', 26.66, -77.12],
    ['Green Turtle Cay', 26.76, -77.33],
    ['Little Harbour', 26.33, -76.99],
    ['Tilloo Cay', 26.47, -76.99],
    ['Lubbers Quarters Cay', 26.49, -76.99],
    ['No Name Cay', 26.73, -77.25],
    ['Scotland Cay', 26.63, -77.07]] },
  { name: 'Eleuthera & Harbour Island', key: 'eleuthera', islands: [
    ['Eleuthera', 25.1, -76.15],
    ['Gregory Town', 25.39, -76.56],
    ["Governor's Harbour", 25.2, -76.24],
    ['Rock Sound', 24.87, -76.16],
    ['Hatchet Bay', 25.35, -76.49],
    ['Harbour Island', 25.5, -76.64],
    ['Dunmore Town', 25.5, -76.64],
    ['Spanish Wells', 25.54, -76.75],
    ['Current Cut', 25.4, -76.79]] },
  { name: 'Andros', key: 'andros', islands: [
    ['North Andros', 24.7, -78.0],
    ['Mangrove Cay', 24.25, -77.65],
    ['South Andros', 23.95, -77.6],
    ['Andros Town', 24.7, -77.77],
    ['Fresh Creek', 24.73, -77.79]] },
  { name: 'Bimini & Berry Islands', key: 'bimini-berry', islands: [
    ['North Bimini', 25.73, -79.28],
    ['South Bimini', 25.7, -79.29],
    ['Gun Cay', 25.57, -79.3],
    ['Great Harbour Cay', 25.75, -77.85],
    ['Chub Cay', 25.41, -77.9],
    ["Frazer's Hog Cay", 25.4, -77.84],
    ["Bond's Cay", 25.52, -77.77]] },
  { name: 'Îles du Sud / Out Islands', key: 'out-islands', islands: [
    ['Cat Island', 24.4, -75.55],
    ['New Bight', 24.29, -75.42],
    ["Arthur's Town", 24.62, -75.67],
    ['Orange Creek', 24.64, -75.7],
    ['Long Island', 23.3, -75.1],
    ['Stella Maris', 23.58, -75.27],
    ["Deadman's Cay", 23.18, -75.1],
    ['Clarence Town', 23.1, -74.98],
    ['San Salvador', 24.05, -74.48],
    ['Cockburn Town', 24.05, -74.53],
    ['Rum Cay', 23.68, -74.85],
    ['Port Nelson', 23.65, -74.84],
    ['Acklins & Crooked Island', 22.55, -74.1],
    ['Long Cay', 22.58, -74.35],
    ['Mayaguana', 22.38, -72.95],
    ["Abraham's Bay", 22.36, -73.0],
    ["Pirate's Well", 22.43, -73.1],
    ['Inagua', 21.1, -73.4],
    ['Matthew Town', 20.95, -73.67],
    ['Little Inagua', 21.47, -73.02],
    ['Ragged Island', 22.2, -75.72],
    ['Duncan Town', 22.19, -75.73],
    ['Water Cay', 22.95, -75.85],
    ['Raccoon Cay', 22.4, -75.83],
    ['Nurse Cay', 22.53, -75.85],
    ['Flamingo Cay', 22.88, -75.87]] },
];

// Adresse de la page d'un groupe : /charters/destinations/bahamas/<slug>.
export function groupSlug(name) {
  return String(name || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

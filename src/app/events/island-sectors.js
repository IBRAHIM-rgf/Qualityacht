// Regroupement des iles du fichier evenements (30 valeurs, tres granulaires) vers les
// 8 SECTEURS standard deja utilises partout ailleurs sur le site (fine-food-dining,
// hotel-palace...). Reduit le filtre "toutes les villes" a une liste geographique
// coherente et courte.

export const SECTORS = [
  'Greater Antilles',
  'Leeward Islands',
  'Leeward Antilles',
  'Windward Islands',
  'Turks & Caicos',
  'Trinidad & Tobago',
  'Grand Cayman',
  'Emerging Destinations',
];

const ISLAND_TO_SECTOR = {
  // Greater Antilles
  'Cuba': 'Greater Antilles',
  'Hispaniola': 'Greater Antilles',
  'Jamaïque': 'Greater Antilles',
  'Porto Rico': 'Greater Antilles',
  // Leeward Islands
  'Antigua': 'Leeward Islands',
  'Saint-Barthélemy': 'Leeward Islands',
  'Saint-Kitts-et-Nevis': 'Leeward Islands',
  'Saint-Martin': 'Leeward Islands',
  'Saint-Martin (partie néerlandaise)': 'Leeward Islands',
  'Sint Maarten': 'Leeward Islands',
  'Saint-John': 'Leeward Islands',
  'Saint-Thomas': 'Leeward Islands',
  'Tortola': 'Leeward Islands',
  'Guadeloupe': 'Leeward Islands',
  'Guadeloupe (arrivée)': 'Leeward Islands',
  'Marie-Galante': 'Leeward Islands',
  // Leeward Antilles
  'Aruba': 'Leeward Antilles',
  'Curaçao': 'Leeward Antilles',
  // Windward Islands
  'Dominique': 'Windward Islands',
  'Martinique': 'Windward Islands',
  'Guadeloupe, Martinique': 'Windward Islands',
  'Sainte-Lucie': 'Windward Islands',
  'Sainte-Lucie (arrivée)': 'Windward Islands',
  'Saint-Vincent': 'Windward Islands',
  'Mustique': 'Windward Islands',
  'Grenade': 'Windward Islands',
  'Barbade': 'Windward Islands',
  // Trinidad & Tobago
  'Trinidad': 'Trinidad & Tobago',
  'Tobago': 'Trinidad & Tobago',
  // Emerging Destinations
  'New Providence': 'Emerging Destinations',
  'Multi-îles': 'Emerging Destinations',
};

export function toSector(island) {
  return ISLAND_TO_SECTOR[island] || 'Emerging Destinations';
}

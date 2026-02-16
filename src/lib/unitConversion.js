/**
 * Convertit des mètres en pieds
 * @param {number} meters - Longueur en mètres
 * @returns {number} - Longueur en pieds
 */
export function metersToFeet(meters) {
  return Math.round(meters * 3.28084);
}

/**
 * Convertit des pieds en mètres
 * @param {number} feet - Longueur en pieds
 * @returns {number} - Longueur en mètres
 */
export function feetToMeters(feet) {
  return Math.round(feet / 3.28084);
}

/**
 * Formate une longueur selon l'unité choisie
 * @param {number} meters - Longueur en mètres
 * @param {string} unit - 'meters', 'feet', ou 'both'
 * @returns {string} - Longueur formatée
 */
export function formatLength(meters, unit = 'both') {
  if (!meters) return 'N/A';

  if (unit === 'meters') return `${meters}m`;
  if (unit === 'feet') return `${metersToFeet(meters)}ft`;

  // both
  return `${meters}m / ${metersToFeet(meters)}ft`;
}

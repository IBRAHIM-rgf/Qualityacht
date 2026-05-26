// src/lib/yachtCache.js
// Extraction d'un snapshot allégé depuis les données complètes Ankor
// Réduit ~10 KB/yacht à ~2 KB/yacht pour stockage rapide en BDD.

const ANKOR_TO_INTERNAL_REGION = {
  'Caribbean': 'caribbean',
  'West Mediterranean': 'west-mediterranean',
  'East Mediterranean': 'east-mediterranean',
  'Indian Ocean & South East Asia': 'indian-ocean',
  'Australasia & South Pacific': 'pacific-ocean',
  'Antarctica': 'arctic',
  'Arabian Gulf': 'arabian-gulf',
  'South & Central America': 'central-america',
  'North America': 'north-america',
  'Northern Europe': 'northern-europe',
  'Africa': 'africa',
};

/**
 * Déduit la région interne ('caribbean'…) depuis un yacht Ankor.
 * Cherche dans destinations[], destination, region puis blueprint.basePort.
 */
export function inferAnkorRegion(yacht) {
  if (!yacht) return null;

  if (yacht.destination && ANKOR_TO_INTERNAL_REGION[yacht.destination]) {
    return ANKOR_TO_INTERNAL_REGION[yacht.destination];
  }

  if (Array.isArray(yacht.destinations)) {
    for (const d of yacht.destinations) {
      if (ANKOR_TO_INTERNAL_REGION[d]) return ANKOR_TO_INTERNAL_REGION[d];
    }
  }

  if (yacht.region && ANKOR_TO_INTERNAL_REGION[yacht.region]) {
    return ANKOR_TO_INTERNAL_REGION[yacht.region];
  }

  if (yacht._rawBlueprint?.region && ANKOR_TO_INTERNAL_REGION[yacht._rawBlueprint.region]) {
    return ANKOR_TO_INTERNAL_REGION[yacht._rawBlueprint.region];
  }

  return null;
}

/**
 * Construit le snapshot allégé stocké dans light_data.
 * Tout est optionnel sauf id et name.
 */
export function extractLightData(yacht) {
  if (!yacht) return null;

  const images = Array.isArray(yacht.images) ? yacht.images : [];
  const hero = images[0] || yacht.hero || null;

  return {
    id: yacht.id || yacht.uri,
    name: yacht.name || null,
    description: yacht.description || null,
    hero_image: hero,
    length: yacht.length || null,
    guests: yacht.guests || yacht.capacity || null,
    cabins: yacht.cabins || null,
    crew: yacht.crew || null,
    year: yacht.year || null,
    type: yacht.type || null,
    location: yacht.location || null,
    price: yacht.pricePerHour || yacht.price || null,
    make: yacht.make || null,
  };
}

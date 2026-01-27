// src/lib/yachts.js - Fonctions partagées pour le fetch des yachts

import { fetchAnkorBearerToken } from '@/lib/utils';
import { getVisibleYachtIds, getFeaturedYachtIds, getYachtSelections } from '@/lib/db';

const ANKOR_API_BASE_URL = "https://api.ankor.io";

export const TYPE_MAP = {
  motor: 'Motor',
  sailing: 'Sailing',
  catamaran: 'Catamaran',
  gulet: 'Gulet',
  'power catamaran': 'Power Catamaran',
  classic: 'Classic',
  expedition: 'Expedition',
  'sport fishing': 'Sport fishing',
};

// Mapping des destinations vers les valeurs de région de l'API Ankor
export const REGION_MAP = {
  // RÉGIONS FONCTIONNELLES
  'west-mediterranean': 'West Mediterranean',
  'east-mediterranean': 'East Mediterranean',
  caribbean: 'Caribbean',
  bahamas: 'Caribbean',
  'indian-ocean': 'Indian Ocean & South East Asia',
  'south-pacific': 'Australasia & South Pacific',
  antarctica: 'Antarctica',
  'arabian-gulf': 'Arabian Gulf',

  // RÉGIONS NON SUPPORTÉES PAR L'API (retournent erreur 400)
  'north-america': 'North America',
  'northern-europe': 'Northern Europe',
  africa: 'Africa',
  'south-central-america': 'South & Central America',
};

/**
 * Récupère les yachts depuis l'API Ankor avec tous les filtres disponibles
 */
async function fetchYachtsFromAnkor(filters, token) {
  const params = new URLSearchParams();

  if (filters.type && TYPE_MAP[filters.type]) {
    params.set('yachtType', TYPE_MAP[filters.type]);
  }

  if (filters.destination && REGION_MAP[filters.destination]) {
    params.set('region', REGION_MAP[filters.destination]);
  }

  if (filters.capacity) {
    params.set('sleeps', filters.capacity.toString());
  }

  if (filters.charterType) {
    params.set('charterType', filters.charterType);
  }

  if (filters.minLength) {
    params.set('minLength', filters.minLength.toString());
  }

  if (filters.maxLength) {
    params.set('maxLength', filters.maxLength.toString());
  }

  if (filters.currency) {
    params.set('currency', filters.currency);
  }

  if (filters.priceMin) {
    params.set('priceMin', (Number(filters.priceMin) * 100).toString());
  }

  if (filters.priceMax) {
    params.set('priceMax', (Number(filters.priceMax) * 100).toString());
  }

  const url = `${ANKOR_API_BASE_URL}/website/search?${params.toString()}`;

  try {
    const cacheKey = `yachts-${params.toString() || 'all'}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 3600,
        tags: [cacheKey]
      }
    });

    if (response.status === 401) {
      throw new Error("Erreur 401: Jeton d'accès Ankor manquant ou invalide.");
    }
    if (!response.ok) {
      console.error("Erreur lors de l'appel à l'API Ankor:", response.status);
      return { hits: [] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Échec de la récupération des yachts Ankor:", error);
    return { hits: [] };
  }
}

/**
 * Fetch avec retry automatique
 */
async function fetchVesselDetails(uri, token, retries = 2) {
  const url = `${ANKOR_API_BASE_URL}/website/entity/${encodeURIComponent(uri)}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 3600,
          tags: [`vessel-${uri}`]
        }
      });

      if (!response.ok) {
        if (attempt === retries) {
          return null;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }

      return await response.json();
    } catch (error) {
      if (attempt === retries) {
        return null;
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  return null;
}

/**
 * Fetch par lots pour éviter surcharge
 */
async function fetchVesselDetailsBatch(vessels, token, batchSize = 10) {
  const results = [];
  const total = vessels.length;

  for (let i = 0; i < total; i += batchSize) {
    const batch = vessels.slice(i, i + batchSize);

    const batchResults = await Promise.all(
      batch.map(vessel => fetchVesselDetails(vessel.uri, token))
    );

    results.push(...batchResults);

    if (i + batchSize < total) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return results;
}

/**
 * Formate le prix pour l'affichage
 */
function formatPrice(priceData) {
  if (!priceData) return null;

  const amount = priceData.price / 100;
  const currency = priceData.currency || 'EUR';

  const formattedAmount = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  const currencySymbols = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'CHF',
  };

  const symbol = currencySymbols[currency] || currency;

  return `${formattedAmount} ${symbol}`;
}

/**
 * Mapper un VesselSummary Ankor + ses détails vers le format YachtCardV2
 */
function mapVesselSummaryToYachtCard(vessel, vesselDetails, appliedFilters) {
  const pricing = vesselDetails?.pricing;
  const blueprint = vesselDetails?.blueprint;

  let pricePerHour = null;
  let price = null;

  if (pricing) {
    if (pricing.weekPricingFrom) {
      pricePerHour = formatPrice(pricing.weekPricingFrom);
    } else if (pricing.dayPricingFrom) {
      price = formatPrice(pricing.dayPricingFrom);
    }
  }

  return {
    id: vessel.uri,
    name: vessel.name || blueprint?.name,
    pricePerHour: pricePerHour,
    price: price,
    description: vesselDetails?.description || undefined,
    length: vessel.length ? `${vessel.length}m` : (blueprint?.length ? `${blueprint.length}m` : undefined),
    guests: vessel.sleeps || blueprint?.sleeps,
    capacity: vessel.sleeps || blueprint?.sleeps,
    cabins: vessel.cabins || blueprint?.cabins,
    year: vessel.builtYear || blueprint?.builtYear,
    refit: blueprint?.refitYear,
    location: blueprint?.basePort?.name || undefined,
    destinations: blueprint?.basePort?.name ? [blueprint.basePort.name] : undefined,
    images: [vessel.hero, ...(blueprint?.images || [])].filter(Boolean),
    type: vessel.yachtType ? vessel.yachtType.toLowerCase() : appliedFilters.type || undefined,
    destination: appliedFilters.destination || undefined,
    make: vessel.make || blueprint?.make,
    _rawPricing: pricing,
    _rawBlueprint: blueprint,
  };
}

/**
 * Fonction principale pour récupérer les yachts d'une destination
 * Utilisée par les pages de destination
 */
export async function fetchYachtsForDestination(destination) {
  try {
    const token = await fetchAnkorBearerToken();

    const filters = {
      destination: destination,
      type: '',
      capacity: null,
      charterType: '',
      minLength: null,
      maxLength: null,
      currency: '',
      priceMin: null,
      priceMax: null,
    };

    const discoveryResponse = await fetchYachtsFromAnkor(filters, token);
    const vesselSummaries = discoveryResponse.hits || [];
    const totalYachtsFound = vesselSummaries.length;

    // Si aucun yacht trouvé, retourner un tableau vide
    if (totalYachtsFound === 0) {
      return {
        yachts: [],
        totalYachts: 0,
        filters,
      };
    }

    const MAX_RESULTS = 50;
    const vesselsToLoad = vesselSummaries.slice(0, MAX_RESULTS);

    const vesselDetails = await fetchVesselDetailsBatch(vesselsToLoad, token, 10);

    const yachts = vesselsToLoad.map((vessel, index) =>
      mapVesselSummaryToYachtCard(vessel, vesselDetails[index], filters)
    );

    return {
      yachts,
      totalYachts: totalYachtsFound,
      filters,
    };
  } catch (error) {
    console.error("Erreur fetchYachtsForDestination:", error);
    return {
      yachts: [],
      totalYachts: 0,
      filters: {
        destination: destination,
        type: '',
        capacity: null,
        charterType: '',
        minLength: null,
        maxLength: null,
        currency: '',
        priceMin: null,
        priceMax: null,
      },
    };
  }
}

/**
 * Fonction pour récupérer les yachts avec filtres personnalisés
 * Utilisée par la page /yachts
 */
export async function fetchYachtsWithFilters(filters) {
  try {
    const token = await fetchAnkorBearerToken();

    const discoveryResponse = await fetchYachtsFromAnkor(filters, token);
    const vesselSummaries = discoveryResponse.hits || [];
    const totalYachtsFound = vesselSummaries.length;

    if (totalYachtsFound === 0) {
      return {
        yachts: [],
        totalYachts: 0,
      };
    }

    const MAX_RESULTS = 50;
    const vesselsToLoad = vesselSummaries.slice(0, MAX_RESULTS);

    const vesselDetails = await fetchVesselDetailsBatch(vesselsToLoad, token, 10);

    const yachts = vesselsToLoad.map((vessel, index) =>
      mapVesselSummaryToYachtCard(vessel, vesselDetails[index], filters)
    );

    return {
      yachts,
      totalYachts: totalYachtsFound,
    };
  } catch (error) {
    console.error("Erreur fetchYachtsWithFilters:", error);
    return {
      yachts: [],
      totalYachts: 0,
    };
  }
}

/**
 * Récupère les yachts visibles selon les présélections de la base de données
 * Utilisé par les pages publiques pour n'afficher que les yachts sélectionnés
 */
export async function fetchVisibleYachts(filters = {}) {
  try {
    // 1. Récupérer les sélections depuis la base
    const selections = await getYachtSelections();

    // Si aucune sélection en DB, utiliser le comportement par défaut (tous les yachts)
    if (!selections || selections.length === 0) {
      return await fetchYachtsWithFilters(filters);
    }

    // 2. Créer les maps pour filtrage rapide
    const visibleIds = new Set(
      selections.filter(s => s.is_visible).map(s => s.yacht_id)
    );
    const featuredIds = new Set(
      selections.filter(s => s.is_featured && s.is_visible).map(s => s.yacht_id)
    );
    const orderMap = new Map(
      selections.map(s => [s.yacht_id, s.display_order])
    );
    const categoryMap = new Map(
      selections.map(s => [s.yacht_id, s.category])
    );

    // 3. Fetch tous les yachts depuis Ankor
    const { yachts: allYachts, totalYachts } = await fetchYachtsWithFilters(filters);

    // 4. Filtrer et enrichir les yachts
    const filteredYachts = allYachts
      .filter(yacht => visibleIds.has(yacht.id))
      .map(yacht => ({
        ...yacht,
        isFeatured: featuredIds.has(yacht.id),
        displayOrder: orderMap.get(yacht.id) ?? 999,
        category: categoryMap.get(yacht.id) || null,
      }));

    // 5. Trier : featured en premier, puis par ordre d'affichage
    filteredYachts.sort((a, b) => {
      // Featured en premier
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      // Puis par ordre
      return (a.displayOrder || 999) - (b.displayOrder || 999);
    });

    return {
      yachts: filteredYachts,
      totalYachts: filteredYachts.length,
      originalTotal: totalYachts,
    };
  } catch (error) {
    console.error("Erreur fetchVisibleYachts:", error);
    // En cas d'erreur DB, fallback sur le comportement par défaut
    return await fetchYachtsWithFilters(filters);
  }
}

/**
 * Version de fetchYachtsForDestination qui respecte les présélections
 */
export async function fetchVisibleYachtsForDestination(destination) {
  try {
    // 1. Récupérer les sélections depuis la base
    const selections = await getYachtSelections();

    // 2. Fetch les yachts de la destination
    const { yachts: allYachts, totalYachts, filters } = await fetchYachtsForDestination(destination);

    // Si aucune sélection en DB, retourner tous les yachts
    if (!selections || selections.length === 0) {
      return { yachts: allYachts, totalYachts, filters };
    }

    // 3. Créer les maps
    const visibleIds = new Set(
      selections.filter(s => s.is_visible).map(s => s.yacht_id)
    );
    const featuredIds = new Set(
      selections.filter(s => s.is_featured && s.is_visible).map(s => s.yacht_id)
    );
    const orderMap = new Map(
      selections.map(s => [s.yacht_id, s.display_order])
    );

    // 4. Filtrer et enrichir
    const filteredYachts = allYachts
      .filter(yacht => visibleIds.has(yacht.id))
      .map(yacht => ({
        ...yacht,
        isFeatured: featuredIds.has(yacht.id),
        displayOrder: orderMap.get(yacht.id) ?? 999,
      }));

    // 5. Trier
    filteredYachts.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return (a.displayOrder || 999) - (b.displayOrder || 999);
    });

    return {
      yachts: filteredYachts,
      totalYachts: filteredYachts.length,
      filters,
    };
  } catch (error) {
    console.error("Erreur fetchVisibleYachtsForDestination:", error);
    return await fetchYachtsForDestination(destination);
  }
}

// src/lib/yachts.js - Fonctions partagées pour le fetch des yachts

import { unstable_cache } from 'next/cache';
import { fetchAnkorBearerToken } from '@/lib/utils';
import { getVisibleYachtIds, getFeaturedYachtIds, getYachtSelections } from '@/lib/db';

// ── Performance (2026-09-10) ──
// Les pages publiques n'affichent que les yachts selectionnes dans l'admin.
// Avant : on telechargeait le detail de TOUTE la flotte Ankor (plusieurs
// centaines d'appels) puis on filtrait ; la reponse depassait la limite de
// 2 Mo du cache Next.js et n'etait jamais mise en cache → 15-60 s par visite.
// Maintenant :
//  A. `onlyIds` : le detail n'est demande a Ankor que pour les yachts visibles.
//  B. les listes publiques finales sont mises en cache 1 h (tag YACHTS_CACHE_TAG),
//     invalidees par l'admin a chaque modification de selection (lib/db.js).
export const YACHTS_CACHE_TAG = 'yachts-visible';
const YACHTS_CACHE_SECONDS = 3600;

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
  'south-east-asia': 'Indian Ocean & South East Asia',
  antarctica: 'Antarctica',
  arctic: 'Antarctica', // Pas de région Arctic spécifique, utiliser Antarctica
  'arabian-gulf': 'Arabian Gulf',
  'central-america': 'South & Central America',
  'south-america': 'South & Central America',
  indonesia: 'Indian Ocean & South East Asia',
  'east-asia': 'Indian Ocean & South East Asia',
  'pacific-ocean': 'Australasia & South Pacific',
  oceania: 'Australasia & South Pacific',

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
    crew: blueprint?.maxCrew,
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
    _rawEntity: vesselDetails,
  };
}

/**
 * Fonction principale pour récupérer les yachts d'une destination
 * Utilisée par les pages de destination
 */
export async function fetchYachtsForDestination(destination, onlyIds = null) {
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
    const allSummaries = discoveryResponse.hits || [];
    const totalYachtsFound = allSummaries.length;
    // onlyIds : ne charger le detail que des yachts demandes (selection admin)
    const vesselSummaries = onlyIds ? allSummaries.filter(v => onlyIds.has(v.uri)) : allSummaries;

    // Si aucun yacht trouvé, retourner un tableau vide
    if (vesselSummaries.length === 0) {
      return {
        yachts: [],
        totalYachts: totalYachtsFound,
        filters,
      };
    }

    const vesselDetails = await fetchVesselDetailsBatch(vesselSummaries, token, 20);

    const yachts = vesselSummaries.map((vessel, index) =>
      mapVesselSummaryToYachtCard(vessel, vesselDetails[index], filters)
    );

    // Trier par nom alphabétique
    yachts.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));

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
export async function fetchYachtsWithFilters(filters, onlyIds = null) {
  try {
    const token = await fetchAnkorBearerToken();

    const discoveryResponse = await fetchYachtsFromAnkor(filters, token);
    const allSummaries = discoveryResponse.hits || [];
    const totalYachtsFound = allSummaries.length;
    // onlyIds : ne charger le detail que des yachts demandes (selection admin)
    const vesselSummaries = onlyIds ? allSummaries.filter(v => onlyIds.has(v.uri)) : allSummaries;

    if (vesselSummaries.length === 0) {
      return {
        yachts: [],
        totalYachts: totalYachtsFound,
      };
    }

    const vesselDetails = await fetchVesselDetailsBatch(vesselSummaries, token, 20);

    const yachts = vesselSummaries.map((vessel, index) =>
      mapVesselSummaryToYachtCard(vessel, vesselDetails[index], filters)
    );

    // Trier par nom alphabétique
    yachts.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));

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
 * NOTE: Ne filtre PAS selon les filtres utilisateur - le filtrage se fait côté client
 */
async function fetchVisibleYachtsUncached(filters = {}) {
  try {
    // 1. Récupérer les sélections depuis la base
    const selections = await getYachtSelections();

    // Si aucune sélection en DB, utiliser le comportement par défaut (tous les yachts sans filtre)
    if (!selections || selections.length === 0) {
      return await fetchYachtsWithFilters({});
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
    const regionMap = new Map(
      selections.map(s => [s.yacht_id, s.region])
    );
    const subRegionMap = new Map(
      selections.map(s => [s.yacht_id, s.sub_region])
    );

    // 3. Fetch les yachts visibles depuis Ankor (SANS les filtres utilisateur,
    //    le filtrage utilisateur est fait côté client) — detail limite a visibleIds.
    const { yachts: allYachts, totalYachts } = await fetchYachtsWithFilters({}, visibleIds);

    // 4. Filtrer UNIQUEMENT selon la présélection BDD
    const filteredYachts = allYachts
      .filter(yacht => visibleIds.has(yacht.id))
      .map(yacht => ({
        ...yacht,
        isFeatured: featuredIds.has(yacht.id),
        displayOrder: orderMap.get(yacht.id) ?? 999,
        category: categoryMap.get(yacht.id) || null,
        region: regionMap.get(yacht.id) || null,
        subRegion: subRegionMap.get(yacht.id) || null,
      }));

    // 4b. OVERRIDES ADMIN : yachts visibles en BDD qu'Ankor n'a pas retourné
    //     (souvent car leur ankor_region ≠ region admin). On les reconstruit depuis BDD
    //     pour qu'ils apparaissent quand même sur /yachts.
    const ankorIds = new Set(allYachts.map(y => y.id));
    const overrides = selections
      .filter(s => s.is_visible && !ankorIds.has(s.yacht_id))
      .map(s => ({
        ...yachtFromSelection(s),
        isFeatured: featuredIds.has(s.yacht_id),
        displayOrder: orderMap.get(s.yacht_id) ?? 999,
        category: categoryMap.get(s.yacht_id) || null,
      }));

    const merged = [...filteredYachts, ...overrides];

    // 5. Trier : featured en premier, puis par ordre d'affichage
    merged.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return (a.displayOrder || 999) - (b.displayOrder || 999);
    });

    return {
      yachts: merged,
      totalYachts: merged.length,
      originalTotal: totalYachts,
    };
  } catch (error) {
    console.error("Erreur fetchVisibleYachts:", error);
    // En cas d'erreur DB, fallback sur le comportement par défaut
    return await fetchYachtsWithFilters({});
  }
}

/**
 * Helper : reconstruit un yacht-like (compatible YachtList/YachtCard) depuis une row selection BDD.
 * Utilisé pour les overrides admin (yacht tagué region=caribbean alors qu'Ankor le classe ailleurs).
 */
function yachtFromSelection(s) {
  const parse = (raw) => {
    if (!raw) return {};
    if (typeof raw === 'string') {
      try { return JSON.parse(raw); } catch { return {}; }
    }
    return raw;
  };
  const light = parse(s.light_data);
  const cached = parse(s.cached_data);
  const full = parse(s.full_data);
  const bp = full?.blueprint || {};

  // Images : full_data > cached_data > light.hero_image
  const images = (bp.images && bp.images.length > 0)
    ? bp.images
    : (cached.images && cached.images.length > 0)
      ? cached.images
      : (light.hero_image ? [light.hero_image] : []);

  return {
    id: s.yacht_id,
    name: s.yacht_name || light.name || cached.name || bp.name,
    description: light.description || cached.description || full.description,
    length: light.length || cached.length || (bp.length ? `${bp.length}m` : null),
    guests: light.guests || cached.guests || cached.capacity || bp.sleeps,
    capacity: light.guests || cached.capacity || bp.sleeps,
    cabins: light.cabins || cached.cabins || bp.cabins,
    crew: light.crew || cached.crew || bp.maxCrew,
    year: light.year || cached.year || bp.builtYear,
    refit: cached.refit || bp.refitYear,
    type: light.type || cached.type || (Array.isArray(full.yachtType) ? full.yachtType[0]?.toLowerCase() : full.yachtType?.toLowerCase()),
    location: light.location || cached.location || bp.basePort?.name,
    price: light.price || cached.price,
    pricePerHour: cached.pricePerHour || light.price,
    make: light.make || cached.make || bp.make,
    images,
    region: s.region || null,
    subRegion: s.sub_region || null,
    pets_allowed: s.pets_allowed,
    groups_allowed: s.groups_allowed,
    water_toys: s.water_toys,
  };
}

/**
 * Récupère les yachts visibles d'une sous-région donnée
 * Fallback : si la BDD ne contient aucune sélection, retourne tous les yachts de la région
 * (cohérent avec le comportement de fetchVisibleYachts).
 */
async function fetchVisibleYachtsForSubRegionUncached(region, subRegion) {
  try {
    const selections = await getYachtSelections();

    // Pas de sélection en BDD → fallback : tous les yachts Ankor pour la région
    if (!selections || selections.length === 0) {
      return await fetchYachtsForDestination(region);
    }

    // IDs des yachts visibles taggés sur cette région.
    // subRegion null → pas de filtre sous-région (utile pour pages meta-region type Bahamas).
    // subRegion fourni → filtre supplémentaire sur sub_region exact.
    const matchingSelections = selections.filter(s => {
      if (!s.is_visible || s.region !== region) return false;
      if (subRegion === null || subRegion === undefined) return true;
      return s.sub_region === subRegion;
    });

    // Aucun yacht taggé → fallback : tous les yachts visibles de la région
    if (matchingSelections.length === 0) {
      return await fetchVisibleYachtsForDestination(region);
    }

    const visibleIds = new Set(matchingSelections.map(s => s.yacht_id));
    const featuredIds = new Set(matchingSelections.filter(s => s.is_featured).map(s => s.yacht_id));
    const orderMap = new Map(matchingSelections.map(s => [s.yacht_id, s.display_order]));

    const { yachts: allYachts, totalYachts, filters } = await fetchYachtsForDestination(region, visibleIds);

    const filteredYachts = allYachts
      .filter(y => visibleIds.has(y.id))
      .map(y => ({
        ...y,
        isFeatured: featuredIds.has(y.id),
        displayOrder: orderMap.get(y.id) ?? 999,
        region,
        subRegion,
      }));

    // Overrides admin : yachts BDD matchant la sous-région mais qu'Ankor ne renvoie pas pour cette région.
    const ankorIds = new Set(allYachts.map(y => y.id));
    const overrides = matchingSelections
      .filter(s => !ankorIds.has(s.yacht_id))
      .map(s => ({
        ...yachtFromSelection(s),
        isFeatured: featuredIds.has(s.yacht_id),
        displayOrder: orderMap.get(s.yacht_id) ?? 999,
        region,
        subRegion,
      }));

    const merged = [...filteredYachts, ...overrides];

    merged.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return (a.displayOrder || 999) - (b.displayOrder || 999);
    });

    return {
      yachts: merged,
      totalYachts: merged.length,
      filters,
    };
  } catch (error) {
    console.error("Erreur fetchVisibleYachtsForSubRegion:", error);
    return await fetchYachtsForDestination(region);
  }
}

/**
 * Version de fetchYachtsForDestination qui respecte les présélections
 */
async function fetchVisibleYachtsForDestinationUncached(destination) {
  try {
    // 1. Récupérer sélections depuis la base
    const selections = await getYachtSelections();

    // Si aucune sélection en DB, retourner tous les yachts
    if (!selections || selections.length === 0) {
      return await fetchYachtsForDestination(destination);
    }

    // 2. Créer les maps
    const visibleIds = new Set(
      selections.filter(s => s.is_visible).map(s => s.yacht_id)
    );

    // 3. Fetch les yachts de la destination — detail limite aux visibles
    const { yachts: allYachts, totalYachts, filters } = await fetchYachtsForDestination(destination, visibleIds);
    const featuredIds = new Set(
      selections.filter(s => s.is_featured && s.is_visible).map(s => s.yacht_id)
    );
    const orderMap = new Map(
      selections.map(s => [s.yacht_id, s.display_order])
    );

    // 4. Filtrer et enrichir les yachts Ankor de la destination
    const filteredYachts = allYachts
      .filter(yacht => visibleIds.has(yacht.id))
      .map(yacht => ({
        ...yacht,
        isFeatured: featuredIds.has(yacht.id),
        displayOrder: orderMap.get(yacht.id) ?? 999,
      }));

    // 5. OVERRIDES ADMIN : yachts taggés region=destination en BDD mais qu'Ankor ne renvoie pas
    //    pour cette région (ankor_region différent). On les reconstruit depuis BDD pour qu'ils
    //    apparaissent quand même côté public.
    const ankorIds = new Set(allYachts.map(y => y.id));
    const overrides = selections
      .filter(s => s.is_visible && s.region === destination && !ankorIds.has(s.yacht_id))
      .map(s => ({
        ...yachtFromSelection(s),
        isFeatured: featuredIds.has(s.yacht_id),
        displayOrder: orderMap.get(s.yacht_id) ?? 999,
      }));

    const merged = [...filteredYachts, ...overrides];

    // 6. Trier : featured d'abord, puis displayOrder
    merged.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return (a.displayOrder || 999) - (b.displayOrder || 999);
    });

    return {
      yachts: merged,
      totalYachts: merged.length,
      filters,
    };
  } catch (error) {
    console.error("Erreur fetchVisibleYachtsForDestination:", error);
    return await fetchYachtsForDestination(destination);
  }
}

// ── Versions mises en cache (1 h, tag YACHTS_CACHE_TAG) des listes publiques ──
// `_rawEntity` (detail Ankor complet, volumineux) est retire des resultats mis
// en cache : aucune page publique ne l'utilise, et il ferait depasser la limite
// de 2 Mo par entree du cache. `_rawBlueprint` et `_rawPricing` sont conserves.
function slimForCache(result) {
  if (!result || !Array.isArray(result.yachts)) return result;
  return {
    ...result,
    yachts: result.yachts.map(({ _rawEntity, ...rest }) => rest),
  };
}

// Les filtres utilisateur ne sont pas appliques ici (filtrage cote client) :
// une seule entree de cache pour toutes les pages qui listent la flotte.
const fetchVisibleYachtsCached = unstable_cache(
  async () => slimForCache(await fetchVisibleYachtsUncached({})),
  ['fetchVisibleYachts'],
  { revalidate: YACHTS_CACHE_SECONDS, tags: [YACHTS_CACHE_TAG] }
);
export async function fetchVisibleYachts(_filters = {}) {
  return fetchVisibleYachtsCached();
}

export const fetchVisibleYachtsForDestination = unstable_cache(
  async (destination) => slimForCache(await fetchVisibleYachtsForDestinationUncached(destination)),
  ['fetchVisibleYachtsForDestination'],
  { revalidate: YACHTS_CACHE_SECONDS, tags: [YACHTS_CACHE_TAG] }
);

export const fetchVisibleYachtsForSubRegion = unstable_cache(
  async (region, subRegion) => slimForCache(await fetchVisibleYachtsForSubRegionUncached(region, subRegion)),
  ['fetchVisibleYachtsForSubRegion'],
  { revalidate: YACHTS_CACHE_SECONDS, tags: [YACHTS_CACHE_TAG] }
);

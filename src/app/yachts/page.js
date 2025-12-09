// src/app/yachts/page.js

import YachtPageClient from './YachtPageClient';
import { fetchAnkorBearerToken } from '@/lib/utils';
import { yachts as localYachts } from '@/data/yachts.js';

const ANKOR_API_BASE_URL = "https://api.ankor.io";

const TYPE_MAP = {
  motor: 'Motor',
  sailing: 'Sailing',
  catamaran: 'Catamaran',
  gulet: 'Gulet',
  'power catamaran': 'Power Catamaran',
  classic: 'Classic',
  expedition: 'Expedition',
  'sport fishing': 'Sport fishing',
};

const REGION_MAP = {
  'west-mediterranean': 'West Mediterranean',
  'east-mediterranean': 'East Mediterranean',
  caribbean: 'Caribbean',
  bahamas: 'Caribbean',
  'north-america': 'North America',
  'northern-europe': 'Northern Europe',
  'indian-ocean': 'Indian Ocean & South East Asia',
  'south-pacific': 'Australasia & South Pacific',
  africa: 'Africa',
  antarctica: 'Antarctica',
  'arabian-gulf': 'Arabian Gulf',
  'south-central-america': 'South & Central America',
};

/**
 * Récupère les yachts depuis l'API Ankor avec tous les filtres disponibles
 */
async function fetchYachtsFromAnkor(filters, token) {
  const params = new URLSearchParams();

  // Filtres de base
  if (filters.type && TYPE_MAP[filters.type]) {
    params.set('yachtType', TYPE_MAP[filters.type]);
  }

  if (filters.destination && REGION_MAP[filters.destination]) {
    params.set('region', REGION_MAP[filters.destination]);
  }

  if (filters.capacity) {
    params.set('sleeps', filters.capacity.toString());
  }

  // Filtres avancés
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
  
  // Prix en centimes (API Ankor attend x100)
  if (filters.priceMin) {
    params.set('priceMin', (Number(filters.priceMin) * 100).toString());
  }
  
  if (filters.priceMax) {
    params.set('priceMax', (Number(filters.priceMax) * 100).toString());
  }

  const url = `${ANKOR_API_BASE_URL}/website/search?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // ✅ OPTIMISATION : Cache Next.js pendant 1 heure
      next: { revalidate: 3600 }
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
 * ✅ OPTIMISATION : Fetch avec retry automatique
 */
async function fetchVesselDetails(uri, token, retries = 2) {
  const url = `${ANKOR_API_BASE_URL}/website/entity/${encodeURIComponent(uri)}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // Cache pendant 1 heure
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        if (attempt === retries) {
          console.error(`Échec définitif pour ${uri} après ${retries + 1} tentatives`);
          return null;
        }
        // Attendre avant de réessayer (1s, 2s, 3s)
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }

      return await response.json();
    } catch (error) {
      if (attempt === retries) {
        console.error(`Erreur lors de la récupération de ${uri}:`, error);
        return null;
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  return null;
}

/**
 * ✅ OPTIMISATION : Fetch par lots pour éviter surcharge
 */
async function fetchVesselDetailsBatch(vessels, token, batchSize = 10) {
  const results = [];
  const total = vessels.length;
  
  for (let i = 0; i < total; i += batchSize) {
    const batch = vessels.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(total / batchSize);
    
    console.log(`📦 Traitement du lot ${batchNum}/${totalBatches} (${batch.length} yachts)`);
    
    const batchResults = await Promise.all(
      batch.map(vessel => fetchVesselDetails(vessel.uri, token))
    );
    
    results.push(...batchResults);
    
    // Petite pause entre les lots (100ms)
    if (i + batchSize < total) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return results;
}

/**
 * Formate le prix pour l'affichage (centimes → euros/dollars)
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
    images: vessel.hero ? [vessel.hero] : (blueprint?.images || []),
    type: vessel.yachtType ? vessel.yachtType.toLowerCase() : appliedFilters.type || undefined,
    destination: appliedFilters.destination || undefined,
    make: vessel.make || blueprint?.make,
    _rawPricing: pricing,
    _rawBlueprint: blueprint,
  };
}

export default async function Page({ searchParams }) {
  try {
    const startTime = Date.now();
    const ANKOR_ACCESS_TOKEN = await fetchAnkorBearerToken();

    // Tous les filtres disponibles
    const initialFilters = {
      type: searchParams.type || '',
      destination: searchParams.destination || '',
      capacity: searchParams.capacity ? Number(searchParams.capacity) : null,
      petFriendly: searchParams.petFriendly === 'true',
      charterType: searchParams.charterType || '',
      minLength: searchParams.minLength ? Number(searchParams.minLength) : null,
      maxLength: searchParams.maxLength ? Number(searchParams.maxLength) : null,
      currency: searchParams.currency || '',
      priceMin: searchParams.priceMin ? Number(searchParams.priceMin) : null,
      priceMax: searchParams.priceMax ? Number(searchParams.priceMax) : null,
    };

    // Étape 1 : Recherche des yachts
    const discoveryResponse = await fetchYachtsFromAnkor(initialFilters, ANKOR_ACCESS_TOKEN);
    const vesselSummaries = discoveryResponse.hits || [];

    console.log(`🔹 ${vesselSummaries.length} yachts trouvés dans l'API Ankor`);

    // ✅ OPTIMISATION : Limiter le nombre de détails à charger
    const MAX_DETAILED_RESULTS = 50;
    const limitedVessels = vesselSummaries.slice(0, MAX_DETAILED_RESULTS);

    if (vesselSummaries.length > MAX_DETAILED_RESULTS) {
      console.log(`⚠️ Limitation à ${MAX_DETAILED_RESULTS} yachts pour optimiser le chargement`);
    }

    // Étape 2 : Récupération des détails par lots
    console.log(`📥 Récupération des détails pour ${limitedVessels.length} yachts...`);
    const vesselDetails = await fetchVesselDetailsBatch(limitedVessels, ANKOR_ACCESS_TOKEN, 10);

    // Étape 3 : Mapping des données
    const ankorYachts = limitedVessels.map((vessel, index) => 
      mapVesselSummaryToYachtCard(vessel, vesselDetails[index], initialFilters)
    );

    // Fusion avec les yachts locaux (optionnel)
    const allYachts = [...ankorYachts, ...localYachts];

    const endTime = Date.now();
    const loadTime = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`✅ ${allYachts.length} yachts chargés en ${loadTime}s`);

    return (
      <YachtPageClient initialFilters={initialFilters} initialData={allYachts} />
    );
  } catch (error) {
    console.error("Échec de l'initialisation de l'API Ankor:", error);
    return <p>Erreur de chargement des yachts: Veuillez vérifier l'authentification.</p>;
  }
}
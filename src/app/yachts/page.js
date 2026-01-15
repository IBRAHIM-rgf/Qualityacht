// src/app/yachts/page.js

import YachtPageClient from './YachtPageClient';
import { fetchAnkorBearerToken } from '@/lib/utils';

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

// Mapping des destinations vers les valeurs de région de l'API Ankor
// ✅ = Testé et fonctionnel | ❌ = API rejette (erreur 400) | ⏳ = Pas encore testé
const REGION_MAP = {
  // ✅ RÉGIONS FONCTIONNELLES (testées 2026-01-13)
  'west-mediterranean': 'West Mediterranean',      // ✅ 357 yachts
  'east-mediterranean': 'East Mediterranean',      // ✅ 1186 yachts
  caribbean: 'Caribbean',                          // ✅ 150 yachts
  bahamas: 'Caribbean',                            // ✅ 150 yachts (même que Caribbean)
  'indian-ocean': 'Indian Ocean & South East Asia', // ✅ 160 yachts
  'south-pacific': 'Australasia & South Pacific',  // ✅ 46 yachts
  antarctica: 'Antarctica',                        // ✅ 2 yachts

  // ❌ RÉGIONS NON SUPPORTÉES PAR L'API (retournent erreur 400)
  'north-america': 'North America',                // ❌ Erreur 400
  'northern-europe': 'Northern Europe',            // ❌ Erreur 400
  africa: 'Africa',                                // ❌ Erreur 400

  'arabian-gulf': 'Arabian Gulf',                  // ✅ 17 yachts

  // ❌ PLUS DE RÉGIONS NON SUPPORTÉES
  'south-central-america': 'South & Central America', // ❌ Erreur 400
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

  // ✅ Filtrage par région avec les valeurs exactes de l'API
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

  // 🔍 Log pour debug - voir les paramètres envoyés à l'API
  console.log('🔗 URL API:', url);
  console.log('📋 Paramètres:', Object.fromEntries(params));

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

    // ✅ Next.js 15 : await searchParams avant utilisation
    const params = await searchParams;

    // Tous les filtres disponibles
    const initialFilters = {
      type: params.type || '',
      destination: params.destination || '',
      capacity: params.capacity ? Number(params.capacity) : null,
      petFriendly: params.petFriendly === 'true',
      charterType: params.charterType || '',
      minLength: params.minLength ? Number(params.minLength) : null,
      maxLength: params.maxLength ? Number(params.maxLength) : null,
      currency: params.currency || '',
      priceMin: params.priceMin ? Number(params.priceMin) : null,
      priceMax: params.priceMax ? Number(params.priceMax) : null,
    };

    // Étape 1 : Recherche des yachts
    const discoveryResponse = await fetchYachtsFromAnkor(initialFilters, ANKOR_ACCESS_TOKEN);
    const vesselSummaries = discoveryResponse.hits || [];

    const totalYachtsFound = vesselSummaries.length;
    console.log(`🔹 ${totalYachtsFound} yachts trouvés dans l'API Ankor`);

    // Étape 2 : Limite raisonnable pour le chargement initial (pagination côté client)
    const MAX_RESULTS = 200;
    const vesselsToLoad = vesselSummaries.slice(0, MAX_RESULTS);
    const actualCount = vesselsToLoad.length;

    if (totalYachtsFound > MAX_RESULTS) {
      console.log(`📄 Chargement de ${MAX_RESULTS} yachts sur ${totalYachtsFound} (pagination côté client)`);
    }

    console.log(`📥 Récupération des détails pour ${actualCount} yachts...`);
    const vesselDetails = await fetchVesselDetailsBatch(vesselsToLoad, ANKOR_ACCESS_TOKEN, 10);

    // Étape 3 : Mapping des données
    const ankorYachts = vesselsToLoad.map((vessel, index) =>
      mapVesselSummaryToYachtCard(vessel, vesselDetails[index], initialFilters)
    );

    // 📊 LOG DES RÉGIONS UNIQUES (pour debug)
    const regions = new Set();
    const destinations = new Set();
    const regionPaths = new Set(); // Pour voir tous les chemins possibles

    // Log le vessel summary (sans détails) du premier yacht
    if (vesselsToLoad.length > 0) {
      console.log('🔍 Structure vessel summary (premier yacht):', JSON.stringify(vesselsToLoad[0], null, 2));
    }

    vesselDetails.forEach((details, idx) => {
      // Collecter destinations depuis tous les yachts
      // Note: basePort n'existe PAS dans blueprint selon nos observations
      // On doit chercher ailleurs pour les régions
    });

    console.log('📊 RÉGIONS TROUVÉES:', Array.from(regions).sort());
    console.log('📍 DESTINATIONS TROUVÉES:', Array.from(destinations).sort().slice(0, 10));

    // ✅ Le filtrage par région est maintenant géré par l'API directement
    // Pas besoin de filtrage côté client
    // ✅ Plus de yachts locaux - uniquement les données de l'API Ankor

    const endTime = Date.now();
    const loadTime = ((endTime - startTime) / 1000).toFixed(2);
    console.log(`✅ ${ankorYachts.length} yachts chargés en ${loadTime}s`);

    return (
      <YachtPageClient
        initialFilters={initialFilters}
        initialData={ankorYachts}
        totalYachts={totalYachtsFound}
      />
    );
  } catch (error) {
    console.error("Échec de l'initialisation de l'API Ankor:", error);
    return <p>Erreur de chargement des yachts: Veuillez vérifier l'authentification.</p>;
  }
}
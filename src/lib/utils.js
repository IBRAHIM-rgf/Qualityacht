// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from 'jsonwebtoken';

// --- Utilitaires de classes ---
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- AUTHENTIFICATION ANKOR AVEC RS256 ---

/**
 * Formatte correctement la clé privée depuis .env
 * Les \n dans le .env.local doivent être remplacés par de vrais retours à la ligne
 */
function formatPrivateKey(key) {
  if (!key) {
    throw new Error('ANKOR_PRIVATE_KEY est manquante dans .env.local');
  }
  
  // Si la clé contient des \n littéraux (comme chaîne), les remplacer
  return key.replace(/\\n/g, '\n');
}

/**
 * Génère un JWT valide pour l'authentification Ankor
 * Utilise RS256 (clés RSA) comme requis par Ankor
 */
export function generateAnkorJWT() {
  const now = Math.floor(Date.now() / 1000);
  
  const payload = {
    scopes: ["website:read:*"],
    iss: process.env.ANKOR_COMPANY_URI,      // c::23544901963
    aud: "ankor.io",                          // Toujours "ankor.io"
    sub: process.env.ANKOR_COMPANY_URI,      // c::23544901963
    iat: now,
    exp: now + (60 * 55)                      // 55 minutes (moins d'1h requis)
  };

  const header = {
    alg: "RS256",
    typ: "JWT",
    kid: process.env.ANKOR_KEY_ID             // Key ID obligatoire
  };

  // Formater la clé privée correctement
  const privateKey = formatPrivateKey(process.env.ANKOR_PRIVATE_KEY);

  // Signer avec la clé PRIVÉE en RS256
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    header: header
  });
}

/**
 * Cache pour le token
 */
let cachedToken = null;
let tokenExpiry = null;

/**
 * Récupère un Bearer Token OAuth depuis l'API Ankor
 */
export async function fetchAnkorBearerToken() {
  // Vérifier le cache
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('✅ Utilisation du token en cache');
    return cachedToken;
  }

  try {
    console.log('🔄 Génération d\'un nouveau token Ankor...');
    
    // Générer le JWT assertion avec RS256
    const assertion = generateAnkorJWT();
    console.log('📝 JWT généré (RS256 avec kid)');
    
    // Requête OAuth
    const response = await fetch(
      `${process.env.ANKOR_API_URL}/iam/oauth/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: assertion
        }).toString()
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur OAuth Ankor:', response.status, errorText);
      throw new Error(`Erreur OAuth Ankor: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    
    // Mise en cache (expire 5 min avant pour sécurité)
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + ((data.expires || 3600) - 300) * 1000;
    
    console.log('✅ Token OAuth récupéré avec succès');
    
    return cachedToken;
    
  } catch (error) {
    console.error('❌ Échec de l\'authentification Ankor:', error);
    throw error;
  }
}

/**
 * Récupère la liste complète des yachts depuis l'API Ankor
 */
export async function getAnkorVessels() {
  try {
    const token = await fetchAnkorBearerToken();
    
    console.log('📡 Récupération de la liste des yachts...');
    
    const response = await fetch(
      `${process.env.ANKOR_API_URL}/entity/vessel/list`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur API Ankor: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ ${data.hits?.length || 0} yachts récupérés`);
    
    return data.hits || [];
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des yachts:', error);
    return [];
  }
}

/**
 * Récupère les détails d'un yacht spécifique
 */
export async function getAnkorVesselDetails(vesselUri) {
  try {
    const token = await fetchAnkorBearerToken();
    
    const response = await fetch(
      `${process.env.ANKOR_API_URL}/entity/vessel/${encodeURIComponent(vesselUri)}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur API Ankor: ${response.status}`);
    }

    return await response.json();
    
  } catch (error) {
    console.error('❌ Erreur détails yacht:', error);
    throw error;
  }
}

/**
 * Recherche de yachts avec filtres via l'API Website
 */
export async function searchAnkorVessels(filters = {}) {
  try {
    const token = await fetchAnkorBearerToken();
    
    const params = new URLSearchParams();
    
    if (filters.name) params.append('name', filters.name);
    if (filters.yachtType) params.append('yachtType', filters.yachtType);
    if (filters.minLength) params.append('minLength', filters.minLength);
    if (filters.maxLength) params.append('maxLength', filters.maxLength);
    if (filters.sleeps) params.append('sleeps', filters.sleeps);
    if (filters.region) params.append('region', filters.region);
    if (filters.currency) params.append('currency', filters.currency);
    if (filters.priceMin) params.append('priceMin', filters.priceMin);
    if (filters.priceMax) params.append('priceMax', filters.priceMax);
    
    const queryString = params.toString();
    const url = `${process.env.ANKOR_API_URL}/website/search${queryString ? '?' + queryString : ''}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Erreur recherche Ankor: ${response.status}`);
    }

    const data = await response.json();
    return data.hits || [];
    
  } catch (error) {
    console.error('❌ Erreur recherche:', error);
    return [];
  }
}

/**
 * Utilitaire: Obtenir l'URL d'une image avec le variant souhaité
 */
export function getAnkorImageUrl(imageUrl, variant = '640w') {
  if (!imageUrl) return null;
  
  // Les URLs Ankor sont relatives, on doit les préfixer avec l'URL de l'API
  const baseUrl = process.env.ANKOR_API_URL || 'https://api.ankor.io';
  
  // Remplacer {imageVariant} par le variant voulu
  // Variants: blur, 108w, 320w, 640w, 960w, 1280w, 2560w
  const urlWithVariant = imageUrl.replace('{imageVariant}', variant);
  
  // Si l'URL commence déjà par http, la retourner telle quelle
  if (urlWithVariant.startsWith('http')) {
    return urlWithVariant;
  }
  
  // Sinon, ajouter le baseUrl
  return `${baseUrl}${urlWithVariant}`;
}

/**
 * Récupère les taux de change depuis Ankor
 */
export async function getAnkorCurrencyRates(baseCurrency = 'EUR') {
  try {
    const token = await fetchAnkorBearerToken();
    
    const response = await fetch(
      `${process.env.ANKOR_API_URL}/currency/fx/${baseCurrency}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur taux de change: ${response.status}`);
    }

    return await response.json();
    
  } catch (error) {
    console.error('❌ Erreur taux de change:', error);
    return null;
  }
}
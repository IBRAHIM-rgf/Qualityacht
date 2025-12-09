# 🚢 Guide Complet d'Intégration API Ankor.io
## README pour Continuation avec Copilot/Claude

---

## 📁 Structure Actuelle du Projet

```
/Users/ugm/Documents/sophie
├── .env.local                          # ⚠️ CREDENTIALS API - À CONFIGURER
├── package.json                        # Dependencies Node.js
├── src
│   ├── app
│   │   └── yachts
│   │       ├── page.js                 # 🔴 Server Component - Récupération API Ankor
│   │       └── YachtPageClient.jsx     # 🟢 Client Component - UI et Filtres
│   ├── components
│   │   ├── YachtCardV2.js              # ✅ Carte yacht (format Ankor)
│   │   ├── YachtCard.js                # ⚠️ Ancienne version (peut être supprimée)
│   │   ├── YachtList.js                # ✅ Liste des yachts
│   │   └── YachtFilters.js             # ✅ Filtres interactifs
│   ├── data
│   │   └── yachts.js                   # ⚠️ Anciennes données mockées (obsolète)
│   ├── lib
│   │   └── utils.js                    # 🔴 CRITICAL - Authentification OAuth Ankor
│   └── utils
│       └── ankorAuth.js                # (Optionnel) Auth alternative
```

---

## 🎯 ÉTAT ACTUEL DU PROJET

### ✅ Ce qui fonctionne déjà:
- Structure Next.js App Router en place
- Composants de base créés (YachtCardV2, YachtList, YachtFilters)
- Architecture Server/Client Components définie
- Fichiers d'authentification créés

### ❌ Ce qui doit être corrigé:

**PROBLÈME PRINCIPAL:** Erreur OAuth "400 missing field(s)"
```
Échec de l'initialisation de l'API Ankor: Error: Erreur OAuth Ankor: 400 missing field(s)
```

**Cause:** JWT mal formé ou credentials incorrects

---

## 🔧 ÉTAPES DE CORRECTION - INSTRUCTIONS COPILOT

### 📍 ÉTAPE 1: Vérifier les Credentials (.env.local)

**PROMPT COPILOT:**
```
Ouvre le fichier .env.local et vérifie que ces variables existent:
- ANKOR_CLIENT_ID
- ANKOR_CLIENT_SECRET
- ANKOR_API_URL (optionnel, défaut: https://api.ankor.io)

Si elles manquent, demande-moi les credentials Ankor pour les ajouter.
```

**Format attendu dans .env.local:**
```env
ANKOR_CLIENT_ID=your_actual_client_id_here
ANKOR_CLIENT_SECRET=your_actual_client_secret_here
ANKOR_API_URL=https://api.ankor.io
```

⚠️ **IMPORTANT:** Ces credentials doivent être fournis par Ankor Software.

---

### 📍 ÉTAPE 2: Installer les Dépendances Manquantes

**PROMPT COPILOT:**
```
Vérifie dans package.json si la librairie 'jsonwebtoken' est installée.
Si elle n'est pas présente, exécute:
npm install jsonwebtoken

Vérifie aussi que Next.js 14+ est installé.
```

**Dependencies requises:**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "jsonwebtoken": "^9.0.0"
  }
}
```

---

### 📍 ÉTAPE 3: Corriger src/lib/utils.js (CRITICAL)

**FICHIER CONTEXT:** `src/lib/utils.js`

**PROMPT COPILOT:**
```
Ouvre src/lib/utils.js et remplace TOUTE la fonction fetchAnkorBearerToken() 
et generateAnkorJWT() par le code suivant. C'est le code correct qui résout 
l'erreur "400 missing field(s)".
```

**CODE COMPLET À UTILISER:**

```javascript
// src/lib/utils.js
import jwt from 'jsonwebtoken';

/**
 * Génère un JWT valide pour l'authentification Ankor
 * Format conforme à la spec OAuth 2.0 JWT Bearer
 */
export function generateAnkorJWT() {
  const now = Math.floor(Date.now() / 1000);
  
  const payload = {
    iss: process.env.ANKOR_CLIENT_ID,      // Issuer (qui émet le token)
    sub: process.env.ANKOR_CLIENT_ID,      // Subject (à qui appartient le token)
    aud: process.env.ANKOR_API_URL || 'https://api.ankor.io', // Audience (destinataire)
    exp: now + (60 * 5),                   // Expiration (5 minutes)
    iat: now,                               // Issued at (maintenant)
  };

  return jwt.sign(payload, process.env.ANKOR_CLIENT_SECRET, {
    algorithm: 'HS256'
  });
}

/**
 * Cache pour éviter de régénérer le token à chaque requête
 */
let cachedToken = null;
let tokenExpiry = null;

/**
 * Récupère un Bearer Token OAuth depuis l'API Ankor
 * Utilise un cache pour optimiser les performances
 */
export async function fetchAnkorBearerToken() {
  // Vérifier le cache
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('✅ Utilisation du token en cache');
    return cachedToken;
  }

  try {
    console.log('🔄 Génération d\'un nouveau token Ankor...');
    
    // Générer le JWT assertion
    const assertion = generateAnkorJWT();
    
    console.log('📤 Requête OAuth vers Ankor...');
    
    // Requête OAuth
    const response = await fetch(
      `${process.env.ANKOR_API_URL || 'https://api.ankor.io'}/iam/oauth/token`,
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
      `${process.env.ANKOR_API_URL || 'https://api.ankor.io'}/entity/vessel/list`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store' // Désactiver le cache Next.js pour les données dynamiques
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur API Ankor: ${response.status}`);
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
      `${process.env.ANKOR_API_URL || 'https://api.ankor.io'}/entity/vessel/${encodeURIComponent(vesselUri)}`,
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
 * Recherche de yachts avec filtres
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
    const url = `${process.env.ANKOR_API_URL || 'https://api.ankor.io'}/website/search${queryString ? '?' + queryString : ''}`;
    
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
  
  // Les URLs Ankor contiennent {imageVariant} à remplacer
  // Variants disponibles: blur, 108w, 320w, 640w, 960w, 1280w, 2560w
  return imageUrl.replace('{imageVariant}', variant);
}

/**
 * Récupère les taux de change depuis Ankor
 */
export async function getAnkorCurrencyRates(baseCurrency = 'EUR') {
  try {
    const token = await fetchAnkorBearerToken();
    
    const response = await fetch(
      `${process.env.ANKOR_API_URL || 'https://api.ankor.io'}/currency/fx/${baseCurrency}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'force-cache', // Les taux changent peu, on peut cacher
        next: { revalidate: 3600 } // Revalider toutes les heures
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
```

---

### 📍 ÉTAPE 4: Corriger src/app/yachts/page.js

**FICHIER CONTEXT:** `src/app/yachts/page.js`

**PROMPT COPILOT:**
```
Ouvre src/app/yachts/page.js et remplace-le par ce code.
Ce Server Component récupère les yachts depuis Ankor et les passe 
au Client Component.
```

**CODE COMPLET:**

```javascript
// src/app/yachts/page.js
import { getAnkorVessels } from '@/lib/utils';
import YachtPageClient from './YachtPageClient';

/**
 * Server Component - Page des yachts
 * Récupère les données depuis l'API Ankor côté serveur
 */
export default async function YachtsPage() {
  let yachts = [];
  let error = null;

  try {
    console.log('🚀 Chargement de la page yachts...');
    yachts = await getAnkorVessels();
    console.log(`✅ ${yachts.length} yachts chargés`);
  } catch (err) {
    console.error('❌ Erreur lors du chargement des yachts:', err);
    error = err.message;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Notre Flotte de Yachts
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Erreur:</strong> {error}
            <p className="text-sm mt-2">
              Vérifiez vos credentials Ankor dans .env.local
            </p>
          </div>
        )}

        <YachtPageClient initialYachts={yachts} />
      </div>
    </div>
  );
}

// Métadonnées de la page
export const metadata = {
  title: 'Nos Yachts | Sophie Yachts',
  description: 'Découvrez notre collection exclusive de yachts de luxe',
};
```

---

### 📍 ÉTAPE 5: Créer/Corriger src/app/yachts/YachtPageClient.jsx

**FICHIER CONTEXT:** `src/app/yachts/YachtPageClient.jsx`

**PROMPT COPILOT:**
```
Ouvre ou crée src/app/yachts/YachtPageClient.jsx avec ce code.
C'est le Client Component qui gère les filtres et l'affichage interactif.
```

**CODE COMPLET:**

```javascript
'use client';

import { useState, useMemo } from 'react';
import YachtList from '@/components/YachtList';
import YachtFilters from '@/components/YachtFilters';

/**
 * Client Component - Gestion des filtres et affichage des yachts
 */
export default function YachtPageClient({ initialYachts = [] }) {
  const [filteredYachts, setFilteredYachts] = useState(initialYachts);
  const [activeFilters, setActiveFilters] = useState({});

  // Filtrer les yachts côté client
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);

    let filtered = [...initialYachts];

    // Filtre par nom
    if (filters.name) {
      filtered = filtered.filter(yacht =>
        yacht.name?.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Filtre par longueur
    if (filters.minLength) {
      filtered = filtered.filter(yacht => 
        yacht.length >= parseFloat(filters.minLength)
      );
    }
    if (filters.maxLength) {
      filtered = filtered.filter(yacht => 
        yacht.length <= parseFloat(filters.maxLength)
      );
    }

    // Filtre par nombre de couchages
    if (filters.sleeps) {
      filtered = filtered.filter(yacht => 
        yacht.sleeps >= parseInt(filters.sleeps)
      );
    }

    // Filtre par constructeur
    if (filters.make) {
      filtered = filtered.filter(yacht =>
        yacht.make?.toLowerCase().includes(filters.make.toLowerCase())
      );
    }

    setFilteredYachts(filtered);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Filtres */}
      <aside className="lg:w-1/4">
        <YachtFilters 
          onFilterChange={handleFilterChange}
          yachtsCount={initialYachts.length}
          filteredCount={filteredYachts.length}
        />
      </aside>

      {/* Liste des Yachts */}
      <main className="lg:w-3/4">
        {filteredYachts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {initialYachts.length === 0 
                ? 'Aucun yacht disponible pour le moment.'
                : 'Aucun yacht ne correspond à vos critères.'}
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              {filteredYachts.length} yacht{filteredYachts.length > 1 ? 's' : ''} trouvé{filteredYachts.length > 1 ? 's' : ''}
            </p>
            <YachtList yachts={filteredYachts} />
          </>
        )}
      </main>
    </div>
  );
}
```

---

### 📍 ÉTAPE 6: Corriger src/components/YachtCardV2.js

**FICHIER CONTEXT:** `src/components/YachtCardV2.js`

**PROMPT COPILOT:**
```
Ouvre src/components/YachtCardV2.js et assure-toi qu'il utilise bien 
la fonction getAnkorImageUrl pour les images.
```

**CODE DE RÉFÉRENCE:**

```javascript
// src/components/YachtCardV2.js
import { getAnkorImageUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function YachtCardV2({ yacht }) {
  // Obtenir l'URL de l'image hero avec le bon variant
  const imageUrl = getAnkorImageUrl(yacht.hero, '640w');
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={yacht.name || 'Yacht'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Pas d'image
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {yacht.name || 'Sans nom'}
        </h3>

        {/* Spécifications */}
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          {yacht.length && (
            <p>📏 Longueur: <strong>{yacht.length}m</strong></p>
          )}
          {yacht.cabins && (
            <p>🛏️ Cabines: <strong>{yacht.cabins}</strong></p>
          )}
          {yacht.sleeps && (
            <p>👥 Couchages: <strong>{yacht.sleeps}</strong></p>
          )}
          {yacht.make && (
            <p>🏗️ Constructeur: <strong>{yacht.make}</strong></p>
          )}
          {yacht.builtYear && (
            <p>📅 Année: <strong>{yacht.builtYear}</strong></p>
          )}
        </div>

        {/* Compagnies */}
        {yacht.companyName && yacht.companyName.length > 0 && (
          <div className="border-t pt-2">
            <p className="text-xs text-gray-500">
              Proposé par: {yacht.companyName.join(', ')}
            </p>
          </div>
        )}

        {/* Bouton détails */}
        <Link
          href={`/yachts/${encodeURIComponent(yacht.uri)}`}
          className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
}
```

---

### 📍 ÉTAPE 7: Corriger src/components/YachtList.js

**FICHIER CONTEXT:** `src/components/YachtList.js`

**PROMPT COPILOT:**
```
Vérifie que YachtList.js utilise bien YachtCardV2 et affiche 
correctement la grille de yachts.
```

**CODE DE RÉFÉRENCE:**

```javascript
// src/components/YachtList.js
import YachtCardV2 from './YachtCardV2';

export default function YachtList({ yachts = [] }) {
  if (!yachts || yachts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun yacht à afficher</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {yachts.map((yacht) => (
        <YachtCardV2 key={yacht.uri} yacht={yacht} />
      ))}
    </div>
  );
}
```

---

### 📍 ÉTAPE 8: Corriger src/components/YachtFilters.js

**FICHIER CONTEXT:** `src/components/YachtFilters.js`

**PROMPT COPILOT:**
```
Vérifie YachtFilters.js et assure-toi qu'il a tous les filtres 
de base (nom, longueur, couchages, constructeur).
```

**CODE DE RÉFÉRENCE:**

```javascript
// src/components/YachtFilters.js
'use client';

import { useState } from 'react';

export default function YachtFilters({ onFilterChange, yachtsCount, filteredCount }) {
  const [filters, setFilters] = useState({
    name: '',
    minLength: '',
    maxLength: '',
    sleeps: '',
    make: ''
  });

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const emptyFilters = {
      name: '',
      minLength: '',
      maxLength: '',
      sleeps: '',
      make: ''
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow sticky top-4">
      <h2 className="text-xl font-bold mb-4">Filtres</h2>

      {/* Compteur */}
      <div className="mb-6 p-3 bg-blue-50 rounded">
        <p className="text-sm text-blue-900">
          <strong>{filteredCount}</strong> sur <strong>{yachtsCount}</strong> yachts
        </p>
      </div>

      {/* Nom */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Nom du yacht
        </label>
        <input
          type="text"
          value={filters.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Rechercher..."
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Longueur */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Longueur (mètres)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={filters.minLength}
            onChange={(e) => handleChange('minLength', e.target.value)}
            placeholder="Min"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={filters.maxLength}
            onChange={(e) => handleChange('maxLength', e.target.value)}
            placeholder="Max"
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Couchages */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Couchages minimum
        </label>
        <input
          type="number"
          value={filters.sleeps}
          onChange={(e) => handleChange('sleeps', e.target.value)}
          placeholder="Ex: 6"
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Constructeur */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Constructeur
        </label>
        <input
          type="text"
          value={filters.make}
          onChange={(e) => handleChange('make', e.target.value)}
          placeholder="Ex: Sunseeker"
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bouton reset */}
      <button
        onClick={handleReset}
        className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}
```

---

## 🧪 TESTS À EFFECTUER

### Test 1: Authentification OAuth

**PROMPT COPILOT:**
```
Lance le serveur de développement avec 'npm run dev' et vérifie 
dans la console qu'il n'y a plus d'erreur "400 missing field(s)".
Tu devrais voir:
✅ Token OAuth récupéré avec succès
```

### Test 2: Chargement des Yachts

**PROMPT COPILOT:**
```
Va sur http://localhost:3000/yachts et vérifie que:
1. Les yachts s'affichent correctement
2. Les images se chargent
3. Aucune erreur dans la console
```

### Test 3: Filtres

**PROMPT COPILOT:**
```
Teste les filtres:
1. Recherche par nom
2. Filtre par longueur min/max
3. Filtre par nombre de couchages
4. Bouton "Réinitialiser"
```

---

## 🐛 DEBUGGING - Si ça ne marche toujours pas

### Erreur: "400 missing field(s)"

**PROMPT COPILOT:**
```
Affiche-moi le contenu de .env.local (masque les secrets) et 
vérifie que ANKOR_CLIENT_ID et ANKOR_CLIENT_SECRET sont bien définis.

Ensuite, ajoute des console.log dans generateAnkorJWT() pour voir 
le payload généré:

console.log('JWT Payload:', payload);
```

### Erreur: "Module not found: Can't resolve 'jsonwebtoken'"

**PROMPT COPILOT:**
```
Exécute:
npm install jsonwebtoken
puis redémarre le serveur
```

### Erreur: Images ne se chargent pas

**PROMPT COPILOT:**
```
Vérifie dans next.config.js qu'on autorise les domaines Ankor:

module.exports = {
  images: {
    domains: ['api.ankor.io', 'cdn.ankor.io'],
  },
}
```

---

## 📚 PROCHAINES ÉTAPES (Fonctionnalités avancées)

### Étape Suivante 1: Page Détails d'un Yacht

**PROMPT COPILOT:**
```
Crée src/app/yachts/[uri]/page.js pour afficher les détails 
complets d'un yacht avec:
- Toutes les spécifications
- Galerie d'images complète
- Informations équipage
- Calendrier de disponibilité
```

**Fichier à créer:** `src/app/yachts/[uri]/page.js`

### Étape Suivante 2: Recherche Avancée avec API Ankor

**PROMPT COPILOT:**
```
Modifie YachtPageClient.jsx pour utiliser searchAnkorVessels() 
au lieu de filtrer côté client. Cela permettra:
- Recherche par région
-
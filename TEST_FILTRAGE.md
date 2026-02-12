# TEST DU SYSTÈME DE FILTRAGE

## Architecture

### Côté Client (`/yachts`)
1. **Page serveur** (`src/app/yachts/page.js`) : Appelle `fetchVisibleYachts()`
2. **fetchVisibleYachts** (`src/lib/yachts.js`) :
   - Récupère les sélections depuis la BDD
   - Fetch TOUS les yachts Ankor (sans filtres utilisateur)
   - Filtre pour garder UNIQUEMENT les yachts présents dans la BDD (`yacht_selections`)
   - Enrichit avec `region`, `isFeatured`, `displayOrder`
3. **YachtPageClient** (`src/app/yachts/YachtPageClient.jsx`) :
   - Reçoit tous les yachts de la BDD
   - Applique les filtres utilisateur CÔTÉ CLIENT :
     - `type` : Filtre par type de yacht (motor, sailing, catamaran, etc.)
     - `destination` : Filtre par région BDD ou location
     - `capacity` : Filtre par nombre de guests
     - `minLength` / `maxLength` : Filtre par longueur
     - `priceMin` / `priceMax` : Filtre par prix
     - `petFriendly` / `groupFriendly` : Filtres extras

### Côté Admin (`/admin/yachts`)
1. **Page serveur** (`src/app/admin/yachts/page.js`) : Charge les sélections BDD
2. **AdminYachtPanel** (`src/app/admin/yachts/AdminYachtPanel.jsx`) :
   - Recherche dans Ankor via `/api/admin/yachts/search`
3. **API Admin** (`src/app/api/admin/yachts/search/route.js`) :
   - Appelle `fetchYachtsWithFilters(filters)`
   - Retourne TOUS les yachts Ankor correspondant aux filtres

---

## Tests à Effectuer

### Test 1 : Côté Client - Yachts BDD uniquement
**URL** : `http://localhost:3000/yachts`
**Attendu** : SEULEMENT les yachts présents dans `yacht_selections` avec `is_visible = true`

#### Vérification :
1. Ouvrir la console développeur
2. Compter le nombre de yachts affichés
3. Vérifier dans la BDD :
   ```sql
   SELECT COUNT(*) FROM yacht_selections WHERE is_visible = true;
   ```
4. Le nombre doit correspondre

---

### Test 2 : Filtre par Type (Motor)
**URL** : `http://localhost:3000/yachts?type=motor`
**Attendu** : Seulement les yachts de type "motor" présents dans la BDD

#### Vérification :
- Tous les yachts affichés doivent avoir `type = "motor"`
- Le compteur doit afficher le bon nombre

---

### Test 3 : Filtre par Destination (West Mediterranean)
**URL** : `http://localhost:3000/yachts?destination=west-mediterranean`
**Attendu** : Seulement les yachts avec `region = "west-mediterranean"` dans la BDD

#### Vérification :
- Vérifier que tous les yachts ont la bonne région
- Aucun yacht d'une autre région ne doit apparaître

---

### Test 4 : Filtre par Capacité (12 guests)
**URL** : `http://localhost:3000/yachts?capacity=12`
**Attendu** : Seulement les yachts avec `guests >= 12`

#### Vérification :
- Tous les yachts affichés doivent pouvoir accueillir au moins 12 guests

---

### Test 5 : Filtre par Longueur (30m - 50m)
**URL** : `http://localhost:3000/yachts?minLength=30&maxLength=50`
**Attendu** : Seulement les yachts entre 30m et 50m

#### Vérification :
- Tous les yachts affichés doivent avoir une longueur entre 30m et 50m

---

### Test 6 : Filtre par Prix (max 50000)
**URL** : `http://localhost:3000/yachts?priceMax=50000`
**Attendu** : Seulement les yachts avec prix <= 50000€

#### Vérification :
- Tous les yachts affichés doivent avoir un prix inférieur ou égal à 50000€

---

### Test 7 : Admin - Tous les yachts Ankor
**URL** : `http://localhost:3000/admin/yachts?token=VOTRE_TOKEN`
**Attendu** :
- Interface de recherche Ankor
- Possibilité de rechercher TOUS les yachts disponibles dans Ankor
- Pas de limitation aux yachts de la BDD

#### Vérification :
1. Faire une recherche sans filtres
2. Vérifier qu'on obtient beaucoup plus de résultats que côté client
3. Chercher un yacht qui n'est PAS dans la BDD
4. Il doit apparaître dans les résultats admin

---

### Test 8 : Admin - Filtre par Type (Sailing)
**URL** : Admin avec filtre `type=sailing`
**Attendu** : Tous les yachts "sailing" d'Ankor (pas seulement ceux de la BDD)

---

## Problèmes à Corriger

### ❌ Problème 1 : Yachts non-BDD apparaissent côté client
**Cause** : `fetchVisibleYachts` filtre mal
**Solution** : ✅ CORRIGÉ - `fetchVisibleYachts` récupère tous les yachts Ankor puis filtre avec `visibleIds.has(yacht.id)`

### ❌ Problème 2 : Filtre destination ne fonctionne pas
**Cause** : Le filtre cherche dans `y.destination` qui n'existe pas toujours
**Solution** : ✅ CORRIGÉ - Vérifie d'abord `y.region` (champ BDD), puis `y.destinations`, puis `y.location`

### ❌ Problème 3 : Mauvaise région affichée
**Cause** : La région n'est pas stockée dans la BDD
**Solution** : ✅ CORRIGÉ - Ajout de `regionMap` dans `fetchVisibleYachts`

---

## Résumé des Changements

### `src/lib/yachts.js`
```javascript
// Fetch TOUS les yachts Ankor SANS les filtres utilisateur
const { yachts: allYachts } = await fetchYachtsWithFilters({});

// Ajouter regionMap
const regionMap = new Map(
  selections.map(s => [s.yacht_id, s.region])
);

// Enrichir avec region
.map(yacht => ({
  ...yacht,
  region: regionMap.get(yacht.id) || null,
}));
```

### `src/app/yachts/YachtPageClient.jsx`
```javascript
// Filtre destination corrigé
if (filters.destination) {
  result = result.filter(y => {
    // Vérifier région BDD
    if (y.region === filters.destination) return true;
    // Vérifier destinations
    if (y.destinations?.some(...)) return true;
    // Vérifier location
    if (y.location?.includes(...)) return true;
    return false;
  });
}
```

---

## Statut

- ✅ Labels Guests/Cabins corrigés
- ✅ Double filtrage corrigé
- ✅ Filtre destination corrigé
- ⏳ Tests en attente

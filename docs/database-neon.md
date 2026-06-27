# Base de données — Neon (Vercel Postgres)

Guide pratique pour gérer la BDD du projet. **TL;DR : on n'écrit jamais de migration SQL à la main. On ajoute une ligne `ALTER TABLE … IF NOT EXISTS` dans `ensureV3Schema()`, et elle s'applique toute seule.**

## 1. C'est quoi / où

- **Fournisseur** : **Neon** (Postgres serverless), branché via l'intégration **Vercel**.
  Ce n'est **pas** Supabase.
- **Connexion** : [`src/lib/db.js`](../src/lib/db.js)
  ```js
  import { neon } from '@neondatabase/serverless';
  const sql = neon(process.env.DATABASE_URL); // DATABASE_URL injectée par Vercel
  ```
- **Table principale** : `yacht_selections` (1 ligne = 1 yacht présélectionné).
- Toutes les requêtes passent par le tag `sql\`…\`` (paramétré, donc protégé contre l'injection).

## 2. Comment marchent les migrations (le point important)

Il n'y a **pas** d'outil de migration externe. Le schéma est garanti par des fonctions
**idempotentes** dans `src/lib/db.js` qui ne font que des `... IF NOT EXISTS` :

- `ensureV3Schema()` → toutes les colonnes de `yacht_selections`
  (`ankor_region`, `light_data`, `full_data`, `categories`, `handicaps`, …) + index.
- `ensureAdminSessionsSchema()` → table `admin_sessions`.

`IF NOT EXISTS` veut dire : si la colonne/table existe déjà, l'instruction ne fait **rien**.
On peut donc l'appeler autant de fois qu'on veut, à chaud, sans risque.

### Quand `ensureV3Schema()` est-elle déclenchée ?

Automatiquement, sans action manuelle :

- **À l'ouverture du panel admin** — `GET /api/admin/yachts` appelle `ensureV3Schema()` avant de lire.
- À chaque **import de région** — `POST /api/admin/yachts/import-region`.
- Via le **migrate** explicite — `POST /api/admin/yachts/migrate?token=…` (sert surtout au backfill).

👉 Conséquence concrète : **dès que quelqu'un ouvre `/admin/yachts`, Neon exécute les `ALTER`
manquants.** Aucune commande à lancer, aucun SQL à copier-coller.

## 3. Ajouter une colonne (la recette, 3 étapes)

Exemple réel : la colonne `handicaps` (tableau JSONB d'ids).

1. **Déclarer la colonne** dans `ensureV3Schema()` ([`src/lib/db.js`](../src/lib/db.js)) :
   ```js
   await sql`ALTER TABLE yacht_selections ADD COLUMN IF NOT EXISTS handicaps JSONB DEFAULT '[]'::jsonb`;
   ```
2. **L'écrire** dans `updateYachtEnrichedData()` (même fichier) — pour un JSONB, on suit le
   modèle de `categories` (COALESCE : `null`/`undefined` = on garde l'existant, sinon on remplace) :
   ```js
   handicaps = COALESCE(${handicaps == null ? null : JSON.stringify(handicaps)}::jsonb, handicaps),
   ```
   Et l'exposer côté API dans l'action `enrich` de [`src/app/api/admin/yachts/route.js`](../src/app/api/admin/yachts/route.js).
3. **La lire** :
   - Admin : ajouter la colonne au `SELECT` de `getSelectedYachtsWithData()`.
   - Public : `getYachtSelections()` fait déjà `SELECT *`, donc rien à faire.

C'est tout. Au prochain chargement de l'admin, la colonne est créée et utilisable.

## 4. Types de colonnes utilisés

- **Multi-sélection / liste** (catégories, handicaps) → `JSONB DEFAULT '[]'::jsonb`, lu/écrit
  comme un tableau JS (helper `parseHandicaps` / `parseCategories` pour parser une valeur BDD).
- **Texte simple** (custom_title, region, sub_region) → `VARCHAR` / `TEXT`.
- **Booléen** (pets_allowed, is_visible…) → `BOOLEAN`.

## 5. Variables d'environnement

- `DATABASE_URL` — connexion Neon (auto-injectée par Vercel ; en local, dans `.env.local`).
- `ADMIN_SECRET_TOKEN` — protège les routes admin (`?token=…`).

## 6. À NE PAS faire

- ❌ Pas de `DROP`/`ALTER … DROP COLUMN` automatique : on n'enlève jamais une colonne dans
  `ensureV3Schema()` (ça s'exécuterait à chaque ouverture admin).
- ❌ Pas de migration SQL manuelle hors `ensureV3Schema()` : ça crée de la dérive.
- ❌ Pas de requête sans le tag `sql\`…\`` (risque d'injection).

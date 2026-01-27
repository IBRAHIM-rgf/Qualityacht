# Configuration du Panneau Admin Yachts

## 1. Configuration de Neon (Vercel Postgres)

### Étape 1 : Créer la base sur Vercel
1. Aller sur [Vercel Dashboard](https://vercel.com) → votre projet → Storage
2. Cliquer sur **Create Database** → **Neon** → **Create**
3. Nommer la base : `qualityacht-db`
4. Région : choisir `eu-west-1` (Frankfurt) ou la plus proche
5. Vercel ajoutera automatiquement `DATABASE_URL` aux variables d'environnement

### Étape 2 : Créer la table
1. Dans le dashboard Neon (ou via Vercel Storage → votre DB → Query)
2. Exécuter le contenu de `scripts/create-yacht-selections-table.sql`

### Étape 3 : Configurer le token admin
1. Générer un token sécurisé :
   ```bash
   # Sur Mac/Linux
   openssl rand -hex 32

   # Ou utiliser un générateur en ligne
   ```
2. Ajouter dans Vercel → Settings → Environment Variables :
   ```
   ADMIN_SECRET_TOKEN=votre-token-genere-ici
   ```

## 2. Variables d'environnement requises

```env
# Existantes (API Ankor)
ANKOR_API_URL=https://api.ankor.io
ANKOR_COMPANY_URI=xxx
ANKOR_KEY_ID=xxx
ANKOR_PRIVATE_KEY=xxx

# Nouvelles (Admin + Neon)
DATABASE_URL=postgres://...  # Auto-ajouté par Vercel
ADMIN_SECRET_TOKEN=xxx       # Votre token secret
```

## 3. Accès au panneau admin

URL : `https://votre-site.vercel.app/admin/yachts?token=VOTRE_TOKEN`

⚠️ **Ne partagez jamais ce lien publiquement !**

## 4. Fonctionnalités

- **Toggle visibilité** : Masquer/afficher un yacht sur le site
- **Featured** : Mettre en avant un yacht (affiché en premier)
- **Drag & drop** : Réorganiser l'ordre d'affichage
- **Catégories** : Organiser par catégorie (luxe, sport, famille, etc.)
- **Synchronisation** : Importer les nouveaux yachts depuis Ankor

## 5. Déploiement

```bash
# Tester localement (nécessite .env.local avec DATABASE_URL)
npm run dev

# Déployer
git push origin UXadmin
# Puis créer une PR vers main sur GitHub
```

## 6. Structure des fichiers créés

```
src/
├── lib/
│   └── db.js                    # Client Neon + fonctions CRUD
├── app/
│   ├── admin/
│   │   ├── layout.js            # Layout sans header/footer
│   │   └── yachts/
│   │       ├── page.js          # Page admin serveur
│   │       └── AdminYachtPanel.jsx  # Interface interactive
│   └── api/
│       └── admin/
│           └── yachts/
│               ├── route.js     # API CRUD
│               └── sync/
│                   └── route.js # Sync avec Ankor
scripts/
└── create-yacht-selections-table.sql  # Migration SQL
```

## 7. Utilisation sur le site public

Pour utiliser les présélections sur les pages publiques, remplacez :
- `fetchYachtsWithFilters()` par `fetchVisibleYachts()`
- `fetchYachtsForDestination()` par `fetchVisibleYachtsForDestination()`

Ces nouvelles fonctions filtrent automatiquement les yachts selon vos présélections.

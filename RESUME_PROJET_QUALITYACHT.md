# Résumé Complet du Projet Qualityacht

> Document généré pour consultation externe - Janvier 2026

---

## 1. Vue d'Ensemble du Projet

**Qualityacht** est un site web de location de yachts de luxe développé avec Next.js 15. Le site affiche des yachts provenant de l'API Ankor (service tiers de gestion de flotte nautique).

### Stack Technique
- **Framework**: Next.js 15.1.9 (App Router)
- **Frontend**: React 19.2.1
- **Styling**: TailwindCSS 3.4.1
- **UI Components**: Radix UI
- **Hébergement actuel**: Vercel
- **Source de données**: API Ankor (externe)

---

## 2. Architecture Actuelle

```
┌─────────────────────────────────────────────────────────────┐
│                        QUALITYACHT                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐         ┌─────────────┐                  │
│   │  API Ankor  │ ──────▶ │  Next.js    │ ──────▶ Vercel   │
│   │  (yachts)   │  fetch  │  (SSR/ISR)  │  deploy          │
│   └─────────────┘         └─────────────┘                  │
│                                                             │
│   Pas de base de données locale                            │
│   Pas de panneau d'administration                          │
│   Pas d'authentification utilisateur                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Structure des Dossiers
```
src/
├── app/                          # Next.js App Router
│   ├── yachts/                   # Page listing yachts
│   │   ├── page.js              # Composant serveur
│   │   ├── YachtPageClient.jsx  # Composant client (filtres)
│   │   └── loading.js           # Spinner de chargement
│   ├── charters/destinations/    # Pages par destination
│   │   └── [destination]/       # Routes dynamiques
│   └── layout.js                # Layout racine
├── lib/
│   ├── yachts.js               # Logique fetch yachts Ankor
│   └── utils.js                # Auth JWT Ankor + utilitaires
└── components/
    ├── YachtCardV2.js          # Carte yacht avec carousel
    ├── YachtList.js            # Grille de yachts
    ├── YachtFilters.js         # Panneau de filtres
    ├── YachtModal.js           # Modal détails yacht
    └── ui/                     # Composants Radix UI
```

---

## 3. Fonctionnement de l'API Ankor

### Authentification
- **Type**: JWT OAuth avec RS256 (clé RSA asymétrique)
- **Flow**:
  1. Génère un JWT avec la clé privée RSA
  2. Échange contre un Bearer Token via `/iam/oauth/token`
  3. Token mis en cache 55 minutes

### Variables d'environnement requises
```env
ANKOR_COMPANY_URI=c::23544901963
ANKOR_PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----...
ANKOR_KEY_ID=xxx
ANKOR_API_URL=https://api.ankor.io
```

### Endpoints utilisés
- `POST /iam/oauth/token` - Obtenir token
- `POST /website/vessel/search` - Rechercher yachts
- `GET /website/vessel/{id}` - Détails yacht

### Fonctions principales (src/lib/yachts.js)
```javascript
fetchYachtsWithFilters(filters)    // Page /yachts
fetchYachtsForDestination(dest)    // Pages destinations
```

### Données récupérées par yacht
- Nom, prix, description
- Dimensions (longueur, capacité, cabines)
- Images (avec variants responsive)
- Localisation, destinations
- Type (Crewed/Bareboat)
- Données blueprint et pricing brutes

---

## 4. Système de Cache Actuel

- **ISR (Incremental Static Regeneration)**: `revalidate: 3600` (1h)
- **Cache tags** pour invalidation ciblée
- **Pas de persistance locale** - tout vient d'Ankor à chaque revalidation

---

## 5. Besoin : Page de Présélection Admin

### Objectif
Créer un panneau d'administration pour :
- Activer/désactiver des yachts sur le site
- Mettre en avant certains yachts (featured)
- Définir l'ordre d'affichage
- Organiser par catégories personnalisées
- Ajouter des tags et notes internes

### Contrainte
- Pas d'authentification complexe (URL secrète avec token)
- Rester sur Vercel pour l'hébergement

---

## 6. Proposition : Supabase pour le Stockage

### Pourquoi Supabase ?
- Base PostgreSQL managée
- API REST auto-générée
- Dashboard admin inclus
- Tier gratuit généreux (500MB, 50k requêtes/mois)
- Row Level Security (RLS) intégré

### Schéma proposé
```sql
CREATE TABLE yacht_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  yacht_id TEXT UNIQUE NOT NULL,        -- ID Ankor
  is_visible BOOLEAN DEFAULT true,      -- Toggle ON/OFF
  is_featured BOOLEAN DEFAULT false,    -- Mise en avant
  display_order INTEGER DEFAULT 0,      -- Ordre affichage
  category TEXT,                        -- Catégorie custom
  custom_tags TEXT[],                   -- Tags multiples
  notes TEXT,                           -- Notes admin
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Flux de données proposé
```
1. Admin accède à /admin/yachts?token=SECRET
2. Fetch tous les yachts depuis Ankor
3. Fetch statuts depuis Supabase
4. Affiche interface de gestion
5. Sauvegarde modifications → Supabase
6. Site public fetch Ankor → filtre avec Supabase → affiche
```

### Coût Supabase
- **Gratuit**: 500MB DB, 1GB storage, 50k requêtes/mois
- **Pro ($25/mois)**: 8GB DB, 100GB storage, illimité

---

## 7. Alternative : Vercel Postgres / Vercel KV

### Vercel Postgres
- PostgreSQL serverless intégré à Vercel
- Même langage SQL que Supabase
- Pas de dashboard admin visuel
- Intégration native avec Next.js

**Pricing Vercel Postgres:**
- **Hobby (gratuit)**: 256MB storage, 60h compute/mois
- **Pro ($20/mois Vercel)**: Inclus dans le plan

### Vercel KV (Redis)
- Key-Value store (pas relationnel)
- Ultra-rapide pour lecture
- Moins adapté pour requêtes complexes

**Pricing Vercel KV:**
- **Hobby**: 256MB, 30k requêtes/mois
- **Pro**: Inclus dans plan Vercel Pro

---

## 8. Comparaison Supabase vs Vercel DB

| Critère | Supabase | Vercel Postgres | Vercel KV |
|---------|----------|-----------------|-----------|
| **Type** | PostgreSQL | PostgreSQL | Redis |
| **Dashboard Admin** | Oui (excellent) | Non | Non |
| **API REST auto** | Oui | Non | Non |
| **Requêtes SQL** | Oui | Oui | Non |
| **Intégration Vercel** | Manuelle | Native | Native |
| **Tier gratuit** | 500MB | 256MB | 256MB |
| **Auth intégrée** | Oui | Non | Non |
| **Realtime** | Oui | Non | Non |
| **Latence** | ~50-100ms | ~20-50ms | ~5-20ms |
| **Complexité setup** | Moyenne | Faible | Faible |

### Avantages Supabase
- Dashboard pour voir/éditer les données sans code
- Auth prête à l'emploi si besoin futur
- Realtime pour mises à jour live
- Écosystème riche (storage, functions)
- Communauté active

### Avantages Vercel Postgres
- Zéro config supplémentaire (déjà sur Vercel)
- Latence optimale (même infra)
- Un seul fournisseur à gérer
- Facturation unifiée

### Avantages Vercel KV
- Latence minimale
- Parfait pour cache/sessions
- Simple pour données clé-valeur

---

## 9. Recommandation

### Pour ce projet spécifique :

**Option A - Supabase** (ma recommandation initiale)
- Meilleur si vous voulez un dashboard visuel pour gérer les yachts
- Meilleur si vous prévoyez d'ajouter auth utilisateur plus tard
- Meilleur pour debugging (voir les données directement)

**Option B - Vercel Postgres**
- Meilleur si vous voulez tout centraliser chez Vercel
- Meilleur pour la latence
- Plus simple à maintenir (un seul provider)

**Option C - Vercel KV**
- Suffisant si la structure reste simple (juste toggle + ordre)
- Le plus rapide en lecture
- Moins flexible pour requêtes complexes

### Mon avis
Pour une gestion complète (toggle + ordre + featured + catégories + tags), **Supabase ou Vercel Postgres** sont équivalents techniquement. Le choix dépend de :
- Voulez-vous un dashboard visuel ? → Supabase
- Voulez-vous tout chez Vercel ? → Vercel Postgres

---

## 10. Questions pour l'Autre IA

1. Entre Supabase et Vercel Postgres, lequel recommandez-vous pour ce cas d'usage (présélection de ~50-200 yachts) ?

2. Y a-t-il des inconvénients à utiliser deux providers (Vercel + Supabase) vs tout centraliser sur Vercel ?

3. Pour une évolution future (auth admin, analytics, multi-utilisateurs), quelle solution offre le meilleur chemin de migration ?

4. Considérant que le site est déjà sur Vercel, la latence supplémentaire de Supabase (~50-100ms) est-elle problématique ?

5. Existe-t-il d'autres alternatives pertinentes (PlanetScale, Neon, Turso) pour ce cas d'usage ?

---

## 11. Implémentation Prévue

### Fichiers à créer
```
src/lib/supabase.js              # OU src/lib/vercel-db.js
src/app/admin/yachts/page.js
src/app/admin/yachts/AdminYachtPanel.jsx
src/components/admin/YachtSelectionCard.jsx
src/components/admin/DragDropList.jsx
```

### Fichiers à modifier
```
src/lib/yachts.js                # Ajouter filtrage par présélections
src/app/yachts/page.js           # Intégrer les présélections
```

### Dépendances à ajouter
```bash
# Si Supabase
npm install @supabase/supabase-js

# Si Vercel Postgres
npm install @vercel/postgres

# Pour drag & drop
npm install @dnd-kit/core @dnd-kit/sortable
```

---

*Fin du document - Prêt pour consultation externe*

# Admin Yachts — Architecture et Workflow

Doc complète du système de gestion des yachts, BDD, et fiche détail enrichie.

## Vue d'ensemble

Le système repose sur 3 piliers :

1. **API Ankor** — source externe de tous les yachts (catalogue mondial)
2. **BDD Neon** (`qualityacht-db`, plan Free) — cache intelligent + sélection admin
3. **Interface admin wizard** (5 étapes) — pour gérer la sélection et la répartition

## BDD — Table `yacht_selections`

Source de vérité pour les yachts publiés sur le site. Chaque ligne a 3 niveaux de données :

| Colonne | Type | Taille | Usage |
|---|---|---|---|
| `yacht_id` | VARCHAR | clé Ankor | identifiant unique (uri Ankor) |
| `yacht_name` | VARCHAR | nom yacht | affichage |
| `ankor_region` | VARCHAR(50) | ex: `caribbean` | **immuable** — région source Ankor, sert de vérité |
| `region` | VARCHAR | éditable | région admin (peut différer d'ankor_region) |
| `sub_region` | VARCHAR | éditable | sous-région admin (greater-antilles, leeward-islands, etc.) |
| `light_data` | JSONB | ~2 KB | snapshot allégé : description + 1ère photo + meta |
| `full_data` | JSONB | ~10-15 KB | entity Ankor complet : description, blueprint (51+ images), crew (jusqu'à 38), pricing, amenities, toys (avec quantités), entertainment, tenders, cabinLayout, specs techniques |
| `cached_data` | JSONB | legacy | ancien snapshot (gardé pour compat) |
| `is_visible`, `is_featured`, `display_order` | flags admin | — | tri/affichage public |
| `pets_allowed`, `groups_allowed`, `water_toys` | bool | — | filtres rapides |
| `custom_title`, `custom_description`, `custom_price` | text | — | overrides éditoriaux |

**Volume actuel** (mai 2026) : 181 yachts Caraïbes en BDD, table ≈ 2 MB.

## Endpoints API

Tous protégés par `?token=$ADMIN_SECRET_TOKEN`.

| Endpoint | Méthode | Rôle |
|---|---|---|
| `/api/admin/yachts` | GET | liste + stats |
| `/api/admin/yachts` | POST | ajoute 1 yacht (calcule light_data + ankor_region) |
| `/api/admin/yachts` | PATCH | actions : `visibility`, `featured`, `order`, `enrich` |
| `/api/admin/yachts?yacht_id=…` | DELETE | retire un yacht |
| `/api/admin/yachts/search` | GET | proxy recherche Ankor |
| `/api/admin/yachts/migrate` | POST | applique schéma v3 + backfill (idempotent) |
| `/api/admin/yachts/import-region?region=caribbean` | POST | **bulk** : fetch toute une région Ankor + upsert avec full_data |

## Wizard admin — 5 étapes

URL : `/admin/yachts?token=<TOKEN>`

1. **Rechercher** — filtres Ankor (type, destination, longueur, prix)
2. **Ajouter** — multi-select des résultats, bulk add à la BDD (région pré-remplie depuis Ankor)
3. **Région** — vue d'ensemble par région, alerte sur mismatch ankor↔admin, bouton "Ré-importer Caraïbes"
4. **Sous-région** — buckets par sous-région (greater-antilles, leeward-islands, etc.), multi-select + assign bulk
5. **Personnaliser** — édition individuelle (titre, prix, description, options, visibilité)

Navigation : clic direct sur étape ou flèches précédent/suivant.

**Verrou souple région** : dans la modal d'édition, si tu choisis une région ≠ ankor_region, un bandeau orange te prévient mais ne bloque pas.

## Fiches publiques

### `/yachts?destination=caribbean`
Affiche les 181 yachts Caraïbes. Dropdown sous-région cascade quand destination est sélectionnée — tu vois alors uniquement les 8 sous-régions Caraïbes (Greater Antilles, Leeward Islands, Windward Islands, Leeward Antilles, Turks & Caicos, Trinidad & Tobago, BVI, Grand Cayman).

### `/charters/destinations/caribbean`
Page éditoriale canonique (réutilise le rendu de `caribbean-v15`). Cards par sous-région, accordéons destinations, popular anchorages, FAQ.

### `/yacht-detail-v6` — fiche enrichie
Lit `full_data` depuis `yacht_selections`. Affiche n'importe quel yacht via `?name=...` :
- `/yacht-detail-v6` → Coral Ocean (défaut)
- `/yacht-detail-v6?name=OKTO`
- `/yacht-detail-v6?name=ABUNDANCE`

Sections affichées (chacune cachée si vide dans Ankor) :
1. Hero photo + nom + builder/modèle
2. Prix + bouton Enquire + Base Port
3. Specs résumées (Builder, Length, Year, Guests, Cabins, Crew)
4. Description Ankor complète
5. Specifications techniques (length, beam, draft, topSpeed, cruiseSpeed, engines, hull, architect…)
6. Cabin Layout (master, doubles, singles…)
7. Amenities (badges)
8. Entertainment (badges)
9. Water Toys (avec quantités ×N)
10. Tenders
11. Crew (grille avatars + nom + rôle)
12. Pricing weekly/daily
13. Galerie 6 photos/page + lightbox

## Comment refresh les données

### Ajouter / Mettre à jour une région entière
```bash
TOKEN=$(grep ADMIN_SECRET_TOKEN .env.local | cut -d= -f2)
curl -X POST "https://mamzellehazel.vercel.app/api/admin/yachts/import-region?token=$TOKEN&region=caribbean"
```
Ou depuis le wizard admin : étape 3 → bouton "Ré-importer Caraïbes".

Régions valides : `caribbean`, `bahamas`, `west-mediterranean`, `east-mediterranean`, `indian-ocean`, `south-east-asia`, `pacific-ocean`, `arabian-gulf`, `arctic`, `africa`, etc.

**Idempotent** — ré-exécuter ne duplique pas, met à jour `light_data` + `full_data` + `ankor_region` **sans toucher** aux choix admin (`region`, `sub_region`, `custom_*`).

### Inspecter la BDD
```bash
node scripts/check-full-data.mjs
```

### Voir la réponse Ankor brute
```bash
node scripts/dump-ankor-raw.mjs Caribbean       # ou autre région
```

## Capacité BDD (plan Free Neon)

| Item | Volume actuel | Limite Free | % |
|---|---|---|---|
| Storage table yacht_selections | 2 MB | — | — |
| Storage total | < 50 MB | 500 MB | < 10% |
| Compute time | bas | 191 h/mois | < 1% |

Largement sous les limites. Possible d'importer toutes les régions du monde sans souci (~10 régions × 2 MB ≈ 20 MB).

## Fichiers clés

- [src/lib/db.js](../src/lib/db.js) — toutes les fonctions BDD
- [src/lib/yachts.js](../src/lib/yachts.js) — fetch Ankor + mapping
- [src/lib/yachtCache.js](../src/lib/yachtCache.js) — `extractLightData()`, `inferAnkorRegion()`
- [src/app/admin/yachts/AdminYachtPanel.jsx](../src/app/admin/yachts/AdminYachtPanel.jsx) — wizard 5 étapes
- [src/app/api/admin/yachts/import-region/route.js](../src/app/api/admin/yachts/import-region/route.js) — bulk import
- [src/app/yacht-detail-v6/](../src/app/yacht-detail-v6/) — fiche enrichie
- [scripts/migrate-yacht-selections-v3.sql](../scripts/migrate-yacht-selections-v3.sql) — schéma BDD de référence

# LOVAPE - Routes et Contrats (Etape 0)

## 1) Regles d'auth
1. Routes publiques: acces sans login.
2. Routes admin UI/API: session admin requise.
3. Session admin basee sur mot de passe `ADMIN_PASSWORD` et cookie HttpOnly.
4. Rate-limit sur endpoints admin sensibles.

## 2) Routes publiques (UI)
| Methode | Route | Auth | Description |
|---|---|---|---|
| GET | `/` | Public | Home + messages responsables + acces catalogue |
| GET | `/age-gate` | Public | Verification age (date de naissance) |
| GET | `/catalog/e-liquides` | Public | Listing e-liquides + filtres/tri/pagination |
| GET | `/catalog/materiel-mtl` | Public | Listing materiel MTL + filtres/tri/pagination |
| GET | `/product/[slug]` | Public | Fiche produit detaillee |
| GET | `/cart` | Public | Panier localStorage |
| GET | `/checkout/request` | Public | Formulaire demande de commande |
| GET | `/checkout/confirmation/[orderRef]` | Public | Confirmation post soumission |
| GET | `/guide` | Public | Hub guide et contenus de bon usage |
| GET | `/guide/[slug]` | Public | Article du guide |
| GET | `/livraison` | Public | Politique livraison |
| GET | `/retours` | Public | Politique retours |
| GET | `/contact` | Public | Contact / SAV |
| GET | `/mentions-legales` | Public | Page legale |
| GET | `/cgv` | Public | CGV (template + TODO legal) |
| GET | `/confidentialite` | Public | Politique confidentialite |
| GET | `/cookies` | Public | Politique cookies + consent |

## 3) Routes admin (UI)
| Methode | Route | Auth | Description |
|---|---|---|---|
| GET | `/admin/login` | Public | Ecran login admin |
| POST | `/admin/login` | Public | Creation session admin |
| POST | `/admin/logout` | Admin | Suppression session admin |
| GET | `/admin` | Admin | Dashboard |
| GET | `/admin/brands` | Admin | Liste marques |
| GET | `/admin/categories` | Admin | Liste categories |
| GET | `/admin/products` | Admin | Liste produits |
| GET | `/admin/products/new` | Admin | Creation produit |
| GET | `/admin/products/[id]` | Admin | Edition produit |
| GET | `/admin/orders` | Admin | Liste commandes |
| GET | `/admin/orders/[id]` | Admin | Detail commande |
| GET | `/admin/consents` | Admin | Logs consentements |

## 4) Routes API publiques
| Methode | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/catalog/products` | Public | Recherche liste produits |
| GET | `/api/catalog/products/[slug]` | Public | Detail produit |
| POST | `/api/checkout/request` | Public | Cree commande statut `REQUESTED` |
| POST | `/api/contact` | Public | Message SAV/contact |
| POST | `/api/consent` | Public | Enregistre consentement analytics |

## 5) Routes API admin
| Methode | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/admin/brands` | Admin | Liste marques |
| POST | `/api/admin/brands` | Admin | Cree marque |
| PATCH | `/api/admin/brands/[id]` | Admin | Met a jour marque |
| GET | `/api/admin/categories` | Admin | Liste categories |
| POST | `/api/admin/categories` | Admin | Cree categorie (guard pod/puff/jetable) |
| PATCH | `/api/admin/categories/[id]` | Admin | Met a jour categorie |
| GET | `/api/admin/products` | Admin | Liste produits |
| POST | `/api/admin/products` | Admin | Cree produit (guard disposable/pod/puff) |
| PATCH | `/api/admin/products/[id]` | Admin | Met a jour produit |
| GET | `/api/admin/orders` | Admin | Liste commandes |
| GET | `/api/admin/orders/[id]` | Admin | Detail commande |
| PATCH | `/api/admin/orders/[id]/status` | Admin | Change statut commande |
| GET | `/api/admin/orders/export.csv` | Admin | Export CSV commandes |
| GET | `/api/admin/consents/export.csv` | Admin | Export CSV consent logs |

## 6) Conventions de validation et erreurs
1. Toutes les mutations passent par validation Zod.
2. Payload invalide:
   - HTTP 400
   - message clair et actionnable
3. Non authentifie admin:
   - HTTP 401/403 selon contexte
4. Contrainte produit interdite (pod/puff/jetable/disposable):
   - HTTP 422
   - code applicatif explicite (`PRODUCT_POLICY_BLOCKED`)

## 7) Notes implementation Step A+
1. Middleware global:
   - injecte `requestId`
   - applique headers securite
   - protege routes admin
2. Route `/dev/styleguide` visible uniquement hors production.

## 8) Notes implementation Step C
1. Listing catalogue publics operationnels:
   - `/catalog/e-liquides`
   - `/catalog/materiel-mtl`
2. Query params supportes pour les listings:
   - `q` (recherche texte)
   - `brand` (slug marque)
   - `nicotine` (e-liquides)
   - `type` (materiel MTL)
   - `sort` (`relevance`, `price-asc`, `price-desc`, `name-asc`, `name-desc`)
   - `stock` (`all`, `in-stock`)
   - `page` (pagination)
3. Fiche produit publique operationnelle:
   - `/product/[slug]`
4. Etats UI couverts:
   - loading (`loading.tsx`)
   - empty result
   - error boundary segment.

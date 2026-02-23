# LOVAPE - Modele de Donnees (Etape 0)

## 1) Base cible
1. SGBD: PostgreSQL.
2. ORM: Prisma.
3. Objectif: schema stable MVP + extensible V2 (paiement, stock atomique, analytics).

## 2) Enums prevues
```text
CategoryFamily = E_LIQUID | MTL_MATERIAL
ProductType = E_LIQUID | MTL_MOD | MTL_CLEAROMIZER
ProductStatus = DRAFT | ACTIVE | ARCHIVED
StockPolicy = FINITE | INFINITE
OrderStatus = REQUESTED | REVIEWING | CONFIRMED | CANCELLED
ConsentScope = NECESSARY | ANALYTICS
ConsentDecision = ACCEPTED | REJECTED
```

## 3) Entites principales
### 3.1 Brand
- id (cuid, pk)
- name (string, unique)
- slug (string, unique)
- isActive (boolean, default true)
- createdAt, updatedAt

Contraintes:
1. Pour e-liquides, la marque doit etre dans la liste autorisee MVP.
2. slug unique et stable.

### 3.2 Category
- id (cuid, pk)
- name (string)
- slug (string, unique)
- family (enum CategoryFamily)
- description (string, nullable)
- isActive (boolean, default true)
- sortOrder (int, default 0)
- createdAt, updatedAt

Contraintes:
1. slug et name ne doivent jamais contenir pod, podmod, puff, jetable, disposable.
2. family restreint a `E_LIQUID` ou `MTL_MATERIAL`.

### 3.3 Product
- id (cuid, pk)
- sku (string, unique)
- slug (string, unique)
- name (string)
- shortDescription (string)
- longDescription (text)
- type (enum ProductType)
- status (enum ProductStatus, default DRAFT)
- brandId (fk -> Brand.id)
- categoryId (fk -> Category.id)
- priceCents (int, >= 0)
- stockPolicy (enum StockPolicy, default FINITE)
- stockQty (int, default 0)
- tags (string[], optionnel)
- warningRequired (boolean, default true)
- imageUrl (string, optionnel)
- specJson (jsonb, optionnel, specs techniques structurees)
- e-liquid specs optionnelles:
  - nicotineMg (int, nullable)
  - pgRatio (int, nullable)
  - vgRatio (int, nullable)
  - volumeMl (int, nullable)
- materiel MTL specs optionnelles:
  - recommendedPowerMinW (int, nullable)
  - recommendedPowerMaxW (int, nullable)
  - airflowStyle (string, nullable)
  - connectorType (string, nullable, ex: "510")
  - resistanceRange (string, nullable)
- createdAt, updatedAt

Contraintes:
1. Interdiction absolue pods/puffs/jetables/disposables via validation serveur.
2. Interdiction absolue de type "DISPOSABLE" (meme si payload externe tente de l'envoyer).
3. `stockQty` non negatif.
4. `priceCents` non negatif.

### 3.4 Order
- id (cuid, pk)
- orderRef (string, unique lisible humain, ex: LVP-2026-000123)
- status (enum OrderStatus, default REQUESTED)
- customerFirstName (string)
- customerLastName (string)
- customerEmail (string)
- customerPhone (string, nullable)
- customerMessage (text, nullable)
- legalAcceptedAt (datetime)
- ageConfirmedAt (datetime)
- analyticsConsentAt (datetime, nullable)
- currency (string, default EUR)
- totalCents (int, >= 0)
- createdAt, updatedAt

### 3.5 OrderItem
- id (cuid, pk)
- orderId (fk -> Order.id)
- productId (fk -> Product.id, nullable pour historique)
- productNameSnapshot (string)
- skuSnapshot (string)
- unitPriceCents (int, >= 0)
- quantity (int, >= 1)
- lineTotalCents (int, >= 0)
- configJson (jsonb, nullable) // futur configurateur mod+clearo

### 3.6 ConsentLog
- id (cuid, pk)
- scope (enum ConsentScope)
- decision (enum ConsentDecision)
- pagePath (string)
- requestId (string)
- userAgent (string, nullable)
- ipHash (string, nullable)
- userHash (string, nullable)
- createdAt (datetime)

Objectif:
1. Preuve RGPD de consentement.
2. Export CSV admin.

### 3.7 AdminSession
- id (cuid, pk)
- tokenHash (string, unique)
- createdAt (datetime)
- expiresAt (datetime)
- lastSeenAt (datetime, nullable)
- ipHash (string, nullable)
- userAgent (string, nullable)

## 4) Index recommandes
1. `Product(status, categoryId, updatedAt desc)`
2. `Product(slug)` unique
3. `Product(sku)` unique
4. `Order(status, createdAt desc)`
5. `Order(orderRef)` unique
6. `ConsentLog(scope, createdAt desc)`
7. `Category(slug)` unique
8. `Brand(slug)` unique

## 5) Integrite et garde-fous
1. Validation Zod avant ecriture DB pour toute mutation.
2. Guard metier cote serveur pour bloquer pods/puffs/jetables/disposables.
3. Pas de seed ni affichage de produits interdits.
4. Audit des champs sensibles admin (V2 si necessaire).

## 6) Transactions et stock (preparation V2)
1. Toute future deduction de stock doit passer en transaction Prisma.
2. Strategie `FINITE`:
   - verifier disponibilite
   - decrementation atomique
3. Strategie `INFINITE`:
   - pas de decrementation.

## 7) Seed minimum (MVP)
1. Marques e-liquides autorisees:
   - Alfaliquid, VDLV, Terroir Vapeur, Vegetol, Curieux, Savourea
2. Produits fictifs:
   - 5 a 10 e-liquides
   - 3 a 6 materiels MTL
3. Zero pod/puff/jetable/disposable.

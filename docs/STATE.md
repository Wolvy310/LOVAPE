# LOVAPE - STATE (Etape B)

## Etape en cours
- Etape B terminee: fondation Postgres + Prisma completee.

## Faits realises
1. Schema Prisma complet implemente:
   - enums metier (`CategoryFamily`, `ProductType`, `ProductStatus`, `StockPolicy`, `OrderStatus`, `ConsentScope`, `ConsentDecision`)
   - modeles `Brand`, `Category`, `Product`, `Order`, `OrderItem`, `ConsentLog`, `AdminSession`
2. Index et relations ajoutes selon `docs/DATA_MODEL.md`.
3. Migration initiale SQL creee:
   - `prisma/migrations/20260223153000_init/migration.sql`
   - `prisma/migrations/migration_lock.toml`
4. Garde-fous SQL ajoutes dans la migration:
   - blocage pod/podmod/puff/jetable/disposable (categories + produits)
   - checks non-negatifs (prix, stock, totaux, quantites)
   - checks ratios PG/VG
   - coherence puissance min/max materiel MTL
5. Seed Prisma idempotent implemente:
   - 6 marques e-liquides autorisees
   - 1 marque materiel neutre
   - 10 produits fictifs conformes (6 e-liquides + 4 materiels MTL)
6. Couche DB serveur ajoutee:
   - singleton Prisma dans `src/server/db.ts`
7. Regles metier utilitaires ajoutees:
   - `src/lib/vape-policy.ts` (termes interdits + whitelist marques e-liquides)
8. Documentation memoire externe synchronisee:
   - `docs/DATA_MODEL.md`

## Fichiers touches (Etape B)
1. `package.json`
2. `package-lock.json`
3. `prisma/schema.prisma`
4. `prisma/seed.ts`
5. `prisma/migrations/20260223153000_init/migration.sql`
6. `prisma/migrations/migration_lock.toml`
7. `src/server/db.ts`
8. `src/server/index.ts`
9. `src/lib/vape-policy.ts`
10. `tests/unit/vape-policy.test.ts`
11. `docs/DATA_MODEL.md`
12. `docs/STATE.md`

## Commandes de verification executees (non interactif)
1. `npm install` -> OK
2. `npm run prisma:generate` -> OK
3. `npm run lint` -> OK
4. `npm run typecheck` -> OK
5. `npm test` -> OK (7 tests)
6. `npm run build:guard` -> OK

## Commandes non executees (contexte local)
1. `npm run prisma:migrate:deploy` non executee ici (pas de base Postgres locale configuree).
2. `npm run prisma:seed` non executee ici (depend d'une DB reachable via `DATABASE_URL`).

## Risques / points a surveiller
1. Les migrations/seed doivent etre testes sur une vraie DB en Step J runbook/deploiement.
2. Les checks SQL protegent la DB, mais les guards API/admin doivent encore etre branches (Step G).
3. La couche checkout/orders n'est pas encore connectee a la DB (Step D).

## Prochaine etape
- Etape C:
  - UI catalogue complete (listing, filtres, tri, pagination)
  - fiches produits detaillees
  - application concrete du design system sur pages produit.

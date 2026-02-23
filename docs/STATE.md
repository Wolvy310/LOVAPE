# LOVAPE - STATE (Etape C)

## Etape en cours
- Etape C terminee: UI catalogue publique et fiches produit implementees.

## Faits realises
1. Couche catalogue front introduite:
   - dataset catalogue mock conforme (`src/lib/catalog-data.ts`)
   - types metier front (`src/lib/catalog-types.ts`)
   - moteur filtres/tri/pagination (`src/lib/catalog-query.ts`)
2. Pages catalogue implementees:
   - `/catalog/e-liquides`
   - `/catalog/materiel-mtl`
3. Fonctionnalites catalogue actives:
   - filtres (marque, nicotine/type, stock)
   - tri (pertinence, prix, nom)
   - pagination
   - recherche texte
4. Etats UI couverts:
   - loading (`loading.tsx`)
   - empty result (etat vide)
   - error boundaries segment (`error.tsx`)
5. Fiche produit publique implementee:
   - `/product/[slug]`
   - specs structurees (e-liquides / materiel MTL)
   - avertissements legaux visibles
   - CTA vers demande de commande
6. Design system applique sur catalogue/produit:
   - nouveaux composants `Badge`, cartes produit, pagination, formulaires filtres
7. Tests unitaires ajoutes pour la logique catalogue:
   - `tests/unit/catalog-query.test.ts`
8. Memoire externe synchronisee:
   - `docs/ROUTES.md`
   - `docs/SPEC.md`
   - `docs/DESIGN_SYSTEM.md`
   - `docs/STATE.md`

## Fichiers touches (Etape C)
1. `src/lib/catalog-types.ts`
2. `src/lib/catalog-data.ts`
3. `src/lib/catalog-query.ts`
4. `src/lib/format.ts`
5. `src/components/ui/badge.tsx`
6. `src/components/catalog/catalog-filter-form.tsx`
7. `src/components/catalog/catalog-product-card.tsx`
8. `src/components/catalog/catalog-pagination.tsx`
9. `src/components/catalog/catalog-loading-grid.tsx`
10. `src/components/catalog/catalog-empty-state.tsx`
11. `src/components/catalog/catalog-page.tsx`
12. `src/app/catalog/e-liquides/page.tsx`
13. `src/app/catalog/e-liquides/loading.tsx`
14. `src/app/catalog/e-liquides/error.tsx`
15. `src/app/catalog/materiel-mtl/page.tsx`
16. `src/app/catalog/materiel-mtl/loading.tsx`
17. `src/app/catalog/materiel-mtl/error.tsx`
18. `src/app/product/[slug]/page.tsx`
19. `src/app/product/[slug]/loading.tsx`
20. `src/app/product/[slug]/not-found.tsx`
21. `src/app/product/[slug]/error.tsx`
22. `src/app/dev/styleguide/page.tsx`
23. `docs/ROUTES.md`
24. `docs/SPEC.md`
25. `docs/DESIGN_SYSTEM.md`
26. `docs/STATE.md`
27. `tests/unit/catalog-query.test.ts`

## Commandes de verification executees (non interactif)
1. `npm run lint` -> OK
2. `npm run typecheck` -> OK
3. `npm test` -> OK (12 tests)
4. `npm run build:guard` -> OK

## Risques / points a surveiller
1. Le catalogue Step C repose sur un dataset mock; la connexion DB runtime arrive en Step D/G.
2. Les routes API catalogue ne sont pas encore implementees.
3. Le panier reste non branche (Step D).

## Prochaine etape
- Etape D:
  - panier localStorage
  - checkout request vers DB (`Order`/`OrderItem`)
  - page confirmation et parcours post-soumission.

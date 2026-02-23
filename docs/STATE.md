# LOVAPE - STATE (Etape D)

## Etape en cours
- Etape D terminee: panier + checkout request + commandes DB + exports admin API.

## Faits realises
1. Panier localStorage operationnel:
   - ajout depuis listing et fiche produit
   - edition quantite
   - suppression item
   - vidage panier
2. Navigation panier visible dans le header (`Panier (n)`).
3. Page panier publique operationnelle:
   - `/cart`
   - recap quantites, total, CTA checkout.
4. Checkout request operationnel:
   - formulaire client `/checkout/request`
   - validations front de base
   - recap panier avant envoi.
5. Backend checkout operationnel:
   - `POST /api/checkout/request`
   - validation Zod
   - creation `Order` + `OrderItem` en DB avec statut `REQUESTED`
   - generation `orderRef`
   - confirmation `/checkout/confirmation/[orderRef]`.
6. EmailProvider integre:
   - mode `console` actif (`EMAIL_PROVIDER=console`)
   - mode desactive possible.
7. API admin commandes et exports operationnels:
   - `GET /api/admin/orders`
   - `GET /api/admin/orders/[id]`
   - `PATCH /api/admin/orders/[id]/status`
   - `GET /api/admin/orders/export.csv`
   - `GET /api/admin/consents/export.csv`
8. Auth admin API temporaire implementee:
   - header `x-admin-password` compare a `ADMIN_PASSWORD`.
9. Couche utilitaires ajoutee:
   - stockage panier (`src/lib/cart-storage.ts`)
   - validation commande (`src/server/order-request.ts`)
   - generation CSV (`src/server/csv.ts`).
10. Memoire externe synchronisee:
   - `docs/ROUTES.md`
   - `docs/SPEC.md`
   - `docs/STATE.md`

## Fichiers touches (Etape D)
1. `src/components/site-header.tsx`
2. `src/components/catalog/catalog-product-card.tsx`
3. `src/app/product/[slug]/page.tsx`
4. `src/app/cart/page.tsx`
5. `src/components/cart/add-to-cart-button.tsx`
6. `src/components/cart/cart-link.tsx`
7. `src/components/cart/cart-page-client.tsx`
8. `src/app/checkout/request/page.tsx`
9. `src/components/checkout/checkout-request-client.tsx`
10. `src/app/checkout/confirmation/[orderRef]/page.tsx`
11. `src/app/api/checkout/request/route.ts`
12. `src/app/api/admin/orders/route.ts`
13. `src/app/api/admin/orders/[id]/route.ts`
14. `src/app/api/admin/orders/[id]/status/route.ts`
15. `src/app/api/admin/orders/export.csv/route.ts`
16. `src/app/api/admin/consents/export.csv/route.ts`
17. `src/lib/cart-types.ts`
18. `src/lib/cart-mappers.ts`
19. `src/lib/cart-storage.ts`
20. `src/server/order-request.ts`
21. `src/server/email-provider.ts`
22. `src/server/admin-request.ts`
23. `src/server/csv.ts`
24. `tests/unit/cart-storage.test.ts`
25. `tests/unit/order-request.test.ts`
26. `docs/ROUTES.md`
27. `docs/SPEC.md`
28. `docs/STATE.md`

## Commandes de verification executees (non interactif)
1. `npm run lint` -> OK
2. `npm run typecheck` -> OK
3. `npm test` -> OK (19 tests)
4. `npm run build:guard` -> OK

## Risques / points a surveiller
1. Les routes admin utilisent une auth temporaire par header; l auth complete middleware/session arrive en Step G.
2. Le checkout requiert une DB reachable (`DATABASE_URL`) pour fonctionnement runtime.
3. Le panier est localStorage navigateur uniquement (normal pour MVP).

## Prochaine etape
- Etape E:
  - configurateur Mod + Clearo
  - regles de compatibilite dans `src/lib/compat.ts`
  - tests unitaires associes.

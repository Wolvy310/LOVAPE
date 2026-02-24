# LOVAPE - STATE (Etape H)

## Etape en cours
- Etape H terminee: consentement cookies/analytics opt-in detaille et parcours associe.

## Faits realises
1. Politique cookies complete operationnelle:
   - page publique `/cookies`
   - details categories `NECESSARY` et `ANALYTICS`
   - controles de mise a jour du consentement.
2. Bandeau cookies global operationnel:
   - affichage tant que choix non defini
   - actions `Accepter`, `Refuser`, `Personnaliser`.
3. API consentement implemente:
   - `POST /api/consent`
   - validation payload
   - creation `ConsentLog` en base
   - mise a jour cookie `lovape_analytics_consent`.
4. Couche consentement dediee ajoutee:
   - helpers parsing/storage cookie + localStorage
   - hook client de gestion du consentement
   - composant banner + composant settings.
5. Regle opt-in analytics appliquee:
   - `trackEvent` no-op sans consentement analytics accepte
   - instrumentation minimale ajoutee (`add_to_cart`, `begin_checkout_request`, `submit_request`).
6. Navigation et acces:
   - lien `Cookies` ajoute dans le footer.
7. Documentation synchronisee:
   - `docs/ROUTES.md`
   - `docs/SPEC.md`
   - `docs/DATA_MODEL.md`
   - `docs/NFR.md`
   - `docs/ANALYTICS.md`
   - `docs/UX_FLOWS.md`
   - `docs/STATE.md`.
8. Tests unitaires etendus:
   - nouveaux tests consent helpers.

## Fichiers touches (Etape H)
1. `src/lib/consent.ts`
2. `src/lib/analytics.ts`
3. `src/components/consent/use-analytics-consent.ts`
4. `src/components/consent/cookie-consent-banner.tsx`
5. `src/components/consent/consent-settings-card.tsx`
6. `src/app/api/consent/route.ts`
7. `src/app/cookies/page.tsx`
8. `src/app/layout.tsx`
9. `src/components/site-footer.tsx`
10. `src/components/cart/add-to-cart-button.tsx`
11. `src/components/checkout/checkout-request-client.tsx`
12. `tests/unit/consent.test.ts`
13. `docs/ROUTES.md`
14. `docs/SPEC.md`
15. `docs/DATA_MODEL.md`
16. `docs/NFR.md`
17. `docs/ANALYTICS.md`
18. `docs/UX_FLOWS.md`
19. `docs/STATE.md`

## Commandes de verification executees (non interactif)
1. `npm run lint` -> OK
2. `npm run typecheck` -> OK
3. `npm test` -> OK (38 tests)
4. `npm run build:guard` -> OK

## Risques / points a surveiller
1. Le provider analytics reste desactive (`NEXT_PUBLIC_ANALYTICS_ENABLED=false`) tant que la brique tiers n est pas branchee.
2. Le parcours de personnalisation reste centré sur la categorie analytics (MVP).
3. La retention precise des consent logs reste a confirmer juridiquement (`docs/TODO.md`).

## Prochaine etape
- Etape I:
  - stabilisation e2e critique et guard `npm run test:e2e:guard`.

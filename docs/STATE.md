# LOVAPE - STATE (Etape I)

## Etape en cours
- Etape I terminee: stabilisation e2e critique et activation du guard `npm run test:e2e:guard`.

## Faits realises
1. Couverture e2e critique etendue (Playwright):
   - consentement cookies: refus + persistence apres reload
   - protection admin sans session: UI redirection login + API `401`
   - checkout request: garde panier vide
   - checkout request: soumission valide + redirection confirmation (API mockee).
2. Stabilisation des tests e2e:
   - selecteurs Playwright rendus explicites (mode strict)
   - assertions orientees comportement utilisateur.
3. Command safety e2e alignee:
   - `playwright.config.ts` passe de `npm run dev` a `npm run start` pour le web server automatise.
4. Pipeline CI etendu:
   - installation Chromium Playwright
   - execution `npm run test:e2e:guard` apres le build guard.
5. Documentation synchronisee:
   - `docs/SPEC.md`
   - `docs/NFR.md`
   - `docs/STATE.md`
   - `README.md`
   - `CONTRIBUTING.md`.

## Fichiers touches (Etape I)
1. `.github/workflows/ci.yml`
2. `playwright.config.ts`
3. `tests/e2e/critical-flows.spec.ts`
4. `tests/e2e/home.spec.ts`
5. `docs/SPEC.md`
6. `docs/NFR.md`
7. `README.md`
8. `CONTRIBUTING.md`
9. `docs/STATE.md`

## Commandes de verification executees (non interactif)
1. `npm run lint` -> OK
2. `npm run typecheck` -> OK
3. `npm test` -> OK (38 tests)
4. `npm run test:e2e:guard` -> OK (5 tests)
5. `npm run build:guard` -> OK

## Risques / points a surveiller
1. Les cas e2e `consent` et `checkout submit` utilisent un mock API pour fiabiliser les tests; la verification DB de bout en bout reste couverte par les tests unitaires/integration.
2. Les environnements vierges doivent installer Chromium Playwright (`npx playwright install chromium`) avant `npm run test:e2e:guard`.
3. En environnement OneDrive Windows, des artefacts `.next` peuvent necessiter un nettoyage ponctuel si erreur `EINVAL readlink`.

## Prochaine etape
- Etape J (a cadrer):
  - etendre l e2e sans mock sur un jeu de donnees stable (seed dedie)
  - ajouter la couverture des parcours catalogue -> produit -> panier en conditions reelles.

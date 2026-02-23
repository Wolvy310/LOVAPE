# LOVAPE - STATE (Etape F)

## Etape en cours
- Etape F terminee: guide public (hub + articles) avec parcours debutant et lexique.

## Faits realises
1. Donnees guide centralisees dans `src/lib/guide-content.ts`:
   - 5 articles evergreen
   - tags editoriaux
   - parcours debutant ordonne
   - lexique rapide.
2. Hub guide public operationnel:
   - route `GET /guide`
   - sections parcours debutant, tous les articles, lexique.
3. Articles guide operationnels:
   - route `GET /guide/[slug]`
   - metadata par article
   - generation statique des slugs.
4. Conformite copy guide maintenue:
   - disclaimer visible "Contenu informatif, non medical."
   - avertissements responsables visibles.
5. Maillage interne enrichi:
   - guide -> catalogues publics
   - fiche produit -> article guide pertinent.
6. Couverture de tests etendue:
   - nouveaux tests unitaires sur donnees/helpers guide.
7. Documentation synchronisee:
   - `docs/ROUTES.md`
   - `docs/SPEC.md`
   - `docs/UX_FLOWS.md`
   - `docs/MARKETING_SEO.md`
   - `docs/STATE.md`.

## Fichiers touches (Etape F)
1. `src/lib/guide-content.ts`
2. `src/app/guide/page.tsx`
3. `src/app/guide/[slug]/page.tsx`
4. `src/app/product/[slug]/page.tsx`
5. `tests/unit/guide-content.test.ts`
6. `docs/ROUTES.md`
7. `docs/SPEC.md`
8. `docs/UX_FLOWS.md`
9. `docs/MARKETING_SEO.md`
10. `docs/STATE.md`

## Commandes de verification executees (non interactif)
1. `npm run lint` -> OK
2. `npm run typecheck` -> OK
3. `npm test` -> OK (30 tests)
4. `npm run build:guard` -> OK

## Risques / points a surveiller
1. Le guide est actuellement en contenu statique local (pas encore adminise).
2. La profondeur editoriale reste MVP et devra etre enrichie en continu.
3. Les routes admin utilisent toujours une auth temporaire par header; l auth complete middleware/session arrive en Step G.

## Prochaine etape
- Etape G:
  - auth admin complete (middleware/session securisee) en remplacement du header temporaire.

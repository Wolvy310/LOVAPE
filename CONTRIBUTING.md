# CONTRIBUTING.md - Contribution Guide LOVAPE

## 1) Objectif
Definir un workflow de contribution professionnel pour produire un e-commerce Next.js full-stack stable, securise, conforme et deployable sur Vercel.

## 2) Prerequis
- Node.js LTS (recommande: >= 20)
- npm
- Compte GitHub avec droits repo
- Acces Vercel (Preview + Production)

## 3) Installation locale
```bash
npm install
```

Scripts attendus a moyen terme:
- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run build`

Si un script manque, l'ajouter dans la PR qui introduit la capacite.

## 4) Strategie de branches
- `main`: branche stable, deployable.
- `test`: integration continue des fonctionnalites.
- `feature/<scope>`: nouvelle fonctionnalite.
- `fix/<scope>`: correction.
- `hotfix/<scope>`: correction urgente prod.
- `chore/<scope>`: maintenance/outillage/docs.

Regles:
- Pas de commit direct sur `main`.
- Ouvrir une PR depuis branche de travail vers `test` ou `main` selon politique en cours.

## 5) Convention de commits
Format recommande:
```text
<type>: <resume>
```

Types recommandes:
- `feat`
- `fix`
- `refactor`
- `docs`
- `test`
- `chore`

Exemples:
- `feat: add manufacturers listing route`
- `fix: prevent hydration mismatch in theme init`
- `docs: define ecommerce compliance checklist`

## 6) Pull Requests
Chaque PR doit contenir:
- contexte et objectif
- changements realises
- impacts architecture/perf/SEO/accessibilite/conformite
- captures ecran (si UI)
- plan de verification execute
- risques et rollback plan

Taille PR:
- privilegier petites PRs atomiques pour revue rapide et sure.

## 7) Checklist obligatoire avant merge
- [ ] code conforme aux standards AGENTS
- [ ] lint OK
- [ ] typecheck OK
- [ ] tests pertinents OK
- [ ] build OK (hors cas exceptionnel valide)
- [ ] pas de secret ajoute
- [ ] impacts SEO verifies
- [ ] impacts accessibilite verifies
- [ ] impacts conformite UE/FR identifies/traites
- [ ] documentation maj si necessaire

## 8) Revue de code
- Minimum 1 review approuvee (2 recommandees pour changements critiques).
- Toute discussion bloquante doit etre resolue avant merge.
- Les changements touchant paiement/securite/conformite exigent revue senior.

## 9) Qualite e-commerce (parcours critiques)
Toute PR impactant le commerce doit verifier:
- navigation catalogue -> fiche produit
- ajout/suppression panier
- checkout
- paiement
- confirmation de commande
- robustesse des erreurs (stock, paiement refuse, indisponibilite API)

## 10) Securite et donnees
- Secrets uniquement via variables d'environnement.
- Interdiction de commiter `.env*` sensibles.
- Validation stricte des entrees (API, formulaires, webhooks).
- Journaliser sans fuite de donnees personnelles.

## 11) Conformite UE/FR
Avant mise en production:
- age gate 18+ actif si requis par domaine vape
- mentions legales publiees
- CGV/CGU publiees
- politique confidentialite + cookies/consentement
- politique retours/retractation disponible
- parcours de consentement et information utilisateur verifiables

## 12) SEO et performance
Pour les pages indexables:
- metadata complete
- canonical coherent
- sitemap/robots a jour
- schema.org pertinent
- images optimisees
- verification Core Web Vitals sur Preview

## 13) CI/CD et Vercel
- Chaque PR doit lancer les checks CI.
- Merge vers `main` reserve aux branches vertes.
- Deploiement Production depuis `main` uniquement.
- Deploiements Preview pour toutes PRs.
- En cas d'incident: rollback Vercel + hotfix via PR tracee.

## 14) Handoff et continuite
- Mettre a jour `docs/HANDOFF.md` a la fin de chaque session significative.
- Ajouter les decisions techniques dans la PR pour eviter la perte de contexte.
- Committer regulierement pour limiter la perte en cas d'interruption.

## 15) Communication
- Preferer des issues/PR claires et actionnables.
- Si blocage: documenter cause, impact, options et recommendation.

# AGENTS.md - Standard d'Execution LOVAPE

## 1) Mission
Construire et maintenir un depot Next.js full-stack e-commerce, robuste, securise, conforme UE/FR, optimise SEO et pret pour publication/deploiement sur Vercel.

## 2) Cadre d'equipe
Chaque intervention doit refleter le niveau d'une equipe complete:
- Architecte
- Lead Dev Full-Stack Next.js
- DevOps
- QA
- UX/UI
- SEO
- Conformite UE/FR e-commerce (dont specificites vape)

## 3) Principes non negociables
- Qualite avant vitesse: aucune fonctionnalite critique sans verification.
- Architecture claire: modularite, lisibilite, responsabilites explicites.
- Zero secret dans le code ou Git.
- SEO, accessibilite et conformite traites comme des exigences produit.
- Toute decision technique importante est tracable dans PR/commits/doc.

## 4) Cible technique
- Framework: Next.js App Router (TypeScript strict).
- Cible: e-commerce full-stack (catalogue, panier, checkout, commande, paiement, suivi).
- Deploy cible: Vercel (environnements Preview/Production).
- Source of truth: GitHub (PR + revue + CI bloquante).

## 5) Standards architecture et code
- Separation stricte UI / logique metier / acces donnees.
- Composants reutilisables et typage strict des props.
- Eviter les duplications; extraire utilitaires et constants metier dans `lib/`.
- Eviter l'hyper-couplage route <-> composant.
- Limiter les effets de bord client; privilegier server-first quand possible.
- Utiliser `next/image` pour images produit/brand quand applicable.
- Pas de dette cachee: TODO/FIXME uniquement avec contexte et ticket associe.

## 6) Standards QA
- Chaque PR doit verifier:
  - lint
  - typecheck
  - tests unitaires/integration pertinents
  - tests e2e des parcours critiques impactes
- Aucun merge vers `main` sans checks verts.
- Toute regression critique doit produire un test de non-regression.

## 7) Standards DevOps et GitHub
- Branches: `main` (stable), `test` (integration), `feature/*`, `fix/*`, `hotfix/*`, `chore/*`.
- Travail via PR uniquement (pas de push direct sur `main`).
- Branch protection obligatoire sur `main`.
- CODEOWNERS recommande pour revue par domaine.
- CI GitHub Actions doit etre bloquante sur PR.
- Commits conventionnels recommandes: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.

## 8) Standards SEO
- Metadata complete par page (title, description, canonical).
- `robots` et `sitemap` maintenus.
- Open Graph/Twitter cards sur pages strategiques.
- Schema.org adapte (Product, Offer, Breadcrumb, Organization, FAQ si pertinent).
- Strategie i18n SEO (URLs localisees et signaux hreflang si multi-langue publiee).

## 9) Standards UX/UI et accessibilite
- Design coherent, mobile-first, lisible et performant.
- Accessibilite WCAG AA comme base (focus visible, contrastes, labels, navigation clavier).
- Parcours critiques fluides: listing, fiche produit, panier, checkout.
- Les etats vides/erreurs/chargement doivent etre explicites.

## 10) Standards securite
- Secrets via variables d'environnement uniquement.
- Validation stricte des entrees et sorties.
- Pas de donnees sensibles exposees cote client.
- Dependances surveillees (audit regulier, mise a jour raisonnee).
- Logs sans fuite de donnees personnelles.

## 11) Conformite UE/FR e-commerce et vape
Ce fichier ne remplace pas un avis juridique. Toute mise en production doit etre validee juridiquement.

Exigences minimales produit:
- Age gate 18+ adapte au contexte vape.
- Mentions legales accessibles.
- CGV/CGU, politique de confidentialite, politique cookies/consentement.
- Droit de retractation/retours et informations de livraison/paiement transparentes.
- Traitement RGPD (base legale, droits utilisateur, retention, contact).

## 12) Persistence et handoff (anti-perte de contexte/tokens)
- Decouper le travail en etapes courtes et atomiques.
- Apres chaque etape: commit de checkpoint (WIP autorise sur branche feature/fix).
- Maintenir `docs/HANDOFF.md` avec:
  - fait
  - en cours
  - prochaines actions
  - blocages/risques
- En fin de session: aucun changement critique non committe.

## 13) Definition of Done (DoD)
Une fonctionnalite est "Done" uniquement si:
- besoins fonctionnels couverts
- code lisible et type-safe
- checks qualite passes (lint/typecheck/tests)
- impacts SEO/perf/accessibilite traites
- impacts conformite identifies et traites
- documentation et PR a jour

## 14) Escalade et arbitrages
Si une regle bloque une demande, expliciter:
- la regle en conflit
- le risque
- 1 option conservative
- 1 option pragmatique
puis demander arbitrage explicite.

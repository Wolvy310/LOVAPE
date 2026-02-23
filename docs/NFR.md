# LOVAPE - Exigences Non Fonctionnelles (Etape 0)

## 1) Performance
Objectif MVP:
1. Home et listings catalogues:
   - LCP < 2.5s (mobile 4G, appareil milieu de gamme)
   - CLS < 0.1
2. API catalogue (p95): < 600 ms hors cold start.
3. Pagination obligatoire pour listes produits.
4. Images optimisees (formats web modernes, dimensions adaptees).

## 2) Accessibilite (A11y)
1. Cible: WCAG 2.2 AA sur parcours critiques.
2. Navigation clavier complete:
   - focus visible
   - ordre tab logique
3. Contrastes conformes.
4. Labels explicites pour formulaires.
5. Messages erreurs comprehensibles et associes aux champs.

## 3) Securite baseline
1. Headers securite:
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `X-Frame-Options: DENY`
   - `Permissions-Policy` restrictive
2. Cookies sensibles:
   - HttpOnly, Secure (prod), SameSite=Lax ou Strict
3. Rate-limit sur login admin et mutations admin.
4. Anti brute-force:
   - delai progressif
   - verrou court sur excedent
5. Validation serveur Zod sur toutes les mutations.
6. Aucune fuite de secrets dans logs/UI/repo.

## 4) Conformite / RGPD
1. Bandeau cookies avec opt-in analytics.
2. Consentement trace via `ConsentLog`.
3. Pas de tracking analytics sans consentement explicite.
4. Donnees minimales, retention documentee.
5. Exports CSV admin pour preuves de consentement.

## 5) SEO technique
1. Metadata complete par page.
2. Canonical sur pages indexables.
3. `sitemap.xml` et `robots.txt`.
4. Schema.org:
   - `Organization`
   - `Product`
   - `BreadcrumbList`
5. Pas de `LocalBusiness` (pas de magasin physique).

## 6) Observabilite et exploitation
1. Logs structures JSON (niveau, message, contexte).
2. `requestId` injecte sur chaque requete.
3. Correlation minimale front/back via request id.
4. Runbooks obligatoires:
   - incident
   - rollback
   - restore-db

## 7) Disponibilite et reprise
1. Cible MVP: 99.5% mensuel.
2. RTO cible: 4h.
3. RPO cible: 24h (selon plan de backup DB).
4. Procedure de rollback documentee et testable.

## 8) Maintenabilite
1. TypeScript strict.
2. Lint + format standardises.
3. Architecture modulaire (`src/app`, `src/components`, `src/lib`, `src/server`).
4. Tests minimum:
   - unitaires sur logique metier
   - e2e sur parcours critiques

## 9) Command safety (anti-blocage)
1. Toujours lancer commandes automatisees en non interactif:
   - `CI=1`
   - `NEXT_TELEMETRY_DISABLED=1`
   - `HUSKY=0`
   - `npm_config_fund=false`
   - `npm_config_audit=false`
2. Ne jamais utiliser `npm run build` en verification:
   - utiliser `npm run build:guard`.
3. En cas de timeout (exit 124):
   - stopper
   - checkpoint si etat coherent
   - diagnostiquer logs/env/lint/typecheck

## 10) Qualite / CI
La CI doit echouer si une des commandes echoue:
1. `npm run lint`
2. `npm run typecheck`
3. `npm test`
4. `npm run build:guard`
5. (etape I) `npm run test:e2e:guard`

# LOVAPE

E-commerce vape responsable (orientation MTL) en mode **prise de commande**.

## Etat du projet
- Step courant: `step-j`
- Paiement en ligne: desactive (MVP)
- Deploiement cible: Vercel

## Contraintes non negociables
1. Vente interdite aux mineurs.
2. Age-gate obligatoire.
3. Pods/puffs/jetables/disposables interdits.
4. Pas de marketing agressif.

## Stack
- Next.js App Router + TypeScript strict
- TailwindCSS + composants style shadcn/ui
- Postgres + Prisma (schema en Step B)
- Tests: Vitest (unit) + Playwright (e2e)
- CI GitHub Actions

## Structure
```text
src/
  app/
  components/
  lib/
  server/
  styles/
prisma/
public/
scripts/
docs/
```

## Prerequis (Windows / PowerShell)
1. Installer Node.js LTS 22.
2. Ouvrir PowerShell dans le dossier du repo.
3. Verifier:
   - `node -v`
   - `npm -v`

## Installation locale
```powershell
npm install
Copy-Item .env.example .env
```

## Lancer les verifications (mode non interactif)
```powershell
$env:CI='1'
$env:NEXT_TELEMETRY_DISABLED='1'
$env:HUSKY='0'
$env:npm_config_fund='false'
$env:npm_config_audit='false'

npm run lint
npm run typecheck
npm test
npm run test:e2e:guard
npm run build:guard
```

## Important - securite commande
1. Ne pas utiliser `npm run build`, utiliser `npm run build:guard`.
2. Ne pas lancer `npm run dev` sans demande explicite.
3. Si build bloque: timeout attendu `exit 124`, puis diagnostic.

## Scripts utiles
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run test:e2e`
- `npm run test:e2e:guard`
- `npm run build:raw`
- `npm run build:guard`

## Documentation
- Specs produit: `docs/SPEC.md`
- Routes: `docs/ROUTES.md`
- Modele data: `docs/DATA_MODEL.md`
- NFR: `docs/NFR.md`
- Design system: `docs/DESIGN_SYSTEM.md`
- UX flows: `docs/UX_FLOWS.md`
- Copy guide: `docs/COPY_GUIDE.md`
- Marketing/SEO: `docs/MARKETING_SEO.md`
- Analytics: `docs/ANALYTICS.md`
- Etat de progression: `docs/STATE.md`
- Infos manquantes: `docs/TODO.md`

## Licence
MIT - voir `LICENSE`.

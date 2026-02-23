# LOVAPE - SPEC Produit (Etape 0)

## 1) Vision
LOVAPE est un e-commerce vape responsable oriente MTL (faible puissance, faible chauffe, usage informe).
Le MVP est centre sur la prise de commande (Order Request) sans paiement en ligne actif par defaut.

## 2) Objectifs business du MVP
1. Publier un catalogue propre et conforme (e-liquides + materiel MTL uniquement).
2. Permettre aux clients de soumettre une demande de commande exploitable par l'admin.
3. Poser une base technique maintenable et deployable sur Vercel.
4. Rendre l'exploitation possible pour un debutant (docs et runbooks).

## 3) Positionnement et contraintes vape (non negociables)
1. Vente strictement interdite aux mineurs.
2. Age-gate obligatoire au premier acces avec blocage si mineur.
3. Interdiction totale des pods/podmods, puffs, jetables/disposables.
4. Aucun marketing agressif:
   - pas de popup promo invasive
   - pas de countdown de pression
   - pas de retargeting comportemental
   - pas de gamification
5. Message responsable visible:
   - "Si vous ne fumez pas, ne vapez pas."
   - "Vente interdite aux mineurs."

## 4) Personas
1. Visiteur debutant adulte:
   - cherche une vape MTL simple
   - veut des explications claires, pas de jargon inutile
2. Vapoteur adulte en transition:
   - compare e-liquides et materiel MTL
   - veut des fiches lisibles et des recommandations d'usage
3. Admin LOVAPE:
   - ajoute/edite produits
   - traite demandes de commande
   - exporte commandes et consentements

## 5) Perimetre MVP (in) / Hors perimetre (out)
### In (MVP)
1. Front e-commerce (catalogue, fiches, panier local, checkout request).
2. Back API + base Postgres + Prisma.
3. Admin minimal protege par mot de passe (`ADMIN_PASSWORD`).
4. Logs de consentement RGPD + export CSV.
5. Architecture Payment Adapter prete mais inactive.

### Out (MVP)
1. Paiement en ligne actif.
2. Click and collect / magasin physique / store locator.
3. Programme de fidelite, coupons agressifs, mecanismes de rarete.
4. Marketplace multi-vendeur.

## 6) Stack et decisions d'architecture
1. Next.js App Router + TypeScript strict.
2. TailwindCSS + shadcn/ui pour une UI sobre, lisible, maintenable.
3. Postgres + Prisma (migrations versionnees).
4. Deploy cible: Vercel (prod + previews).
5. Auth admin: simple, basee sur secret env + session securisee.
6. CI GitHub Actions: lint + typecheck + tests + build garde.
7. Command safety:
   - ne jamais lancer `npm run build` directement
   - utiliser `npm run build:guard`
   - ne jamais lancer `npm run dev` sans demande explicite

## 7) Fonctionnalites MVP detaillees
### Public
1. Age-gate date de naissance + cookie configurable (`AGE_GATE_COOKIE_DAYS`).
2. Home sobre orientee qualite/usage responsable/selection MTL.
3. Catalogue:
   - E-liquides (marques autorisees)
   - Materiel MTL (mods + clearomiseurs)
4. Listing avec filtres, tri, pagination, etats vide/chargement/erreur.
5. Fiche produit avec caracteristiques structurees + avertissements.
6. Panier localStorage.
7. Checkout request:
   - creation commande en DB avec statut `REQUESTED`
   - provider email abstrait (desactive par defaut, mode console en dev)
8. Pages info: Livraison, Retours, Contact/SAV.
9. Pages legales: Mentions, CGV (template + TODO), Confidentialite, Cookies.
10. Guide separe: lexique + contenus de bon usage non medical.

### Admin
1. Auth admin minimale.
2. CRUD marques, categories, produits.
3. Guards serveurs:
   - blocage categories et produits pods/puffs/jetables/disposables
4. Gestion commandes:
   - liste + detail + changement statut
   - export CSV
5. Export CSV des consentements.

## 8) Marque et seed data MVP
### Marques e-liquides autorisees
1. Alfaliquid
2. VDLV
3. Terroir Vapeur
4. Vegetol
5. Curieux
6. Savourea

### Donnees minimales
1. 5 a 10 e-liquides fictifs.
2. 3 a 6 produits materiel MTL fictifs.
3. Aucun pod, puff, jetable, disposable.

## 9) MVP vs V2 (backlog)
### MVP
1. Prise de commande sans paiement.
2. Base conforme et robuste.
3. Admin simple et securise.

### V2 potentielle
1. Integration PSP compatible vape via Payment Adapter.
2. Notifications email transactionnelles actives.
3. Outils de recommandation non agressifs.
4. Ameliorations analytics consenties.

## 10) Definition of Done globale (rappel)
1. `npm run lint` OK
2. `npm run typecheck` OK
3. Tests pertinents OK
4. `npm run build:guard` OK
5. Docs a jour: `SPEC`, `ROUTES`, `DATA_MODEL`, `NFR`, `STATE`
6. Aucun secret dans le repo
7. Impossible de creer des pods/puffs/jetables via admin

## 11) Journal de decisions initial
1. DEC-001: Checkout en mode request-first pour de-risquer legal et PSP.
2. DEC-002: Interdictions pods/puffs/disposables appliquees au niveau serveur.
3. DEC-003: Analytics uniquement opt-in avec journal de preuve.
4. DEC-004: Documentation debutant obligatoire des la phase 0.

## 12) Dependances externes a confirmer
Voir `docs/TODO.md` pour les infos manquantes bloquees par decisions metier.

## 13) Etat implementation Step C
1. Catalogue e-liquides operationnel avec filtres, tri, pagination et etats UI.
2. Catalogue materiel MTL operationnel avec filtres, tri, pagination et etats UI.
3. Fiche produit publique `/product/[slug]` operationnelle:
   - caracteristiques structurees
   - avertissements visibles
   - chemin vers demande de commande.

## 14) Etat implementation Step D
1. Panier localStorage operationnel:
   - ajout depuis listing et fiche produit
   - edition quantites/suppression/vidage
2. Checkout request operationnel:
   - formulaire client
   - creation DB `Order` + `OrderItem` statut `REQUESTED`
   - page confirmation avec `orderRef`
3. Interface EmailProvider operationnelle:
   - mode `console` actif par defaut
   - mode desactive possible via `EMAIL_PROVIDER`
4. Exports admin operationnels via API:
   - commandes CSV
   - consent logs CSV.

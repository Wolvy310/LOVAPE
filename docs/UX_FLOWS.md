# LOVAPE - UX Flows (Etape 0)

## 1) Principes UX globaux
1. Afficher les avertissements legaux sans friction inutile.
2. Reduire le nombre d'etapes vers la demande de commande.
3. Garder des parcours explicites pour debutants.
4. Eviter tout pattern manipulatoire.

## 2) Flow public: Decouverte -> Produit -> Panier -> Demande
### Etape A: Entree site et age-gate
1. Visiteur arrive sur `/`.
2. Si age non valide en cookie:
   - redirection vers `/age-gate`.
3. L'utilisateur entre sa date de naissance.
4. Systeme calcule la majorite.
5. Si mineur:
   - acces bloque
   - message legal clair
6. Si majeur:
   - cookie age-gate set pour `AGE_GATE_COOKIE_DAYS`
   - retour sur home.

### Etape B: Exploration catalogue
1. Depuis home, choix entre:
   - E-liquides
   - Materiel MTL
2. Listing avec:
   - filtres
   - tri
   - pagination
3. Etats UX obligatoires:
   - loading skeleton
   - empty state avec action de reset filtres
   - erreur reseau avec bouton retry

### Etape C: Fiche produit
1. Ouverture `/product/[slug]`.
2. Infos visibles:
   - caracteristiques structurees
   - stock
   - avertissements responsables
3. Ajout panier:
   - feedback non intrusif
   - panier persiste en localStorage

### Etape D: Checkout request
1. Visiteur ouvre `/checkout/request`.
2. Formulaire:
   - infos contact
   - recap produits
   - acceptance mentions
3. Validation:
   - blocage champ invalide
   - messages simples
4. Soumission:
   - creation commande DB en `REQUESTED`
5. Confirmation:
   - page claire "quoi faire ensuite"
   - delai de reponse SAV annonce.

### Etape E: Configurateur Mod + Clearomiseur
1. Visiteur ouvre `/configurateur/mod-clearo`.
2. Selection d un mod MTL et d un clearomiseur MTL.
3. Verification immediate de compatibilite:
   - connecteur identique
   - plage de puissance commune
   - plage de resistance commune
4. Si compatible:
   - ajout mod + clearomiseur possible en un clic vers panier.
5. Si incompatible:
   - message explicite et action corrective (changer mod ou clearomiseur).

### Etape F: Guide public
1. Visiteur ouvre `/guide`.
2. Le hub affiche:
   - parcours debutant recommande
   - liste des articles
   - lexique rapide.
3. Visiteur ouvre un article `/guide/[slug]`.
4. Chaque article propose:
   - contenu informatif non medical
   - liens vers catalogues
   - lien de continuation parcours debutant si applicable.
5. Depuis les fiches produit, un lien guide pertinent reste accessible.

### Etape G: Auth admin session
1. Admin ouvre `/admin/login`.
2. Soumet son mot de passe admin.
3. Si succes:
   - creation session en DB
   - pose cookie HttpOnly signe
   - redirection vers `/admin`.
4. Middleware protege:
   - routes UI `/admin*`
   - routes API `/api/admin/*`.
5. Deconnexion:
   - suppression session
   - cookie invalide.

## 3) Flow admin: Ajout produit conforme
### Etape A: Auth
1. Admin va sur `/admin/login`.
2. Saisie mot de passe.
3. Session securisee creee si valide.

### Etape B: Creation produit
1. Admin ouvre `/admin/products/new`.
2. Renseigne donnees minimales.
3. Validation serveur:
   - refuse pod/puff/jetable/disposable
   - refuse categorie interdite
4. Si valide:
   - produit cree en `DRAFT` ou `ACTIVE`.

### Etape C: Verification
1. Produit visible dans liste admin.
2. Produit visible en front seulement si conforme + actif.

## 4) Flow SAV: Contact et retours
1. Client lit `/retours` et `/livraison`.
2. Si besoin, envoie demande via `/contact`.
3. Systeme cree ticket simple (MVP: email/log).
4. Delais de traitement annonces clairement.

## 5) Etats d'erreur critiques et recuperation
1. Age-gate invalide:
   - message explicite
   - rester sur formulaire
2. Echec creation commande:
   - message "demande non envoyee"
   - conserver panier et formulaire
3. Erreur admin brute-force:
   - message neutre
   - backoff/temporisation

## 6) KPI UX MVP (non agressifs)
1. Taux passage listing -> fiche.
2. Taux passage fiche -> ajout panier.
3. Taux soumission checkout request.
4. Taux completion formulaire contact.

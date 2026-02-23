# LOVAPE - Design System (Etape 0)

## 1) Intentions design
1. Esthetique sobre, moderne, lisible, non agressive.
2. Accent sur clarte des informations produits.
3. Conversion par confiance (pas par pression).

## 2) Tokens visuels (base)
### Couleurs (proposees)
```text
--color-bg: #f5f3ef
--color-surface: #ffffff
--color-surface-muted: #ebe6dd
--color-text: #1f2933
--color-text-muted: #52606d
--color-primary: #1f6f5b
--color-primary-hover: #175847
--color-accent: #c07a2f
--color-warning: #9a3412
--color-danger: #b42318
--color-border: #d9d3c7
--color-focus: #0f766e
```

### Typographie
1. Titres: `Sora` (600/700).
2. Texte UI: `Manrope` (400/500).
3. Monospace utilitaire: `IBM Plex Mono`.

### Echelle typographique
```text
xs 12px
sm 14px
base 16px
lg 18px
xl 20px
2xl 24px
3xl 30px
```

### Espacements (4pt grid)
```text
1: 4px, 2: 8px, 3: 12px, 4: 16px, 5: 20px, 6: 24px, 8: 32px, 10: 40px, 12: 48px
```

### Rayons / ombres
1. Radius: 8px cartes, 12px modales, 9999px pills.
2. Ombres: faibles et neutres, pas de glow marketing.

## 3) Composants MVP
1. `Button`: primary, secondary, ghost, danger.
2. `Input`: texte, email, nombre, select.
3. `Badge`: legal warning, stock, categorie.
4. `Card`: produit, article guide, resume panier.
5. `Alert`: info, warning legal, error.
6. `Table`: admin (commandes, consent logs).
7. `Pagination`: listings catalogue.
8. `EmptyState`: aucun resultat.
9. `Skeleton`: etat chargement.
10. `Toast` sobre (optionnel MVP, sans ton commercial).

## 4) Etats d'interface (obligatoires)
1. Loading (skeleton, spinner discret).
2. Empty (explication + action utile).
3. Error (message clair + retry).
4. Disabled (raison visible si possible).
5. Success (confirmation sobre, sans exclamation marketing).

## 5) Responsive
1. Mobile-first par defaut.
2. Breakpoints:
   - sm: 640
   - md: 768
   - lg: 1024
   - xl: 1280
3. Grilles:
   - mobile: 1 colonne
   - tablette: 2 colonnes sur listing
   - desktop: 3 a 4 colonnes selon densite

## 6) Accessibilite UI
1. Focus ring systematique.
2. Labels explicites et `aria-*` quand necessaire.
3. Contraste valide.
4. Cibles tactiles >= 44x44.
5. Aucune information critique uniquement par couleur.

## 7) Motion
1. Transitions courtes (120-180ms).
2. Effets utilitaires (apparition, hover discret).
3. Respect `prefers-reduced-motion`.
4. Aucun effet anxiogene (flash, rebond agressif).

## 8) Styleguide dev
1. Route: `/dev/styleguide`.
2. Visible uniquement en developpement.
3. Doit lister composants + variantes + etats:
   - loading
   - empty
   - error
   - success

## 9) Images et assets minimum
1. Favicon.
2. Open Graph image.
3. Placeholders logo/produit.
4. Alt text explicite pour chaque media utile.

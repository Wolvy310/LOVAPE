# LOVAPE - Analytics (Etape 0)

## 1) Principes
1. Privacy-first.
2. Tracking non essentiel uniquement apres opt-in explicite.
3. Aucune collecte superflue.
4. Journal de preuve via `ConsentLog`.

## 2) Categories de consentement
1. `NECESSARY`:
   - cookies techniques indispensables
   - toujours actifs
2. `ANALYTICS`:
   - mesure d'audience et conversion
   - active uniquement si consentement positif

## 3) Taxonomie d'evenements MVP
| Event | Quand | Proprietes minimales |
|---|---|---|
| `view_item` | Affichage fiche produit | `product_id`, `slug`, `category`, `request_id` |
| `add_to_cart` | Ajout panier | `product_id`, `qty`, `price_cents`, `request_id` |
| `begin_checkout_request` | Ouverture checkout request | `cart_size`, `cart_total_cents`, `request_id` |
| `submit_request` | Soumission checkout reussie | `order_ref`, `cart_size`, `total_cents`, `request_id` |
| `contact_submit` | Envoi formulaire contact | `topic`, `request_id` |

## 4) Regles de collecte
1. Pas d'event analytics tant que consentement `ANALYTICS` n'est pas accepte.
2. En cas de refus:
   - aucun script de mesure non essentiel charge.
3. Changement de consentement:
   - log immediat en DB (`ConsentLog`).

## 5) Donnees personnelles et anonymisation
1. Eviter email/tel dans payload analytics.
2. Utiliser hash irreversible pour IP/user id si necessaire.
3. Retention par defaut recommandee: 13 mois max (a confirmer legal).
4. Export possible des consent logs en CSV via admin.

## 6) Implementation MVP prevue
1. Cookie banner:
   - boutons `Accepter`, `Refuser`, `Personnaliser` (optionnel MVP)
2. API `/api/consent`:
   - enregistre scope, decision, request id, page
3. Instrumentation front:
   - wrapper unique `trackEvent`
   - no-op si pas de consentement analytics

## 7) QA Analytics
1. Cas "refus":
   - zero appel tracker tiers.
2. Cas "acceptation":
   - events cles emis une seule fois par action.
3. Cas "retrait consentement":
   - tracking stoppe immediatement.

## 8) Gouvernance
1. Toute nouvelle metrique doit etre ajoutee ici avant implementation.
2. Toute nouvelle categorie de consentement doit passer revue legal.

## 9) Notes implementation Step H
1. Bandeau cookies global actif avec choix `Accepter`, `Refuser`, `Personnaliser`.
2. Page `/cookies` active avec details categories et mise a jour du choix.
3. Route `POST /api/consent` active avec creation `ConsentLog`.
4. `trackEvent` reste no-op si `NEXT_PUBLIC_ANALYTICS_ENABLED=false` ou sans consentement analytics accepte.

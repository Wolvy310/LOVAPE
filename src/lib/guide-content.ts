export type GuideTag = "debutant" | "materiel-mtl" | "e-liquide" | "entretien";

export interface GuideSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  readTimeMinutes: number;
  tags: GuideTag[];
  beginnerStep?: number;
  catalogCtaHref: "/catalog/e-liquides" | "/catalog/materiel-mtl";
  catalogCtaLabel: string;
  sections: GuideSection[];
}

export interface LexiconEntry {
  term: string;
  definition: string;
}

const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: "parcours-debutant-mtl",
    title: "Parcours debutant MTL en 4 etapes",
    description: "Un plan simple pour debuter en materiel MTL de facon responsable.",
    excerpt: "Un parcours clair pour choisir son materiel, regler sa puissance et garder une routine simple.",
    readTimeMinutes: 4,
    tags: ["debutant", "materiel-mtl"],
    beginnerStep: 1,
    catalogCtaHref: "/catalog/materiel-mtl",
    catalogCtaLabel: "Voir le materiel MTL",
    sections: [
      {
        title: "1) Commencer simple",
        paragraphs: [
          "Pour un debut, gardez une configuration lisible: un mod MTL et un clearomiseur MTL avec connecteur identique.",
          "Sur LOVAPE, le configurateur aide a verifier la compatibilite sans ajouter de complexite inutile."
        ]
      },
      {
        title: "2) Regler une puissance moderee",
        paragraphs: [
          "Respectez la plage de puissance indiquee sur le clearomiseur et restez dans la zone basse au depart.",
          "Augmentez par petits paliers seulement si le rendu reste stable."
        ]
      },
      {
        title: "3) Stabiliser la routine",
        paragraphs: ["Utilisez le meme materiel plusieurs jours pour observer les sensations avant de changer des reglages."]
      },
      {
        title: "4) Demander conseil en cas de doute",
        paragraphs: ["Si un point est flou, passez par la page contact avant de valider une demande de commande."]
      }
    ]
  },
  {
    slug: "choisir-e-liquide-mtl",
    title: "Choisir un e-liquide MTL sans se compliquer",
    description: "Repere rapide sur nicotine, ratio PG/VG et volume pour un usage MTL.",
    excerpt: "Comprendre les informations de base d un e-liquide MTL pour faire un premier choix raisonnable.",
    readTimeMinutes: 5,
    tags: ["debutant", "e-liquide"],
    beginnerStep: 2,
    catalogCtaHref: "/catalog/e-liquides",
    catalogCtaLabel: "Voir les e-liquides",
    sections: [
      {
        title: "Lire les 3 infos cle",
        paragraphs: [
          "Sur une fiche e-liquide, regardez en priorite le dosage nicotine, le ratio PG/VG et le volume.",
          "Ces trois elements suffisent pour un premier tri pragmatique."
        ]
      },
      {
        title: "Dosage nicotine",
        paragraphs: [
          "Le dosage s exprime en mg/ml. Un dosage trop faible peut pousser a augmenter la frequence d usage.",
          "Un dosage trop eleve peut devenir inconfortable. Avancez progressivement."
        ]
      },
      {
        title: "Ratio PG/VG",
        paragraphs: [
          "Un ratio proche de 50/50 reste une base simple en MTL. Regardez toujours la recommandation produit.",
          "L objectif est la stabilite du rendu, pas la recherche d intensite."
        ]
      }
    ]
  },
  {
    slug: "regler-mod-mtl",
    title: "Regler un mod MTL avec une methode simple",
    description: "Comment regler la puissance de facon progressive et eviter les ecarts inutiles.",
    excerpt: "Une methode en petits paliers pour trouver un reglage stable avec votre clearomiseur MTL.",
    readTimeMinutes: 4,
    tags: ["debutant", "materiel-mtl"],
    beginnerStep: 3,
    catalogCtaHref: "/catalog/materiel-mtl",
    catalogCtaLabel: "Comparer les mods et clearomiseurs",
    sections: [
      {
        title: "Partir de la plage recommandee",
        paragraphs: [
          "Chaque clearomiseur indique une plage de puissance. Commencez proche de la borne basse.",
          "Verifiez ensuite que la plage du mod recouvre bien celle du clearomiseur."
        ]
      },
      {
        title: "Ajuster par paliers",
        paragraphs: [
          "Changez de 1 a 2 watts maximum entre deux essais et observez pendant plusieurs bouffees.",
          "Ne changez pas plusieurs parametres en meme temps."
        ]
      },
      {
        title: "Rester dans une zone stable",
        paragraphs: [
          "Une fois la zone trouvee, conservez-la pour une routine lisible.",
          "Le but est le bon usage dans la duree."
        ]
      }
    ]
  },
  {
    slug: "entretien-clearomiseur-mtl",
    title: "Entretien de base d un clearomiseur MTL",
    description: "Des gestes simples pour garder un fonctionnement regulier.",
    excerpt: "Un entretien legere et regulier pour eviter les variations et conserver un usage propre.",
    readTimeMinutes: 3,
    tags: ["entretien", "materiel-mtl"],
    beginnerStep: 4,
    catalogCtaHref: "/catalog/materiel-mtl",
    catalogCtaLabel: "Voir les clearomiseurs MTL",
    sections: [
      {
        title: "Nettoyage regulier",
        paragraphs: [
          "Nettoyez les pieces demontables avec de l eau tiede puis laissez secher completement.",
          "Un entretien simple et regulier vaut mieux qu un nettoyage rare et lourd."
        ]
      },
      {
        title: "Verifier l etat general",
        paragraphs: [
          "Surveillez joints, pas de vis et niveau d usure visible.",
          "En cas de doute, remplacez la piece concernee plutot que forcer l usage."
        ]
      }
    ]
  },
  {
    slug: "preparer-demande-commande",
    title: "Preparer une demande de commande claire",
    description: "Checklist rapide avant envoi de votre demande de commande LOVAPE.",
    excerpt: "Un recap simple pour verifier panier, coordonnees et mentions legale avant envoi.",
    readTimeMinutes: 3,
    tags: ["debutant", "e-liquide"],
    beginnerStep: 5,
    catalogCtaHref: "/catalog/e-liquides",
    catalogCtaLabel: "Revenir au catalogue",
    sections: [
      {
        title: "Verifier le panier",
        paragraphs: [
          "Controlez references, quantites et total estime avant de passer au formulaire.",
          "Ajoutez un message client seulement si c est utile pour votre demande."
        ]
      },
      {
        title: "Completer les informations de contact",
        paragraphs: [
          "Renseignez nom, prenom et email avec attention pour faciliter le suivi.",
          "Confirmez les mentions legale et majorite avant l envoi."
        ]
      },
      {
        title: "Etape suivante",
        paragraphs: [
          "Apres envoi, LOVAPE revient vers vous pour confirmer disponibilite, livraison et details pratiques."
        ]
      }
    ]
  }
];

export const GUIDE_LEXICON: LexiconEntry[] = [
  {
    term: "MTL",
    definition: "Mode de tirage indirect oriente faibles puissances et usage progressif."
  },
  {
    term: "Mod",
    definition: "Partie alimentation et reglage de puissance du materiel MTL."
  },
  {
    term: "Clearomiseur",
    definition: "Partie qui contient l e-liquide et la resistance."
  },
  {
    term: "Puissance (W)",
    definition: "Reglage en watts applique au clearomiseur."
  },
  {
    term: "Ratio PG/VG",
    definition: "Repartition de la base e-liquide, visible sur la fiche produit."
  }
];

const TAG_LABELS: Record<GuideTag, string> = {
  debutant: "Debutant",
  "materiel-mtl": "Materiel MTL",
  "e-liquide": "E-liquide",
  entretien: "Entretien"
};

export function getGuideArticles(): GuideArticle[] {
  return GUIDE_ARTICLES;
}

export function getGuideArticleBySlug(slug: string): GuideArticle | undefined {
  return GUIDE_ARTICLES.find((article) => article.slug === slug);
}

export function getGuideArticlesByTag(tag: GuideTag): GuideArticle[] {
  return GUIDE_ARTICLES.filter((article) => article.tags.includes(tag));
}

export function getGuideBeginnerPath(): GuideArticle[] {
  return GUIDE_ARTICLES.filter((article) => typeof article.beginnerStep === "number").sort(
    (left, right) => (left.beginnerStep ?? 0) - (right.beginnerStep ?? 0)
  );
}

export function getGuideTagLabel(tag: GuideTag): string {
  return TAG_LABELS[tag];
}

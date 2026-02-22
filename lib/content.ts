export type Language = "fr" | "en";
export type Theme = "dark" | "light";

export type NavTab = {
  key: string;
  label: string;
  href?: string;
  disabled?: boolean;
};

export type ControlsLabels = {
  ariaLabel: string;
  language: string;
  theme: string;
  dark: string;
  light: string;
};

type HomeCopy = {
  brand: string;
  brandHomeAria: string;
  subtitle: string;
  qualityTitle: string;
  navigationLabel: string;
  tabs: NavTab[];
  controls: ControlsLabels;
};

type ELiquidesCopy = {
  brand: string;
  brandHomeAria: string;
  title: string;
  fabricantsCard: string;
  navigationLabel: string;
  tabs: NavTab[];
  controls: ControlsLabels;
};

type FabricantsCopy = {
  brand: string;
  brandHomeAria: string;
  title: string;
  navigationLabel: string;
  tabs: NavTab[];
  controls: ControlsLabels;
};

export type ManufacturerLogo = {
  src: string;
  fit?: "cover" | "contain";
  frame?: "default" | "square";
};

export type Manufacturer = {
  name: string;
  logo?: ManufacturerLogo;
};

const tabs: Record<Language, NavTab[]> = {
  fr: [
    { key: "eliquides", label: "E-liquides", href: "/e-liquides" },
    { key: "ecigarettes", label: "E-cigarettes", disabled: true },
    { key: "diy", label: "Do it yourself", disabled: true },
    { key: "accessoires", label: "Accessoires", disabled: true },
    { key: "conseils", label: "Conseils", disabled: true },
    { key: "faq", label: "Faq", disabled: true },
    { key: "about", label: "\u00c0 propos de Lovape", disabled: true }
  ],
  en: [
    { key: "eliquides", label: "E-liquids", href: "/e-liquides" },
    { key: "ecigarettes", label: "E-cigarettes", disabled: true },
    { key: "diy", label: "Do it yourself", disabled: true },
    { key: "accessoires", label: "Accessories", disabled: true },
    { key: "conseils", label: "Advice", disabled: true },
    { key: "faq", label: "FAQ", disabled: true },
    { key: "about", label: "About Lovape", disabled: true }
  ]
};

const controls: Record<Language, ControlsLabels> = {
  fr: {
    ariaLabel: "Parametres d'affichage",
    language: "Langue",
    theme: "Theme",
    dark: "Sombre",
    light: "Clair"
  },
  en: {
    ariaLabel: "Display settings",
    language: "Language",
    theme: "Theme",
    dark: "Dark",
    light: "Light"
  }
};

export const siteContent: Record<
  Language,
  {
    home: HomeCopy;
    eLiquides: ELiquidesCopy;
    fabricants: FabricantsCopy;
  }
> = {
  fr: {
    home: {
      brand: "LOVAPE",
      brandHomeAria: "Retour a l'accueil",
      subtitle: "Bien vaper - mieux vaper",
      qualityTitle: "E-liquides Fran\u00e7ais de qualit\u00e9s et vape responsable",
      navigationLabel: "Navigation principale",
      tabs: tabs.fr,
      controls: controls.fr
    },
    eLiquides: {
      brand: "LOVAPE",
      brandHomeAria: "Retour a l'accueil",
      title: "E-liquides",
      fabricantsCard: "Fabricants",
      navigationLabel: "Navigation principale",
      tabs: tabs.fr,
      controls: controls.fr
    },
    fabricants: {
      brand: "LOVAPE",
      brandHomeAria: "Retour a l'accueil",
      title: "Fabricants",
      navigationLabel: "Navigation principale",
      tabs: tabs.fr,
      controls: controls.fr
    }
  },
  en: {
    home: {
      brand: "LOVAPE",
      brandHomeAria: "Back to home",
      subtitle: "Vape well - vape better",
      qualityTitle: "French quality e-liquids and responsible vaping",
      navigationLabel: "Main navigation",
      tabs: tabs.en,
      controls: controls.en
    },
    eLiquides: {
      brand: "LOVAPE",
      brandHomeAria: "Back to home",
      title: "E-liquids",
      fabricantsCard: "Manufacturers",
      navigationLabel: "Main navigation",
      tabs: tabs.en,
      controls: controls.en
    },
    fabricants: {
      brand: "LOVAPE",
      brandHomeAria: "Back to home",
      title: "Manufacturers",
      navigationLabel: "Main navigation",
      tabs: tabs.en,
      controls: controls.en
    }
  }
};

export const manufacturers: Manufacturer[] = [
  {
    name: "V\u00e9g\u00e9tol",
    logo: {
      src: "https://vegetol.com/wp-content/uploads/2024/12/logo-vegetol.webp",
      fit: "contain"
    }
  },
  { name: "VDLV" },
  { name: "Terroir et Vapeur" },
  { name: "Curieux" },
  { name: "Le French Liquide" },
  {
    name: "Savourea",
    logo: {
      src: "https://www.savourea.fr/sitev2/wp-content/uploads/2020/01/logo-savourea-gris-1.png",
      fit: "contain",
      frame: "square"
    }
  },
  {
    name: "Alfaliquid",
    logo: {
      src: "https://www.alfaliquid.com/themes/adipso/assets/img/logos/logo-alfaliquid.png",
      fit: "contain"
    }
  }
];

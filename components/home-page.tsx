"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "fr" | "en";
type Theme = "light" | "dark";

const content = {
  fr: {
    brand: "LOVAPE",
    tagline: "Bien vaper - mieux vaper",
    navigation: ["Nouveautes", "Kits", "E-liquides", "Promotions"],
    controls: {
      language: "Langue",
      theme: "Theme",
      light: "Clair",
      dark: "Sombre"
    },
    hero: {
      eyebrow: "E-commerce vape premium",
      title: "Une boutique pensee pour une vape simple, fiable et elegante.",
      description:
        "Retrouvez les meilleurs kits, pods et e-liquides avec livraison rapide, conseil expert et selection testee.",
      primaryCta: "Decouvrir la selection",
      secondaryCta: "Voir les offres debutants",
      panelTitle: "Pourquoi LOVAPE ?",
      panelPoints: [
        "Expedition 24h sur produits en stock",
        "Paiement 100% securise",
        "Support vape 6 jours sur 7"
      ]
    },
    stats: [
      { value: "12k+", label: "Clients satisfaits" },
      { value: "4.9/5", label: "Avis verifies" },
      { value: "250+", label: "References en stock" }
    ],
    categoriesTitle: "Categories phares",
    categories: [
      {
        title: "Kits debutants",
        description: "Prise en main immediate avec autonomie longue duree."
      },
      {
        title: "Pods compacts",
        description: "Format poche, tirage doux, ideal quotidien."
      },
      {
        title: "E-liquides premium",
        description: "Gouts nets, nicotine adaptee et tracabilite complete."
      },
      {
        title: "Accessoires",
        description: "Resistances, pyrex, chargeurs et entretien."
      }
    ],
    productsTitle: "Best-sellers du moment",
    products: [
      {
        name: "Starter Air X",
        detail: "Pod 1200 mAh - remplissage lateral",
        price: "39,90 EUR",
        badge: "Top vente"
      },
      {
        name: "Cloud Mini Pro",
        detail: "Tirage reglable - USB-C rapide",
        price: "44,90 EUR",
        badge: "Nouveau"
      },
      {
        name: "E-liquide Ice Mint 50ml",
        detail: "Menthe fraiche - ratio 50/50",
        price: "18,90 EUR",
        badge: "Edition premium"
      },
      {
        name: "Pack 5 resistances M1",
        detail: "Compatible pods LOVAPE",
        price: "14,50 EUR",
        badge: "Essentiel"
      }
    ],
    trustTitle: "Acheter en confiance",
    trustItems: [
      "Produits conformes aux normes europeennes",
      "Retours simplifies sous 14 jours",
      "Conseils personnalises selon votre profil"
    ],
    newsletterTitle: "Offres privees LOVAPE",
    newsletterText: "Recevez nos nouveautes, guides vape et promos exclusives.",
    newsletterCta: "Je m'inscris"
  },
  en: {
    brand: "LOVAPE",
    tagline: "Vape well - vape better",
    navigation: ["New", "Starter kits", "E-liquids", "Deals"],
    controls: {
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark"
    },
    hero: {
      eyebrow: "Premium vape e-commerce",
      title: "A storefront built for a smoother, cleaner and smarter vape experience.",
      description:
        "Shop trusted kits, pods and e-liquids with fast delivery, expert support and a curated selection.",
      primaryCta: "Explore collection",
      secondaryCta: "See starter offers",
      panelTitle: "Why LOVAPE?",
      panelPoints: [
        "24h shipping on in-stock products",
        "100% secure checkout",
        "Vape support 6 days a week"
      ]
    },
    stats: [
      { value: "12k+", label: "Happy customers" },
      { value: "4.9/5", label: "Verified reviews" },
      { value: "250+", label: "Items in stock" }
    ],
    categoriesTitle: "Top categories",
    categories: [
      {
        title: "Starter kits",
        description: "Easy setup with long-lasting battery life."
      },
      {
        title: "Compact pods",
        description: "Pocket format, smooth draw, perfect daily use."
      },
      {
        title: "Premium e-liquids",
        description: "Clean taste, flexible nicotine and full traceability."
      },
      {
        title: "Accessories",
        description: "Coils, tanks, chargers and maintenance."
      }
    ],
    productsTitle: "Current best sellers",
    products: [
      {
        name: "Starter Air X",
        detail: "1200 mAh pod - side refill",
        price: "39.90 EUR",
        badge: "Best seller"
      },
      {
        name: "Cloud Mini Pro",
        detail: "Adjustable airflow - fast USB-C",
        price: "44.90 EUR",
        badge: "New"
      },
      {
        name: "Ice Mint E-liquid 50ml",
        detail: "Fresh mint - 50/50 blend",
        price: "18.90 EUR",
        badge: "Premium edition"
      },
      {
        name: "M1 Coils Pack of 5",
        detail: "LOVAPE pod compatible",
        price: "14.50 EUR",
        badge: "Essential"
      }
    ],
    trustTitle: "Shop with confidence",
    trustItems: [
      "Products aligned with European compliance standards",
      "Easy 14-day returns",
      "Personalized recommendations for your profile"
    ],
    newsletterTitle: "LOVAPE private offers",
    newsletterText: "Get new releases, vape guides and exclusive discounts.",
    newsletterCta: "Subscribe"
  }
} as const;

export function HomePage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("lovape-language");
    const savedTheme = window.localStorage.getItem("lovape-theme");

    if (savedLanguage === "fr" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      return;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("lovape-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("lovape-language", language);
  }, [language]);

  const copy = useMemo(() => content[language], [language]);

  return (
    <main className="site-shell">
      <header className="topbar reveal" style={{ animationDelay: "0.05s" }}>
        <p className="brand-mark">{copy.brand}</p>
        <nav className="main-nav" aria-label={copy.brand}>
          {copy.navigation.map((item) => (
            <a key={item} href="#" className="nav-link">
              {item}
            </a>
          ))}
        </nav>

        <div className="toolbar">
          <div className="switch-group">
            <span>{copy.controls.language}</span>
            <div className="segmented">
              {(["fr", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`switch-btn ${language === lang ? "active" : ""}`}
                  onClick={() => setLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="switch-group">
            <span>{copy.controls.theme}</span>
            <div className="segmented">
              {(["light", "dark"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`switch-btn ${theme === mode ? "active" : ""}`}
                  onClick={() => setTheme(mode)}
                >
                  {mode === "light" ? copy.controls.light : copy.controls.dark}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy reveal" style={{ animationDelay: "0.1s" }}>
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.brand}</h1>
          <p className="subtitle">{copy.tagline}</p>
          <p className="hero-text">{copy.hero.title}</p>
          <p className="hero-text secondary">{copy.hero.description}</p>

          <div className="hero-actions">
            <button type="button" className="primary-btn">
              {copy.hero.primaryCta}
            </button>
            <button type="button" className="ghost-btn">
              {copy.hero.secondaryCta}
            </button>
          </div>

          <div className="stats-grid">
            {copy.stats.map((item, index) => (
              <article
                key={item.label}
                className="stat-card reveal"
                style={{ animationDelay: `${0.15 + index * 0.07}s` }}
              >
                <p className="stat-value">{item.value}</p>
                <p className="stat-label">{item.label}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="hero-panel reveal" style={{ animationDelay: "0.2s" }}>
          <h2>{copy.hero.panelTitle}</h2>
          <ul className="panel-list">
            {copy.hero.panelPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="section-block reveal" style={{ animationDelay: "0.25s" }}>
        <h2 className="section-title">{copy.categoriesTitle}</h2>
        <div className="category-grid">
          {copy.categories.map((item, index) => (
            <article
              key={item.title}
              className="category-card reveal"
              style={{ animationDelay: `${0.3 + index * 0.05}s` }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block reveal" style={{ animationDelay: "0.3s" }}>
        <h2 className="section-title">{copy.productsTitle}</h2>
        <div className="product-grid">
          {copy.products.map((product, index) => (
            <article
              key={product.name}
              className="product-card reveal"
              style={{ animationDelay: `${0.35 + index * 0.05}s` }}
            >
              <p className="badge">{product.badge}</p>
              <h3>{product.name}</h3>
              <p>{product.detail}</p>
              <strong>{product.price}</strong>
              <button type="button" className="ghost-btn full-width">
                {language === "fr" ? "Ajouter au panier" : "Add to cart"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block trust reveal" style={{ animationDelay: "0.35s" }}>
        <h2 className="section-title">{copy.trustTitle}</h2>
        <div className="trust-list">
          {copy.trustItems.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="newsletter reveal" style={{ animationDelay: "0.4s" }}>
        <h2>{copy.newsletterTitle}</h2>
        <p>{copy.newsletterText}</p>
        <button type="button" className="primary-btn">
          {copy.newsletterCta}
        </button>
      </section>
    </main>
  );
}

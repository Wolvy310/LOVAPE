"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "fr" | "en";
type Theme = "dark" | "light";

const content = {
  fr: {
    title: "LOVAPE",
    qualityTitle: "E-liquides Fran\u00e7ais de qualit\u00e9s et vape responsable",
    subtitle: "Bien vaper - mieux vaper",
    navigationLabel: "Navigation principale",
    menuLabel: "Menu",
    menuAria: "Menu complet",
    tabs: [
      "E-liquides",
      "E-cigarrettes",
      "Do it yourself",
      "Accessoires",
      "Conseils",
      "Faq",
      "\u00c0 propos de Lovape"
    ],
    controls: {
      language: "Langue",
      theme: "Theme",
      dark: "Sombre",
      light: "Clair"
    }
  },
  en: {
    title: "LOVAPE",
    qualityTitle: "French quality e-liquids and responsible vaping",
    subtitle: "Vape well - vape better",
    navigationLabel: "Main navigation",
    menuLabel: "Menu",
    menuAria: "Full menu",
    tabs: [
      "E-liquids",
      "E-cigarettes",
      "Do it yourself",
      "Accessories",
      "Advice",
      "FAQ",
      "About Lovape"
    ],
    controls: {
      language: "Language",
      theme: "Theme",
      dark: "Dark",
      light: "Light"
    }
  }
} as const;

export function HomePage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const savedLanguage = window.localStorage.getItem("lovape-language");
      const savedTheme = window.localStorage.getItem("lovape-theme");

      if (savedLanguage === "fr" || savedLanguage === "en") {
        setLanguage(savedLanguage);
      }

      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      }
    } catch {
      // Ignore storage access errors and keep defaults.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("lovape-language", language);
    } catch {
      // Ignore storage access errors.
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem("lovape-theme", theme);
    } catch {
      // Ignore storage access errors.
    }
  }, [theme]);

  const copy = content[language];

  return (
    <main className="home-page">
      <div className="hero-content">
        <h1>
          <Link href="/" className="brand-link" aria-label="Retour a l'accueil">
            {copy.title}
          </Link>
        </h1>
        <p className="subtitle">{copy.subtitle}</p>
        <h2 className="quality-title">{copy.qualityTitle}</h2>
      </div>

      <header className="top-banner">
        <details className="menu-dropdown">
          <summary className="menu-trigger">{copy.menuLabel}</summary>
          <nav className="menu-panel" aria-label={copy.menuAria}>
            <ul>
              {copy.tabs.map((tab) => (
                <li key={`menu-${tab}`}>
                  <a href="#" className="menu-link">
                    {tab}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>

        <nav className="top-tabs" aria-label={copy.navigationLabel}>
          <ul>
            {copy.tabs.map((tab) => (
              <li key={tab}>
                <a href="#" className="tab-link">
                  {tab}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="floating-controls" aria-label="Parametres d'affichage">
        <div className="controls">
          <div className="switch-group">
            <span>{copy.controls.language}</span>
            <div className="segmented">
              {(["fr", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`switch-btn ${language === lang ? "active" : ""}`}
                  onClick={() => setLanguage(lang)}
                  aria-pressed={language === lang}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="switch-group">
            <span>{copy.controls.theme}</span>
            <div className="segmented">
              {(["dark", "light"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`switch-btn ${theme === mode ? "active" : ""}`}
                  onClick={() => setTheme(mode)}
                  aria-pressed={theme === mode}
                >
                  {mode === "dark" ? copy.controls.dark : copy.controls.light}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

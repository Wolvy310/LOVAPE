"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "fr" | "en";
type Theme = "dark" | "light";

const tabs = [
  "E-liquides",
  "E-cigarrettes",
  "Do it yourself",
  "Accessoires",
  "Conseils",
  "Faq",
  "\u00c0 propos de Lovape"
] as const;

const content = {
  fr: {
    title: "LOVAPE",
    qualityTitle: "E-liquides Fran\u00e7ais de qualit\u00e9s et vape responsable",
    subtitle: "Bien vaper - mieux vaper",
    controls: {
      language: "Langue",
      theme: "Theme",
      dark: "Sombre",
      light: "Clair"
    }
  },
  en: {
    title: "LOVAPE",
    qualityTitle: "E-liquides Fran\u00e7ais de qualit\u00e9s et vape responsable",
    subtitle: "Vape well - vape better",
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
    const savedLanguage = window.localStorage.getItem("lovape-language");
    const savedTheme = window.localStorage.getItem("lovape-theme");

    if (savedLanguage === "fr" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("lovape-language", language);
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("lovape-theme", theme);
  }, [theme]);

  const copy = useMemo(() => content[language], [language]);

  return (
    <main className="home-page">
      <div className="hero-content">
        <h1>{copy.title}</h1>
        <p className="subtitle">{copy.subtitle}</p>
        <h2 className="quality-title">{copy.qualityTitle}</h2>
      </div>

      <header className="top-banner">
        <details className="menu-dropdown">
          <summary className="menu-trigger">Menu</summary>
          <nav className="menu-panel" aria-label="Menu complet">
            {tabs.map((tab) => (
              <a key={`menu-${tab}`} href="#" className="menu-link">
                {tab}
              </a>
            ))}
          </nav>
        </details>

        <nav className="top-tabs" aria-label="Navigation principale">
          {tabs.map((tab) => (
            <a key={tab} href="#" className="tab-link">
              {tab}
            </a>
          ))}
        </nav>
      </header>

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
              >
                {mode === "dark" ? copy.controls.dark : copy.controls.light}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

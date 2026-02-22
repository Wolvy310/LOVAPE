"use client";

import Link from "next/link";
import { FloatingControls } from "@/components/floating-controls";
import { NavTab, SiteNavigation } from "@/components/site-navigation";
import { useSitePreferences } from "@/lib/site-preferences";

const manufacturers = [
  { name: "V\u00e9g\u00e9tol" },
  { name: "VDLV" },
  { name: "Terroir et Vapeur" },
  { name: "Curieux" },
  { name: "Le French Liquide" },
  { name: "Savourea" },
  { name: "Alfaliquid" }
] as const;

const content = {
  fr: {
    title: "Fabricants",
    navigationLabel: "Navigation principale",
    tabs: [
      { label: "E-liquides", href: "/e-liquides" },
      { label: "E-cigarrettes", href: "#" },
      { label: "Do it yourself", href: "#" },
      { label: "Accessoires", href: "#" },
      { label: "Conseils", href: "#" },
      { label: "Faq", href: "#" },
      { label: "\u00c0 propos de Lovape", href: "#" }
    ] satisfies NavTab[],
    controls: {
      language: "Langue",
      theme: "Theme",
      dark: "Sombre",
      light: "Clair"
    }
  },
  en: {
    title: "Manufacturers",
    navigationLabel: "Main navigation",
    tabs: [
      { label: "E-liquids", href: "/e-liquides" },
      { label: "E-cigarettes", href: "#" },
      { label: "Do it yourself", href: "#" },
      { label: "Accessories", href: "#" },
      { label: "Advice", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "About Lovape", href: "#" }
    ] satisfies NavTab[],
    controls: {
      language: "Language",
      theme: "Theme",
      dark: "Dark",
      light: "Light"
    }
  }
} as const;

export function FabricantsPage() {
  const { language, setLanguage, theme, setTheme } = useSitePreferences();
  const copy = content[language];

  return (
    <main className="home-page">
      <div className="hero-content">
        <h1>
          <Link href="/" className="brand-link" aria-label="Retour a l'accueil">
            LOVAPE
          </Link>
        </h1>
        <h2 className="section-title">{copy.title}</h2>
      </div>

      <SiteNavigation ariaLabel={copy.navigationLabel} tabs={copy.tabs} activeHref="/e-liquides" />

      <section className="cards-section" aria-label={copy.title}>
        <div className="brand-grid">
          {manufacturers.map((brand) => (
            <button key={brand.name} type="button" className="brand-card brand-card-button">
              <h3>{brand.name}</h3>
            </button>
          ))}
        </div>
      </section>

      <FloatingControls
        labels={copy.controls}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />
    </main>
  );
}

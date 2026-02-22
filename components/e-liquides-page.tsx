"use client";

import Link from "next/link";
import { FloatingControls } from "@/components/floating-controls";
import { SiteNavigation } from "@/components/site-navigation";
import { siteContent } from "@/lib/content";
import { useSitePreferences } from "@/lib/site-preferences";

export function ELiquidesPage() {
  const { language, setLanguage, theme, setTheme } = useSitePreferences();
  const copy = siteContent[language].eLiquides;

  return (
    <main className="home-page">
      <div className="hero-content">
        <h1>
          <Link href="/" className="brand-link" aria-label={copy.brandHomeAria}>
            {copy.brand}
          </Link>
        </h1>
        <h2 className="section-title">{copy.title}</h2>
      </div>

      <SiteNavigation ariaLabel={copy.navigationLabel} tabs={copy.tabs} activeHref="/e-liquides" />

      <section className="cards-section" aria-label={copy.title}>
        <div className="cards-grid">
          <Link href="/e-liquides/fabricants" className="feature-card">
            <h3>{copy.fabricantsCard}</h3>
          </Link>
        </div>
      </section>

      <FloatingControls
        ariaLabel={copy.controls.ariaLabel}
        labels={copy.controls}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />
    </main>
  );
}

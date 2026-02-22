"use client";

import Link from "next/link";
import { FloatingControls } from "@/components/floating-controls";
import { SiteNavigation } from "@/components/site-navigation";
import { siteContent } from "@/lib/content";
import { useSitePreferences } from "@/lib/site-preferences";

export function HomePage() {
  const { language, setLanguage, theme, setTheme } = useSitePreferences();
  const copy = siteContent[language].home;

  return (
    <main className="home-page">
      <div className="hero-content">
        <h1>
          <Link href="/" className="brand-link" aria-label={copy.brandHomeAria}>
            {copy.brand}
          </Link>
        </h1>
        <p className="subtitle">{copy.subtitle}</p>
        <h2 className="quality-title">{copy.qualityTitle}</h2>
      </div>

      <SiteNavigation ariaLabel={copy.navigationLabel} tabs={copy.tabs} />

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

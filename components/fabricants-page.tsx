"use client";

import Link from "next/link";
import { FloatingControls } from "@/components/floating-controls";
import { manufacturers, siteContent } from "@/lib/content";
import { SiteNavigation } from "@/components/site-navigation";
import { useSitePreferences } from "@/lib/site-preferences";

export function FabricantsPage() {
  const { language, setLanguage, theme, setTheme } = useSitePreferences();
  const copy = siteContent[language].fabricants;

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
        <div className="brand-grid">
          {manufacturers.map((brand) => (
            <button key={brand.name} type="button" className="brand-card brand-card-button">
              {brand.logo ? (
                <span
                  className={`brand-logo-frame ${brand.logo.frame === "square" ? "brand-logo-frame-square" : ""}`}
                  aria-hidden="true"
                >
                  <img
                    src={brand.logo.src}
                    alt=""
                    className={`brand-logo-fill ${brand.logo.fit === "contain" ? "brand-logo-contain" : ""}`}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              ) : null}
              <h3>{brand.name}</h3>
            </button>
          ))}
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

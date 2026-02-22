import Link from "next/link";
import type { NavTab } from "@/lib/content";

type SiteNavigationProps = {
  ariaLabel: string;
  tabs: NavTab[];
  activeHref?: string;
};

export function SiteNavigation({ ariaLabel, tabs, activeHref }: SiteNavigationProps) {
  return (
    <header className="top-banner">
      <nav className="top-tabs" aria-label={ariaLabel}>
        <ul>
          {tabs.map((tab) => {
            const isActive = activeHref !== undefined && tab.href === activeHref && !tab.disabled;
            const className = `tab-link ${isActive ? "active-tab" : ""}`;

            if (tab.disabled || !tab.href) {
              return (
                <li key={tab.key}>
                  <span className={`${className} tab-disabled`} aria-disabled="true">
                    {tab.label}
                  </span>
                </li>
              );
            }

            if (tab.href.startsWith("/")) {
              return (
                <li key={tab.key}>
                  <Link href={tab.href} className={className} aria-current={isActive ? "page" : undefined}>
                    {tab.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={tab.key}>
                <a href={tab.href} className={className} aria-current={isActive ? "page" : undefined}>
                  {tab.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

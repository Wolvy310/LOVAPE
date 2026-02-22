import Link from "next/link";

export type NavTab = {
  label: string;
  href: string;
};

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
            const isActive = activeHref !== undefined && tab.href === activeHref;
            const className = `tab-link ${isActive ? "active-tab" : ""}`;

            if (tab.href.startsWith("/")) {
              return (
                <li key={tab.label}>
                  <Link href={tab.href} className={className}>
                    {tab.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={tab.label}>
                <a href={tab.href} className={className}>
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


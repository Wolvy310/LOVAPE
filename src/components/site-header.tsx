import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-lg font-semibold text-foreground">
          LOVAPE
        </Link>
        <nav aria-label="Navigation principale" className="flex items-center gap-4 text-sm">
          <Link href="/catalog/e-liquides" className="text-muted-foreground hover:text-foreground">
            E-liquides
          </Link>
          <Link href="/catalog/materiel-mtl" className="text-muted-foreground hover:text-foreground">
            Materiel MTL
          </Link>
          <Link href="/guide" className="text-muted-foreground hover:text-foreground">
            Guide
          </Link>
        </nav>
      </div>
    </header>
  );
}


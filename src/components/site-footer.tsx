import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container grid gap-6 py-8 text-sm md:grid-cols-2">
        <div className="space-y-2">
          <p className="font-medium text-foreground">LOVAPE</p>
          <p className="text-muted-foreground">Vente interdite aux mineurs.</p>
          <p className="text-muted-foreground">Si vous ne fumez pas, ne vapez pas.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 md:justify-end">
          <Link href="/livraison" className="text-muted-foreground hover:text-foreground">
            Livraison
          </Link>
          <Link href="/retours" className="text-muted-foreground hover:text-foreground">
            Retours
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          <Link href="/confidentialite" className="text-muted-foreground hover:text-foreground">
            Confidentialite
          </Link>
        </div>
      </div>
    </footer>
  );
}


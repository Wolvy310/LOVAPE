"use client";

import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";

export default function Error({
  error
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container py-10">
      <Alert variant="destructive" className="space-y-3">
        <p className="font-medium">Impossible de charger cette fiche produit.</p>
        <p className="text-sm text-muted-foreground">
          Revenez au catalogue puis reessayez d ouvrir le produit.
        </p>
        <p className="sr-only">{error.message}</p>
        <Link href="/catalog/e-liquides" className={buttonVariants({ variant: "secondary", size: "sm" })}>
          Retour catalogue
        </Link>
      </Alert>
    </div>
  );
}


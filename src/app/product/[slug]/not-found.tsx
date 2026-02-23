import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="container py-10">
      <Alert className="space-y-3">
        <p className="font-medium">Produit introuvable</p>
        <p className="text-sm text-muted-foreground">
          Le produit demande est peut-etre indisponible ou son lien a change.
        </p>
        <Link href="/catalog/e-liquides" className={buttonVariants({ variant: "secondary", size: "sm" })}>
          Retour au catalogue
        </Link>
      </Alert>
    </div>
  );
}


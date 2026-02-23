import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";

interface CatalogEmptyStateProps {
  title: string;
  description: string;
  resetHref: string;
}

export function CatalogEmptyState({ title, description, resetHref }: CatalogEmptyStateProps) {
  return (
    <Alert className="space-y-3">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Link href={resetHref} className={buttonVariants({ variant: "secondary", size: "sm" })}>
        Revenir au catalogue complet
      </Link>
    </Alert>
  );
}


"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container py-10">
      <Alert variant="destructive" className="space-y-3">
        <p className="font-medium">Impossible de charger le catalogue materiel MTL.</p>
        <p className="text-sm">Reessayez dans un instant ou revenez plus tard.</p>
        <p className="sr-only">{error.message}</p>
        <Button type="button" onClick={reset}>
          Reessayer
        </Button>
      </Alert>
    </div>
  );
}

import { notFound } from "next/navigation";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function StateBox({
  label,
  description
}: {
  label: "loading" | "empty" | "error";
  description: string;
}) {
  return (
    <div className="rounded-md border border-border bg-secondary/30 p-4">
      <p className="font-mono-ui text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm text-foreground">{description}</p>
    </div>
  );
}

export default function DevStyleguidePage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="container space-y-8 py-10">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold">Dev Styleguide</h1>
        <p className="text-muted-foreground">
          Cette page est visible uniquement en developpement. Elle centralise composants et etats UI.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Variantes principales shadcn-style.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Alert>Etat informatif standard.</Alert>
          <Alert variant="warning">Avertissement legal: vente interdite aux mineurs.</Alert>
          <Alert variant="destructive">Erreur: echec temporaire de soumission.</Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Etats</CardTitle>
          <CardDescription>Chargement, vide, erreur.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <StateBox label="loading" description="Skeleton et feedback discret pendant le chargement." />
          <StateBox label="empty" description="Aucun resultat. Proposer un reset de filtre." />
          <StateBox label="error" description="Message clair + action de reessai." />
        </CardContent>
      </Card>
    </div>
  );
}


"use client";

import { usePathname } from "next/navigation";

import { useAnalyticsConsent } from "@/components/consent/use-analytics-consent";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function getStatusLabel(status: "accepted" | "rejected" | "unset"): string {
  if (status === "accepted") return "Accepte";
  if (status === "rejected") return "Refuse";
  return "Non defini";
}

export function ConsentSettingsCard() {
  const pathname = usePathname();
  const { status, ready, loading, error, submitDecision } = useAnalyticsConsent(pathname);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences cookies</CardTitle>
        <CardDescription>Vous pouvez modifier votre choix analytics a tout moment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid gap-2">
          <p className="text-muted-foreground">Etat actuel du consentement analytics</p>
          <div>
            <Badge variant={status === "accepted" ? "default" : status === "rejected" ? "outline" : "secondary"}>
              {ready ? getStatusLabel(status) : "Chargement..."}
            </Badge>
          </div>
        </div>

        <div className="grid gap-3 rounded-lg border border-border p-3">
          <p className="font-medium text-foreground">Cookies necessaires</p>
          <p className="text-muted-foreground">
            Toujours actifs pour le fonctionnement technique du site et la securite minimale.
          </p>
        </div>

        <div className="grid gap-3 rounded-lg border border-border p-3">
          <p className="font-medium text-foreground">Cookies analytics (opt-in)</p>
          <p className="text-muted-foreground">
            Actives uniquement apres acceptation explicite. Aucun tracking analytics sans consentement.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" disabled={loading} onClick={() => void submitDecision("ACCEPTED")}>
              Accepter l analytics
            </Button>
            <Button type="button" variant="secondary" size="sm" disabled={loading} onClick={() => void submitDecision("REJECTED")}>
              Refuser l analytics
            </Button>
          </div>
        </div>

        {error ? <Alert variant="destructive">{error}</Alert> : null}
      </CardContent>
    </Card>
  );
}

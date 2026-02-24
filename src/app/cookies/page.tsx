import type { Metadata } from "next";
import Link from "next/link";

import { ConsentSettingsCard } from "@/components/consent/consent-settings-card";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Politique cookies",
  description: "Details des categories de cookies LOVAPE et gestion du consentement analytics opt-in."
};

export default function CookiesPage() {
  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="warning">Vente interdite aux mineurs</Badge>
          <Badge variant="warning">Si vous ne fumez pas, ne vapez pas</Badge>
        </div>
        <h1 className="font-heading text-3xl font-semibold">Politique cookies</h1>
        <p className="max-w-3xl text-muted-foreground">
          LOVAPE utilise des cookies necessaires pour le fonctionnement du site. Les cookies analytics restent desactives
          tant que vous n avez pas donne votre consentement explicite.
        </p>
        <Alert>Contenu informatif, non medical.</Alert>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Categories de cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-1 rounded-lg border border-border p-3">
                <p className="font-medium text-foreground">1) Necessaires (toujours actifs)</p>
                <p className="text-muted-foreground">
                  Ces cookies permettent les fonctions techniques essentielles: securite, gestion de session admin et
                  stabilite du parcours.
                </p>
              </div>
              <div className="space-y-1 rounded-lg border border-border p-3">
                <p className="font-medium text-foreground">2) Analytics (opt-in)</p>
                <p className="text-muted-foreground">
                  Mesure d audience et conversion uniquement apres acceptation explicite. Aucun tracking analytics sans
                  consentement.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trace du consentement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                Chaque changement de choix analytics est journalise via `ConsentLog` (scope, decision, page, requestId).
              </p>
              <p>Les exports de preuves de consentement sont disponibles en administration.</p>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Link href="/confidentialite" className={buttonVariants({ variant: "secondary", size: "sm" })}>
              Lire la confidentialite
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Contacter le SAV
            </Link>
          </div>
        </div>

        <ConsentSettingsCard />
      </section>
    </div>
  );
}

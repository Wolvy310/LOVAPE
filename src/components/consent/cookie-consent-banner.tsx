"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAnalyticsConsent } from "@/components/consent/use-analytics-consent";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function CookieConsentBanner() {
  const pathname = usePathname();
  const { status, ready, loading, error, submitDecision } = useAnalyticsConsent(pathname);

  if (!ready || status !== "unset") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4">
      <div className="mx-auto w-full max-w-5xl rounded-xl border border-border bg-card p-4 shadow-lg">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-2 text-sm">
            <p className="font-medium text-foreground">Cookies et mesure d audience</p>
            <p className="text-muted-foreground">
              Les cookies necessaires restent actifs. Les cookies analytics sont actives uniquement apres votre accord explicite.
            </p>
            <p className="text-muted-foreground">Contenu informatif, non medical.</p>
            {error ? <Alert variant="destructive">{error}</Alert> : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" disabled={loading} onClick={() => void submitDecision("ACCEPTED")}>
              Accepter
            </Button>
            <Button type="button" variant="secondary" size="sm" disabled={loading} onClick={() => void submitDecision("REJECTED")}>
              Refuser
            </Button>
            <Link
              href="/cookies"
              className="inline-flex h-9 items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              Personnaliser
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

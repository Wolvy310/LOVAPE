"use client";

import { useCallback, useEffect, useState } from "react";

import {
  apiDecisionToAnalyticsConsentStatus,
  readAnalyticsConsentFromBrowser,
  type AnalyticsConsentApiDecision,
  type AnalyticsConsentStatus,
  writeAnalyticsConsentToBrowser
} from "@/lib/consent";

interface UseAnalyticsConsentResult {
  status: AnalyticsConsentStatus;
  ready: boolean;
  loading: boolean;
  error: string | null;
  submitDecision: (decision: AnalyticsConsentApiDecision) => Promise<boolean>;
}

export function useAnalyticsConsent(pagePath: string): UseAnalyticsConsentResult {
  const [status, setStatus] = useState<AnalyticsConsentStatus>("unset");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus(readAnalyticsConsentFromBrowser());
    setReady(true);
  }, []);

  const submitDecision = useCallback(
    async (decision: AnalyticsConsentApiDecision): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/consent", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            scope: "ANALYTICS",
            decision,
            pagePath
          })
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => ({}))) as { error?: string };
          setError(payload.error ?? "Impossible de sauvegarder votre choix pour le moment.");
          return false;
        }

        const nextStatus = apiDecisionToAnalyticsConsentStatus(decision);
        writeAnalyticsConsentToBrowser(nextStatus);
        setStatus(nextStatus);
        return true;
      } catch {
        setError("Une erreur reseau est survenue. Reessayez dans quelques instants.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [pagePath]
  );

  return {
    status,
    ready,
    loading,
    error,
    submitDecision
  };
}

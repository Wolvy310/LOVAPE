export const ANALYTICS_CONSENT_COOKIE_NAME = "lovape_analytics_consent";
export const ANALYTICS_CONSENT_STORAGE_KEY = "lovape:analytics-consent";
export const ANALYTICS_CONSENT_COOKIE_MAX_AGE_SECONDS = 180 * 24 * 60 * 60;

export type AnalyticsConsentStatus = "accepted" | "rejected" | "unset";
export type AnalyticsConsentApiDecision = "ACCEPTED" | "REJECTED";

export function normalizeAnalyticsConsentValue(value: string | null | undefined): AnalyticsConsentStatus {
  if (!value) {
    return "unset";
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === "accepted") {
    return "accepted";
  }
  if (normalized === "rejected") {
    return "rejected";
  }

  return "unset";
}

function extractCookieValue(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;

  const prefix = `${name}=`;
  for (const part of cookieHeader.split(";")) {
    const trimmed = part.trim();
    if (trimmed.startsWith(prefix)) {
      return decodeURIComponent(trimmed.slice(prefix.length));
    }
  }

  return undefined;
}

export function readAnalyticsConsentFromCookieHeader(cookieHeader: string | null): AnalyticsConsentStatus {
  return normalizeAnalyticsConsentValue(extractCookieValue(cookieHeader, ANALYTICS_CONSENT_COOKIE_NAME));
}

export function readAnalyticsConsentFromBrowser(): AnalyticsConsentStatus {
  if (typeof document === "undefined") {
    return "unset";
  }

  const cookieStatus = readAnalyticsConsentFromCookieHeader(document.cookie);
  if (cookieStatus !== "unset") {
    return cookieStatus;
  }

  if (typeof window === "undefined") {
    return "unset";
  }

  return normalizeAnalyticsConsentValue(window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY));
}

export function writeAnalyticsConsentToBrowser(status: Extract<AnalyticsConsentStatus, "accepted" | "rejected">): void {
  if (typeof document !== "undefined") {
    const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${ANALYTICS_CONSENT_COOKIE_NAME}=${encodeURIComponent(status)}; Path=/; Max-Age=${ANALYTICS_CONSENT_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, status);
  }
}

export function apiDecisionToAnalyticsConsentStatus(decision: AnalyticsConsentApiDecision): Extract<AnalyticsConsentStatus, "accepted" | "rejected"> {
  return decision === "ACCEPTED" ? "accepted" : "rejected";
}

export function isAnalyticsConsentGranted(status: AnalyticsConsentStatus): boolean {
  return status === "accepted";
}

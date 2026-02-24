import { isAnalyticsConsentGranted, readAnalyticsConsentFromBrowser } from "@/lib/consent";

type AnalyticsEventName =
  | "view_item"
  | "add_to_cart"
  | "begin_checkout_request"
  | "submit_request"
  | "contact_submit";

type AnalyticsEventProperties = Record<string, string | number | boolean | null | undefined>;

function isAnalyticsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
}

export function trackEvent(event: AnalyticsEventName, properties: AnalyticsEventProperties = {}): void {
  if (typeof window === "undefined") {
    return;
  }

  if (!isAnalyticsEnabled()) {
    return;
  }

  const consentStatus = readAnalyticsConsentFromBrowser();
  if (!isAnalyticsConsentGranted(consentStatus)) {
    return;
  }

  // MVP Step H: local tracker placeholder while keeping strict opt-in behavior.
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event, properties);
  }
}

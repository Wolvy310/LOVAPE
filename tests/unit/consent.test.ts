import { describe, expect, it } from "vitest";

import {
  apiDecisionToAnalyticsConsentStatus,
  isAnalyticsConsentGranted,
  normalizeAnalyticsConsentValue,
  readAnalyticsConsentFromCookieHeader
} from "@/lib/consent";

describe("consent helpers", () => {
  it("normalizes consent values safely", () => {
    expect(normalizeAnalyticsConsentValue("accepted")).toBe("accepted");
    expect(normalizeAnalyticsConsentValue("REJECTED")).toBe("rejected");
    expect(normalizeAnalyticsConsentValue("unknown")).toBe("unset");
    expect(normalizeAnalyticsConsentValue(null)).toBe("unset");
  });

  it("reads analytics consent from cookie headers", () => {
    expect(readAnalyticsConsentFromCookieHeader("foo=bar; lovape_analytics_consent=accepted")).toBe("accepted");
    expect(readAnalyticsConsentFromCookieHeader("lovape_analytics_consent=rejected")).toBe("rejected");
    expect(readAnalyticsConsentFromCookieHeader("foo=bar")).toBe("unset");
  });

  it("maps API decisions to consent status", () => {
    expect(apiDecisionToAnalyticsConsentStatus("ACCEPTED")).toBe("accepted");
    expect(apiDecisionToAnalyticsConsentStatus("REJECTED")).toBe("rejected");
  });

  it("detects granted analytics consent", () => {
    expect(isAnalyticsConsentGranted("accepted")).toBe(true);
    expect(isAnalyticsConsentGranted("rejected")).toBe(false);
    expect(isAnalyticsConsentGranted("unset")).toBe(false);
  });
});

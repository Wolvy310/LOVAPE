import { describe, expect, it } from "vitest";

import {
  assertAllowedELiquidBrand,
  assertNoForbiddenVapeTerms,
  containsForbiddenVapeTerm
} from "@/lib/vape-policy";

describe("vape policy", () => {
  it("detects forbidden terms in lowercase", () => {
    expect(containsForbiddenVapeTerm("pod mtl")).toBe(true);
    expect(containsForbiddenVapeTerm("clearomiseur mtl")).toBe(false);
  });

  it("detects forbidden terms in mixed case", () => {
    expect(containsForbiddenVapeTerm("Puff Menthol")).toBe(true);
  });

  it("throws for forbidden category label", () => {
    expect(() => assertNoForbiddenVapeTerms("pod starter", "category.name")).toThrowError(
      /Forbidden vape term/
    );
  });

  it("accepts allowed e-liquid brand", () => {
    expect(() => assertAllowedELiquidBrand("VDLV")).not.toThrow();
  });

  it("rejects unknown e-liquid brand", () => {
    expect(() => assertAllowedELiquidBrand("BrandX")).toThrowError(/not allowed/);
  });
});

import { describe, expect, it } from "vitest";

import { getCatalogProductsByFamily } from "@/lib/catalog-data";
import type { CatalogProduct } from "@/lib/catalog-types";
import { checkMtlCompatibility } from "@/lib/compat";

function getMaterialBySlug(slug: string): CatalogProduct {
  const product = getCatalogProductsByFamily("MTL_MATERIAL").find((item) => item.slug === slug);
  if (!product) {
    throw new Error(`Product not found for slug: ${slug}`);
  }

  return product;
}

describe("checkMtlCompatibility", () => {
  it("returns incompatible when selection is incomplete", () => {
    const result = checkMtlCompatibility();

    expect(result.compatible).toBe(false);
    expect(result.reason).toContain("Selection incomplete");
  });

  it("returns compatible when connector, power and resistance overlap", () => {
    const mod = getMaterialBySlug("core-mtl-mod-20w");
    const clearomizer = getMaterialBySlug("focus-mtl-clearomiseur");
    const result = checkMtlCompatibility(mod, clearomizer);

    expect(result.compatible).toBe(true);
    expect(result.connectorType).toBe("510");
    expect(result.recommendedPowerMinW).toBe(10);
    expect(result.recommendedPowerMaxW).toBe(17);
    expect(result.resistanceMinOhm).toBe(1);
    expect(result.resistanceMaxOhm).toBe(1.6);
  });

  it("returns incompatible when connector types differ", () => {
    const mod = getMaterialBySlug("core-mtl-mod-20w");
    const clearomizer = {
      ...getMaterialBySlug("focus-mtl-clearomiseur"),
      connectorType: "EGO"
    };

    const result = checkMtlCompatibility(mod, clearomizer);

    expect(result.compatible).toBe(false);
    expect(result.reason).toContain("Connecteurs incompatibles");
  });

  it("returns incompatible when power ranges do not overlap", () => {
    const mod = getMaterialBySlug("lite-mtl-mod-18w");
    const clearomizer = {
      ...getMaterialBySlug("focus-mtl-clearomiseur"),
      recommendedPowerMinW: 22,
      recommendedPowerMaxW: 28
    };

    const result = checkMtlCompatibility(mod, clearomizer);

    expect(result.compatible).toBe(false);
    expect(result.reason).toContain("Aucune plage de puissance commune");
  });

  it("returns incompatible when resistance ranges do not overlap", () => {
    const mod = getMaterialBySlug("core-mtl-mod-20w");
    const clearomizer = {
      ...getMaterialBySlug("balance-mtl-clearomiseur"),
      resistanceRange: "0.2-0.4 ohm"
    };

    const result = checkMtlCompatibility(mod, clearomizer);

    expect(result.compatible).toBe(false);
    expect(result.reason).toContain("Aucune resistance commune");
  });

  it("returns incompatible when product order is invalid", () => {
    const clearomizer = getMaterialBySlug("focus-mtl-clearomiseur");
    const mod = getMaterialBySlug("core-mtl-mod-20w");

    const result = checkMtlCompatibility(clearomizer, mod);

    expect(result.compatible).toBe(false);
    expect(result.reason).toContain("premier produit doit etre un mod");
  });
});

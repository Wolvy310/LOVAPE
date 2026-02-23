import type { CatalogProduct } from "@/lib/catalog-types";

interface NumericRange {
  min: number;
  max: number;
}

export interface CompatibilityResult {
  compatible: boolean;
  reason: string;
  connectorType?: string;
  recommendedPowerMinW?: number;
  recommendedPowerMaxW?: number;
  resistanceMinOhm?: number;
  resistanceMaxOhm?: number;
}

function hasFiniteNumber(value: number | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function normalizeConnector(connectorType: string | undefined): string | null {
  if (!connectorType) return null;
  const normalized = connectorType.trim().toUpperCase();
  return normalized.length > 0 ? normalized : null;
}

function toPowerRange(product: CatalogProduct): NumericRange | null {
  if (!hasFiniteNumber(product.recommendedPowerMinW) || !hasFiniteNumber(product.recommendedPowerMaxW)) {
    return null;
  }

  return {
    min: Math.min(product.recommendedPowerMinW, product.recommendedPowerMaxW),
    max: Math.max(product.recommendedPowerMinW, product.recommendedPowerMaxW)
  };
}

function parseResistanceRange(resistanceRange: string | undefined): NumericRange | null {
  if (!resistanceRange) return null;

  const normalized = resistanceRange.toLowerCase().replace(",", ".");

  const intervalMatch = normalized.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
  if (intervalMatch) {
    const min = Number.parseFloat(intervalMatch[1] ?? "");
    const max = Number.parseFloat(intervalMatch[2] ?? "");
    if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
    return { min: Math.min(min, max), max: Math.max(min, max) };
  }

  const singleValueMatch = normalized.match(/(\d+(?:\.\d+)?)/);
  if (!singleValueMatch) return null;

  const value = Number.parseFloat(singleValueMatch[1] ?? "");
  if (!Number.isFinite(value)) return null;

  return { min: value, max: value };
}

function intersectRanges(left: NumericRange, right: NumericRange): NumericRange | null {
  const min = Math.max(left.min, right.min);
  const max = Math.min(left.max, right.max);

  if (min > max) {
    return null;
  }

  return { min, max };
}

function formatOhm(value: number): string {
  return value.toFixed(1);
}

export function checkMtlCompatibility(mod?: CatalogProduct, clearomizer?: CatalogProduct): CompatibilityResult {
  if (!mod || !clearomizer) {
    return {
      compatible: false,
      reason: "Selection incomplete: choisissez un mod et un clearomiseur."
    };
  }

  if (mod.type !== "MTL_MOD") {
    return {
      compatible: false,
      reason: "Le premier produit doit etre un mod MTL."
    };
  }

  if (clearomizer.type !== "MTL_CLEAROMIZER") {
    return {
      compatible: false,
      reason: "Le second produit doit etre un clearomiseur MTL."
    };
  }

  const modConnector = normalizeConnector(mod.connectorType);
  const clearomizerConnector = normalizeConnector(clearomizer.connectorType);
  if (!modConnector || !clearomizerConnector) {
    return {
      compatible: false,
      reason: "Connecteur manquant sur l un des produits."
    };
  }

  if (modConnector !== clearomizerConnector) {
    return {
      compatible: false,
      reason: `Connecteurs incompatibles (${modConnector} vs ${clearomizerConnector}).`
    };
  }

  const modPowerRange = toPowerRange(mod);
  const clearomizerPowerRange = toPowerRange(clearomizer);
  if (!modPowerRange || !clearomizerPowerRange) {
    return {
      compatible: false,
      reason: "Plage de puissance incomplete sur l un des produits."
    };
  }

  const sharedPowerRange = intersectRanges(modPowerRange, clearomizerPowerRange);
  if (!sharedPowerRange) {
    return {
      compatible: false,
      reason: `Aucune plage de puissance commune (${modPowerRange.min}-${modPowerRange.max} W vs ${clearomizerPowerRange.min}-${clearomizerPowerRange.max} W).`
    };
  }

  const modResistanceRange = parseResistanceRange(mod.resistanceRange);
  const clearomizerResistanceRange = parseResistanceRange(clearomizer.resistanceRange);
  if (!modResistanceRange || !clearomizerResistanceRange) {
    return {
      compatible: false,
      reason: "Plage de resistance incomplete sur l un des produits."
    };
  }

  const sharedResistanceRange = intersectRanges(modResistanceRange, clearomizerResistanceRange);
  if (!sharedResistanceRange) {
    return {
      compatible: false,
      reason: `Aucune resistance commune (${formatOhm(modResistanceRange.min)}-${formatOhm(modResistanceRange.max)} ohm vs ${formatOhm(clearomizerResistanceRange.min)}-${formatOhm(clearomizerResistanceRange.max)} ohm).`
    };
  }

  return {
    compatible: true,
    reason: `Compatible: reglage conseille ${sharedPowerRange.min}-${sharedPowerRange.max} W et resistance ${formatOhm(sharedResistanceRange.min)}-${formatOhm(sharedResistanceRange.max)} ohm.`,
    connectorType: modConnector,
    recommendedPowerMinW: sharedPowerRange.min,
    recommendedPowerMaxW: sharedPowerRange.max,
    resistanceMinOhm: sharedResistanceRange.min,
    resistanceMaxOhm: sharedResistanceRange.max
  };
}

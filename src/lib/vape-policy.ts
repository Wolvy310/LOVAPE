export const FORBIDDEN_VAPE_TERMS = ["pod", "podmod", "puff", "jetable", "disposable"] as const;

export const ALLOWED_ELIQUID_BRANDS = [
  "Alfaliquid",
  "VDLV",
  "Terroir Vapeur",
  "Vegetol",
  "Curieux",
  "Savourea"
] as const;

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function containsForbiddenVapeTerm(value: string): boolean {
  const normalized = normalize(value);
  return FORBIDDEN_VAPE_TERMS.some((term) => normalized.includes(term));
}

export function assertNoForbiddenVapeTerms(value: string, contextLabel: string): void {
  if (containsForbiddenVapeTerm(value)) {
    throw new Error(`Forbidden vape term in ${contextLabel}: "${value}"`);
  }
}

export function assertAllowedELiquidBrand(brandName: string): void {
  if (!ALLOWED_ELIQUID_BRANDS.includes(brandName as (typeof ALLOWED_ELIQUID_BRANDS)[number])) {
    throw new Error(`Brand "${brandName}" is not allowed for e-liquids.`);
  }
}


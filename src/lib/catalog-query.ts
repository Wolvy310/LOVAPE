import type { CatalogFamily, CatalogProduct, CatalogProductType } from "@/lib/catalog-types";

export type CatalogSort = "relevance" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
export type CatalogStockFilter = "all" | "in-stock";

export interface CatalogSearchState {
  q: string;
  brand: string;
  type: string;
  nicotine: string;
  sort: CatalogSort;
  stock: CatalogStockFilter;
  page: number;
}

export interface CatalogQueryResult {
  items: CatalogProduct[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export const DEFAULT_PAGE_SIZE = 6;

function firstValue(value: string | string[] | undefined): string | undefined {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function parseCatalogSearchState(
  searchParams: Record<string, string | string[] | undefined>
): CatalogSearchState {
  const rawSort = firstValue(searchParams.sort);
  const sortOptions: CatalogSort[] = ["relevance", "price-asc", "price-desc", "name-asc", "name-desc"];
  const sort = sortOptions.includes(rawSort as CatalogSort) ? (rawSort as CatalogSort) : "relevance";

  const rawStock = firstValue(searchParams.stock);
  const stock: CatalogStockFilter = rawStock === "in-stock" ? "in-stock" : "all";

  const rawType = firstValue(searchParams.type);
  const type = rawType === "MTL_MOD" || rawType === "MTL_CLEAROMIZER" ? rawType : "";

  const rawNicotine = firstValue(searchParams.nicotine);
  const nicotineNumber = Number(rawNicotine);
  const nicotine = Number.isFinite(nicotineNumber) && nicotineNumber >= 0 ? String(nicotineNumber) : "";

  const rawPage = Number(firstValue(searchParams.page) ?? "1");
  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;

  return {
    q: firstValue(searchParams.q)?.trim() ?? "",
    brand: firstValue(searchParams.brand)?.trim() ?? "",
    type,
    nicotine,
    sort,
    stock,
    page
  };
}

export function queryCatalogProducts(
  products: CatalogProduct[],
  family: CatalogFamily,
  search: CatalogSearchState,
  pageSize = DEFAULT_PAGE_SIZE
): CatalogQueryResult {
  const needle = normalize(search.q);
  const nicotineFilter = Number(search.nicotine);
  const typeFilter = search.type as CatalogProductType;

  let filtered = products.filter((product) => {
    if (product.family !== family) return false;
    if (search.brand && product.brandSlug !== search.brand) return false;
    if (search.stock === "in-stock" && product.stockPolicy === "FINITE" && product.stockQty <= 0) return false;

    if (family === "MTL_MATERIAL" && search.type && product.type !== typeFilter) return false;
    if (family === "E_LIQUID" && search.nicotine && product.nicotineMg !== nicotineFilter) return false;

    if (!needle) return true;

    const haystack = [
      product.name,
      product.shortDescription,
      product.longDescription,
      product.brandName,
      product.tags.join(" ")
    ]
      .map(normalize)
      .join(" ");

    return haystack.includes(needle);
  });

  filtered = [...filtered].sort((a, b) => {
    if (search.sort === "price-asc") return a.priceCents - b.priceCents;
    if (search.sort === "price-desc") return b.priceCents - a.priceCents;
    if (search.sort === "name-asc") return a.name.localeCompare(b.name, "fr");
    if (search.sort === "name-desc") return b.name.localeCompare(a.name, "fr");
    return a.name.localeCompare(b.name, "fr");
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(search.page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: filtered.slice(start, end),
    totalItems,
    totalPages,
    currentPage
  };
}

export function buildCatalogQueryString(state: CatalogSearchState, patch: Partial<CatalogSearchState>): string {
  const merged: CatalogSearchState = { ...state, ...patch };
  const params = new URLSearchParams();

  if (merged.q) params.set("q", merged.q);
  if (merged.brand) params.set("brand", merged.brand);
  if (merged.type) params.set("type", merged.type);
  if (merged.nicotine) params.set("nicotine", merged.nicotine);
  if (merged.sort !== "relevance") params.set("sort", merged.sort);
  if (merged.stock === "in-stock") params.set("stock", "in-stock");
  if (merged.page > 1) params.set("page", String(merged.page));

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function getAvailableBrands(products: CatalogProduct[]): Array<{ slug: string; name: string }> {
  const seen = new Set<string>();
  return products
    .filter((product) => {
      if (seen.has(product.brandSlug)) return false;
      seen.add(product.brandSlug);
      return true;
    })
    .map((product) => ({ slug: product.brandSlug, name: product.brandName }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

export function getAvailableNicotineLevels(products: CatalogProduct[]): number[] {
  return Array.from(new Set(products.map((product) => product.nicotineMg).filter((value): value is number => typeof value === "number"))).sort(
    (a, b) => a - b
  );
}

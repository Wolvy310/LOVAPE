import { describe, expect, it } from "vitest";

import { getCatalogProductsByFamily } from "@/lib/catalog-data";
import { parseCatalogSearchState, queryCatalogProducts } from "@/lib/catalog-query";

describe("catalog query", () => {
  it("filters e-liquids by brand", () => {
    const products = getCatalogProductsByFamily("E_LIQUID");
    const result = queryCatalogProducts(products, "E_LIQUID", {
      q: "",
      brand: "vdlv",
      type: "",
      nicotine: "",
      sort: "relevance",
      stock: "all",
      page: 1
    });

    expect(result.totalItems).toBe(1);
    expect(result.items[0]?.brandSlug).toBe("vdlv");
  });

  it("filters e-liquids by nicotine", () => {
    const products = getCatalogProductsByFamily("E_LIQUID");
    const result = queryCatalogProducts(products, "E_LIQUID", {
      q: "",
      brand: "",
      type: "",
      nicotine: "12",
      sort: "relevance",
      stock: "all",
      page: 1
    });

    expect(result.totalItems).toBe(1);
    expect(result.items[0]?.nicotineMg).toBe(12);
  });

  it("filters material by type", () => {
    const products = getCatalogProductsByFamily("MTL_MATERIAL");
    const result = queryCatalogProducts(products, "MTL_MATERIAL", {
      q: "",
      brand: "",
      type: "MTL_MOD",
      nicotine: "",
      sort: "relevance",
      stock: "all",
      page: 1
    });

    expect(result.totalItems).toBe(2);
    expect(result.items.every((item) => item.type === "MTL_MOD")).toBe(true);
  });

  it("sorts by descending price", () => {
    const products = getCatalogProductsByFamily("MTL_MATERIAL");
    const result = queryCatalogProducts(products, "MTL_MATERIAL", {
      q: "",
      brand: "",
      type: "",
      nicotine: "",
      sort: "price-desc",
      stock: "all",
      page: 1
    });

    expect(result.items[0]?.priceCents).toBeGreaterThanOrEqual(result.items[1]?.priceCents ?? 0);
  });

  it("parses search params safely", () => {
    const parsed = parseCatalogSearchState({
      q: "fruit",
      page: "0",
      stock: "unknown",
      sort: "invalid"
    });

    expect(parsed.q).toBe("fruit");
    expect(parsed.page).toBe(1);
    expect(parsed.stock).toBe("all");
    expect(parsed.sort).toBe("relevance");
  });
});


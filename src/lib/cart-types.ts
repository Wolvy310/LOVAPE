import type { CatalogProductType } from "@/lib/catalog-types";

export interface CartItemInput {
  sku: string;
  slug: string;
  name: string;
  brandName: string;
  imageUrl: string;
  priceCents: number;
  productType: CatalogProductType;
}

export interface CartItem extends CartItemInput {
  quantity: number;
  addedAt: string;
}

export interface CartTotals {
  itemCount: number;
  totalCents: number;
}


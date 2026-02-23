export type CatalogFamily = "E_LIQUID" | "MTL_MATERIAL";
export type CatalogProductType = "E_LIQUID" | "MTL_MOD" | "MTL_CLEAROMIZER";
export type CatalogStockPolicy = "FINITE" | "INFINITE";

export interface CatalogProduct {
  id: string;
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  family: CatalogFamily;
  type: CatalogProductType;
  brandName: string;
  brandSlug: string;
  categoryName: string;
  categorySlug: string;
  priceCents: number;
  stockPolicy: CatalogStockPolicy;
  stockQty: number;
  tags: string[];
  imageUrl: string;
  warningRequired: boolean;
  nicotineMg?: number;
  pgRatio?: number;
  vgRatio?: number;
  volumeMl?: number;
  recommendedPowerMinW?: number;
  recommendedPowerMaxW?: number;
  airflowStyle?: string;
  connectorType?: string;
  resistanceRange?: string;
}


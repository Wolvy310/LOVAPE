import type { CatalogProduct } from "@/lib/catalog-types";
import type { CartItemInput } from "@/lib/cart-types";

export function toCartItemInput(product: CatalogProduct): CartItemInput {
  return {
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    brandName: product.brandName,
    imageUrl: product.imageUrl,
    priceCents: product.priceCents,
    productType: product.type
  };
}


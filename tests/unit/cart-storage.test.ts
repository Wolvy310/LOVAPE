import { beforeEach, describe, expect, it } from "vitest";

import { addToCart, clearCart, getCartTotals, readCart, removeCartItem, updateCartQuantity } from "@/lib/cart-storage";

describe("cart storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    clearCart();
  });

  it("adds and reads cart items", () => {
    addToCart({
      sku: "SKU-1",
      slug: "product-1",
      name: "Produit 1",
      brandName: "Marque",
      imageUrl: "/img.svg",
      priceCents: 500,
      productType: "E_LIQUID"
    });

    const items = readCart();
    expect(items).toHaveLength(1);
    expect(items[0]?.sku).toBe("SKU-1");
    expect(items[0]?.quantity).toBe(1);
  });

  it("updates quantity and totals", () => {
    addToCart({
      sku: "SKU-2",
      slug: "product-2",
      name: "Produit 2",
      brandName: "Marque",
      imageUrl: "/img.svg",
      priceCents: 1200,
      productType: "MTL_MOD"
    });

    updateCartQuantity("SKU-2", 3);
    const totals = getCartTotals(readCart());

    expect(totals.itemCount).toBe(3);
    expect(totals.totalCents).toBe(3600);
  });

  it("removes item from cart", () => {
    addToCart({
      sku: "SKU-3",
      slug: "product-3",
      name: "Produit 3",
      brandName: "Marque",
      imageUrl: "/img.svg",
      priceCents: 700,
      productType: "MTL_CLEAROMIZER"
    });

    removeCartItem("SKU-3");
    expect(readCart()).toHaveLength(0);
  });
});


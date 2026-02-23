import { describe, expect, it } from "vitest";

import { buildOrderRef, calculateCheckoutTotals, checkoutRequestSchema } from "@/server/order-request";

describe("order request helpers", () => {
  it("validates a minimal payload", () => {
    const parsed = checkoutRequestSchema.safeParse({
      customerFirstName: "Alice",
      customerLastName: "Martin",
      customerEmail: "alice@example.com",
      legalAccepted: true,
      ageConfirmed: true,
      items: [{ sku: "SKU-1", name: "Produit", unitPriceCents: 1000, quantity: 2 }]
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects payload without legal confirmation", () => {
    const parsed = checkoutRequestSchema.safeParse({
      customerFirstName: "Alice",
      customerLastName: "Martin",
      customerEmail: "alice@example.com",
      legalAccepted: false,
      ageConfirmed: true,
      items: [{ sku: "SKU-1", name: "Produit", unitPriceCents: 1000, quantity: 2 }]
    });

    expect(parsed.success).toBe(false);
  });

  it("computes totals correctly", () => {
    const totals = calculateCheckoutTotals([
      { sku: "A", name: "A", unitPriceCents: 500, quantity: 1 },
      { sku: "B", name: "B", unitPriceCents: 1200, quantity: 2 }
    ]);

    expect(totals.itemCount).toBe(3);
    expect(totals.totalCents).toBe(2900);
  });

  it("builds order reference with expected prefix", () => {
    const ref = buildOrderRef(new Date("2026-02-23T10:00:00Z"));
    expect(ref).toMatch(/^LVP-20260223-\d{6}$/);
  });
});


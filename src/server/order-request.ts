import { z } from "zod";

export const checkoutRequestItemSchema = z.object({
  sku: z.string().trim().min(1).max(64),
  name: z.string().trim().min(1).max(160),
  unitPriceCents: z.number().int().min(0),
  quantity: z.number().int().min(1).max(99)
});

export const checkoutRequestSchema = z.object({
  customerFirstName: z.string().trim().min(1).max(80),
  customerLastName: z.string().trim().min(1).max(80),
  customerEmail: z.string().trim().email().max(190),
  customerPhone: z.string().trim().max(30).nullable().optional(),
  customerMessage: z.string().trim().max(2000).nullable().optional(),
  legalAccepted: z.literal(true),
  ageConfirmed: z.literal(true),
  analyticsConsent: z.boolean().optional().default(false),
  items: z.array(checkoutRequestItemSchema).min(1).max(100)
});

export type CheckoutRequestInput = z.infer<typeof checkoutRequestSchema>;
export type CheckoutRequestItemInput = z.infer<typeof checkoutRequestItemSchema>;

export interface CheckoutTotals {
  itemCount: number;
  totalCents: number;
}

export function calculateCheckoutTotals(items: CheckoutRequestItemInput[]): CheckoutTotals {
  return items.reduce(
    (acc, item) => {
      acc.itemCount += item.quantity;
      acc.totalCents += item.quantity * item.unitPriceCents;
      return acc;
    },
    { itemCount: 0, totalCents: 0 }
  );
}

export function buildOrderRef(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 900000 + 100000);
  return `LVP-${year}${month}${day}-${random}`;
}


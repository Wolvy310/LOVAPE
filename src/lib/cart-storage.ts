import type { CartItem, CartItemInput, CartTotals } from "@/lib/cart-types";

const CART_STORAGE_KEY = "lovape:cart:v1";
const CART_UPDATED_EVENT = "lovape:cart-updated";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function toPositiveQuantity(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(99, Math.max(1, Math.round(value)));
}

function readStoredCartRaw(): unknown {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function sanitizeCart(input: unknown): CartItem[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((item): CartItem | null => {
      if (!item || typeof item !== "object") return null;
      const record = item as Partial<CartItem>;

      if (
        typeof record.sku !== "string" ||
        typeof record.slug !== "string" ||
        typeof record.name !== "string" ||
        typeof record.brandName !== "string" ||
        typeof record.imageUrl !== "string" ||
        typeof record.priceCents !== "number" ||
        typeof record.productType !== "string"
      ) {
        return null;
      }

      return {
        sku: record.sku,
        slug: record.slug,
        name: record.name,
        brandName: record.brandName,
        imageUrl: record.imageUrl,
        priceCents: Math.max(0, Math.round(record.priceCents)),
        productType: record.productType,
        quantity: toPositiveQuantity(typeof record.quantity === "number" ? record.quantity : 1),
        addedAt: typeof record.addedAt === "string" ? record.addedAt : new Date().toISOString()
      };
    })
    .filter((item): item is CartItem => item !== null);
}

function writeCart(items: CartItem[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function readCart(): CartItem[] {
  return sanitizeCart(readStoredCartRaw());
}

export function addToCart(item: CartItemInput, quantity = 1): CartItem[] {
  const current = readCart();
  const qty = toPositiveQuantity(quantity);

  const next = [...current];
  const index = next.findIndex((entry) => entry.sku === item.sku);
  if (index === -1) {
    next.push({
      ...item,
      quantity: qty,
      addedAt: new Date().toISOString()
    });
  } else {
    next[index] = {
      ...next[index],
      quantity: toPositiveQuantity(next[index].quantity + qty)
    };
  }

  writeCart(next);
  return next;
}

export function updateCartQuantity(sku: string, quantity: number): CartItem[] {
  const next = readCart().map((item) =>
    item.sku === sku
      ? {
          ...item,
          quantity: toPositiveQuantity(quantity)
        }
      : item
  );
  writeCart(next);
  return next;
}

export function removeCartItem(sku: string): CartItem[] {
  const next = readCart().filter((item) => item.sku !== sku);
  writeCart(next);
  return next;
}

export function clearCart(): void {
  writeCart([]);
}

export function getCartTotals(items: CartItem[] = readCart()): CartTotals {
  return items.reduce(
    (acc, item) => {
      acc.itemCount += item.quantity;
      acc.totalCents += item.priceCents * item.quantity;
      return acc;
    },
    {
      itemCount: 0,
      totalCents: 0
    }
  );
}

export function subscribeToCartUpdates(onChange: () => void): () => void {
  if (!isBrowser()) return () => undefined;

  const onStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) {
      onChange();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(CART_UPDATED_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CART_UPDATED_EVENT, onChange);
  };
}


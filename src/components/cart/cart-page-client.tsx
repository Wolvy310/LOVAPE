"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Alert } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPriceEUR } from "@/lib/format";
import { clearCart, getCartTotals, readCart, removeCartItem, subscribeToCartUpdates, updateCartQuantity } from "@/lib/cart-storage";
import type { CartItem } from "@/lib/cart-types";

export function CartPageClient() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(readCart());
    sync();
    return subscribeToCartUpdates(sync);
  }, []);

  const totals = useMemo(() => getCartTotals(items), [items]);

  const increment = (sku: string, quantity: number) => {
    updateCartQuantity(sku, quantity + 1);
  };

  const decrement = (sku: string, quantity: number) => {
    if (quantity <= 1) {
      removeCartItem(sku);
      return;
    }
    updateCartQuantity(sku, quantity - 1);
  };

  if (items.length === 0) {
    return (
      <div className="container space-y-4 py-10">
        <h1 className="font-heading text-3xl font-semibold">Panier</h1>
        <Alert className="space-y-3">
          <p className="font-medium">Votre panier est vide.</p>
          <p className="text-sm text-muted-foreground">Ajoutez des produits depuis le catalogue pour preparer votre demande.</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/catalog/e-liquides" className={buttonVariants({ variant: "secondary", size: "sm" })}>
              Voir les e-liquides
            </Link>
            <Link href="/catalog/materiel-mtl" className={buttonVariants({ variant: "secondary", size: "sm" })}>
              Voir le materiel MTL
            </Link>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container space-y-6 py-10">
      <h1 className="font-heading text-3xl font-semibold">Panier</h1>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="space-y-4">
          {items.map((item) => (
            <Card key={item.sku}>
              <CardContent className="grid gap-4 p-4 sm:grid-cols-[88px_1fr_auto] sm:items-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-md border border-border bg-secondary/40">
                  <Image src={item.imageUrl} alt={item.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.brandName}</p>
                  <p className="text-sm text-muted-foreground">{formatPriceEUR(item.priceCents)} unite</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="secondary" size="sm" onClick={() => decrement(item.sku, item.quantity)}>
                    -
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button type="button" variant="secondary" size="sm" onClick={() => increment(item.sku, item.quantity)}>
                    +
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeCartItem(item.sku)}>
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Resume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {totals.itemCount} article{totals.itemCount > 1 ? "s" : ""}
            </p>
            <p className="text-2xl font-semibold text-foreground">{formatPriceEUR(totals.totalCents)}</p>
            <div className="flex flex-col gap-2">
              <Link href="/checkout/request" className={buttonVariants({ variant: "default" })}>
                Continuer vers la demande
              </Link>
              <Button type="button" variant="secondary" onClick={() => clearCart()}>
                Vider le panier
              </Button>
            </div>
            <Alert variant="warning">Vente interdite aux mineurs. Si vous ne fumez pas, ne vapez pas.</Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


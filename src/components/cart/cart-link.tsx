"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getCartTotals, readCart, subscribeToCartUpdates } from "@/lib/cart-storage";

export function CartLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => {
      const totals = getCartTotals(readCart());
      setCount(totals.itemCount);
    };
    sync();
    return subscribeToCartUpdates(sync);
  }, []);

  return (
    <Link href="/cart" className="text-muted-foreground hover:text-foreground">
      Panier{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}


"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart-storage";
import type { CartItemInput } from "@/lib/cart-types";

interface AddToCartButtonProps {
  item: CartItemInput;
  quantity?: number;
  label?: string;
  variant?: "default" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function AddToCartButton({
  item,
  quantity = 1,
  label = "Ajouter au panier",
  variant = "default",
  size = "default"
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(item, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1000);
  };

  return (
    <Button type="button" variant={variant} size={size} onClick={handleClick}>
      {added ? "Ajoute" : label}
    </Button>
  );
}


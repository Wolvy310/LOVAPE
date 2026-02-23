import type { Metadata } from "next";

import { CartPageClient } from "@/components/cart/cart-page-client";

export const metadata: Metadata = {
  title: "Panier",
  description: "Panier LOVAPE avec sauvegarde locale avant envoi de la demande de commande."
};

export default function CartPage() {
  return <CartPageClient />;
}


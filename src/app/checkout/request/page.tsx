import type { Metadata } from "next";

import { CheckoutRequestClient } from "@/components/checkout/checkout-request-client";

export const metadata: Metadata = {
  title: "Demande de commande",
  description: "Formulaire de prise de commande LOVAPE en mode request-first."
};

export default function CheckoutRequestPage() {
  return <CheckoutRequestClient />;
}


"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { Alert } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPriceEUR } from "@/lib/format";
import { clearCart, getCartTotals, readCart, subscribeToCartUpdates } from "@/lib/cart-storage";
import type { CartItem } from "@/lib/cart-types";

interface CheckoutFormState {
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  customerMessage: string;
  legalAccepted: boolean;
  ageConfirmed: boolean;
  analyticsConsent: boolean;
}

const INITIAL_FORM_STATE: CheckoutFormState = {
  customerFirstName: "",
  customerLastName: "",
  customerEmail: "",
  customerPhone: "",
  customerMessage: "",
  legalAccepted: false,
  ageConfirmed: false,
  analyticsConsent: false
};

export function CheckoutRequestClient() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState<CheckoutFormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const beginCheckoutTrackedRef = useRef(false);

  useEffect(() => {
    const sync = () => setItems(readCart());
    sync();
    return subscribeToCartUpdates(sync);
  }, []);

  const totals = useMemo(() => getCartTotals(items), [items]);

  useEffect(() => {
    if (items.length === 0 || beginCheckoutTrackedRef.current) {
      return;
    }

    trackEvent("begin_checkout_request", {
      cart_size: totals.itemCount,
      cart_total_cents: totals.totalCents
    });
    beginCheckoutTrackedRef.current = true;
  }, [items.length, totals.itemCount, totals.totalCents]);

  const setField = <K extends keyof CheckoutFormState>(field: K, value: CheckoutFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (items.length === 0) {
      setSubmitError("Votre panier est vide. Ajoutez des produits avant de soumettre la demande.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/checkout/request", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          customerFirstName: form.customerFirstName,
          customerLastName: form.customerLastName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone || null,
          customerMessage: form.customerMessage || null,
          legalAccepted: form.legalAccepted,
          ageConfirmed: form.ageConfirmed,
          analyticsConsent: form.analyticsConsent,
          items: items.map((item) => ({
            sku: item.sku,
            name: item.name,
            unitPriceCents: item.priceCents,
            quantity: item.quantity
          }))
        })
      });

      const payload = (await response.json()) as { orderRef?: string; error?: string };

      if (!response.ok || !payload.orderRef) {
        setSubmitError(payload.error ?? "Impossible d'envoyer la demande pour le moment.");
        return;
      }

      trackEvent("submit_request", {
        order_ref: payload.orderRef,
        cart_size: totals.itemCount,
        total_cents: totals.totalCents
      });

      clearCart();
      router.push(`/checkout/confirmation/${payload.orderRef}`);
    } catch {
      setSubmitError("Erreur reseau pendant l envoi de la demande. Merci de reessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold">Demande de commande</h1>
        <p className="max-w-3xl text-muted-foreground">
          Le paiement en ligne n est pas actif sur ce MVP. Nous validons votre demande puis nous vous recontactons.
        </p>
      </header>

      {items.length === 0 ? (
        <Alert className="space-y-3">
          <p className="font-medium">Votre panier est vide.</p>
          <p className="text-sm text-muted-foreground">
            Ajoutez au moins un produit avant d ouvrir la demande de commande.
          </p>
          <Link href="/catalog/e-liquides" className={buttonVariants({ variant: "secondary", size: "sm" })}>
            Retour catalogue
          </Link>
        </Alert>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={onSubmit} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Coordonnees</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-sm font-medium">Prenom</span>
                  <input
                    required
                    value={form.customerFirstName}
                    onChange={(event) => setField("customerFirstName", event.target.value)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-sm font-medium">Nom</span>
                  <input
                    required
                    value={form.customerLastName}
                    onChange={(event) => setField("customerLastName", event.target.value)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    type="email"
                    required
                    value={form.customerEmail}
                    onChange={(event) => setField("customerEmail", event.target.value)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-sm font-medium">Telephone (optionnel)</span>
                  <input
                    value={form.customerPhone}
                    onChange={(event) => setField("customerPhone", event.target.value)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  />
                </label>
                <label className="space-y-1 sm:col-span-2">
                  <span className="text-sm font-medium">Message (optionnel)</span>
                  <textarea
                    rows={4}
                    value={form.customerMessage}
                    onChange={(event) => setField("customerMessage", event.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </label>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Confirmations legales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    required
                    checked={form.legalAccepted}
                    onChange={(event) => setField("legalAccepted", event.target.checked)}
                    className="mt-1"
                  />
                  <span>Je confirme avoir lu les informations legales et les conditions de demande.</span>
                </label>
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    required
                    checked={form.ageConfirmed}
                    onChange={(event) => setField("ageConfirmed", event.target.checked)}
                    className="mt-1"
                  />
                  <span>Je certifie etre majeur.</span>
                </label>
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={form.analyticsConsent}
                    onChange={(event) => setField("analyticsConsent", event.target.checked)}
                    className="mt-1"
                  />
                  <span>J accepte la mesure d audience (optionnel).</span>
                </label>
              </CardContent>
            </Card>

            {submitError ? <Alert variant="destructive">{submitError}</Alert> : null}
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
              </Button>
              <Link href="/cart" className={buttonVariants({ variant: "secondary" })}>
                Retour panier
              </Link>
            </div>
          </form>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Recapitulatif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.sku} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-muted-foreground">
                        {item.quantity} x {formatPriceEUR(item.priceCents)}
                      </p>
                    </div>
                    <p className="font-medium text-foreground">{formatPriceEUR(item.priceCents * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-3">
                <p className="text-muted-foreground">
                  {totals.itemCount} article{totals.itemCount > 1 ? "s" : ""}
                </p>
                <p className="text-xl font-semibold text-foreground">{formatPriceEUR(totals.totalCents)}</p>
              </div>
              <Alert variant="warning">Vente interdite aux mineurs. Si vous ne fumez pas, ne vapez pas.</Alert>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

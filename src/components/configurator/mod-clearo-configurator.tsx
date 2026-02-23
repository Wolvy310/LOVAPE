"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toCartItemInput } from "@/lib/cart-mappers";
import { addToCart } from "@/lib/cart-storage";
import type { CatalogProduct } from "@/lib/catalog-types";
import { checkMtlCompatibility } from "@/lib/compat";
import { formatPriceEUR } from "@/lib/format";

interface ModClearoConfiguratorProps {
  mods: CatalogProduct[];
  clearomizers: CatalogProduct[];
  initialModSlug?: string;
  initialClearomizerSlug?: string;
}

function pickInitialSlug(products: CatalogProduct[], preferredSlug: string | undefined): string {
  if (preferredSlug && products.some((item) => item.slug === preferredSlug)) {
    return preferredSlug;
  }

  return products[0]?.slug ?? "";
}

function formatPower(product: CatalogProduct | undefined): string {
  if (!product || typeof product.recommendedPowerMinW !== "number" || typeof product.recommendedPowerMaxW !== "number") {
    return "N/A";
  }

  return `${product.recommendedPowerMinW}-${product.recommendedPowerMaxW} W`;
}

function formatResistance(product: CatalogProduct | undefined): string {
  if (!product?.resistanceRange) return "N/A";
  return product.resistanceRange;
}

export function ModClearoConfigurator({
  mods,
  clearomizers,
  initialModSlug,
  initialClearomizerSlug
}: ModClearoConfiguratorProps) {
  const [selectedModSlug, setSelectedModSlug] = useState(() => pickInitialSlug(mods, initialModSlug));
  const [selectedClearomizerSlug, setSelectedClearomizerSlug] = useState(() =>
    pickInitialSlug(clearomizers, initialClearomizerSlug)
  );
  const [bundleAdded, setBundleAdded] = useState(false);

  useEffect(() => {
    setBundleAdded(false);
  }, [selectedModSlug, selectedClearomizerSlug]);

  const selectedMod = useMemo(() => mods.find((item) => item.slug === selectedModSlug), [mods, selectedModSlug]);
  const selectedClearomizer = useMemo(
    () => clearomizers.find((item) => item.slug === selectedClearomizerSlug),
    [clearomizers, selectedClearomizerSlug]
  );

  const compatibility = useMemo(
    () => checkMtlCompatibility(selectedMod, selectedClearomizer),
    [selectedMod, selectedClearomizer]
  );

  const totalCents = (selectedMod?.priceCents ?? 0) + (selectedClearomizer?.priceCents ?? 0);
  const canAddBundle = Boolean(selectedMod && selectedClearomizer && compatibility.compatible);

  const handleAddBundle = () => {
    if (!selectedMod || !selectedClearomizer || !compatibility.compatible) return;

    addToCart(toCartItemInput(selectedMod));
    addToCart(toCartItemInput(selectedClearomizer));
    setBundleAdded(true);
    window.setTimeout(() => setBundleAdded(false), 1200);
  };

  if (mods.length === 0 || clearomizers.length === 0) {
    return (
      <div className="container space-y-6 py-10">
        <h1 className="font-heading text-3xl font-semibold">Configurateur Mod + Clearomiseur</h1>
        <Alert variant="destructive">Le configurateur est indisponible: aucun produit MTL compatible n est charge.</Alert>
      </div>
    );
  }

  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="warning">Vente interdite aux mineurs</Badge>
          <Badge variant="warning">Si vous ne fumez pas, ne vapez pas</Badge>
        </div>
        <h1 className="font-heading text-3xl font-semibold">Configurateur Mod + Clearomiseur</h1>
        <p className="max-w-3xl text-muted-foreground">
          Selectionnez un mod MTL et un clearomiseur MTL. LOVAPE verifie la compatibilite connecteur, puissance et resistance.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Choix de la configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-sm font-medium">Mod MTL</span>
                <select
                  value={selectedModSlug}
                  onChange={(event) => setSelectedModSlug(event.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {mods.map((mod) => (
                    <option key={mod.slug} value={mod.slug}>
                      {mod.name} - {formatPriceEUR(mod.priceCents)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium">Clearomiseur MTL</span>
                <select
                  value={selectedClearomizerSlug}
                  onChange={(event) => setSelectedClearomizerSlug(event.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {clearomizers.map((clearomizer) => (
                    <option key={clearomizer.slug} value={clearomizer.slug}>
                      {clearomizer.name} - {formatPriceEUR(clearomizer.priceCents)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {compatibility.compatible ? (
              <Alert>{compatibility.reason}</Alert>
            ) : (
              <Alert variant="destructive">{compatibility.reason}</Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recapitulatif</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">Configuration selectionnee</p>
            <p className="font-medium text-foreground">{selectedMod?.name ?? "Aucun mod selectionne"}</p>
            <p className="font-medium text-foreground">{selectedClearomizer?.name ?? "Aucun clearomiseur selectionne"}</p>

            <div className="border-t border-border pt-3">
              <p className="text-muted-foreground">Total estimatif</p>
              <p className="text-xl font-semibold text-foreground">{formatPriceEUR(totalCents)}</p>
            </div>

            <div className="space-y-2 pt-2">
              <Button type="button" disabled={!canAddBundle} onClick={handleAddBundle} className="w-full">
                {bundleAdded ? "Configuration ajoutee" : "Ajouter mod + clearomiseur"}
              </Button>
              <Link href="/cart" className={buttonVariants({ variant: "secondary" }) + " w-full"}>
                Voir panier
              </Link>
              <Link href="/checkout/request" className={buttonVariants({ variant: "secondary" }) + " w-full"}>
                Demande de commande
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{selectedMod?.name ?? "Mod MTL"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">{selectedMod?.shortDescription ?? "Selectionnez un mod."}</p>
            <p>
              <span className="text-muted-foreground">Connecteur:</span> {selectedMod?.connectorType ?? "N/A"}
            </p>
            <p>
              <span className="text-muted-foreground">Puissance conseillee:</span> {formatPower(selectedMod)}
            </p>
            <p>
              <span className="text-muted-foreground">Resistance supportee:</span> {formatResistance(selectedMod)}
            </p>
            {selectedMod ? <AddToCartButton item={toCartItemInput(selectedMod)} variant="secondary" label="Ajouter le mod" /> : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{selectedClearomizer?.name ?? "Clearomiseur MTL"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">{selectedClearomizer?.shortDescription ?? "Selectionnez un clearomiseur."}</p>
            <p>
              <span className="text-muted-foreground">Connecteur:</span> {selectedClearomizer?.connectorType ?? "N/A"}
            </p>
            <p>
              <span className="text-muted-foreground">Puissance conseillee:</span> {formatPower(selectedClearomizer)}
            </p>
            <p>
              <span className="text-muted-foreground">Resistance supportee:</span> {formatResistance(selectedClearomizer)}
            </p>
            {selectedClearomizer ? (
              <AddToCartButton item={toCartItemInput(selectedClearomizer)} variant="secondary" label="Ajouter le clearomiseur" />
            ) : null}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

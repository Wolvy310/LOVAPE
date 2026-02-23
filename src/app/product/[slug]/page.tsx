import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCatalogProducts, getCatalogProductBySlug } from "@/lib/catalog-data";
import { toCartItemInput } from "@/lib/cart-mappers";
import { formatPriceEUR } from "@/lib/format";
import type { CatalogProduct } from "@/lib/catalog-types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

function getProductSpecs(product: CatalogProduct): Array<{ label: string; value: string }> {
  const commonSpecs: Array<{ label: string; value: string }> = [
    { label: "Reference", value: product.sku },
    { label: "Marque", value: product.brandName },
    { label: "Categorie", value: product.categoryName }
  ];

  if (product.family === "E_LIQUID") {
    return [
      ...commonSpecs,
      { label: "Dosage nicotine", value: `${product.nicotineMg ?? "N/A"} mg/ml` },
      { label: "Ratio PG/VG", value: `${product.pgRatio ?? "N/A"}/${product.vgRatio ?? "N/A"}` },
      { label: "Volume", value: `${product.volumeMl ?? "N/A"} ml` }
    ];
  }

  return [
    ...commonSpecs,
    {
      label: "Puissance conseillee",
      value:
        typeof product.recommendedPowerMinW === "number" && typeof product.recommendedPowerMaxW === "number"
          ? `${product.recommendedPowerMinW}-${product.recommendedPowerMaxW} W`
          : "N/A"
    },
    { label: "Airflow", value: product.airflowStyle ?? "N/A" },
    { label: "Connecteur", value: product.connectorType ?? "N/A" },
    { label: "Resistances", value: product.resistanceRange ?? "N/A" }
  ];
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getCatalogProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable"
    };
  }

  return {
    title: product.name,
    description: product.shortDescription
  };
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllCatalogProducts().map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getCatalogProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const specs = getProductSpecs(product);
  const isAvailable = product.stockPolicy === "INFINITE" || product.stockQty > 0;
  const catalogPath = product.family === "E_LIQUID" ? "/catalog/e-liquides" : "/catalog/materiel-mtl";

  return (
    <div className="container space-y-6 py-10">
      <nav className="text-sm text-muted-foreground" aria-label="Fil d ariane">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={catalogPath} className="hover:text-foreground">
              Catalogue
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{product.name}</li>
        </ol>
      </nav>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="overflow-hidden">
          <div className="relative aspect-square w-full bg-secondary/30">
            <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </Card>

        <Card className="h-full">
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{product.brandName}</Badge>
              <Badge variant={isAvailable ? "default" : "outline"}>{isAvailable ? "Disponible" : "Rupture"}</Badge>
              <Badge variant="warning">Vente interdite aux mineurs</Badge>
            </div>
            <CardTitle className="font-heading text-3xl">{product.name}</CardTitle>
            <p className="text-muted-foreground">{product.shortDescription}</p>
            <p className="text-2xl font-semibold text-foreground">{formatPriceEUR(product.priceCents)}</p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">{product.longDescription}</p>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <AddToCartButton item={toCartItemInput(product)} label="Ajouter au panier" />
              <Link href="/cart" className={buttonVariants({ variant: "default" })}>
                Voir panier
              </Link>
              <Link href="/checkout/request" className={buttonVariants({ variant: "secondary" })}>
                Demande de commande
              </Link>
              <Link href={catalogPath} className={buttonVariants({ variant: "secondary" })}>
                Retour au catalogue
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Caracteristiques</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 text-sm">
              {specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-[170px_1fr] gap-3 border-b border-border pb-2">
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd className="text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bon usage et avertissements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Alert variant="warning">Si vous ne fumez pas, ne vapez pas.</Alert>
            <Alert variant="warning">Vente interdite aux mineurs.</Alert>
            <Alert>Les specifications sont informatives pour le MVP et seront precisees en administration.</Alert>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

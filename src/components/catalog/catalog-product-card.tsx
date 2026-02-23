import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CatalogProduct } from "@/lib/catalog-types";
import { buttonVariants } from "@/components/ui/button";
import { formatPriceEUR } from "@/lib/format";

interface CatalogProductCardProps {
  product: CatalogProduct;
}

export function CatalogProductCard({ product }: CatalogProductCardProps) {
  const stockLabel =
    product.stockPolicy === "INFINITE"
      ? "Disponible"
      : product.stockQty > 0
        ? `${product.stockQty} en stock`
        : "Rupture";

  return (
    <Card className="h-full overflow-hidden">
      <div className="relative aspect-square w-full bg-secondary/30">
        <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
      </div>
      <CardHeader className="space-y-2 pb-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{product.brandName}</Badge>
          <Badge variant={stockLabel === "Rupture" ? "outline" : "default"}>{stockLabel}</Badge>
        </div>
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>{product.shortDescription}</p>
        <div className="flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between">
        <p className="font-semibold text-foreground">{formatPriceEUR(product.priceCents)}</p>
        <Link href={`/product/${product.slug}`} className={buttonVariants({ variant: "secondary", size: "sm" })}>
          Voir details
        </Link>
      </CardFooter>
    </Card>
  );
}

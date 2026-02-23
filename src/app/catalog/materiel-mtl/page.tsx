import type { Metadata } from "next";

import { CatalogPage } from "@/components/catalog/catalog-page";

export const metadata: Metadata = {
  title: "Catalogue Materiel MTL",
  description: "Materiel MTL LOVAPE: mods et clearomiseurs compatibles usage responsable."
};

interface MtlMaterialPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function MtlMaterialPage({ searchParams }: MtlMaterialPageProps) {
  const resolvedSearchParams = await searchParams;
  return (
    <CatalogPage
      family="MTL_MATERIAL"
      actionPath="/catalog/materiel-mtl"
      title="Catalogue Materiel MTL"
      description="Selection de mods et clearomiseurs MTL uniquement. Aucun pod, puff ou produit jetable."
      searchParams={resolvedSearchParams}
    />
  );
}


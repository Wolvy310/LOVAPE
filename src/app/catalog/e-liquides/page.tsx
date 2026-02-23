import type { Metadata } from "next";

import { CatalogPage } from "@/components/catalog/catalog-page";

export const metadata: Metadata = {
  title: "Catalogue E-liquides",
  description: "Selection e-liquides LOVAPE avec filtres, tri et pagination."
};

interface ELiquidsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ELiquidsPage({ searchParams }: ELiquidsPageProps) {
  const resolvedSearchParams = await searchParams;
  return (
    <CatalogPage
      family="E_LIQUID"
      actionPath="/catalog/e-liquides"
      title="Catalogue E-liquides"
      description="Marques autorisees: Alfaliquid, VDLV, Terroir Vapeur, Vegetol, Curieux et Savourea."
      searchParams={resolvedSearchParams}
    />
  );
}


import type { Metadata } from "next";

import { ModClearoConfigurator } from "@/components/configurator/mod-clearo-configurator";
import { getCatalogProductsByFamily } from "@/lib/catalog-data";

export const metadata: Metadata = {
  title: "Configurateur Mod + Clearomiseur",
  description: "Assemblez un setup MTL mod + clearomiseur avec verifications de compatibilite LOVAPE."
};

interface ModClearoConfiguratorPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getSingleSearchParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function ModClearoConfiguratorPage({ searchParams }: ModClearoConfiguratorPageProps) {
  const resolvedSearchParams = await searchParams;
  const materialProducts = getCatalogProductsByFamily("MTL_MATERIAL");
  const mods = materialProducts.filter((product) => product.type === "MTL_MOD");
  const clearomizers = materialProducts.filter((product) => product.type === "MTL_CLEAROMIZER");

  return (
    <ModClearoConfigurator
      mods={mods}
      clearomizers={clearomizers}
      initialModSlug={getSingleSearchParam(resolvedSearchParams.mod)}
      initialClearomizerSlug={getSingleSearchParam(resolvedSearchParams.clearo)}
    />
  );
}

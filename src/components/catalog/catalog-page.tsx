import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CatalogEmptyState } from "@/components/catalog/catalog-empty-state";
import { CatalogFilterForm } from "@/components/catalog/catalog-filter-form";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";
import { CatalogProductCard } from "@/components/catalog/catalog-product-card";
import {
  buildCatalogQueryString,
  getAvailableBrands,
  getAvailableNicotineLevels,
  parseCatalogSearchState,
  queryCatalogProducts
} from "@/lib/catalog-query";
import { getCatalogProductsByFamily } from "@/lib/catalog-data";
import type { CatalogFamily } from "@/lib/catalog-types";

interface CatalogPageProps {
  family: CatalogFamily;
  actionPath: string;
  title: string;
  description: string;
  searchParams: Record<string, string | string[] | undefined>;
}

export function CatalogPage({ family, actionPath, title, description, searchParams }: CatalogPageProps) {
  const products = getCatalogProductsByFamily(family);
  const searchState = parseCatalogSearchState(searchParams);
  const result = queryCatalogProducts(products, family, searchState);

  const brandOptions = getAvailableBrands(products).map((item) => ({
    value: item.slug,
    label: item.name
  }));
  const nicotineOptions = family === "E_LIQUID" ? getAvailableNicotineLevels(products) : [];
  const resetHref = actionPath;

  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="warning">Vente interdite aux mineurs</Badge>
          <Badge variant="warning">Si vous ne fumez pas, ne vapez pas</Badge>
        </div>
        <h1 className="font-heading text-3xl font-semibold">{title}</h1>
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      </header>

      <CatalogFilterForm
        family={family}
        actionPath={actionPath}
        current={searchState}
        brandOptions={brandOptions}
        nicotineOptions={nicotineOptions}
      />

      <section aria-live="polite" className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {result.totalItems} resultat{result.totalItems > 1 ? "s" : ""} - page {result.currentPage} / {result.totalPages}
        </p>

        {result.totalItems === 0 ? (
          <CatalogEmptyState
            title="Aucun produit ne correspond a votre recherche."
            description="Essayez de simplifier les filtres ou de supprimer la recherche texte."
            resetHref={resetHref}
          />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.items.map((product) => (
                <CatalogProductCard key={product.id} product={product} />
              ))}
            </div>
            <CatalogPagination
              basePath={actionPath}
              currentPage={result.currentPage}
              totalPages={result.totalPages}
              createQuery={(page) => buildCatalogQueryString(searchState, { page })}
            />
          </>
        )}
      </section>

      <Alert variant="warning">
        Informations produits fournies a titre de demonstration MVP. La validation finale du catalogue sera geree en administration.
      </Alert>
    </div>
  );
}


import Link from "next/link";
import { Search } from "lucide-react";

import type { CatalogFamily } from "@/lib/catalog-types";
import type { CatalogSearchState } from "@/lib/catalog-query";
import { Button, buttonVariants } from "@/components/ui/button";

interface Option {
  value: string;
  label: string;
}

interface CatalogFilterFormProps {
  family: CatalogFamily;
  actionPath: string;
  current: CatalogSearchState;
  brandOptions: Option[];
  nicotineOptions: number[];
}

export function CatalogFilterForm({
  family,
  actionPath,
  current,
  brandOptions,
  nicotineOptions
}: CatalogFilterFormProps) {
  return (
    <form action={actionPath} method="get" className="grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-5">
      <label className="md:col-span-2">
        <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Recherche</span>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden />
          <input
            type="search"
            name="q"
            defaultValue={current.q}
            placeholder="Nom, marque, style..."
            className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </label>

      <label>
        <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Marque</span>
        <select
          name="brand"
          defaultValue={current.brand}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Toutes</option>
          {brandOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {family === "E_LIQUID" ? (
        <label>
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Nicotine</span>
          <select
            name="nicotine"
            defaultValue={current.nicotine}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Tous niveaux</option>
            {nicotineOptions.map((level) => (
              <option key={level} value={String(level)}>
                {level} mg/ml
              </option>
            ))}
          </select>
        </label>
      ) : (
        <label>
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Type</span>
          <select
            name="type"
            defaultValue={current.type}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Tous types</option>
            <option value="MTL_MOD">Mods MTL</option>
            <option value="MTL_CLEAROMIZER">Clearomiseurs MTL</option>
          </select>
        </label>
      )}

      <div className="grid gap-3 md:grid-cols-2 md:col-span-5">
        <label>
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Tri</span>
          <select
            name="sort"
            defaultValue={current.sort}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="relevance">Pertinence</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix decroissant</option>
            <option value="name-asc">Nom A-Z</option>
            <option value="name-desc">Nom Z-A</option>
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Stock</span>
          <select
            name="stock"
            defaultValue={current.stock}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">Tous</option>
            <option value="in-stock">Disponible uniquement</option>
          </select>
        </label>
      </div>

      <input type="hidden" name="page" value="1" />
      <div className="flex flex-wrap gap-2 md:col-span-5">
        <Button type="submit">Appliquer les filtres</Button>
        <Link href={actionPath} className={buttonVariants({ variant: "secondary" })}>
          Reinitialiser
        </Link>
      </div>
    </form>
  );
}

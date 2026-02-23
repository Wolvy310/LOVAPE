import { CatalogLoadingGrid } from "@/components/catalog/catalog-loading-grid";

export default function Loading() {
  return (
    <div className="container space-y-6 py-10">
      <div className="space-y-3">
        <div className="h-4 w-52 animate-pulse rounded bg-secondary/60" />
        <div className="h-10 w-80 animate-pulse rounded bg-secondary/60" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-secondary/60" />
      </div>
      <div className="h-40 animate-pulse rounded-xl border border-border bg-card" />
      <CatalogLoadingGrid />
    </div>
  );
}


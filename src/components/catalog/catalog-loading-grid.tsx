export function CatalogLoadingGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="aspect-square animate-pulse bg-secondary/60" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-1/2 animate-pulse rounded bg-secondary/60" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-secondary/60" />
            <div className="h-4 w-full animate-pulse rounded bg-secondary/60" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-secondary/60" />
          </div>
        </div>
      ))}
    </div>
  );
}


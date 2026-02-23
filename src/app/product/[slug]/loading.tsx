export default function Loading() {
  return (
    <div className="container space-y-6 py-10">
      <div className="h-4 w-64 animate-pulse rounded bg-secondary/60" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="aspect-square animate-pulse rounded-xl border border-border bg-secondary/60" />
        <div className="space-y-4 rounded-xl border border-border bg-card p-6">
          <div className="h-6 w-1/3 animate-pulse rounded bg-secondary/60" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-secondary/60" />
          <div className="h-4 w-full animate-pulse rounded bg-secondary/60" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-secondary/60" />
        </div>
      </div>
    </div>
  );
}


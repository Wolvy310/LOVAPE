interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="container py-10">
      <div className="rounded-xl border border-border bg-card p-8">
        <h1 className="font-heading text-2xl font-semibold">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}


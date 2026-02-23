import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CatalogPaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
  createQuery: (page: number) => string;
}

export function CatalogPagination({ basePath, currentPage, totalPages, createQuery }: CatalogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination catalogue" className="mt-6 flex flex-wrap items-center gap-2">
      <Link
        href={`${basePath}${createQuery(Math.max(1, currentPage - 1))}`}
        aria-disabled={currentPage <= 1}
        className={cn(buttonVariants({ variant: "secondary", size: "sm" }), currentPage <= 1 && "pointer-events-none opacity-50")}
      >
        Precedent
      </Link>
      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}${createQuery(page)}`}
          aria-current={page === currentPage ? "page" : undefined}
          className={buttonVariants({
            variant: page === currentPage ? "default" : "secondary",
            size: "sm"
          })}
        >
          {page}
        </Link>
      ))}
      <Link
        href={`${basePath}${createQuery(Math.min(totalPages, currentPage + 1))}`}
        aria-disabled={currentPage >= totalPages}
        className={cn(
          buttonVariants({ variant: "secondary", size: "sm" }),
          currentPage >= totalPages && "pointer-events-none opacity-50"
        )}
      >
        Suivant
      </Link>
    </nav>
  );
}


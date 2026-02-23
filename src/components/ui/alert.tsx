import * as React from "react";

import { cn } from "@/lib/utils";

export type AlertVariant = "default" | "warning" | "destructive";

const variantClassMap: Record<AlertVariant, string> = {
  default: "border-border bg-card text-card-foreground",
  warning: "border-amber-500/60 bg-amber-50 text-amber-900",
  destructive: "border-destructive/60 bg-red-50 text-red-900"
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

export function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn("w-full rounded-lg border px-4 py-3 text-sm", variantClassMap[variant], className)}
      {...props}
    />
  );
}


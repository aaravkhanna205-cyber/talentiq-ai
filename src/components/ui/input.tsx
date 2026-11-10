import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export function Label({
  className,
  asLegend,
  ...props
}: React.ComponentProps<"label"> & { asLegend?: boolean }) {
  const classes = cn("mb-1.5 block text-sm font-medium", className);
  // Inside a <fieldset>, the caption must be a <legend> instead of a <label>.
  if (asLegend) return <legend className={classes}>{props.children}</legend>;
  return <label className={classes} {...props} />;
}

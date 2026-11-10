import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost" | "secondary";
type Size = "default" | "sm" | "icon";

// The look of a button. Also used on links that should look like buttons:
// <Link href="/jobs" className={buttonClass("outline")}>...</Link>
export function buttonClass(variant: Variant = "default", size: Size = "default", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
    variant === "default" && "bg-primary text-primary-foreground font-semibold hover:bg-primary/85",
    variant === "outline" && "border border-border bg-card text-foreground hover:bg-secondary",
    variant === "ghost" && "text-muted hover:bg-secondary hover:text-foreground",
    variant === "secondary" && "bg-secondary text-foreground hover:opacity-80",
    size === "default" && "h-10 px-4 text-sm",
    size === "sm" && "h-9 px-3 text-xs",
    size === "icon" && "size-10",
    className
  );
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };
export function Button({ className, variant, size, ...props }: Props) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

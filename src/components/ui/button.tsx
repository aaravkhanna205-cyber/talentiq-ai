import * as React from "react";
import { cn } from "@/lib/utils";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" | "secondary"; size?: "default" | "sm" | "icon" };
export function Button({ className, variant="default", size="default", ...props }: Props) {
  return <button className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50", variant === "default" && "bg-primary text-primary-foreground font-semibold hover:bg-primary/85", variant === "outline" && "border border-border bg-card text-foreground hover:bg-secondary", variant === "ghost" && "text-muted hover:bg-secondary hover:text-foreground", variant === "secondary" && "bg-secondary text-foreground hover:opacity-80", size === "default" && "h-10 px-4 text-sm", size === "sm" && "h-9 px-3 text-xs", size === "icon" && "size-10", className)} {...props}/>;
}

import * as React from "react";
import { cn } from "@/lib/utils";
export function Card({ className, ...props }: React.ComponentProps<"div">) { return <div className={cn("rounded-2xl border border-border bg-card text-foreground shadow-[0_4px_28px_-16px_rgba(0,0,0,.35)]",className)} {...props}/>; }
export function CardHeader({ className,...props }: React.ComponentProps<"div">) { return <div className={cn("flex items-center justify-between gap-3 p-5 pb-3",className)} {...props}/>; }
export function CardContent({ className,...props }: React.ComponentProps<"div">) { return <div className={cn("p-5 pt-2",className)} {...props}/>; }

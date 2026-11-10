import { cn } from "@/lib/utils";

// Grey placeholder shown while data is loading.
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-secondary", className)} aria-hidden="true" />;
}

import type { LucideIcon } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

// A dashboard card that handles its own loading and empty states.
export function Panel({
  title,
  text,
  action,
  loading,
  empty,
  emptyIcon,
  emptyTitle,
  emptyText,
  skeletonRows = 4,
  className,
  children,
}: {
  title: string;
  text?: string;
  action?: React.ReactNode;
  loading: boolean;
  empty: boolean;
  emptyIcon: LucideIcon;
  emptyTitle: string;
  emptyText: string;
  skeletonRows?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <div>
          <h2 className="text-base font-semibold">{title}</h2>
          {text && <p className="mt-1 text-xs text-muted">{text}</p>}
        </div>
        {!loading && !empty && action}
      </CardHeader>
      {loading ? (
        <div className="space-y-3 p-5 pt-2" aria-busy="true" aria-label={`Loading ${title}`}>
          {Array.from({ length: skeletonRows }, (_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : empty ? (
        <EmptyState icon={emptyIcon} title={emptyTitle} text={emptyText} />
      ) : (
        children
      )}
    </Card>
  );
}

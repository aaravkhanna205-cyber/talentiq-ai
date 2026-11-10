import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// One colour per hiring stage. Add new stages here.
const tones: Record<string, string> = {
  Applied: "text-warning bg-warning/10",
  Screening: "text-info bg-info/10",
  Interview: "text-accent-text bg-accent-soft",
  Offer: "text-success bg-success/10",
};

export function StatusBadge({ stage }: { stage: string }) {
  return <Badge className={cn(tones[stage] ?? "text-muted")}>{stage}</Badge>;
}

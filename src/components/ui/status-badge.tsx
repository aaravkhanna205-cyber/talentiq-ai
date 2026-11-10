import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// One colour per status word. Add new ones here.
const tones: Record<string, string> = {
  // hiring stages
  Applied: "text-warning bg-warning/10",
  Screening: "text-info bg-info/10",
  Interview: "text-accent-text bg-accent-soft",
  Offer: "text-success bg-success/10",
  Joined: "text-success bg-success/10",
  // job status
  Open: "text-success bg-success/10",
  Draft: "text-warning bg-warning/10",
  Closed: "text-muted",
  // interview status
  Upcoming: "text-accent-text bg-accent-soft",
  Completed: "text-muted",
  // requirement evidence
  Supported: "text-success bg-success/10",
  Unclear: "text-warning bg-warning/10",
  "Missing evidence": "text-danger bg-danger/10",
};

export function StatusBadge({ stage }: { stage: string }) {
  return <Badge className={cn("whitespace-nowrap", tones[stage] ?? "text-muted")}>{stage}</Badge>;
}

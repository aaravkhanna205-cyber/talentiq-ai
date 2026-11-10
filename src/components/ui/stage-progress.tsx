import { Check } from "lucide-react";
import { stages } from "@/lib/mock";
import { cn } from "@/lib/utils";

// The five-step bar that shows how far an application has moved.
export function StageProgress({ stageIndex, className }: { stageIndex: number; className?: string }) {
  return (
    <ol className={cn("grid grid-cols-5 gap-2", className)}>
      {stages.map((s, i) => (
        <li key={s} aria-current={i === stageIndex ? "step" : undefined}>
          <div className={cn("h-1.5 rounded-full", i <= stageIndex ? "bg-accent" : "bg-secondary")} />
          <p className={cn("mt-2 flex items-center gap-1 text-xs", i === stageIndex ? "font-semibold" : "text-muted")}>
            {i < stageIndex && <Check size={12} className="shrink-0 text-success" />}
            {/* On phones only the current stage name is shown, to save space */}
            <span className={cn("truncate", i !== stageIndex && "hidden sm:inline")}>{s}</span>
          </p>
        </li>
      ))}
    </ol>
  );
}

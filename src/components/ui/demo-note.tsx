import { Info } from "lucide-react";

// Small banner that tells people a screen runs on demo data.
export function DemoNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 flex items-start gap-2 rounded-xl border border-border bg-accent-soft px-4 py-3 text-sm">
      <Info size={16} className="mt-0.5 shrink-0 text-accent" />
      <span>{children}</span>
    </p>
  );
}

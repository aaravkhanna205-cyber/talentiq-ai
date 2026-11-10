"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

// A pop-up window. Uses the browser's built-in <dialog>, so Esc closes it
// and keyboard focus stays inside while it is open.
export function Dialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // click on the dark area closes it
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-card p-0 text-foreground backdrop:bg-black/60"
    >
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-md text-muted hover:text-foreground">
            <X size={19} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

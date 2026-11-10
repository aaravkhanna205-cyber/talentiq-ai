"use client";
import { usePathname } from "next/navigation";
import { findNav } from "@/lib/nav";

export function Breadcrumbs() {
  const pathname = usePathname();
  const current = findNav(pathname);
  return (
    <nav aria-label="Breadcrumb" className="hidden items-center gap-2 text-xs text-muted md:flex">
      <span>Workspace</span>
      <span>/</span>
      <span className="font-semibold text-foreground">{current?.label ?? "Page"}</span>
    </nav>
  );
}

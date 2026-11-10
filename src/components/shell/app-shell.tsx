"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

// The frame around every recruiter page: sidebar on the left, header on top.
export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className={cn("min-w-0 transition-all duration-200", collapsed ? "lg:ml-[76px]" : "lg:ml-[250px]")}>
        <Header onOpenMenu={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-[1600px] px-4 py-6 md:px-8 md:py-8">
          {children}
          <footer className="mt-6 flex flex-col justify-between gap-2 text-xs text-muted sm:flex-row">
            <span>© 2026 {brand.fullName}</span>
            <span>All names, statistics and interviews are fictional demo data.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

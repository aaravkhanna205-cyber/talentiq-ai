"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/brand";
import { Breadcrumbs } from "./breadcrumbs";
import { ThemeToggle } from "./theme-toggle";

export function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [notifsOpen, setNotifsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-lg md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onOpenMenu} className="lg:hidden" aria-label="Open menu">
          <Menu size={20} />
        </Button>
        <Breadcrumbs />
        <div className="truncate font-bold md:hidden">{brand.fullName}</div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Press Enter to search the candidates page */}
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/candidates?q=${encodeURIComponent(search)}`);
          }}
          className="hidden h-10 w-[190px] items-center gap-2 rounded-lg border border-border bg-card px-3 sm:flex xl:w-[280px]"
        >
          <Search size={17} className="shrink-0 text-muted" />
          <input
            aria-label="Search candidates"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </form>

        <ThemeToggle />

        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setNotifsOpen((v) => !v)} aria-label="Notifications" aria-expanded={notifsOpen}>
            <Bell size={19} />
            <span className="absolute right-2 top-1.5 size-2 rounded-full bg-accent" />
          </Button>
          {notifsOpen && (
            <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-border bg-card p-4 text-sm shadow-xl">
              <p className="font-semibold">Notifications</p>
              <p className="mt-3 text-xs text-muted">Demo: you have 8 interviews scheduled today.</p>
              <Button size="sm" variant="outline" className="mt-3" onClick={() => setNotifsOpen(false)}>
                Close
              </Button>
            </div>
          )}
        </div>

        <div className="hidden h-7 w-px bg-border sm:block" />
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">HR</div>
          <div className="hidden xl:block">
            <p className="text-xs font-semibold">HR Admin</p>
            <p className="text-[10px] text-muted">Recruiter</p>
          </div>
          <ChevronDown size={14} className="hidden text-muted xl:block" />
        </div>
      </div>
    </header>
  );
}

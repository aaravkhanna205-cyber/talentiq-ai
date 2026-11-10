"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen, Wrench, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";
import { mainNav, secondaryNav, type NavItem } from "@/lib/nav";

type Props = {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ collapsed, onToggleCollapsed, mobileOpen, onClose }: Props) {
  const pathname = usePathname();

  const renderItem = ({ label, href, icon: Icon, count }: NavItem) => {
    const active = pathname === href || pathname.startsWith(href + "/");
    return (
      <Link
        key={href}
        href={href}
        title={label}
        onClick={onClose}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors",
          active
            ? "bg-accent-soft font-semibold text-foreground shadow-[inset_3px_0_0_var(--accent)]"
            : "text-muted hover:bg-secondary hover:text-foreground"
        )}
      >
        <Icon size={18} className="shrink-0" />
        <span className={cn("flex-1 truncate", collapsed && "lg:hidden")}>{label}</span>
        {count && (
          <span className={cn("rounded-md bg-secondary px-2 py-1 text-[10px]", collapsed && "lg:hidden")}>
            {count}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Dark layer behind the menu on phones */}
      <div
        className={cn("fixed inset-0 z-40 bg-black/60 lg:hidden", mobileOpen ? "block" : "hidden")}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col border-r border-border bg-card transition-all duration-200",
          collapsed ? "lg:w-[76px]" : "lg:w-[250px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-[76px] items-center justify-between gap-2 border-b border-border px-5">
          <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wrench size={20} />
            </span>
            <span className={cn("whitespace-nowrap text-[15px] font-bold leading-tight tracking-tight", collapsed && "lg:hidden")}>
              {brand.name} <span className="text-accent-text">{brand.product}</span>
              <span className="mt-0.5 block text-[9px] font-medium tracking-[.15em] text-muted">{brand.tagline}</span>
            </span>
          </Link>
          <button aria-label="Close menu" onClick={onClose} className="text-muted lg:hidden">
            <X size={19} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <p className={cn("mb-3 mt-4 px-3 text-[10px] uppercase tracking-[.16em] text-muted", collapsed && "lg:hidden")}>
            Workspace
          </p>
          <nav aria-label="Main menu" className="space-y-1">
            {mainNav.map(renderItem)}
          </nav>
          <div className="mt-6 space-y-1 border-t border-border pt-4">{secondaryNav.map(renderItem)}</div>
        </div>

        <div className="hidden border-t border-border p-3 lg:block">
          <button
            onClick={onToggleCollapsed}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted hover:bg-secondary"
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            {!collapsed && "Collapse sidebar"}
          </button>
        </div>
      </aside>
    </>
  );
}

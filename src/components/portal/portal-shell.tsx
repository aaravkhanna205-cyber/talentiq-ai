"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, CalendarDays, FileText, House, UserRound, Wrench } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { brand } from "@/lib/brand";
import { me } from "@/lib/mock";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/portal", icon: House },
  { label: "Jobs", href: "/portal/jobs", icon: BriefcaseBusiness },
  { label: "Applications", href: "/portal/applications", icon: FileText },
  { label: "Interviews", href: "/portal/interviews", icon: CalendarDays },
  { label: "Profile", href: "/portal/profile", icon: UserRound },
];

// Frame for the Candidate Portal. Built for phones first:
// the menu sits at the bottom of the screen on phones and at the top on computers.
export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/portal" ? pathname === "/portal" : pathname.startsWith(href) || (href === "/portal/jobs" && pathname.startsWith("/portal/apply"));

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
          <Link href="/portal" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Wrench size={19} /></span>
            <span className="font-bold tracking-tight">{brand.name} <span className="text-accent-text">Careers</span></span>
          </Link>
          <nav aria-label="Portal menu" className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined}
                className={cn("rounded-lg px-3 py-2 text-sm transition-colors", isActive(l.href) ? "bg-accent-soft font-semibold" : "text-muted hover:bg-secondary hover:text-foreground")}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/portal/profile" aria-label="Your profile"><Avatar name={me.name} /></Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 md:py-8">{children}</main>

      {/* Bottom menu on phones */}
      <nav aria-label="Portal menu" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-card md:hidden">
        {links.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined}
            className={cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]", isActive(href) ? "font-semibold text-accent-text" : "text-muted")}>
            <Icon size={19} />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

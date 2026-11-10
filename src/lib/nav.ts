import { candidates, jobs } from "@/lib/mock";
import {
  LayoutDashboard, Users, FileSearch, BriefcaseBusiness, Video,
  ChartNoAxesCombined, Bot, Settings, HelpCircle, UserCog, SlidersHorizontal, DatabaseBackup, ScrollText, type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon; count?: string };

// The sidebar menu. Add a page here and it appears in the sidebar and breadcrumbs.
export const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Candidates", href: "/candidates", icon: Users, count: String(candidates.length) },
  { label: "Resume Intelligence", href: "/resume-intelligence", icon: FileSearch },
  { label: "Job Openings", href: "/jobs", icon: BriefcaseBusiness, count: String(jobs.filter((j) => j.status === "Open").length) },
  { label: "Interviews", href: "/interviews", icon: Video },
  { label: "Analytics", href: "/analytics", icon: ChartNoAxesCombined },
  { label: "AI Assistant", href: "/assistant", icon: Bot },
];

export const secondaryNav: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help Center", href: "/help", icon: HelpCircle },
];

// Super Admin pages. In Phase 3 only Super Admin accounts will see these.
export const adminNav: NavItem[] = [
  { label: "Users", href: "/admin/users", icon: UserCog },
  { label: "Tool settings", href: "/admin/settings", icon: SlidersHorizontal },
  { label: "Data import", href: "/admin/data-import", icon: DatabaseBackup },
  { label: "Audit log", href: "/admin/audit-log", icon: ScrollText },
];

export const allNav = [...mainNav, ...adminNav, ...secondaryNav];

export function findNav(pathname: string) {
  return allNav.find((item) => pathname === item.href || pathname.startsWith(item.href + "/"));
}

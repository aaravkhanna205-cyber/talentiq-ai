import {
  LayoutDashboard, Users, FileSearch, BriefcaseBusiness, Video,
  ChartNoAxesCombined, Bot, Settings, HelpCircle, type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon; count?: string };

// The sidebar menu. Add a page here and it appears in the sidebar and breadcrumbs.
export const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Candidates", href: "/candidates", icon: Users, count: "1284" },
  { label: "Resume Intelligence", href: "/resume-intelligence", icon: FileSearch },
  { label: "Job Openings", href: "/jobs", icon: BriefcaseBusiness, count: "24" },
  { label: "Interviews", href: "/interviews", icon: Video },
  { label: "Analytics", href: "/analytics", icon: ChartNoAxesCombined },
  { label: "AI Assistant", href: "/assistant", icon: Bot },
];

export const secondaryNav: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help Center", href: "/help", icon: HelpCircle },
];

export const allNav = [...mainNav, ...secondaryNav];

export function findNav(pathname: string) {
  return allNav.find((item) => pathname === item.href || pathname.startsWith(item.href + "/"));
}

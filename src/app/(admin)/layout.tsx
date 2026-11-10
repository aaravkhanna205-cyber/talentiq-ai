import { AppShell } from "@/components/shell/app-shell";

// Super Admin pages use the same frame as the recruiter pages.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

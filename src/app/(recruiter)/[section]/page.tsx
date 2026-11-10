import Link from "next/link";
import { notFound } from "next/navigation";
import { Hammer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shell/page-header";
import { allNav } from "@/lib/nav";

// Placeholder for menu pages that are not built yet.
// As each real page is created in its own folder, it replaces this one automatically.
const built = ["/dashboard", "/candidates"];
const pending = allNav.filter((item) => !built.includes(item.href));

export const dynamicParams = false;
export function generateStaticParams() {
  return pending.map((item) => ({ section: item.href.slice(1) }));
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const item = pending.find((n) => n.href === `/${section}`);
  if (!item) notFound();

  return (
    <>
      <PageHeader title={item.label} />
      <Card>
        <EmptyState icon={Hammer} title={`${item.label} is not built yet`} text="This screen is built in Phase 2. The menu and layout already work, so you can check navigation.">
          <Link href="/dashboard" className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/85">
            Back to dashboard
          </Link>
        </EmptyState>
      </Card>
    </>
  );
}

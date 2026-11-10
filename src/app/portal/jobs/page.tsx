import { BriefcaseBusiness } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { JobCard } from "@/components/portal/job-card";
import { jobs } from "@/lib/mock";

export const metadata = { title: "Open jobs" };

export default function PortalJobs() {
  const open = jobs.filter((j) => j.status === "Open");
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight md:text-[30px]">Open jobs</h1>
      <p className="mt-1 text-sm text-muted">{open.length} roles are open right now. Apply with your resume.</p>
      {open.length === 0 ? (
        <Card className="mt-6"><EmptyState icon={BriefcaseBusiness} title="No open jobs right now" text="Please check again soon." /></Card>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">{open.map((j) => <JobCard key={j.id} job={j} />)}</div>
      )}
    </>
  );
}

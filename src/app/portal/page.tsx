import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StageProgress } from "@/components/ui/stage-progress";
import { JobCard } from "@/components/portal/job-card";
import { getJob, interviewsForCandidate, jobs, me, stages } from "@/lib/mock";

export const metadata = { title: "Candidate portal" };

export default function PortalHome() {
  const job = getJob(me.jobId);
  const next = interviewsForCandidate(me.id).find((i) => i.status === "Upcoming");
  const others = jobs.filter((j) => j.status === "Open" && j.id !== me.jobId).slice(0, 2);

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight md:text-[30px]">Hello, {me.name.split(" ")[0]}</h1>
      <p className="mt-1 text-sm text-muted">Here is where your application stands. Demo data for now.</p>

      <Card className="mt-6 p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Your application</p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold">{job?.title}</h2>
          <Link href="/portal/applications" className={buttonClass("outline", "sm")}>View details</Link>
        </div>
        <StageProgress stageIndex={stages.indexOf(me.stage)} className="mt-5" />
        <p className="mt-4 text-sm text-muted">Applied on {me.appliedOn}. A person on our team reviews every application.</p>
      </Card>

      {next && (
        <Card className="mt-4 flex items-center gap-4 border-accent/40 bg-accent-soft p-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-accent"><CalendarDays size={20} /></span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Next interview: {next.type}</p>
            <p className="text-sm text-muted">{next.day} at {next.time} · {next.mode}</p>
          </div>
          <Link href="/portal/interviews" className={buttonClass("default", "sm")}>Details</Link>
        </Card>
      )}

      <div className="mb-3 mt-8 flex items-center justify-between">
        <h2 className="font-semibold">Other open jobs</h2>
        <Link href="/portal/jobs" className="text-sm font-semibold text-accent-text hover:underline">See all</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{others.map((j) => <JobCard key={j.id} job={j} />)}</div>
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Users } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/shell/page-header";
import { candidatesForJob, getJob, jobs, stages } from "@/lib/mock";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return { title: getJob((await params).id)?.title ?? "Job" };
}

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const job = getJob((await params).id);
  if (!job) notFound();
  const people = candidatesForJob(job.id);

  return (
    <>
      <Link href="/jobs" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={15} /> All jobs
      </Link>
      <PageHeader title={job.title} text={`${job.department} · ${job.location} · ${job.type}`} action={<StatusBadge stage={job.status} />} />

      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)]">
        <Card>
          <CardHeader><h2 className="font-semibold">About the role</h2></CardHeader>
          <CardContent>
            <p className="text-sm">{job.summary}</p>
            <h3 className="mb-2 mt-5 text-sm font-semibold">What the person does</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-accent">
              {job.responsibilities.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h2 className="font-semibold">Requirements</h2></CardHeader>
          <CardContent>
            <ul className="space-y-2.5 text-sm">
              {job.requirements.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" /> {line}
                </li>
              ))}
            </ul>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
              <div><dt className="text-xs text-muted">Openings</dt><dd className="font-semibold">{job.openings}</dd></div>
              <div><dt className="text-xs text-muted">Posted</dt><dd className="font-semibold">{job.postedOn}</dd></div>
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline board: one column per hiring stage */}
      <h2 className="mb-3 flex items-center gap-2 font-semibold">
        <Users size={17} className="text-accent" /> Candidates by stage
        <span className="text-xs font-normal text-muted">{people.length} total</span>
      </h2>
      <div className="overflow-x-auto pb-2">
        <div className="grid min-w-[900px] grid-cols-5 gap-3">
          {stages.map((stage) => {
            const inStage = people.filter((c) => c.stage === stage);
            return (
              <section key={stage} aria-label={stage} className="rounded-xl border border-border bg-secondary/60 p-3">
                <h3 className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted">
                  {stage} <span className="rounded-md bg-card px-2 py-0.5 tabular-nums">{inStage.length}</span>
                </h3>
                <div className="space-y-2">
                  {inStage.map((c) => (
                    <Link key={c.id} href={`/candidates/${c.id}`} className="flex items-center gap-2.5 rounded-lg border border-border bg-card p-2.5 hover:border-accent/50">
                      <Avatar name={c.name} className="size-8" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{c.name}</span>
                        <span className="block truncate text-[11px] text-muted">{c.experience}</span>
                      </span>
                    </Link>
                  ))}
                  {inStage.length === 0 && <p className="px-1 py-3 text-center text-xs text-muted">No one here</p>}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

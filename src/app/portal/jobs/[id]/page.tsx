import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getJob, jobs } from "@/lib/mock";

const open = jobs.filter((j) => j.status === "Open");
export const dynamicParams = false;
export function generateStaticParams() {
  return open.map((j) => ({ id: j.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return { title: getJob((await params).id)?.title ?? "Job" };
}

export default async function PortalJob({ params }: { params: Promise<{ id: string }> }) {
  const job = getJob((await params).id);
  if (!job) notFound();
  return (
    <>
      <Link href="/portal/jobs" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"><ArrowLeft size={15} /> All jobs</Link>
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-text">{job.department}</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-[30px]">{job.title}</h1>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted"><MapPin size={15} /> {job.location} · {job.type} · {job.openings} {job.openings === 1 ? "opening" : "openings"}</p>

      <Card className="mt-6 space-y-6 p-5 md:p-6">
        <p className="text-sm">{job.summary}</p>
        <section>
          <h2 className="mb-2 font-semibold">What you will do</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-accent">{job.responsibilities.map((l) => <li key={l}>{l}</li>)}</ul>
        </section>
        <section>
          <h2 className="mb-2 font-semibold">What we look for</h2>
          <ul className="space-y-2 text-sm">{job.requirements.map((l) => <li key={l} className="flex items-start gap-2.5"><Check size={16} className="mt-0.5 shrink-0 text-accent" /> {l}</li>)}</ul>
        </section>
        <Link href={`/portal/apply/${job.id}`} className={buttonClass("default", "default", "h-11 w-full sm:w-auto")}>Apply with your resume</Link>
      </Card>
    </>
  );
}

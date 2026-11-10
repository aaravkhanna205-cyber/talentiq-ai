import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Job } from "@/lib/mock";

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="flex flex-col p-5 transition-colors hover:border-accent/50">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-text">{job.department}</p>
      <h3 className="mt-1 text-lg font-bold tracking-tight">{job.title}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted"><MapPin size={13} /> {job.location} · {job.type} · {job.openings} {job.openings === 1 ? "opening" : "openings"}</p>
      <p className="mt-3 flex-1 text-sm text-muted">{job.summary}</p>
      <Link href={`/portal/jobs/${job.id}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:underline">
        View and apply <ArrowRight size={15} />
      </Link>
    </Card>
  );
}

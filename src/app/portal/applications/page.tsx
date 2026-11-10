import Link from "next/link";
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StageProgress } from "@/components/ui/stage-progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { getJob, me, stages } from "@/lib/mock";

export const metadata = { title: "My applications" };

const whatNext: Record<string, string> = {
  Applied: "We have your resume. A person on our team will review it.",
  Screening: "Our team is reviewing your resume. You may get a short phone call.",
  Interview: "You have reached the interview stage. Check the Interviews page for the time.",
  Offer: "Congratulations. Our team will contact you with the offer details.",
  Joined: "Welcome to the team.",
};

export default function PortalApplications() {
  const job = getJob(me.jobId);
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight md:text-[30px]">My applications</h1>
      <p className="mt-1 text-sm text-muted">Every job you have applied for, and where it stands.</p>

      <Card className="mt-6 p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">{job?.title}</h2>
            <p className="text-sm text-muted">{job?.department} · Applied on {me.appliedOn}</p>
          </div>
          <StatusBadge stage={me.stage} />
        </div>
        <StageProgress stageIndex={stages.indexOf(me.stage)} className="mt-5" />
        <p className="mt-4 rounded-lg bg-secondary px-4 py-3 text-sm"><span className="font-semibold">What happens next: </span>{whatNext[me.stage]}</p>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted"><FileText size={14} /> Resume on file: {me.resumeFile}</p>
      </Card>

      <p className="mt-6 text-sm text-muted">Want to apply for another role? <Link href="/portal/jobs" className="font-semibold text-accent-text hover:underline">See open jobs</Link></p>
    </>
  );
}

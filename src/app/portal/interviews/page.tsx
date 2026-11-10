import { CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "@/components/ui/status-badge";
import { getJob, interviewsForCandidate, me } from "@/lib/mock";

export const metadata = { title: "My interviews" };

const tips = ["Join 5 minutes early.", "Keep your resume open in front of you.", "Find a quiet place with good network."];

export default function PortalInterviews() {
  const meetings = interviewsForCandidate(me.id);
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight md:text-[30px]">My interviews</h1>
      <p className="mt-1 text-sm text-muted">Dates, times and how to join.</p>

      {meetings.length === 0 ? (
        <Card className="mt-6"><EmptyState icon={CalendarDays} title="No interviews yet" text="When our team schedules an interview, it appears here and we email you." /></Card>
      ) : (
        <div className="mt-6 space-y-4">
          {meetings.map((m) => (
            <Card key={m.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold">{m.type}</h2>
                  <p className="text-sm text-muted">{getJob(me.jobId)?.title}</p>
                </div>
                <StatusBadge stage={m.status} />
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div><dt className="text-xs text-muted">Day</dt><dd className="font-semibold">{m.day}</dd></div>
                <div><dt className="text-xs text-muted">Time</dt><dd className="font-semibold">{m.time}</dd></div>
                <div><dt className="text-xs text-muted">How</dt><dd className="font-semibold">{m.mode}</dd></div>
                <div><dt className="text-xs text-muted">With</dt><dd className="font-semibold">{m.interviewer}</dd></div>
              </dl>
            </Card>
          ))}
        </div>
      )}

      <Card className="mt-4 bg-accent-soft p-5">
        <h2 className="text-sm font-semibold">Before your interview</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted marker:text-accent">{tips.map((t) => <li key={t}>{t}</li>)}</ul>
      </Card>
    </>
  );
}

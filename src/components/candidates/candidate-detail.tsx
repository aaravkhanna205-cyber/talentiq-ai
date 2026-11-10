"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Check, FileText, Mail } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getCandidate, getJob, interviewsForCandidate, stages, type Evidence } from "@/lib/mock";
import { cn } from "@/lib/utils";

const evidenceLabel: Record<Evidence, string> = {
  supported: "Supported",
  unclear: "Unclear",
  missing: "Missing evidence",
};

export function CandidateDetail({ id }: { id: string }) {
  const person = getCandidate(id)!;
  const job = getJob(person.jobId);
  const meetings = interviewsForCandidate(id);
  // Stage changes here are for the demo only and reset when the page reloads.
  const [stageIndex, setStageIndex] = useState<number>(stages.indexOf(person.stage));
  const stage = stages[stageIndex];
  const next = stages[stageIndex + 1];

  return (
    <>
      <Link href="/candidates" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={15} /> All candidates
      </Link>

      <Card className="mb-5 p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={person.name} className="size-14 text-base" />
            <div>
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">{person.name}</h1>
              <p className="text-sm text-muted">
                Applied for{" "}
                {job ? <Link href={`/jobs/${job.id}`} className="font-medium text-accent-text hover:underline">{job.title}</Link> : "a job"}
                {" "}· {person.appliedOn} · {person.experience}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted"><Mail size={13} /> {person.email}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            {next ? (
              <Button onClick={() => setStageIndex((i) => i + 1)}>Move to {next} <ArrowRight size={16} /></Button>
            ) : (
              <StatusBadge stage="Joined" />
            )}
            <span className="text-[11px] text-muted">Demo: the change is not saved</span>
          </div>
        </div>

        {/* Stage progress */}
        <ol className="mt-6 grid grid-cols-5 gap-2">
          {stages.map((s, i) => (
            <li key={s} aria-current={i === stageIndex ? "step" : undefined}>
              <div className={cn("h-1.5 rounded-full", i <= stageIndex ? "bg-accent" : "bg-secondary")} />
              <p className={cn("mt-2 flex items-center gap-1 text-xs", i === stageIndex ? "font-semibold" : "text-muted")}>
                {i < stageIndex && <Check size={12} className="shrink-0 text-success" />}
                {/* On phones only the current stage name is shown, to save space */}
                <span className={cn("truncate", i !== stageIndex && "hidden sm:inline")}>{s}</span>
              </p>
            </li>
          ))}
        </ol>
        <p className="sr-only" role="status">Current stage: {stage}</p>
      </Card>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)]">
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <div>
                <h2 className="font-semibold">Requirement evidence</h2>
                <p className="mt-1 text-xs text-muted">Each job requirement, checked against the resume. No overall score.</p>
              </div>
              <Badge className="text-accent-text">Preview</Badge>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {job?.requirements.map((req, i) => (
                  <li key={req} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <span>{req}</span>
                    <StatusBadge stage={evidenceLabel[person.evidence[i] ?? "unclear"]} />
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted">
                In Phase 4 each line will show the exact resume text it is based on. A person makes every decision.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><h2 className="font-semibold">Summary</h2></CardHeader>
            <CardContent>
              <p className="text-sm">{person.summary}</p>
              <h3 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-muted">Skills on resume</h3>
              <div className="flex flex-wrap gap-2">
                {person.skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader><h2 className="font-semibold">Resume</h2></CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent"><FileText size={18} /></span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{person.resumeFile}</p>
                  <p className="text-xs text-muted">Opens here once file storage is added in Phase 4</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><h2 className="font-semibold">Interviews</h2></CardHeader>
            <CardContent>
              {meetings.length === 0 ? (
                <p className="text-sm text-muted">No interviews scheduled yet.</p>
              ) : (
                <ul className="space-y-3">
                  {meetings.map((m) => (
                    <li key={m.id} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"><CalendarDays size={15} /></span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{m.type}</p>
                        <p className="text-xs text-muted">{m.day} · {m.time} · {m.mode}</p>
                      </div>
                      <StatusBadge stage={m.status} />
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

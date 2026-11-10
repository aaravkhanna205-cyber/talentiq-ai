"use client";
import { useState } from "react";
import Link from "next/link";
import { CalendarDays, CalendarPlus, MapPin, Phone, Video } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shell/page-header";
import { getCandidate, getJob, interviews } from "@/lib/mock";

const modeIcon = { "Video call": Video, "In person": MapPin, Phone: Phone };
const tabs = ["Upcoming", "Completed"];

export function InterviewsView() {
  const [tab, setTab] = useState("Upcoming");
  const [dialogOpen, setDialogOpen] = useState(false);
  const rows = interviews.filter((i) => i.status === tab);
  const days = [...new Set(rows.map((i) => i.day))];

  return (
    <>
      <PageHeader
        title="Interviews"
        text="Who is meeting whom, and when. Demo data for now."
        action={<Button onClick={() => setDialogOpen(true)}><CalendarPlus size={16} /> Schedule interview</Button>}
      />
      <Card className="overflow-hidden">
        <div className="px-5 pt-3"><Tabs tabs={tabs} value={tab} onChange={setTab} /></div>
        {rows.length === 0 ? (
          <EmptyState icon={CalendarDays} title={`No ${tab.toLowerCase()} interviews`} text="Interviews you schedule appear here." />
        ) : (
          days.map((day) => (
            <section key={day}>
              <h2 className="border-b border-border bg-secondary/60 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-muted">{day}</h2>
              <ul className="divide-y divide-border">
                {rows.filter((i) => i.day === day).map((i) => {
                  const person = getCandidate(i.candidateId);
                  if (!person) return null;
                  const ModeIcon = modeIcon[i.mode];
                  return (
                    <li key={i.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                      <p className="w-24 shrink-0 text-sm font-semibold tabular-nums">{i.time}</p>
                      <Link href={`/candidates/${person.id}`} className="flex min-w-0 flex-1 items-center gap-3 hover:underline">
                        <Avatar name={person.name} />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">{person.name}</span>
                          <span className="block truncate text-xs text-muted">{getJob(person.jobId)?.title} · {i.type}</span>
                        </span>
                      </Link>
                      <p className="flex items-center gap-1.5 text-xs text-muted sm:w-44"><ModeIcon size={14} /> {i.mode} · {i.interviewer}</p>
                      <StatusBadge stage={i.status} />
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        )}
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Schedule interview">
        <p className="mt-2 text-sm text-muted">Scheduling with calendar invitations is built in Phase 5. Nothing is saved yet.</p>
        <Button className="mt-6" onClick={() => setDialogOpen(false)}>Got it</Button>
      </Dialog>
    </>
  );
}

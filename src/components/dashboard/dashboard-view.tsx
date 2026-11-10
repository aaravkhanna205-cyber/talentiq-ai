"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Bot, BriefcaseBusiness, CalendarDays, Plus, Send, Users, Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { PageHeader } from "@/components/shell/page-header";
import { ApplicationChart, PipelineChart } from "./charts";
import { candidates, interviews, stats } from "@/lib/mock-data";

const icons = [Users, BriefcaseBusiness, Video, Send];
const linkButton =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium hover:bg-secondary";

export function DashboardView() {
  const [jobDialogOpen, setJobDialogOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Good morning, Recruiter"
        text="Here's what's happening across your hiring pipeline today."
        action={
          <Button onClick={() => setJobDialogOpen(true)}>
            <Plus size={16} /> Create job opening
          </Button>
        }
      />

      {/* Four key numbers */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = icons[i];
          return (
            <Card key={s.label} className="p-5 transition-colors hover:border-accent/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">{s.label}</p>
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon size={19} />
                </span>
              </div>
              <div className="mt-3 text-3xl font-bold tabular-nums tracking-tight">{s.value}</div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-semibold text-success">{s.change}</span>
                <span className="text-[11px] text-muted">{s.sub}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)]">
        <ApplicationChart />
        <PipelineChart />
      </div>

      {/* Candidates and interviews */}
      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)]">
        <Card className="overflow-hidden">
          <CardHeader>
            <div>
              <h2 className="font-semibold">Recent candidates</h2>
              <p className="mt-1 text-xs text-muted">Latest activity in your hiring funnel</p>
            </div>
            <Link href="/candidates" className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-muted hover:bg-secondary hover:text-foreground">
              View all <ArrowRight size={14} />
            </Link>
          </CardHeader>
          <Table>
            <THead>
              <tr>
                <TH>Candidate</TH>
                <TH>Position</TH>
                <TH>Stage</TH>
                <TH>Applied</TH>
              </tr>
            </THead>
            <tbody>
              {candidates.map((c) => (
                <TR key={c.name}>
                  <TD>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-text">
                        {c.initials}
                      </div>
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </TD>
                  <TD className="text-muted">{c.role}</TD>
                  <TD><StatusBadge stage={c.stage} /></TD>
                  <TD className="text-xs text-muted">{c.date}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <h2 className="font-semibold">Upcoming interviews</h2>
              <p className="mt-1 text-xs text-muted">Your schedule today</p>
            </div>
            <span className="text-xs font-medium text-accent-text">{interviews.length} scheduled</span>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {interviews.map((p) => (
                <div className="flex items-center gap-3" key={p.id}>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-xs font-bold text-accent-text">
                    {p.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="truncate text-xs text-muted">{p.role} · {p.type}</p>
                  </div>
                  <div className="whitespace-nowrap text-right">
                    <p className="text-xs font-medium">{p.time}</p>
                    <p className="text-[10px] text-muted">Today</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/interviews" className={linkButton + " mt-6 w-full"}>
              <CalendarDays size={15} /> View interview calendar
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Assistant preview */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-accent-soft p-5 sm:flex-row md:p-6">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-accent">
            <Bot size={20} />
          </span>
          <div>
            <h3 className="font-semibold">
              Recruiter assistant{" "}
              <span className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-accent-text">Preview</span>
            </h3>
            <p className="mt-1 text-sm text-muted">
              Your hiring assistant will help explain resume evidence and draft job descriptions.
            </p>
            <p className="mt-2 text-[11px] text-muted">Coming in a later phase · Human review required</p>
          </div>
        </div>
        <Link href="/assistant" className={linkButton + " self-start"}>
          Open assistant preview <ArrowUpRight size={16} />
        </Link>
      </div>

      <Dialog open={jobDialogOpen} onClose={() => setJobDialogOpen(false)} title="Create job opening">
        <p className="mt-2 text-sm text-muted">
          Job creation is built in Phase 2. Nothing is saved yet.
        </p>
        <Button className="mt-6" onClick={() => setJobDialogOpen(false)}>Got it</Button>
      </Dialog>
    </>
  );
}

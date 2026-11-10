"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Bot, BriefcaseBusiness, CalendarDays, CalendarPlus, ChartNoAxesCombined,
  FileText, FileUp, History, Plus, Send, UserRoundCheck, Users, Video, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { PageHeader } from "@/components/shell/page-header";
import { useDemoLoad } from "@/hooks/use-demo-load";
import { activity, applications, candidates, funnel, interviews, stages, stats } from "@/lib/mock-data";
import { ApplicationChart, FunnelChart, PipelineChart, TrendBadge } from "./charts";
import { Panel } from "./panel";

const kpiIcons = [Users, BriefcaseBusiness, Video, Send];
const activityIcons: Record<string, LucideIcon> = {
  stage: UserRoundCheck, resume: FileText, interview: CalendarDays, offer: Send, job: BriefcaseBusiness,
};
const quickActions = [
  { label: "Upload resumes", href: "/resume-intelligence", icon: FileUp },
  { label: "Schedule interview", href: "/interviews", icon: CalendarPlus },
  { label: "View analytics", href: "/analytics", icon: ChartNoAxesCombined },
];
const outlineLink =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium hover:bg-secondary";
const textLink =
  "inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-muted hover:bg-secondary hover:text-foreground";
const twoColumns = "mb-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)]";

export function DashboardView() {
  const loading = useDemoLoad();
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

      {/* Quick actions */}
      <nav aria-label="Quick actions" className="mb-5 flex flex-wrap gap-2">
        {quickActions.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} className={outlineLink}>
            <Icon size={16} className="text-accent" /> {label}
          </Link>
        ))}
      </nav>

      {/* Four key numbers */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = kpiIcons[i];
          return (
            <Card key={s.label} className="p-5 transition-colors hover:border-accent/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">{s.label}</p>
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon size={19} />
                </span>
              </div>
              {loading ? (
                <div aria-busy="true" aria-label={`Loading ${s.label}`}>
                  <Skeleton className="mt-3 h-9 w-24" />
                  <Skeleton className="mt-3 h-4 w-40" />
                </div>
              ) : (
                <>
                  <div className="mt-3 text-3xl font-bold tabular-nums tracking-tight">{s.value}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs font-semibold text-success">{s.change}</span>
                    <span className="text-[11px] text-muted">{s.sub}</span>
                  </div>
                </>
              )}
            </Card>
          );
        })}
      </div>

      {/* Trend and pipeline */}
      <div className={twoColumns}>
        <Panel
          className="min-w-0"
          title="Application activity"
          text="Applications and interviews over time"
          action={<TrendBadge />}
          loading={loading}
          empty={applications.length === 0}
          emptyIcon={ChartNoAxesCombined}
          emptyTitle="No applications yet"
          emptyText="The trend appears here once candidates start applying."
          skeletonRows={6}
        >
          <ApplicationChart data={applications} />
        </Panel>
        <Panel
          title="Hiring pipeline"
          text="Where applications are right now"
          loading={loading}
          empty={stages.length === 0}
          emptyIcon={Users}
          emptyTitle="Pipeline is empty"
          emptyText="Stages fill up as applications come in."
          skeletonRows={6}
        >
          <PipelineChart data={stages} />
        </Panel>
      </div>

      {/* Funnel and interviews */}
      <div className={twoColumns}>
        <Panel
          title="Hiring funnel"
          text="How many candidates reach each stage"
          loading={loading}
          empty={funnel.length === 0}
          emptyIcon={ChartNoAxesCombined}
          emptyTitle="No funnel data yet"
          emptyText="The funnel appears after the first candidates move between stages."
          skeletonRows={5}
        >
          <FunnelChart data={funnel} />
        </Panel>
        <Panel
          title="Upcoming interviews"
          text="Your schedule today"
          action={<span className="text-xs font-medium text-accent-text">{interviews.length} scheduled</span>}
          loading={loading}
          empty={interviews.length === 0}
          emptyIcon={CalendarDays}
          emptyTitle="No interviews today"
          emptyText="Interviews you schedule appear here."
        >
          <div className="p-5 pt-2">
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
            <Link href="/interviews" className={outlineLink + " mt-6 w-full"}>
              <CalendarDays size={15} /> View interview calendar
            </Link>
          </div>
        </Panel>
      </div>

      {/* Candidates and recent activity */}
      <div className={twoColumns}>
        <Panel
          className="overflow-hidden"
          title="Recent candidates"
          text="Latest people in your hiring funnel"
          action={<Link href="/candidates" className={textLink}>View all <ArrowRight size={14} /></Link>}
          loading={loading}
          empty={candidates.length === 0}
          emptyIcon={Users}
          emptyTitle="No candidates yet"
          emptyText="People who apply appear here."
        >
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
        </Panel>
        <Panel
          title="Recent activity"
          text="What changed lately"
          loading={loading}
          empty={activity.length === 0}
          emptyIcon={History}
          emptyTitle="Nothing has happened yet"
          emptyText="Stage changes, uploads and new jobs are listed here."
          skeletonRows={5}
        >
          <ul className="space-y-4 p-5 pt-2">
            {activity.map((a) => {
              const Icon = activityIcons[a.kind] ?? History;
              return (
                <li key={a.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={15} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm"><span className="font-semibold">{a.who}</span> {a.what}</p>
                    <p className="text-[11px] text-muted">{a.when}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
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
        <Link href="/assistant" className={outlineLink + " self-start"}>
          Open assistant preview <ArrowUpRight size={16} />
        </Link>
      </div>

      <Dialog open={jobDialogOpen} onClose={() => setJobDialogOpen(false)} title="Create job opening">
        <p className="mt-2 text-sm text-muted">Job creation is built in Phase 2. Nothing is saved yet.</p>
        <Button className="mt-6" onClick={() => setJobDialogOpen(false)}>Got it</Button>
      </Dialog>
    </>
  );
}

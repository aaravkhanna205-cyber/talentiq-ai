"use client";
import { ChartNoAxesCombined, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DemoNote } from "@/components/ui/demo-note";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { PageHeader } from "@/components/shell/page-header";
import { ApplicationChart, BarList, FunnelChart, TrendBadge } from "@/components/dashboard/charts";
import { Panel } from "@/components/dashboard/panel";
import { useDemoLoad } from "@/hooks/use-demo-load";
import { applicantsByRole, candidates, candidatesForJob, funnel, jobs, weeklyTrend } from "@/lib/mock";

const reached = (stage: string) => funnel.find((f) => f.stage === stage)?.count ?? 0;
const percent = (part: number, whole: number) => (whole ? `${Math.round((part / whole) * 100)}%` : "0%");

const numbers = [
  { label: "Applications", value: String(candidates.length), sub: "all open and draft jobs" },
  { label: "Reached interview", value: percent(reached("Interview"), reached("Applied")), sub: `${reached("Interview")} of ${reached("Applied")} applicants` },
  { label: "Received an offer", value: percent(reached("Offer"), reached("Applied")), sub: `${reached("Offer")} of ${reached("Applied")} applicants` },
  { label: "Joined", value: String(reached("Joined")), sub: `${percent(reached("Joined"), reached("Offer"))} of offers accepted so far` },
];

export function AnalyticsView() {
  const loading = useDemoLoad();
  return (
    <>
      <PageHeader title="Analytics" text="Where candidates come in, and where they drop off." />
      <DemoNote>These numbers are counted from the demo candidates, so they match the other screens.</DemoNote>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {numbers.map((n) => (
          <Card key={n.label} className="p-5">
            <p className="text-sm text-muted">{n.label}</p>
            <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight">{n.value}</p>
            <p className="mt-2 text-[11px] text-muted">{n.sub}</p>
          </Card>
        ))}
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title="Hiring funnel" text="How many candidates reach each stage" loading={loading} empty={funnel.length === 0} emptyIcon={ChartNoAxesCombined} emptyTitle="No funnel data yet" emptyText="Appears after the first applications." skeletonRows={5}>
          <FunnelChart data={funnel} />
        </Panel>
        <Panel title="Applicants by role" text="Which jobs attract the most people" loading={loading} empty={applicantsByRole.length === 0} emptyIcon={Users} emptyTitle="No applicants yet" emptyText="Appears after the first applications." skeletonRows={5}>
          <BarList data={applicantsByRole} unit="applicants" />
        </Panel>
      </div>

      <Panel className="mb-5 min-w-0" title="Application activity" text="Applications and interviews per day" action={<TrendBadge />} loading={loading} empty={weeklyTrend.length === 0} emptyIcon={ChartNoAxesCombined} emptyTitle="No activity yet" emptyText="Appears after the first applications." skeletonRows={6}>
        <ApplicationChart data={weeklyTrend} />
      </Panel>

      <Card className="overflow-hidden">
        <div className="p-5 pb-3">
          <h2 className="text-base font-semibold">By job</h2>
          <p className="mt-1 text-xs text-muted">Openings against people in the pipeline</p>
        </div>
        <Table>
          <THead><tr><TH>Job</TH><TH>Openings</TH><TH>Applicants</TH><TH>In interview or later</TH><TH>Joined</TH></tr></THead>
          <tbody>
            {jobs.map((job) => {
              const people = candidatesForJob(job.id);
              return (
                <TR key={job.id}>
                  <TD className="font-medium">{job.title}</TD>
                  <TD className="tabular-nums">{job.openings}</TD>
                  <TD className="tabular-nums">{people.length}</TD>
                  <TD className="tabular-nums">{people.filter((c) => ["Interview", "Offer", "Joined"].includes(c.stage)).length}</TD>
                  <TD className="tabular-nums">{people.filter((c) => c.stage === "Joined").length}</TD>
                </TR>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </>
  );
}

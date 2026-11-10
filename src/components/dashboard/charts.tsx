"use client";
import {
  Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const tooltipStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  color: "var(--foreground)",
  borderRadius: 12,
};

type TrendPoint = { day: string; applied: number; interviewed: number };
type StageSlice = { name: string; value: number; fill: string };
type FunnelStep = { stage: string; count: number };

// Line chart: applications and interviews per day.
export function ApplicationChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="p-5 pt-2">
      <div className="h-[270px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="appliedShade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 6" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="applied" name="Applications" stroke="var(--chart-1)" fill="url(#appliedShade)" strokeWidth={3} />
            <Area type="monotone" dataKey="interviewed" name="Interviews" stroke="var(--chart-2)" fill="transparent" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-5 pt-2 text-xs text-muted">
        <span className="flex items-center gap-2"><i className="size-2 rounded-full bg-chart-1" />Applications</span>
        <span className="flex items-center gap-2"><i className="size-2 rounded-full bg-chart-2" />Interviews</span>
      </div>
    </div>
  );
}
export function TrendBadge() {
  return <Badge className="text-muted">Last 7 days</Badge>;
}

// Donut chart: how many applications sit in each stage right now.
export function PipelineChart({ data }: { data: StageSlice[] }) {
  const total = data.reduce((sum, s) => sum + s.value, 0);
  return (
    <div className="p-5 pt-2">
      <div className="relative h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={62} outerRadius={83} dataKey="value" stroke="none" paddingAngle={3}>
              {data.map((s) => <Cell key={s.name} fill={s.fill} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{total.toLocaleString()}</span>
          <span className="text-xs text-muted">applications</span>
        </div>
      </div>
      <div className="mt-1 space-y-2">
        {data.map((s) => (
          <div key={s.name} className="flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-2 text-muted">
              <i className="size-2.5 rounded-full" style={{ background: s.fill }} />{s.name}
            </span>
            <span className="font-semibold tabular-nums">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Funnel: how many candidates reach each stage, and what share moved on from the stage before.
export function FunnelChart({ data }: { data: FunnelStep[] }) {
  const top = data[0]?.count || 1;
  return (
    <ol className="space-y-3.5 p-5 pt-2">
      {data.map((step, i) => {
        const fromPrevious = i === 0 ? null : Math.round((step.count / (data[i - 1].count || 1)) * 100);
        return (
          <li key={step.stage}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium">{step.stage}</span>
              <span className="text-xs text-muted">
                <span className="font-semibold tabular-nums text-foreground">{step.count}</span>
                {fromPrevious !== null && <> · {fromPrevious}% of previous stage</>}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-secondary">
              <div className="h-full rounded-full bg-chart-1" style={{ width: `${Math.max((step.count / top) * 100, 2)}%` }} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

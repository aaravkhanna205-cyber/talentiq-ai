import { candidates } from "./candidates";
import { interviews } from "./interviews";
import { jobs } from "./jobs";
import { stages, type Stage } from "./roles";

export * from "./roles";
export * from "./jobs";
export * from "./candidates";
export * from "./interviews";

// ---- Numbers worked out from the demo data, so every screen agrees ----

export function candidatesForJob(jobId: string) {
  return candidates.filter((c) => c.jobId === jobId);
}
export function interviewsForCandidate(candidateId: string) {
  return interviews.filter((i) => i.candidateId === candidateId);
}

// How many candidates are in each stage right now.
export const stageCounts = stages.map((stage) => ({
  stage,
  count: candidates.filter((c) => c.stage === stage).length,
}));

// How many candidates reached each stage (someone at Offer also passed Applied, Screening, Interview).
export const funnel = stages.map((stage, i) => ({
  stage,
  count: candidates.filter((c) => stages.indexOf(c.stage) >= i).length,
}));

export const applicantsByRole = jobs.map((job) => ({ label: job.title as string, count: candidatesForJob(job.id).length }));

const chartColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--muted)"];
export const pipelineSlices = stageCounts.map((s, i) => ({ name: s.stage, value: s.count, fill: chartColors[i] }));

const openJobs = jobs.filter((j) => j.status === "Open");
const upcoming = interviews.filter((i) => i.status === "Upcoming");
const todays = upcoming.filter((i) => i.day.startsWith("Today"));
const countAt = (stage: Stage) => candidates.filter((c) => c.stage === stage).length;

export const kpis = [
  { label: "Total candidates", value: String(candidates.length), change: `${countAt("Applied")} new`, sub: "waiting for first review" },
  { label: "Open positions", value: String(openJobs.length), change: `${openJobs.reduce((n, j) => n + j.openings, 0)} seats`, sub: `across ${new Set(openJobs.map((j) => j.department)).size} departments` },
  { label: "Interviews", value: String(upcoming.length), change: "Upcoming", sub: `${todays.length} scheduled today` },
  { label: "Offers issued", value: String(countAt("Offer") + countAt("Joined")), change: `${countAt("Joined")} joined`, sub: `${countAt("Offer")} waiting for reply` },
];

// Applications and interviews per day for the trend chart (sample numbers).
export const weeklyTrend = [
  { day: "Wed", applied: 1, interviewed: 1 }, { day: "Thu", applied: 0, interviewed: 0 },
  { day: "Fri", applied: 1, interviewed: 1 }, { day: "Sat", applied: 1, interviewed: 0 },
  { day: "Sun", applied: 2, interviewed: 0 }, { day: "Mon", applied: 1, interviewed: 0 },
  { day: "Tue", applied: 2, interviewed: 3 },
];

export const activity = [
  { id: 1, who: "Meera Iyer", what: "applied for AI Tool Developer", when: "20 min ago", kind: "resume" },
  { id: 2, who: "Ananya Sharma", what: "moved to Interview", when: "1 hour ago", kind: "stage" },
  { id: 3, who: "HR Admin", what: "scheduled an interview with Imran Khan", when: "3 hours ago", kind: "interview" },
  { id: 4, who: "Sana Sheikh", what: "received an offer", when: "Yesterday", kind: "offer" },
  { id: 5, who: "HR Admin", what: "posted the job Research Analyst", when: "5 Nov", kind: "job" },
];
export * from "./admin";
export * from "./me";

"use client";
import { useState } from "react";
import Link from "next/link";
import { FileUp, Search, SearchX } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button, buttonClass } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Select } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shell/page-header";
import { candidates, getJob, jobs, stages } from "@/lib/mock";

const stageTabs = ["All", ...stages];

export function CandidatesView({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [stage, setStage] = useState("All");
  const [jobId, setJobId] = useState("all");

  const rows = candidates.filter(
    (c) =>
      (stage === "All" || c.stage === stage) &&
      (jobId === "all" || c.jobId === jobId) &&
      (c.name + (getJob(c.jobId)?.title ?? "") + c.skills.join(" ")).toLowerCase().includes(query.trim().toLowerCase())
  );
  const clear = () => { setQuery(""); setStage("All"); setJobId("all"); };

  return (
    <>
      <PageHeader
        title="Candidates"
        text="Everyone who has applied. Demo data for now."
        action={<Link href="/candidates/upload" className={buttonClass()}><FileUp size={16} /> Upload resumes</Link>}
      />
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 p-5 pb-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="pointer-events-none absolute left-3 top-3 text-muted" />
            <Input aria-label="Search by name, role or skill" placeholder="Search by name, role or skill" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
          </div>
          <Select aria-label="Filter by job" value={jobId} onChange={(e) => setJobId(e.target.value)} className="h-10 sm:max-w-[240px]">
            <option value="all">All jobs</option>
            {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
          </Select>
          <p className="text-xs text-muted sm:ml-auto">{rows.length} of {candidates.length} shown</p>
        </div>
        <div className="px-5"><Tabs tabs={stageTabs} value={stage} onChange={setStage} /></div>

        {rows.length === 0 ? (
          <EmptyState icon={SearchX} title="No candidates match" text="Try a different word, or clear the search and filters.">
            <Button variant="outline" onClick={clear}>Clear filters</Button>
          </EmptyState>
        ) : (
          <Table>
            <THead>
              <tr><TH>Candidate</TH><TH>Applied for</TH><TH>Experience</TH><TH>Stage</TH><TH>Applied</TH></tr>
            </THead>
            <tbody>
              {rows.map((c) => (
                <TR key={c.id}>
                  <TD>
                    <Link href={`/candidates/${c.id}`} className="flex items-center gap-3 hover:underline">
                      <Avatar name={c.name} />
                      <span className="font-medium">{c.name}</span>
                    </Link>
                  </TD>
                  <TD className="text-muted">{getJob(c.jobId)?.title}</TD>
                  <TD className="text-muted">{c.experience}</TD>
                  <TD><StatusBadge stage={c.stage} /></TD>
                  <TD className="whitespace-nowrap text-xs text-muted">{c.appliedOn}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
}

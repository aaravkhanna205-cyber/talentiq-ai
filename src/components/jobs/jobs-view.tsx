"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Search, SearchX } from "lucide-react";
import { Button, buttonClass } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shell/page-header";
import { candidatesForJob, jobs } from "@/lib/mock";

const statusTabs = ["All", "Open", "Draft", "Closed"];

export function JobsView() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const rows = jobs.filter(
    (j) =>
      (status === "All" || j.status === status) &&
      (j.title + j.department).toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <>
      <PageHeader
        title="Job openings"
        text="Every role you are hiring for. Demo data for now."
        action={<Link href="/jobs/new" className={buttonClass()}><Plus size={16} /> Post a job</Link>}
      />
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 p-5 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="pointer-events-none absolute left-3 top-3 text-muted" />
            <Input aria-label="Search jobs" placeholder="Search by title or department" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
          </div>
          <p className="text-xs text-muted">{rows.length} of {jobs.length} shown</p>
        </div>
        <div className="px-5"><Tabs tabs={statusTabs} value={status} onChange={setStatus} /></div>

        {rows.length === 0 ? (
          <EmptyState icon={SearchX} title="No jobs match" text="Try a different word, or clear the search and status filter.">
            <Button variant="outline" onClick={() => { setQuery(""); setStatus("All"); }}>Clear filters</Button>
          </EmptyState>
        ) : (
          <Table>
            <THead>
              <tr><TH>Job</TH><TH>Location</TH><TH>Openings</TH><TH>Applicants</TH><TH>Status</TH><TH>Posted</TH></tr>
            </THead>
            <tbody>
              {rows.map((job) => (
                <TR key={job.id}>
                  <TD>
                    <Link href={`/jobs/${job.id}`} className="font-medium hover:underline">{job.title}</Link>
                    <p className="text-xs text-muted">{job.department} · {job.type}</p>
                  </TD>
                  <TD className="text-muted">{job.location}</TD>
                  <TD className="tabular-nums">{job.openings}</TD>
                  <TD className="tabular-nums">{candidatesForJob(job.id).length}</TD>
                  <TD><StatusBadge stage={job.status} /></TD>
                  <TD className="whitespace-nowrap text-xs text-muted">{job.postedOn}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
}

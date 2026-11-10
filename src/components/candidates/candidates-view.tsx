"use client";
import { useState } from "react";
import { Search, SearchX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shell/page-header";
import { candidates } from "@/lib/mock-data";

const stageTabs = ["All", "Applied", "Screening", "Interview", "Offer"];

export function CandidatesView({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [stage, setStage] = useState("All");

  const rows = candidates.filter(
    (c) =>
      (stage === "All" || c.stage === stage) &&
      (c.name + c.role).toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <>
      <PageHeader title="Candidates" text="Everyone who has applied. Demo data for now." />
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 p-5 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="pointer-events-none absolute left-3 top-3 text-muted" />
            <Input
              aria-label="Search by name or position"
              placeholder="Search by name or position"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <p className="text-xs text-muted">{rows.length} of {candidates.length} shown</p>
        </div>
        <div className="px-5">
          <Tabs tabs={stageTabs} value={stage} onChange={setStage} />
        </div>

        {rows.length === 0 ? (
          <EmptyState icon={SearchX} title="No candidates match" text="Try a different name, or clear the search and stage filter.">
            <Button variant="outline" onClick={() => { setQuery(""); setStage("All"); }}>Clear filters</Button>
          </EmptyState>
        ) : (
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
              {rows.map((c) => (
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
        )}
      </Card>
    </>
  );
}

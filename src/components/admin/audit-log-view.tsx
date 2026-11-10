"use client";
import { useState } from "react";
import { Search, SearchX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DemoNote } from "@/components/ui/demo-note";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Select } from "@/components/ui/input";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { PageHeader } from "@/components/shell/page-header";
import { auditLog } from "@/lib/mock";

const areas = ["All areas", ...new Set(auditLog.map((a) => a.area))];

export function AuditLogView() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All areas");
  const rows = auditLog.filter(
    (a) => (area === "All areas" || a.area === area) && (a.who + a.what).toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <>
      <PageHeader eyebrow="Super Admin" title="Audit log" text="Every important change: who did it, what changed, and when. Entries cannot be edited or deleted." />
      <DemoNote>Sample entries. From Phase 3 every real change is written here automatically.</DemoNote>
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="pointer-events-none absolute left-3 top-3 text-muted" />
            <Input aria-label="Search the log" placeholder="Search by person or action" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
          </div>
          <Select aria-label="Filter by area" value={area} onChange={(e) => setArea(e.target.value)} className="h-10 sm:max-w-[180px]">
            {areas.map((a) => <option key={a}>{a}</option>)}
          </Select>
          <p className="text-xs text-muted sm:ml-auto">{rows.length} of {auditLog.length} shown</p>
        </div>
        {rows.length === 0 ? (
          <EmptyState icon={SearchX} title="No entries match" text="Try a different word or area.">
            <Button variant="outline" onClick={() => { setQuery(""); setArea("All areas"); }}>Clear filters</Button>
          </EmptyState>
        ) : (
          <Table>
            <THead><tr><TH>When</TH><TH>Who</TH><TH>Area</TH><TH>What changed</TH></tr></THead>
            <tbody>
              {rows.map((a) => (
                <TR key={a.id}>
                  <TD className="whitespace-nowrap text-xs text-muted">{a.when}</TD>
                  <TD className="whitespace-nowrap font-medium">{a.who}</TD>
                  <TD><Badge>{a.area}</Badge></TD>
                  <TD>{a.what}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
}

"use client";
import { useRef, useState } from "react";
import { CircleAlert, CircleCheck, Download, FileSpreadsheet, Undo2 } from "lucide-react";
import { DemoNotice } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DemoNote } from "@/components/ui/demo-note";
import { Label, Select } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { PageHeader } from "@/components/shell/page-header";
import { parseCsv } from "@/lib/csv";
import { importBatches, jobs, type ImportBatch } from "@/lib/mock";

type Kind = "Candidates" | "Jobs";
// The columns each file must have, and a sample row for the template.
const templates: Record<Kind, { columns: string[]; sample: string[] }> = {
  Candidates: { columns: ["name", "email", "phone", "job", "experience"], sample: ["Asha Rao", "asha.rao@example.com", "9876543210", "Customer Support Executive", "2 years"] },
  Jobs: { columns: ["title", "department", "location", "openings"], sample: ["Research Analyst", "Research", "Remote", "1"] },
};
type Row = { line: number; cells: Record<string, string>; problems: string[] };

function checkRow(kind: Kind, cells: Record<string, string>) {
  const problems: string[] = [];
  if (kind === "Candidates") {
    if (!cells.name) problems.push("Name is missing");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cells.email ?? "")) problems.push("Email is missing or not valid");
    if (!jobs.some((j) => j.title.toLowerCase() === (cells.job ?? "").toLowerCase())) problems.push("Job does not match any job in the tool");
  } else {
    if (!cells.title) problems.push("Title is missing");
    if (!cells.department) problems.push("Department is missing");
    if (!(Number(cells.openings) >= 1)) problems.push("Openings must be 1 or more");
  }
  return problems;
}

export function DataImportView() {
  const input = useRef<HTMLInputElement>(null);
  const [kind, setKind] = useState<Kind>("Candidates");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [history, setHistory] = useState<ImportBatch[]>(importBatches);
  const [imported, setImported] = useState(0);
  const template = templates[kind];
  const good = rows.filter((r) => r.problems.length === 0);

  function reset() { setRows([]); setFileName(""); setFileError(""); }

  async function read(file: File) {
    reset(); setImported(0);
    if (!file.name.toLowerCase().endsWith(".csv")) {
      return setFileError("Please choose a CSV file. In Excel, use File → Save As → CSV. Direct Excel upload is added in Phase 3.");
    }
    const table = parseCsv(await file.text());
    if (table.length < 2) return setFileError("The file has no data rows under the heading row.");
    const header = table[0].map((h) => h.toLowerCase());
    const missing = template.columns.filter((c) => !header.includes(c));
    if (missing.length) return setFileError(`These columns are missing: ${missing.join(", ")}. Download the template to see the right headings.`);
    setFileName(file.name);
    setRows(table.slice(1).map((line, i) => {
      const cells = Object.fromEntries(template.columns.map((c) => [c, line[header.indexOf(c)] ?? ""]));
      return { line: i + 2, cells, problems: checkRow(kind, cells) };
    }));
  }

  function downloadTemplate() {
    const csv = [template.columns.join(","), template.sample.join(",")].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = `${kind.toLowerCase()}-template.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function runImport() {
    setHistory((list) => [{ id: `b${Date.now()}`, file: fileName, kind, rows: good.length, by: "You", when: "Just now", undone: false }, ...list]);
    setImported(good.length);
    reset();
  }

  return (
    <>
      <PageHeader eyebrow="Super Admin" title="Data import" text="Bring existing jobs and candidates into the tool from a spreadsheet." />
      <DemoNote>Demo. Your file is read and checked in your browser only; nothing is stored. Real import starts in Phase 3.</DemoNote>

      <Card className="mb-5 space-y-5 p-5 md:p-6">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,240px)_1fr] sm:items-end">
          <div>
            <Label htmlFor="import-kind">What are you importing?</Label>
            <Select id="import-kind" value={kind} onChange={(e) => { setKind(e.target.value as Kind); reset(); setImported(0); }}>
              <option>Candidates</option><option>Jobs</option>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => input.current?.click()}><FileSpreadsheet size={16} /> Choose CSV file</Button>
            <Button variant="outline" onClick={downloadTemplate}><Download size={16} /> Download template</Button>
            <input ref={input} type="file" accept=".csv" className="sr-only" aria-label="Choose CSV file" onChange={(e) => { const f = e.target.files?.[0]; if (f) read(f); e.target.value = ""; }} />
          </div>
        </div>
        <p className="text-xs text-muted">Columns needed: {template.columns.join(", ")}</p>
        {fileError && <p role="alert" className="flex items-start gap-2 rounded-lg border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger"><CircleAlert size={16} className="mt-0.5 shrink-0" /> {fileError}</p>}
        {imported > 0 && <DemoNotice title={`${imported} ${imported === 1 ? "row" : "rows"} checked and listed below`}>In this demo they are not added to the tool. You can undo an import from the history.</DemoNotice>}

        {rows.length > 0 && (
          <div>
            <p className="mb-3 text-sm"><span className="font-semibold">{fileName}</span>: {good.length} ready, {rows.length - good.length} with problems</p>
            <div className="overflow-hidden rounded-xl border border-border">
              <Table>
                <THead><tr><TH>Row</TH>{template.columns.map((c) => <TH key={c}>{c}</TH>)}<TH>Check</TH></tr></THead>
                <tbody>
                  {rows.slice(0, 50).map((r) => (
                    <TR key={r.line} className={r.problems.length ? "bg-danger/5" : undefined}>
                      <TD className="tabular-nums text-muted">{r.line}</TD>
                      {template.columns.map((c) => <TD key={c}>{r.cells[c] || <span className="text-muted">—</span>}</TD>)}
                      <TD>
                        {r.problems.length
                          ? <span className="flex items-start gap-1.5 text-xs font-medium text-danger"><CircleAlert size={13} className="mt-0.5 shrink-0" /> {r.problems.join(". ")}</span>
                          : <span className="flex items-center gap-1.5 text-xs text-success"><CircleCheck size={13} /> Ready</span>}
                      </TD>
                    </TR>
                  ))}
                </tbody>
              </Table>
            </div>
            {rows.length > 50 && <p className="mt-2 text-xs text-muted">Showing the first 50 of {rows.length} rows.</p>}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button disabled={good.length === 0} onClick={runImport}>Import {good.length} ready {good.length === 1 ? "row" : "rows"}</Button>
              <Button variant="outline" onClick={reset}>Cancel</Button>
              {rows.length > good.length && <p className="text-xs text-muted">Rows with problems are skipped. Fix them in the file and import again.</p>}
            </div>
          </div>
        )}
      </Card>

      <Card className="overflow-hidden">
        <div className="p-5 pb-3"><h2 className="font-semibold">Import history</h2><p className="mt-1 text-xs text-muted">Undo removes every row a file added.</p></div>
        <Table>
          <THead><tr><TH>File</TH><TH>Type</TH><TH>Rows</TH><TH>By</TH><TH>When</TH><TH>Status</TH></tr></THead>
          <tbody>
            {history.map((b) => (
              <TR key={b.id}>
                <TD className="font-medium">{b.file}</TD>
                <TD className="text-muted">{b.kind}</TD>
                <TD className="tabular-nums">{b.rows}</TD>
                <TD className="text-muted">{b.by}</TD>
                <TD className="whitespace-nowrap text-xs text-muted">{b.when}</TD>
                <TD>
                  {b.undone ? <StatusBadge stage="Undone" /> : (
                    <Button size="sm" variant="outline" onClick={() => setHistory((list) => list.map((x) => (x.id === b.id ? { ...x, undone: true } : x)))}>
                      <Undo2 size={14} /> Undo
                    </Button>
                  )}
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}

"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleAlert, CircleCheck, FileText, FileUp, X } from "lucide-react";
import { DemoNotice } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label, Select } from "@/components/ui/input";
import { PageHeader } from "@/components/shell/page-header";
import { jobs } from "@/lib/mock";
import { cn } from "@/lib/utils";

const MAX_MB = 5;
const allowed = [".pdf", ".docx"];

type Picked = { name: string; size: number; problem: string };

function inspect(file: File): Picked {
  const lower = file.name.toLowerCase();
  let problem = "";
  if (!allowed.some((ext) => lower.endsWith(ext))) problem = "Only PDF and DOCX files are accepted.";
  else if (file.size > MAX_MB * 1024 * 1024) problem = `Larger than ${MAX_MB} MB.`;
  else if (file.size === 0) problem = "The file is empty.";
  return { name: file.name, size: file.size, problem };
}
function sizeText(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function UploadView() {
  const input = useRef<HTMLInputElement>(null);
  const openJobs = jobs.filter((j) => j.status === "Open");
  const [jobId, setJobId] = useState(openJobs[0]?.id ?? "");
  const [files, setFiles] = useState<Picked[]>([]);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);

  function add(list: FileList | null) {
    if (!list) return;
    const picked = Array.from(list).map(inspect);
    // Skip files already in the list.
    setFiles((old) => [...old, ...picked.filter((p) => !old.some((o) => o.name === p.name && o.size === p.size))]);
    setDone(false);
  }
  const good = files.filter((f) => !f.problem);

  return (
    <>
      <Link href="/candidates" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={15} /> All candidates
      </Link>
      <PageHeader title="Upload resumes" text={`PDF or DOCX, up to ${MAX_MB} MB each. You can add several at once.`} />

      <Card className="max-w-2xl space-y-5 p-5 md:p-6">
        <div>
          <Label htmlFor="upload-job">These resumes are for</Label>
          <Select id="upload-job" value={jobId} onChange={(e) => setJobId(e.target.value)}>
            {openJobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
          </Select>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); add(e.dataTransfer.files); }}
          className={cn("rounded-xl border-2 border-dashed p-8 text-center transition-colors", dragging ? "border-accent bg-accent-soft" : "border-border")}
        >
          <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent"><FileUp size={22} /></span>
          <p className="mt-3 text-sm font-medium">Drag resume files here</p>
          <p className="mt-1 text-xs text-muted">or</p>
          <Button type="button" variant="outline" className="mt-2" onClick={() => input.current?.click()}>Choose files</Button>
          <input ref={input} type="file" multiple accept=".pdf,.docx" className="sr-only" aria-label="Choose resume files" onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
        </div>

        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((f) => (
              <li key={f.name + f.size} className={cn("flex items-center gap-3 rounded-lg border p-3", f.problem ? "border-danger/40 bg-danger/5" : "border-border")}>
                <FileText size={18} className="shrink-0 text-muted" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className={cn("flex items-center gap-1 text-xs", f.problem ? "font-medium text-danger" : "text-muted")}>
                    {f.problem ? <><CircleAlert size={12} /> {f.problem}</> : <><CircleCheck size={12} className="text-success" /> {sizeText(f.size)} · Ready</>}
                  </p>
                </div>
                <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles((old) => old.filter((o) => o !== f))} className="rounded-md p-1 text-muted hover:text-foreground">
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {done ? (
          <DemoNotice title={`${good.length} ${good.length === 1 ? "resume" : "resumes"} checked`}>
            Nothing left your computer. Real upload and resume reading are added in Phase 4.
          </DemoNotice>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled={good.length === 0} onClick={() => setDone(true)}>
              Upload {good.length > 0 ? `${good.length} ${good.length === 1 ? "resume" : "resumes"}` : "resumes"}
            </Button>
            {files.length > good.length && <p className="text-xs text-muted">{files.length - good.length} file(s) with problems will be skipped.</p>}
          </div>
        )}
      </Card>
    </>
  );
}

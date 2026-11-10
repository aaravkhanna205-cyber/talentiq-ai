"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleCheck, FileText, FileUp, X } from "lucide-react";
import { DemoNotice } from "@/components/auth/auth-card";
import { Field } from "@/components/auth/field";
import { Button, buttonClass } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { inspectResume, RESUME_MAX_MB, sizeText, type PickedFile } from "@/lib/files";
import { me } from "@/lib/mock";
import { checkEmail, checkRequired, isClean } from "@/lib/validate";
import { cn } from "@/lib/utils";

export function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(me.name);
  const [email, setEmail] = useState(me.email);
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState<PickedFile | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    const found = {
      name: checkRequired(name, "full name"),
      email: checkEmail(email),
      phone: digits.length >= 10 ? "" : "Enter a phone number with at least 10 digits.",
      resume: !resume ? "Add your resume. It is the only way to apply." : resume.problem,
      consent: consent ? "" : "Please tick the box to continue.",
    };
    setErrors(found);
    if (isClean(found)) setDone(true); // the application is saved for real in Phase 3
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-xl space-y-4 p-6">
        <DemoNotice title="Application looks complete">
          {jobTitle}, with {resume?.name}. Nothing is sent yet; real applications start in Phase 3.
        </DemoNotice>
        <Link href="/portal/applications" className={buttonClass()}>See my applications</Link>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <Link href={`/portal/jobs/${jobId}`} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"><ArrowLeft size={15} /> Back to the job</Link>
      <h1 className="text-2xl font-bold tracking-tight">Apply: {jobTitle}</h1>
      <p className="mt-1 text-sm text-muted">Takes about two minutes. You can do this from your phone.</p>

      <Card className="mt-6 p-5 md:p-6">
        <form onSubmit={submit} noValidate className="space-y-4">
          <Field label="Full name" autoComplete="name" value={name} onChange={setName} error={errors.name} />
          <Field label="Email" type="email" autoComplete="email" value={email} onChange={setEmail} error={errors.email} />
          <Field label="Phone number" type="tel" autoComplete="tel" inputMode="tel" placeholder="10-digit mobile number" value={phone} onChange={setPhone} error={errors.phone} />

          <div>
            <p className="mb-1.5 text-sm font-medium">Resume</p>
            {resume ? (
              <div className={cn("flex items-center gap-3 rounded-lg border p-3", resume.problem ? "border-danger/40 bg-danger/5" : "border-border")}>
                <FileText size={18} className="shrink-0 text-muted" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{resume.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted">{!resume.problem && <CircleCheck size={12} className="text-success" />}{sizeText(resume.size)}</p>
                </div>
                <button type="button" aria-label="Remove resume" onClick={() => setResume(null)} className="rounded-md p-2 text-muted hover:text-foreground"><X size={16} /></button>
              </div>
            ) : (
              <button type="button" onClick={() => input.current?.click()}
                className={cn("flex w-full flex-col items-center rounded-xl border-2 border-dashed p-6 text-center hover:bg-secondary", errors.resume ? "border-danger" : "border-border")}>
                <FileUp size={22} className="text-accent" />
                <span className="mt-2 text-sm font-medium">Choose your resume</span>
                <span className="mt-1 text-xs text-muted">PDF or DOCX, up to {RESUME_MAX_MB} MB</span>
              </button>
            )}
            <input ref={input} type="file" accept=".pdf,.docx" className="sr-only" aria-label="Choose your resume"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) { const picked = inspectResume(f); setResume(picked); setErrors((old) => ({ ...old, resume: picked.problem })); } e.target.value = ""; }} />
            {errors.resume && <p className="mt-1.5 text-xs font-medium text-danger">{errors.resume}</p>}
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[var(--accent)]" />
              <span>I agree that Instant Mechanic may store and review my resume and details for this application. <span className="text-muted">(Sample wording; the final text is set before launch.)</span></span>
            </label>
            {errors.consent && <p className="mt-1.5 text-xs font-medium text-danger">{errors.consent}</p>}
          </div>

          <Button type="submit" className="h-11 w-full">Send application</Button>
        </form>
      </Card>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";
import { checkRequired, isClean } from "@/lib/validate";
import { AuthCard, DemoNotice, primaryLink } from "./auth-card";
import { Field } from "./field";

// Sample roles. Replace with the real Instant Mechanic roles when they are confirmed.
const roleOptions = ["Mechanic", "Technician", "Service advisor", "Office staff"];

export function OnboardingForm() {
  const [company, setCompany] = useState(brand.name);
  const [branch, setBranch] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [hiringFor, setHiringFor] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function toggle(option: string) {
    setHiringFor((list) => (list.includes(option) ? list.filter((o) => o !== option) : [...list, option]));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = {
      company: checkRequired(company, "company name"),
      branch: checkRequired(branch, "branch or city"),
      jobTitle: checkRequired(jobTitle, "job title"),
      hiringFor: hiringFor.length ? "" : "Choose at least one role.",
    };
    setErrors(found);
    if (isClean(found)) setDone(true); // saved for real in Phase 3
  }

  return (
    <AuthCard title="Set up your workspace" text="Step 2 of 2. This helps us show the right jobs and candidates.">
      {done ? (
        <div className="space-y-4">
          <DemoNotice title="Workspace details look good">Nothing is saved yet; that is connected in Phase 3.</DemoNotice>
          <Link href="/dashboard" className={primaryLink}>Open the dashboard</Link>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <Field label="Company name" autoComplete="organization" value={company} onChange={setCompany} error={errors.company} />
          <Field label="Branch or city" placeholder="For example, Delhi" value={branch} onChange={setBranch} error={errors.branch} />
          <Field label="Your job title" autoComplete="organization-title" placeholder="For example, HR manager" value={jobTitle} onChange={setJobTitle} error={errors.jobTitle} />
          <fieldset>
            <Label asLegend>Roles you hire for</Label>
            <div className="flex flex-wrap gap-2">
              {roleOptions.map((option) => {
                const on = hiringFor.includes(option);
                return (
                  <label
                    key={option}
                    className={cn(
                      "cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
                      on ? "border-accent bg-accent-soft font-semibold" : "border-border bg-card text-muted hover:bg-secondary"
                    )}
                  >
                    <input type="checkbox" checked={on} onChange={() => toggle(option)} className="sr-only" />
                    {option}
                  </label>
                );
              })}
            </div>
            {errors.hiringFor && <p className="mt-1.5 text-xs font-medium text-danger">{errors.hiringFor}</p>}
          </fieldset>
          <Button type="submit" className="h-11 w-full">Finish setup</Button>
        </form>
      )}
    </AuthCard>
  );
}

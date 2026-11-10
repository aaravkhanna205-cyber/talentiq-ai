"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DemoNotice } from "@/components/auth/auth-card";
import { Field } from "@/components/auth/field";
import { Button, buttonClass } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label, Select, Textarea } from "@/components/ui/input";
import { PageHeader } from "@/components/shell/page-header";
import { roles } from "@/lib/mock";
import { isClean } from "@/lib/validate";

export function JobForm() {
  const [role, setRole] = useState<string>(roles[0]);
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full-time");
  const [openings, setOpenings] = useState("1");
  const [summary, setSummary] = useState("");
  const [requirements, setRequirements] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<"" | "draft" | "published">("");

  const requirementLines = requirements.split("\n").map((l) => l.trim()).filter(Boolean);

  function check(mode: "draft" | "published") {
    // A draft only needs a department; publishing needs everything.
    const strict = mode === "published";
    const found = {
      department: department.trim() ? "" : "Enter the department.",
      location: !strict || location.trim() ? "" : "Enter the location.",
      openings: Number(openings) >= 1 ? "" : "Enter 1 or more.",
      summary: !strict || summary.trim().length >= 20 ? "" : "Write at least one full sentence about the role.",
      requirements: !strict || requirementLines.length >= 2 ? "" : "Add at least 2 requirements, one per line.",
    };
    setErrors(found);
    if (isClean(found)) setSaved(mode);
  }

  if (saved) {
    return (
      <>
        <PageHeader title="Post a job" />
        <Card className="max-w-2xl space-y-4 p-6">
          <DemoNotice title={saved === "draft" ? "Draft looks good" : "Job is ready to publish"}>
            {role} with {requirementLines.length} requirements. Nothing is saved yet; jobs are stored for real in Phase 3.
          </DemoNotice>
          <div className="flex flex-wrap gap-2">
            <Link href="/jobs" className={buttonClass()}>Back to jobs</Link>
            <Button variant="outline" onClick={() => setSaved("")}>Keep editing</Button>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <Link href="/jobs" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={15} /> All jobs
      </Link>
      <PageHeader title="Post a job" text="Clear requirements make it easier to compare resumes fairly later." />
      <Card className="max-w-2xl p-5 md:p-6">
        <form noValidate onSubmit={(e) => { e.preventDefault(); check("published"); }} className="space-y-4">
          <div>
            <Label htmlFor="job-role">Role</Label>
            <Select id="job-role" value={role} onChange={(e) => setRole(e.target.value)}>
              {roles.map((r) => <option key={r}>{r}</option>)}
            </Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Department" placeholder="For example, Customer Support" value={department} onChange={setDepartment} error={errors.department} />
            <Field label="Location" placeholder="For example, Head office" value={location} onChange={setLocation} error={errors.location} />
            <div>
              <Label htmlFor="job-type">Job type</Label>
              <Select id="job-type" value={type} onChange={(e) => setType(e.target.value)}>
                <option>Full-time</option><option>Part-time</option><option>Contract</option>
              </Select>
            </div>
            <Field label="Number of openings" type="number" min={1} inputMode="numeric" value={openings} onChange={setOpenings} error={errors.openings} />
          </div>
          <div>
            <Label htmlFor="job-summary">About the role</Label>
            <Textarea id="job-summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Two or three sentences on what this person will do." aria-invalid={!!errors.summary} />
            {errors.summary && <p className="mt-1.5 text-xs font-medium text-danger">{errors.summary}</p>}
          </div>
          <div>
            <Label htmlFor="job-reqs">Requirements, one per line</Label>
            <Textarea id="job-reqs" value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder={"Clear spoken Hindi and English\nAt least 6 months in a customer-facing job"} aria-invalid={!!errors.requirements} />
            {errors.requirements
              ? <p className="mt-1.5 text-xs font-medium text-danger">{errors.requirements}</p>
              : <p className="mt-1.5 text-xs text-muted">{requirementLines.length} added. Each one is checked against resumes separately.</p>}
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="submit">Publish job</Button>
            <Button type="button" variant="outline" onClick={() => check("draft")}>Save as draft</Button>
          </div>
        </form>
      </Card>
    </>
  );
}

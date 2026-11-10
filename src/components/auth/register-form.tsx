"use client";
import { useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { checkEmail, checkMatch, checkPassword, checkRequired, isClean } from "@/lib/validate";
import { AuthCard, DemoNotice, authLink, primaryLink } from "./auth-card";
import { Field } from "./field";

const roles = [
  { id: "candidate", label: "I want a job", text: "Apply with your resume", icon: UserRound },
  { id: "recruiter", label: "I am hiring", text: "Instant Mechanic staff", icon: BriefcaseBusiness },
] as const;
type Role = (typeof roles)[number]["id"];

export function RegisterForm() {
  const [role, setRole] = useState<Role>("candidate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = {
      name: checkRequired(name, "full name"),
      email: checkEmail(email),
      password: checkPassword(password),
      confirm: checkMatch(confirm, password),
    };
    setErrors(found);
    if (isClean(found)) setDone(true); // real accounts are created in Phase 3
  }

  if (done) {
    return (
      <AuthCard title="Create your account" text="Step 1 of 2">
        <div className="space-y-4">
          <DemoNotice title="Details look good">
            No account is saved yet; that is connected in Phase 3.
          </DemoNotice>
          <Link href={role === "recruiter" ? "/onboarding" : "/portal"} className={primaryLink}>
            {role === "recruiter" ? "Continue to workspace setup" : "Open the candidate portal"}
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create your account"
      text="Choose what you are here for, then fill in your details."
      footer={<>Already have an account? <Link href="/login" className={authLink}>Sign in</Link></>}
    >
      <form onSubmit={submit} noValidate className="space-y-4">
        <fieldset>
          <legend className="mb-1.5 text-sm font-medium">I am here because</legend>
          <div className="grid grid-cols-2 gap-3">
            {roles.map(({ id, label, text, icon: Icon }) => (
              <label
                key={id}
                className={cn(
                  "cursor-pointer rounded-xl border p-3.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
                  role === id ? "border-accent bg-accent-soft" : "border-border bg-card hover:bg-secondary"
                )}
              >
                <input type="radio" name="role" value={id} checked={role === id} onChange={() => setRole(id)} className="sr-only" />
                <Icon size={19} className="text-accent" />
                <span className="mt-2 block text-sm font-semibold">{label}</span>
                <span className="block text-xs text-muted">{text}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="Full name" autoComplete="name" value={name} onChange={setName} error={errors.name} />
        <Field label="Email" type="email" autoComplete="email" placeholder="name@example.com" value={email} onChange={setEmail} error={errors.email} />
        <Field label="Password" type="password" autoComplete="new-password" value={password} onChange={setPassword} error={errors.password} hint="At least 8 characters, with a letter and a number." />
        <Field label="Confirm password" type="password" autoComplete="new-password" value={confirm} onChange={setConfirm} error={errors.confirm} />
        <Button type="submit" className="h-11 w-full">Create account</Button>
      </form>
    </AuthCard>
  );
}

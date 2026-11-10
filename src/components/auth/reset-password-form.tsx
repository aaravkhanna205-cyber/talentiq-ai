"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { checkMatch, checkPassword, isClean } from "@/lib/validate";
import { AuthCard, DemoNotice, authLink, primaryLink } from "./auth-card";
import { Field } from "./field";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = { password: checkPassword(password), confirm: checkMatch(confirm, password) };
    setErrors(found);
    if (isClean(found)) setDone(true); // the password is saved for real in Phase 3
  }

  return (
    <AuthCard
      title="Set a new password"
      text="Choose a password you have not used here before."
      footer={<Link href="/login" className={authLink}>Back to sign in</Link>}
    >
      {done ? (
        <div className="space-y-4">
          <DemoNotice title="Password looks good">Nothing is saved yet; that is connected in Phase 3.</DemoNotice>
          <Link href="/login" className={primaryLink}>Go to sign in</Link>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <Field label="New password" type="password" autoComplete="new-password" value={password} onChange={setPassword} error={errors.password} hint="At least 8 characters, with a letter and a number." />
          <Field label="Confirm new password" type="password" autoComplete="new-password" value={confirm} onChange={setConfirm} error={errors.confirm} />
          <Button type="submit" className="h-11 w-full">Save new password</Button>
        </form>
      )}
    </AuthCard>
  );
}

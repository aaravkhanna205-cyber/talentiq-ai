"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { checkEmail, checkRequired, isClean } from "@/lib/validate";
import { AuthCard, DemoNotice, authLink, primaryLink } from "./auth-card";
import { Field } from "./field";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = { email: checkEmail(email), password: checkRequired(password, "password") };
    setErrors(found);
    if (isClean(found)) setDone(true); // real sign-in is connected in Phase 3
  }

  return (
    <AuthCard
      title="Sign in"
      text="Welcome back. Enter your details to continue."
      footer={<>New here? <Link href="/register" className={authLink}>Create an account</Link></>}
    >
      {done ? (
        <div className="space-y-4">
          <DemoNotice title="Details look good">
            Sign-in is connected in Phase 3. For now, open the demo workspace.
          </DemoNotice>
          <Link href="/dashboard" className={primaryLink}>Open the dashboard</Link>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <Field label="Email" type="email" autoComplete="email" placeholder="name@example.com" value={email} onChange={setEmail} error={errors.email} />
          <Field label="Password" type="password" autoComplete="current-password" value={password} onChange={setPassword} error={errors.password} />
          <div className="text-right">
            <Link href="/forgot-password" className={authLink + " text-sm"}>Forgot password?</Link>
          </div>
          <Button type="submit" className="h-11 w-full">Sign in</Button>
        </form>
      )}
    </AuthCard>
  );
}

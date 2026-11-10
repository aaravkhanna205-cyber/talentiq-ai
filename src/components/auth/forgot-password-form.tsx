"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { checkEmail } from "@/lib/validate";
import { AuthCard, DemoNotice, authLink } from "./auth-card";
import { Field } from "./field";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = checkEmail(email);
    setError(found);
    if (!found) setDone(true); // the email is sent for real in Phase 3
  }

  return (
    <AuthCard
      title="Forgot your password?"
      text="Enter your email and we will send a link to set a new one."
      footer={<Link href="/login" className={authLink}>Back to sign in</Link>}
    >
      {done ? (
        <DemoNotice title="Check your email">
          If an account exists for {email.trim()}, a reset link is on its way. No email is sent in this demo;{" "}
          <Link href="/reset-password" className={authLink}>open the reset screen</Link> to see the next step.
        </DemoNotice>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <Field label="Email" type="email" autoComplete="email" placeholder="name@example.com" value={email} onChange={setEmail} error={error} />
          <Button type="submit" className="h-11 w-full">Send reset link</Button>
        </form>
      )}
    </AuthCard>
  );
}

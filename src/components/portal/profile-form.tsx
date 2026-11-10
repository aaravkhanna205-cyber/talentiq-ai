"use client";
import { useState } from "react";
import { FileText } from "lucide-react";
import { DemoNotice } from "@/components/auth/auth-card";
import { Field } from "@/components/auth/field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { me } from "@/lib/mock";
import { checkEmail, checkRequired, isClean } from "@/lib/validate";

export function ProfileForm() {
  const [name, setName] = useState(me.name);
  const [email, setEmail] = useState(me.email);
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = { name: checkRequired(name, "full name"), email: checkEmail(email) };
    setErrors(found);
    setSaved(isClean(found)); // saved for real in Phase 3
  }
  const edit = (set: (v: string) => void) => (v: string) => { set(v); setSaved(false); };

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight md:text-[30px]">My profile</h1>
      <p className="mt-1 text-sm text-muted">Keep your details up to date so we can reach you.</p>

      <Card className="mt-6 p-5 md:p-6">
        <form onSubmit={submit} noValidate className="space-y-4">
          <Field label="Full name" autoComplete="name" value={name} onChange={edit(setName)} error={errors.name} />
          <Field label="Email" type="email" autoComplete="email" value={email} onChange={edit(setEmail)} error={errors.email} />
          <Field label="City (optional)" autoComplete="address-level2" value={city} onChange={edit(setCity)} />
          {saved && <DemoNotice title="Details look good">Nothing is saved yet; profiles are stored in Phase 3.</DemoNotice>}
          <Button type="submit" className="h-11 w-full sm:w-auto">Save changes</Button>
        </form>
      </Card>

      <Card className="mt-4 p-5 md:p-6">
        <h2 className="font-semibold">Resume and skills</h2>
        <p className="mt-3 flex items-center gap-2 text-sm"><FileText size={16} className="text-accent" /> {me.resumeFile}</p>
        <div className="mt-3 flex flex-wrap gap-2">{me.skills.map((s) => <Badge key={s}>{s}</Badge>)}</div>
        <p className="mt-3 text-xs text-muted">Skills are read from your resume. Replacing your resume is added in Phase 4.</p>
      </Card>
    </div>
  );
}

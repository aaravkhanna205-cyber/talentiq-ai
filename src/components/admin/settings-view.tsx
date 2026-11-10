"use client";
import { useState } from "react";
import { Lock, Plus, X } from "lucide-react";
import { DemoNotice } from "@/components/auth/auth-card";
import { Field } from "@/components/auth/field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DemoNote } from "@/components/ui/demo-note";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/shell/page-header";
import { brand } from "@/lib/brand";
import { featureSwitches, roles, stages } from "@/lib/mock";

// An editable list of short text items, used for hiring stages and job roles.
function ListEditor({ title, text, items, onChange, addLabel, minItems }: {
  title: string; text: string; items: string[]; onChange: (items: string[]) => void; addLabel: string; minItems: number;
}) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  function add(e: React.FormEvent) {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return setError("Type a name first.");
    if (items.some((i) => i.toLowerCase() === value.toLowerCase())) return setError("That one is already in the list.");
    onChange([...items, value]); setDraft(""); setError("");
  }
  return (
    <Card className="p-5">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1 text-xs text-muted">{text}</p>
      <ol className="mt-4 space-y-2">
        {items.map((item, i) => (
          <li key={item} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm">
            <span className="w-5 text-xs tabular-nums text-muted">{i + 1}</span>
            <span className="flex-1">{item}</span>
            <button type="button" aria-label={`Remove ${item}`} disabled={items.length <= minItems} onClick={() => onChange(items.filter((x) => x !== item))}
              className="rounded-md p-1 text-muted hover:text-danger disabled:opacity-30 disabled:hover:text-muted"><X size={15} /></button>
          </li>
        ))}
      </ol>
      <form onSubmit={add} className="mt-3 flex gap-2">
        <Input aria-label={addLabel} placeholder={addLabel} value={draft} onChange={(e) => { setDraft(e.target.value); setError(""); }} />
        <Button type="submit" variant="outline"><Plus size={15} /> Add</Button>
      </form>
      {error && <p className="mt-1.5 text-xs font-medium text-danger">{error}</p>}
    </Card>
  );
}

export function SettingsView() {
  const [name, setName] = useState(brand.fullName);
  const [tagline, setTagline] = useState(brand.tagline);
  const [stageList, setStageList] = useState<string[]>([...stages]);
  const [roleList, setRoleList] = useState<string[]>([...roles]);
  const [switches, setSwitches] = useState(featureSwitches);
  const [nameError, setNameError] = useState("");
  const [saved, setSaved] = useState(false);

  const touch = <T,>(set: (v: T) => void) => (v: T) => { set(v); setSaved(false); };
  function save() {
    const error = name.trim() ? "" : "Enter the product name.";
    setNameError(error);
    setSaved(!error);
  }

  return (
    <>
      <PageHeader eyebrow="Super Admin" title="Tool settings" text="Change how the tool looks and works, without touching code."
        action={<Button onClick={save}>Save settings</Button>} />
      <DemoNote>Demo. Changes show on this page only and reset on reload. From Phase 3 they are stored and applied across the tool.</DemoNote>
      {saved && <div className="mb-5"><DemoNotice title="Settings look good">{stageList.length} stages, {roleList.length} roles, {switches.filter((s) => s.on).length} features on. Nothing is stored yet.</DemoNotice></div>}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="space-y-4 p-5">
          <h2 className="font-semibold">Brand</h2>
          <Field label="Product name" value={name} onChange={touch(setName)} error={nameError} />
          <Field label="Tagline" value={tagline} onChange={touch(setTagline)} hint="Shown under the name in the sidebar." />
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold">Features</h2>
          <ul className="mt-2 divide-y divide-border">
            {switches.map((s) => (
              <li key={s.id} className="flex items-start justify-between gap-4 py-3">
                <div><p className="text-sm font-medium">{s.label}</p><p className="text-xs text-muted">{s.text}</p></div>
                <Switch label={s.label} checked={s.on} onChange={touch((v: boolean) => setSwitches((list) => list.map((x) => (x.id === s.id ? { ...x, on: v } : x))))} />
              </li>
            ))}
            {/* A fixed rule: no setting can turn this on. */}
            <li className="flex items-start justify-between gap-4 py-3">
              <div>
                <p className="flex items-center gap-1.5 text-sm font-medium"><Lock size={13} className="text-muted" /> AI can reject candidates</p>
                <p className="text-xs text-muted">Always off. A person makes every hiring decision, and this cannot be changed.</p>
              </div>
              <Switch label="AI can reject candidates" checked={false} disabled onChange={() => {}} />
            </li>
          </ul>
        </Card>

        <ListEditor title="Hiring stages" text="The steps every application moves through, in order." items={stageList} onChange={touch(setStageList)} addLabel="New stage, for example Trade test" minItems={2} />
        <ListEditor title="Job roles" text="The roles you can post jobs for." items={roleList} onChange={touch(setRoleList)} addLabel="New role" minItems={1} />
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Field } from "@/components/auth/field";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DemoNote } from "@/components/ui/demo-note";
import { Dialog } from "@/components/ui/dialog";
import { Label, Select } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { PageHeader } from "@/components/shell/page-header";
import { rolePowers, userRoles, users as startUsers, type AppUser, type UserRole } from "@/lib/mock";
import { checkEmail, checkRequired, isClean } from "@/lib/validate";

export function UsersView() {
  const [users, setUsers] = useState<AppUser[]>(startUsers);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("Recruiter");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const change = (id: string, patch: Partial<AppUser>) => setUsers((list) => list.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  const admins = users.filter((u) => u.role === "Super Admin" && u.active).length;

  function addUser(e: React.FormEvent) {
    e.preventDefault();
    const found = {
      name: checkRequired(name, "full name").replace("your", "the"),
      email: checkEmail(email).replace("your", "an") || (users.some((u) => u.email === email.trim()) ? "This email is already in the list." : ""),
    };
    setErrors(found);
    if (!isClean(found)) return;
    setUsers((list) => [...list, { id: `u${Date.now()}`, name: name.trim(), email: email.trim(), role, active: true, lastSeen: "Never" }]);
    setName(""); setEmail(""); setRole("Recruiter"); setOpen(false);
  }

  return (
    <>
      <PageHeader eyebrow="Super Admin" title="Users" text="Who can use the tool, and what each person may do."
        action={<Button onClick={() => setOpen(true)}><UserPlus size={16} /> Add user</Button>} />
      <DemoNote>Demo data. Changes here work on screen but reset when the page reloads. Real accounts start in Phase 3.</DemoNote>

      <Card className="mb-5 overflow-hidden">
        <Table>
          <THead><tr><TH>Person</TH><TH>Role</TH><TH>Last seen</TH><TH>Can sign in</TH></tr></THead>
          <tbody>
            {users.map((u) => {
              // The last active Super Admin cannot be demoted or disabled, or nobody could manage the tool.
              const locked = u.role === "Super Admin" && u.active && admins === 1;
              return (
                <TR key={u.id}>
                  <TD>
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} />
                      <div className="min-w-0">
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted">{u.email}</p>
                      </div>
                    </div>
                  </TD>
                  <TD>
                    <Select aria-label={`Role of ${u.name}`} value={u.role} disabled={locked} onChange={(e) => change(u.id, { role: e.target.value as UserRole })} className="h-9 w-40 disabled:opacity-60">
                      {userRoles.map((r) => <option key={r}>{r}</option>)}
                    </Select>
                    {locked && <p className="mt-1 text-[11px] text-muted">Only Super Admin, cannot change</p>}
                  </TD>
                  <TD className="whitespace-nowrap text-xs text-muted">{u.lastSeen}</TD>
                  <TD>
                    <div className="flex items-center gap-2.5">
                      <Switch label={`${u.name} can sign in`} checked={u.active} disabled={locked} onChange={(v) => change(u.id, { active: v })} />
                      <span className="text-xs text-muted">{u.active ? "Active" : "Disabled"}</span>
                    </div>
                  </TD>
                </TR>
              );
            })}
          </tbody>
        </Table>
      </Card>

      <Card className="p-5">
        <h2 className="font-semibold">What each role can do</h2>
        <dl className="mt-3 divide-y divide-border text-sm">
          {userRoles.map((r) => (
            <div key={r} className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:gap-4">
              <dt className="sm:w-36"><Badge>{r}</Badge></dt>
              <dd className="text-muted">{rolePowers[r]}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} title="Add user">
        <form onSubmit={addUser} noValidate className="mt-4 space-y-4">
          <Field label="Full name" value={name} onChange={setName} error={errors.name} />
          <Field label="Email" type="email" placeholder="name@example.com" value={email} onChange={setEmail} error={errors.email} />
          <div>
            <Label htmlFor="new-user-role">Role</Label>
            <Select id="new-user-role" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
              {userRoles.map((r) => <option key={r}>{r}</option>)}
            </Select>
            <p className="mt-1.5 text-xs text-muted">{rolePowers[role]}</p>
          </div>
          <div className="flex gap-2 pt-1">
            <Button type="submit">Add user</Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

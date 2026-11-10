import Link from "next/link";
import { FileText, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import { brand } from "@/lib/brand";
import { ThemeToggle } from "@/components/shell/theme-toggle";

const points = [
  { icon: FileText, text: "Apply with your resume in a few minutes" },
  { icon: Smartphone, text: "Works on your phone and your computer" },
  { icon: ShieldCheck, text: "A person reviews every application, never a machine alone" },
];

// Frame for login, register and the other account screens.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Brand panel, hidden on phones */}
      <aside className="hidden flex-col justify-between border-r border-border bg-accent-soft p-10 lg:flex xl:p-14">
        <Link href="/login" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wrench size={21} />
          </span>
          <span className="text-lg font-bold tracking-tight">
            {brand.name} <span className="text-accent-text">{brand.product}</span>
          </span>
        </Link>
        <div>
          <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
            Join the team behind Instant Mechanic.
          </h2>
          <ul className="mt-8 space-y-4">
            {points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-accent">
                  <Icon size={17} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted">© 2026 {brand.fullName}</p>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-4 py-4 md:px-8">
          <Link href="/login" className="flex items-center gap-2.5 lg:invisible">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wrench size={19} />
            </span>
            <span className="font-bold tracking-tight">{brand.fullName}</span>
          </Link>
          <ThemeToggle />
        </header>
        <main className="flex flex-1 items-center justify-center px-4 pb-12 pt-4 md:px-8">{children}</main>
      </div>
    </div>
  );
}

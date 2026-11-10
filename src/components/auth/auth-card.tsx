import { CircleCheck } from "lucide-react";

// The white box that holds each auth form.
export function AuthCard({
  title,
  text,
  children,
  footer,
}: {
  title: string;
  text: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold tracking-tight md:text-[28px]">{title}</h1>
      <p className="mt-2 text-sm text-muted">{text}</p>
      <div className="mt-7">{children}</div>
      {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
    </div>
  );
}

// Green message shown after a form passes its checks.
export function DemoNotice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="status" className="rounded-xl border border-success/30 bg-success/10 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-success">
        <CircleCheck size={17} /> {title}
      </p>
      <div className="mt-1.5 text-sm text-muted">{children}</div>
    </div>
  );
}

export const authLink = "font-semibold text-accent-text underline-offset-4 hover:underline";
export const primaryLink =
  "inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/85";

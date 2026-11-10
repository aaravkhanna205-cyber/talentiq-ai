// Title block at the top of every page. Put the page's main button in `action`.
export function PageHeader({
  title,
  text,
  action,
}: {
  title: string;
  text?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-text">Recruiter workspace</div>
        <h1 className="text-2xl font-bold tracking-tight md:text-[30px]">{title}</h1>
        {text && <p className="mt-1 text-sm text-muted">{text}</p>}
      </div>
      {action}
    </div>
  );
}

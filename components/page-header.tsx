export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="relative mb-6 flex flex-col gap-4 border-b border-primary/25 pb-5 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-primary">
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--wc-red))]" />
          Matchday 26
        </div>
        <h1 className="font-display text-5xl font-black leading-none text-foreground">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

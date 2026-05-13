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
    <div className="relative mb-6 flex flex-col gap-4 border-b border-white/20 pb-5 text-white md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-primary">
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--wc-red))]" />
          Matchday 26
        </div>
        <h1 className="geo-26 font-display text-5xl font-black leading-none text-white">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-white/70">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <Card className="shadow-none transition hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_22px_70px_hsl(var(--primary)/0.14)]">
      <CardContent className="p-4">
        <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{label}</div>
        <div className="mt-2 font-display text-4xl font-black leading-none">{value}</div>
        {detail ? <div className="mt-1 text-xs text-muted-foreground">{detail}</div> : null}
      </CardContent>
    </Card>
  );
}

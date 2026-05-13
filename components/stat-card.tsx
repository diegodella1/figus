import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <Card className="shadow-none">
      <CardContent className="p-4">
        <div className="text-xs uppercase text-muted-foreground">{label}</div>
        <div className="mt-2 font-display text-3xl font-semibold">{value}</div>
        {detail ? <div className="mt-1 text-xs text-muted-foreground">{detail}</div> : null}
      </CardContent>
    </Card>
  );
}

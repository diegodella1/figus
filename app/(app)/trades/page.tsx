import { cancelTrade, completeTrade } from "@/app/actions/trades";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { getCurrentUser, getTrades } from "@/lib/data";

export default async function TradesPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const trades = await getTrades(user.id);

  return (
    <>
      <PageHeader title="Trades" description="Confirm swaps only after stickers actually changed hands." />
      <Card>
        <CardContent className="p-0">
          <Table>
            <thead>
              <tr>
                <Th>Trade</Th>
                <Th>Status</Th>
                <Th>Created</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => {
                const statusLabel = trade.status === "completed" ? "✅ Completed" : trade.status === "cancelled" ? "⛔ Cancelled" : "⏳ Proposed";
                const statusClass = trade.status === "completed"
                  ? "border-[hsl(var(--wc-green)/0.45)] bg-[hsl(var(--wc-green)/0.12)] text-[hsl(var(--wc-green))]"
                  : trade.status === "cancelled"
                    ? "border-[hsl(var(--wc-red)/0.45)] bg-[hsl(var(--wc-red)/0.12)] text-[hsl(var(--wc-red))]"
                    : "border-[hsl(var(--wc-gold)/0.55)] bg-[hsl(var(--wc-gold)/0.16)] text-[hsl(var(--wc-gold))]";

                return (
                <tr key={trade.id}>
                  <Td className="font-semibold">{trade.proposer?.display_name} ↔ {trade.partner?.display_name}</Td>
                  <Td><Badge className={statusClass}>{statusLabel}</Badge></Td>
                  <Td>{new Date(trade.created_at).toLocaleDateString()}</Td>
                  <Td>
                    {trade.status === "proposed" ? (
                      <div className="flex gap-2">
                        <form action={completeTrade}>
                          <input type="hidden" name="tradeId" value={trade.id} />
                          <Button size="sm">✅ Complete</Button>
                        </form>
                        <form action={cancelTrade}>
                          <input type="hidden" name="tradeId" value={trade.id} />
                          <Button size="sm" variant="outline">⛔ Cancel</Button>
                        </form>
                      </div>
                    ) : null}
                  </Td>
                </tr>
                );
              })}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

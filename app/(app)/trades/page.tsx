import { cancelTrade, completeTrade } from "@/app/actions/trades";
import { PageHeader } from "@/components/page-header";
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
      <PageHeader title="Trades" description="Collections move only when a trade is completed through the database RPC." />
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
              {trades.map((trade) => (
                <tr key={trade.id}>
                  <Td>{trade.proposer?.display_name} / {trade.partner?.display_name}</Td>
                  <Td>{trade.status}</Td>
                  <Td>{new Date(trade.created_at).toLocaleDateString()}</Td>
                  <Td>
                    {trade.status === "proposed" ? (
                      <div className="flex gap-2">
                        <form action={completeTrade}>
                          <input type="hidden" name="tradeId" value={trade.id} />
                          <Button size="sm">Complete</Button>
                        </form>
                        <form action={cancelTrade}>
                          <input type="hidden" name="tradeId" value={trade.id} />
                          <Button size="sm" variant="outline">Cancel</Button>
                        </form>
                      </div>
                    ) : null}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

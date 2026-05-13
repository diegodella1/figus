import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default async function TradeDetailPage({ params }: { params: Promise<{ tradeId: string }> }) {
  const { tradeId } = await params;
  return (
    <>
      <PageHeader title="Trade detail" description="Atomic completion is handled by complete_trade." />
      <Card>
        <CardContent className="p-5 text-sm text-muted-foreground">Trade ID: {tradeId}</CardContent>
      </Card>
    </>
  );
}

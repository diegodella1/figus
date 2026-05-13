import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getOpenAuctions } from "@/lib/data";

export default async function AuctionsPage() {
  const auctions = await getOpenAuctions();

  return (
    <>
      <PageHeader
        title="Auction Desk"
        description="List duplicate stickers and accept sticker-package bids. No money, no public marketplace behavior."
        action={<Button asChild><Link href="/auctions/new"><Plus className="h-4 w-4" />🏷️ Create auction</Link></Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {auctions.map((auction) => (
          <Link key={auction.id} href={`/auctions/${auction.id}`}>
            <Card className="h-full transition hover:border-primary">
              <CardHeader>
                <CardTitle>{auction.title || auction.items?.[0]?.sticker?.label || "Sticker lot"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">{auction.description || "Open for sticker offers."}</div>
                <div className="flex flex-wrap gap-2">
                  {auction.items?.map((item: { sticker?: { code: string } }) => <Badge key={item.sticker?.code}>{item.sticker?.code}</Badge>)}
                </div>
                <div className="text-xs font-semibold text-muted-foreground">🤝 {auction.bids?.length || 0} bids</div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {!auctions.length ? (
          <Card className="md:col-span-2 xl:col-span-3">
            <CardContent className="p-6">
              <div className="font-display text-2xl font-black">🏟️ No open auctions yet</div>
              <p className="mt-2 text-sm text-muted-foreground">Create one from duplicate stickers when you want package offers.</p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </>
  );
}

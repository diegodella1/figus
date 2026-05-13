import { acceptAuctionBid, cancelAuction, submitAuctionBid } from "@/app/actions/auctions";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/server";

export default async function AuctionDetailPage({ params }: { params: Promise<{ auctionId: string }> }) {
  const { auctionId } = await params;
  const supabase = await createClient();
  const { data: auction } = await supabase
    .from("auction_listings")
    .select("*, seller:profiles(display_name), items:auction_listing_items(*, sticker:stickers(*)), bids:auction_bids(*, bidder:profiles(display_name), items:auction_bid_items(*, sticker:stickers(*)))")
    .eq("id", auctionId)
    .single();

  return (
    <>
      <PageHeader title={auction?.title || "Auction"} description={auction?.description || "Sticker-only bids."} />
      <section className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader><CardTitle>Listed stickers</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {auction?.items?.map((item: { id: string; sticker?: { code: string; label: string } }) => (
              <div key={item.id} className="rounded-md border border-border p-3">
                <div className="font-semibold">{item.sticker?.code}</div>
                <div className="text-sm text-muted-foreground">{item.sticker?.label}</div>
              </div>
            ))}
            <form action={cancelAuction}>
              <input type="hidden" name="auctionId" value={auctionId} />
              <Button variant="outline" size="sm">Cancel auction</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Submit bid</CardTitle></CardHeader>
          <CardContent>
            <form action={submitAuctionBid} className="space-y-3">
              <input type="hidden" name="auctionId" value={auctionId} />
              <Input name="offerStickerIds" required placeholder="Your duplicate sticker UUIDs, comma-separated" />
              <Textarea name="note" placeholder="Optional note" />
              <Button>Submit offer</Button>
            </form>
          </CardContent>
        </Card>
      </section>
      <Card className="mt-4">
        <CardHeader><CardTitle>Bids</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {auction?.bids?.map((bid: { id: string; status: string; bidder?: { display_name: string } }) => (
            <div key={bid.id} className="flex items-center justify-between rounded-md border border-border p-3">
              <div>
                <div className="font-semibold">{bid.bidder?.display_name}</div>
                <div className="text-xs text-muted-foreground">{bid.status}</div>
              </div>
              <form action={acceptAuctionBid}>
                <input type="hidden" name="auctionId" value={auctionId} />
                <input type="hidden" name="bidId" value={bid.id} />
                <Button size="sm">Accept</Button>
              </form>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

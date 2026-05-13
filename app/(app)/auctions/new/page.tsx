import { createAuction } from "@/app/actions/auctions";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewAuctionPage() {
  return (
    <>
      <PageHeader title="Create auction" description="Turn duplicates into a clear sticker-only offer. No cash, only swaps." />
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>🏷️ Auction details</CardTitle>
          <CardDescription>Use sticker UUIDs from your album table for now. Wishlist accepts friendly codes like ARG-10.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createAuction} className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="auction-title">
                  Title
                </label>
                <Input id="auction-title" name="title" placeholder="e.g. Argentina duplicate pack" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="auction-expiry">
                  Expiry
                </label>
                <Input id="auction-expiry" name="expiresAt" type="datetime-local" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="auction-description">
                Description
              </label>
              <Textarea id="auction-description" name="description" placeholder="What makes this lot useful?" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="listing-stickers">
                  📤 Stickers you offer
                </label>
                <Input id="listing-stickers" name="listingStickerIds" required placeholder="Sticker UUIDs, comma-separated" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="wishlist-codes">
                  🎯 Stickers you want
                </label>
                <Input id="wishlist-codes" name="wishlistCodes" placeholder="ARG-10, BRA-07" />
              </div>
            </div>
            <Button>Create auction 🏷️</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

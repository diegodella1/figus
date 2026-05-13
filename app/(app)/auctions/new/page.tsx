import { createAuction } from "@/app/actions/auctions";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewAuctionPage() {
  return (
    <>
      <PageHeader title="Create auction" description="Use duplicate sticker IDs from your album. Validation is enforced again in the database." />
      <Card>
        <CardHeader>
          <CardTitle>Listing</CardTitle>
          <CardDescription>Sticker IDs can come from the album table or future picker UI.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createAuction} className="space-y-3">
            <Input name="title" placeholder="Optional title" />
            <Textarea name="description" placeholder="Optional description" />
            <Input name="listingStickerIds" required placeholder="Sticker UUIDs, comma-separated" />
            <Input name="wishlistCodes" placeholder="Wishlist codes, comma-separated e.g. ARG-10, BRA-07" />
            <Input name="expiresAt" type="datetime-local" />
            <Button>Create auction</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

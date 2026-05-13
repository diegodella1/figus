"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { acceptBidSchema, createAuctionSchema, submitBidSchema } from "@/lib/validation";

export async function createAuction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = createAuctionSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    listingStickerIds: String(formData.get("listingStickerIds") || "").split(",").filter(Boolean),
    wishlistCodes: String(formData.get("wishlistCodes") || "").split(",").map((code) => code.trim()).filter(Boolean),
    expiresAt: formData.get("expiresAt"),
  });

  const supabase = await createClient();
  const { data: auction, error } = await supabase
    .from("auction_listings")
    .insert({
      seller_id: user.id,
      title: parsed.title || null,
      description: parsed.description || null,
      expires_at: parsed.expiresAt || null,
      status: "open",
    })
    .select()
    .single();
  if (error) throw error;

  const { error: itemError } = await supabase.from("auction_listing_items").insert(
    parsed.listingStickerIds.map((stickerId) => ({
      auction_id: auction.id,
      sticker_id: stickerId,
      quantity: 1,
    })),
  );
  if (itemError) throw itemError;

  if (parsed.wishlistCodes.length) {
    const { data: stickers } = await supabase.from("stickers").select("id, code").in("code", parsed.wishlistCodes);
    const { error: wishlistError } = await supabase.from("auction_wishlist_items").insert(
      (stickers || []).map((sticker) => ({
        auction_id: auction.id,
        sticker_id: sticker.id,
      })),
    );
    if (wishlistError) throw wishlistError;
  }

  redirect(`/auctions/${auction.id}`);
}

export async function submitAuctionBid(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = submitBidSchema.parse({
    auctionId: formData.get("auctionId"),
    offerStickerIds: String(formData.get("offerStickerIds") || "").split(",").filter(Boolean),
    note: formData.get("note"),
  });

  const supabase = await createClient();
  const { data: bid, error } = await supabase
    .from("auction_bids")
    .upsert(
      {
        auction_id: parsed.auctionId,
        bidder_id: user.id,
        note: parsed.note || null,
        status: "active",
      },
      { onConflict: "auction_id,bidder_id" },
    )
    .select()
    .single();
  if (error) throw error;

  await supabase.from("auction_bid_items").delete().eq("bid_id", bid.id);
  const { error: itemError } = await supabase.from("auction_bid_items").insert(
    parsed.offerStickerIds.map((stickerId) => ({
      bid_id: bid.id,
      sticker_id: stickerId,
      quantity: 1,
    })),
  );
  if (itemError) throw itemError;
  revalidatePath(`/auctions/${parsed.auctionId}`);
}

export async function withdrawAuctionBid(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const bidId = String(formData.get("bidId") || "");
  const supabase = await createClient();
  const { error } = await supabase.from("auction_bids").update({ status: "withdrawn" }).eq("id", bidId).eq("bidder_id", user.id);
  if (error) throw error;
  revalidatePath("/auctions/bids");
}

export async function cancelAuction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const auctionId = String(formData.get("auctionId") || "");
  const supabase = await createClient();
  const { error } = await supabase
    .from("auction_listings")
    .update({ status: "cancelled" })
    .eq("id", auctionId)
    .eq("seller_id", user.id)
    .eq("status", "open");
  if (error) throw error;
  revalidatePath("/auctions");
}

export async function acceptAuctionBid(formData: FormData) {
  const parsed = acceptBidSchema.parse({
    auctionId: formData.get("auctionId"),
    bidId: formData.get("bidId"),
  });
  const supabase = await createClient();
  const { error } = await supabase.rpc("accept_auction_bid", {
    p_auction_id: parsed.auctionId,
    p_bid_id: parsed.bidId,
  });
  if (error) throw error;
  revalidatePath("/", "layout");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { createTradeSchema } from "@/lib/validation";

export async function createTrade(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = createTradeSchema.parse({
    partnerId: formData.get("partnerId"),
    giveStickerIds: String(formData.get("giveStickerIds") || "").split(",").filter(Boolean),
    receiveStickerIds: String(formData.get("receiveStickerIds") || "").split(",").filter(Boolean),
  });

  const supabase = await createClient();
  const { data: trade, error } = await supabase
    .from("trades")
    .insert({ proposer_id: user.id, partner_id: parsed.partnerId, status: "proposed" })
    .select()
    .single();
  if (error) throw error;

  const tradeItems = [
    ...parsed.giveStickerIds.map((stickerId) => ({
      trade_id: trade.id,
      from_user_id: user.id,
      to_user_id: parsed.partnerId,
      sticker_id: stickerId,
      quantity: 1,
    })),
    ...parsed.receiveStickerIds.map((stickerId) => ({
      trade_id: trade.id,
      from_user_id: parsed.partnerId,
      to_user_id: user.id,
      sticker_id: stickerId,
      quantity: 1,
    })),
  ];

  const { error: itemError } = await supabase.from("trade_items").insert(tradeItems);
  if (itemError) throw itemError;
  redirect(`/trades/${trade.id}`);
}

export async function completeTrade(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const tradeId = String(formData.get("tradeId") || "");
  const supabase = await createClient();
  const { error } = await supabase.rpc("complete_trade", { p_trade_id: tradeId });
  if (error) throw error;
  revalidatePath("/", "layout");
}

export async function cancelTrade(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const tradeId = String(formData.get("tradeId") || "");
  const supabase = await createClient();
  const { error } = await supabase.from("trades").update({ status: "cancelled" }).eq("id", tradeId).eq("status", "proposed");
  if (error) throw error;
  revalidatePath("/trades");
}

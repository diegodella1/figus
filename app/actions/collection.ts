"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Papa from "papaparse";
import { getCurrentUser } from "@/lib/data";
import { parseStickerCodes } from "@/lib/sticker-code";
import { bulkInputSchema, updateCollectionSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function updateCollection(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = updateCollectionSchema.parse({
    stickerId: formData.get("stickerId"),
    quantity: formData.get("quantity"),
    wanted: formData.get("wanted") === "on" || formData.get("wanted") === "true",
  });

  const supabase = await createClient();
  const { error } = await supabase.from("user_stickers").upsert({
    user_id: user.id,
    sticker_id: parsed.stickerId,
    quantity: parsed.quantity,
    wanted: parsed.wanted,
    updated_at: new Date().toISOString(),
  });

  if (error) throw error;
  revalidatePath("/album");
  revalidatePath("/dashboard");
}

export async function applyBulkInput(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = bulkInputSchema.parse({
    mode: formData.get("mode"),
    input: formData.get("input"),
  });

  const codes = parseStickerCodes(parsed.input).map((item) => item.code);
  const supabase = await createClient();
  const { data: stickers, error } = await supabase.from("stickers").select("id, code").in("code", codes);
  if (error) throw error;

  const rows = (stickers || []).map((sticker) => ({
    user_id: user.id,
    sticker_id: sticker.id,
    quantity: parsed.mode === "missing" ? 0 : parsed.mode === "duplicates" ? 2 : 1,
    wanted: parsed.mode === "missing",
    updated_at: new Date().toISOString(),
  }));

  if (rows.length > 0) {
    const { error: upsertError } = await supabase.from("user_stickers").upsert(rows);
    if (upsertError) throw upsertError;
  }

  revalidatePath("/album");
  revalidatePath("/dashboard");
}

export async function bulkImportStickers(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const supabase = await createClient();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") throw new Error("Admin role required");

  const csv = String(formData.get("csv") || "");
  const parsed = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });
  if (parsed.errors.length) throw new Error(parsed.errors[0].message);

  const rows = parsed.data.map((row) => ({
    code: row.code?.trim().toUpperCase(),
    team: row.team?.trim(),
    number: Number(row.number),
    label: row.label?.trim(),
    section: row.section?.trim() || null,
    rarity: row.rarity?.trim() || null,
    source_url: row.source_url?.trim() || null,
  }));

  const admin = createAdminClient();
  const { error } = await admin.from("stickers").upsert(rows, { onConflict: "code" });
  if (error) throw error;
  revalidatePath("/", "layout");
}

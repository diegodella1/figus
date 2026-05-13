import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { duplicateCount, isMissing, scoreMatch } from "@/lib/scoring";
import type { MatchResult, Profile, Sticker, UserSticker } from "@/lib/types";

export async function getCurrentUser() {
  if (!hasSupabaseEnv()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  return data as Profile | null;
}

export async function getOrCreateProfile(userId: string, email?: string | null) {
  const supabase = await createClient();
  const existing = await getProfile(userId);
  if (existing) return existing;

  const displayName = email?.split("@")[0] || "Collector";
  const { data, error } = await supabase
    .from("profiles")
    .insert({ id: userId, display_name: displayName, role: "member" })
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function getCatalog() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("stickers").select("*").order("team").order("number");
  if (error) throw error;
  return (data || []) as Sticker[];
}

export async function getMyCollection(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_stickers")
    .select("*, sticker:stickers(*)")
    .eq("user_id", userId);
  if (error) throw error;
  return (data || []) as UserSticker[];
}

export async function getAlbumStats(userId: string) {
  const [catalog, collection] = await Promise.all([getCatalog(), getMyCollection(userId)]);
  const bySticker = new Map(collection.map((row) => [row.sticker_id, row]));
  const owned = catalog.filter((sticker) => (bySticker.get(sticker.id)?.quantity || 0) > 0).length;
  const missing = catalog.filter((sticker) => isMissing(bySticker.get(sticker.id)?.quantity || 0, bySticker.get(sticker.id)?.wanted ?? true)).length;
  const duplicates = collection.reduce((sum, row) => sum + duplicateCount(row.quantity), 0);

  return { total: catalog.length, owned, missing, duplicates };
}

export async function getProfiles() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("*").order("display_name");
  if (error) throw error;
  return (data || []) as Profile[];
}

export async function getMatchesForUser(userId: string): Promise<MatchResult[]> {
  const supabase = await createClient();
  const [{ data: profiles }, { data: rows }] = await Promise.all([
    supabase.from("profiles").select("*").neq("id", userId),
    supabase.from("user_stickers").select("user_id, sticker_id, quantity, wanted"),
  ]);

  const byUser = new Map<string, Map<string, { quantity: number; wanted: boolean }>>();
  for (const row of rows || []) {
    if (!byUser.has(row.user_id)) byUser.set(row.user_id, new Map());
    byUser.get(row.user_id)!.set(row.sticker_id, { quantity: row.quantity, wanted: row.wanted });
  }

  const mine = byUser.get(userId) || new Map();

  return ((profiles || []) as Profile[])
    .map((profile) => {
      const theirs = byUser.get(profile.id) || new Map();
      let receiveCount = 0;
      let giveCount = 0;

      for (const [stickerId, myState] of mine) {
        if (isMissing(myState.quantity, myState.wanted) && duplicateCount(theirs.get(stickerId)?.quantity || 0) > 0) {
          receiveCount += 1;
        }
      }

      for (const [stickerId, theirState] of theirs) {
        if (isMissing(theirState.quantity, theirState.wanted) && duplicateCount(mine.get(stickerId)?.quantity || 0) > 0) {
          giveCount += 1;
        }
      }

      const balancedCount = Math.min(receiveCount, giveCount);
      return {
        userId: profile.id,
        displayName: profile.display_name,
        teamArea: profile.team_area,
        receiveCount,
        giveCount,
        balancedCount,
        score: scoreMatch({ receiveCount, giveCount, balancedCount }),
      };
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);
}

export async function getOpenAuctions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("auction_listings")
    .select("*, seller:profiles(display_name, team_area), items:auction_listing_items(*, sticker:stickers(*)), bids:auction_bids!auction_bids_auction_id_fkey(id,status)")
    .eq("status", "open")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getTrades(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("trades")
    .select("*, proposer:profiles!trades_proposer_id_fkey(display_name), partner:profiles!trades_partner_id_fkey(display_name)")
    .or(`proposer_id.eq.${userId},partner_id.eq.${userId}`)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

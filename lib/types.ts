export type ProfileRole = "member" | "admin";
export type TradeStatus = "proposed" | "completed" | "cancelled";
export type AuctionStatus = "open" | "accepted" | "cancelled" | "expired";
export type BidStatus = "active" | "withdrawn" | "accepted" | "rejected" | "invalid";

export type Sticker = {
  id: string;
  code: string;
  team: string;
  number: number;
  label: string;
  section?: string | null;
  rarity?: string | null;
  source_url?: string | null;
};

export type UserSticker = {
  user_id: string;
  sticker_id: string;
  quantity: number;
  wanted: boolean;
  sticker?: Sticker;
};

export type Profile = {
  id: string;
  display_name: string;
  team_area?: string | null;
  contact_method?: string | null;
  slack_handle?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  role: ProfileRole;
};

export type MatchResult = {
  userId: string;
  displayName: string;
  teamArea?: string | null;
  receiveCount: number;
  giveCount: number;
  balancedCount: number;
  score: number;
};

export type BidScoreInput = {
  wishlistMatches: number;
  sellerMissingCount: number;
  lotSize: number;
  bidderReceivesNeeded: number;
};

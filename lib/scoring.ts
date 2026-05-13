import type { BidScoreInput, MatchResult } from "@/lib/types";

export function duplicateCount(quantity: number) {
  return Math.max(0, quantity - 1);
}

export function isMissing(quantity: number, wanted: boolean) {
  return wanted && quantity === 0;
}

export function scoreMatch(input: Pick<MatchResult, "balancedCount" | "receiveCount" | "giveCount">) {
  return input.balancedCount * 10 + input.receiveCount * 3 + input.giveCount * 2;
}

export function scoreAuctionBid(input: BidScoreInput) {
  return (
    input.wishlistMatches * 12 +
    input.sellerMissingCount * 8 +
    input.lotSize * 2 +
    input.bidderReceivesNeeded * 3
  );
}

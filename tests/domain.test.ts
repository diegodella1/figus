import { describe, expect, it } from "vitest";
import { duplicateCount, isMissing, scoreAuctionBid, scoreMatch } from "@/lib/scoring";
import { normalizeStickerCode, parseStickerCodes } from "@/lib/sticker-code";
import { createAuctionSchema } from "@/lib/validation";

describe("sticker code parser", () => {
  it("normalizes common office input formats", () => {
    expect(normalizeStickerCode("arg-1")).toBe("ARG-01");
    expect(normalizeStickerCode("ARG 01")).toBe("ARG-01");
    expect(normalizeStickerCode("ARG01")).toBe("ARG-01");
    expect(parseStickerCodes("ARG, 1, BRA-15, mex22").map((item) => item.code)).toEqual([
      "ARG-01",
      "BRA-15",
      "MEX-22",
    ]);
  });
});

describe("collection derivation", () => {
  it("derives missing and duplicates from quantity and wanted", () => {
    expect(isMissing(0, true)).toBe(true);
    expect(isMissing(1, true)).toBe(false);
    expect(isMissing(0, false)).toBe(false);
    expect(duplicateCount(4)).toBe(3);
  });
});

describe("scoring", () => {
  it("scores matches with the PRD formula", () => {
    expect(scoreMatch({ balancedCount: 2, receiveCount: 5, giveCount: 3 })).toBe(41);
  });

  it("scores auction bids with wishlist and utility weighting", () => {
    expect(scoreAuctionBid({ wishlistMatches: 2, sellerMissingCount: 3, lotSize: 4, bidderReceivesNeeded: 1 })).toBe(59);
  });
});

describe("auction validation", () => {
  it("normalizes wishlist codes", () => {
    const parsed = createAuctionSchema.parse({
      listingStickerIds: ["00000000-0000-0000-0000-000000000001"],
      wishlistCodes: ["arg1", "BRA-02"],
    });
    expect(parsed.wishlistCodes).toEqual(["ARG-01", "BRA-02"]);
  });
});

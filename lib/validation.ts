import { z } from "zod";
import { normalizeStickerCode } from "@/lib/sticker-code";

const stickerCode = z.string().transform((value, ctx) => {
  const normalized = normalizeStickerCode(value);
  if (!normalized) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid sticker code" });
    return z.NEVER;
  }
  return normalized;
});

export const profileSchema = z.object({
  displayName: z.string().trim().min(2).max(80),
  teamArea: z.string().trim().max(80).optional().or(z.literal("")),
  contactMethod: z.string().trim().max(120).optional().or(z.literal("")),
  slackHandle: z.string().trim().max(80).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  avatarUrl: z.string().trim().url().optional().or(z.literal("")),
});

export const bulkInputSchema = z.object({
  mode: z.enum(["owned", "duplicates", "missing"]),
  input: z.string().min(1),
});

export const updateCollectionSchema = z.object({
  stickerId: z.string().uuid(),
  quantity: z.coerce.number().int().min(0).max(999),
  wanted: z.coerce.boolean(),
});

export const createTradeSchema = z.object({
  partnerId: z.string().uuid(),
  giveStickerIds: z.array(z.string().uuid()).min(1),
  receiveStickerIds: z.array(z.string().uuid()).min(1),
});

export const createAuctionSchema = z.object({
  title: z.string().trim().max(120).optional().or(z.literal("")),
  description: z.string().trim().max(800).optional().or(z.literal("")),
  listingStickerIds: z.array(z.string().uuid()).min(1),
  wishlistCodes: z.array(stickerCode).default([]),
  expiresAt: z.string().datetime().optional().or(z.literal("")),
});

export const submitBidSchema = z.object({
  auctionId: z.string().uuid(),
  offerStickerIds: z.array(z.string().uuid()).min(1),
  note: z.string().trim().max(500).optional().or(z.literal("")),
});

export const acceptBidSchema = z.object({
  auctionId: z.string().uuid(),
  bidId: z.string().uuid(),
});

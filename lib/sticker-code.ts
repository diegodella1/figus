export type ParsedStickerCode = {
  raw: string;
  code: string;
};

const TOKEN_PATTERN = /([a-z]{2,4})[\s,-]*(\d{1,3})/gi;

export function normalizeStickerCode(raw: string) {
  const match = raw.trim().match(/^([a-z]{2,4})[\s,-]*(\d{1,3})$/i);
  if (!match) return null;

  return `${match[1].toUpperCase()}-${match[2].padStart(2, "0")}`;
}

export function parseStickerCodes(input: string): ParsedStickerCode[] {
  const parsed: ParsedStickerCode[] = [];
  const seen = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = TOKEN_PATTERN.exec(input)) !== null) {
    const code = normalizeStickerCode(`${match[1]}-${match[2]}`);
    if (code && !seen.has(code)) {
      parsed.push({ raw: match[0], code });
      seen.add(code);
    }
  }

  return parsed;
}

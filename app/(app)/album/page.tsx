import { applyBulkInput, updateCollection } from "@/app/actions/collection";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, Td, Th } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { getCatalog, getCurrentUser, getMyCollection } from "@/lib/data";
import { duplicateCount, isMissing } from "@/lib/scoring";

export default async function AlbumPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; team?: string; filter?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) return null;

  const params = await searchParams;
  const [catalog, collection] = await Promise.all([getCatalog(), getMyCollection(user.id)]);
  const bySticker = new Map(collection.map((row) => [row.sticker_id, row]));
  const teams = [...new Set(catalog.map((sticker) => sticker.team))].sort();
  const activeFilterCount = [params.q, params.team, params.filter].filter(Boolean).length;

  const filtered = catalog.filter((sticker) => {
    const state = bySticker.get(sticker.id);
    const quantity = state?.quantity || 0;
    const wanted = state?.wanted ?? true;
    const query = params.q?.toLowerCase() || "";
    if (query && !`${sticker.code} ${sticker.team} ${sticker.label}`.toLowerCase().includes(query)) return false;
    if (params.team && params.team !== sticker.team) return false;
    if (params.filter === "missing" && !isMissing(quantity, wanted)) return false;
    if (params.filter === "duplicates" && duplicateCount(quantity) === 0) return false;
    if (params.filter === "owned" && quantity === 0) return false;
    return true;
  });

  return (
    <>
      <PageHeader title="My Album" description="Add stickers fast, filter clearly, and keep duplicate counts current." />
      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader>
            <CardTitle>➕ Add stickers</CardTitle>
            <CardDescription>Paste many codes at once. Formats accepted: ARG-01, ARG 01, ARG01, arg-1.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={applyBulkInput} className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="bulk-mode">
                What should these codes become?
              </label>
              <Select id="bulk-mode" name="mode" defaultValue="owned">
                <option value="owned">✅ Add as owned</option>
                <option value="duplicates">🔁 Add as duplicates</option>
                <option value="missing">🔎 Mark as missing</option>
              </Select>
              <label className="block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="bulk-input">
                Sticker codes
              </label>
              <Textarea id="bulk-input" name="input" required placeholder="ARG-01, BRA 15, MEX22" />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button type="submit">➕ Apply codes</Button>
                <p className="text-xs text-muted-foreground">Invalid codes are ignored; valid codes update your album.</p>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>🔎 Find stickers</CardTitle>
            <CardDescription>
              Showing {filtered.length} of {catalog.length} stickers{activeFilterCount ? ` with ${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""}` : ""}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr_0.9fr_auto_auto]">
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="album-search">
                  Code, team, name
                </label>
                <Input id="album-search" name="q" placeholder="ARG-01, Argentina, Messi..." defaultValue={params.q || ""} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="team-filter">
                  Team
                </label>
                <Select id="team-filter" name="team" defaultValue={params.team || ""}>
                <option value="">🌎 All teams</option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="status-filter">
                  Status
                </label>
                <Select id="status-filter" name="filter" defaultValue={params.filter || ""}>
                  <option value="">📋 All statuses</option>
                  <option value="missing">🔎 Missing</option>
                  <option value="duplicates">🔁 Duplicates</option>
                  <option value="owned">✅ Owned</option>
                </Select>
              </div>
              <Button className="self-end" type="submit" variant="outline">🔎 Filter</Button>
              <Button className="self-end" asChild variant="secondary">
                <Link href="/album">Clear</Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
      <Card className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <Th>Code</Th>
                <Th>Team</Th>
                <Th>Name</Th>
                <Th>Status</Th>
                <Th>Quantity</Th>
                <Th>Wanted</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sticker) => {
                const state = bySticker.get(sticker.id);
                const quantity = state?.quantity || 0;
                const wanted = state?.wanted ?? true;
                const duplicateTotal = duplicateCount(quantity);
                const status = quantity > 1 ? `🔁 ${duplicateTotal} duplicate${duplicateTotal > 1 ? "s" : ""}` : quantity === 1 ? "✅ Owned" : wanted ? "🔎 Missing" : "⏸️ Ignored";
                const statusClass = quantity > 1
                  ? "border-[hsl(var(--wc-blue)/0.45)] bg-[hsl(var(--wc-blue)/0.12)] text-[hsl(var(--wc-blue))]"
                  : quantity === 1
                    ? "border-[hsl(var(--wc-green)/0.45)] bg-[hsl(var(--wc-green)/0.12)] text-[hsl(var(--wc-green))]"
                    : wanted
                      ? "border-[hsl(var(--wc-red)/0.45)] bg-[hsl(var(--wc-red)/0.12)] text-[hsl(var(--wc-red))]"
                      : "border-border bg-muted text-muted-foreground";

                return (
                  <tr key={sticker.id}>
                    <Td className="font-semibold">{sticker.code}</Td>
                    <Td>{sticker.team}</Td>
                    <Td>{sticker.label}</Td>
                    <Td><Badge className={statusClass}>{status}</Badge></Td>
                    <Td>
                      <form action={updateCollection} className="flex items-center gap-2">
                        <input type="hidden" name="stickerId" value={sticker.id} />
                        <Input aria-label={`Quantity for ${sticker.code}`} className="w-20" name="quantity" type="number" min="0" max="999" defaultValue={quantity} />
                        <label className="flex items-center gap-2 text-xs text-muted-foreground">
                          <input name="wanted" type="checkbox" defaultChecked={wanted} />
                          🔎 want
                        </label>
                        <Button size="sm" variant="secondary" type="submit">💾 Save</Button>
                      </form>
                    </Td>
                    <Td>{wanted ? "🔎 Yes" : "No"}</Td>
                    <Td className="text-xs text-muted-foreground">{sticker.section}</Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Card>
    </>
  );
}

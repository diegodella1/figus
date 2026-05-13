import { applyBulkInput, updateCollection } from "@/app/actions/collection";
import { PageHeader } from "@/components/page-header";
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
      <PageHeader title="My Album" description="Search, mark missing, and keep duplicate counts current." />
      <section className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Bulk input</CardTitle>
            <CardDescription>Accepts ARG-01, ARG 01, ARG01, arg-1, and comma lists.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={applyBulkInput} className="space-y-3">
              <Select name="mode" defaultValue="owned">
                <option value="owned">Add as owned</option>
                <option value="duplicates">Add as duplicates</option>
                <option value="missing">Mark as missing</option>
              </Select>
              <Textarea name="input" required placeholder="ARG-01, BRA 15, MEX22" />
              <Button type="submit">Apply valid codes</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3 md:grid-cols-3">
              <Input name="q" placeholder="Search code, team, name" defaultValue={params.q || ""} />
              <Select name="team" defaultValue={params.team || ""}>
                <option value="">All teams</option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </Select>
              <Select name="filter" defaultValue={params.filter || ""}>
                <option value="">All statuses</option>
                <option value="missing">Missing</option>
                <option value="duplicates">Duplicates</option>
                <option value="owned">Owned</option>
              </Select>
              <Button type="submit" variant="outline">Filter</Button>
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
                const status = quantity > 1 ? `${duplicateCount(quantity)} duplicate` : quantity === 1 ? "Owned" : wanted ? "Missing" : "Ignored";

                return (
                  <tr key={sticker.id}>
                    <Td className="font-semibold">{sticker.code}</Td>
                    <Td>{sticker.team}</Td>
                    <Td>{sticker.label}</Td>
                    <Td>{status}</Td>
                    <Td>
                      <form action={updateCollection} className="flex items-center gap-2">
                        <input type="hidden" name="stickerId" value={sticker.id} />
                        <Input className="w-20" name="quantity" type="number" min="0" max="999" defaultValue={quantity} />
                        <label className="flex items-center gap-2 text-xs text-muted-foreground">
                          <input name="wanted" type="checkbox" defaultChecked={wanted} />
                          wanted
                        </label>
                        <Button size="sm" variant="secondary" type="submit">Save</Button>
                      </form>
                    </Td>
                    <Td>{wanted ? "Yes" : "No"}</Td>
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

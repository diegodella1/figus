import { bulkImportStickers } from "@/app/actions/collection";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { OFFICIAL_SOURCES } from "@/lib/official-catalog";

export default function AdminPage() {
  return (
    <>
      <PageHeader title="Admin" description="Import the official checklist CSV when Panini/FIFA publish or update catalog details." />
      <Card>
        <CardHeader>
          <CardTitle>Catalog CSV import</CardTitle>
          <CardDescription>
            Columns: code, team, number, label, section, rarity, source_url. Source refs: {OFFICIAL_SOURCES.paniniCollection}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={bulkImportStickers} className="space-y-3">
            <Textarea name="csv" required placeholder="code,team,number,label,section,rarity,source_url&#10;ARG-01,Argentina,1,Official checklist name,Team,,https://..." />
            <Button>Import catalog</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

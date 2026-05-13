import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/lib/data";

export default async function TraderDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const profile = await getProfile(userId);

  return (
    <>
      <PageHeader title={profile?.display_name || "Trader"} description={profile?.team_area || "Collector profile"} />
      <Card>
        <CardContent className="grid gap-4 p-5 md:grid-cols-3">
          <div><div className="text-xs text-muted-foreground">Slack</div><div>{profile?.slack_handle || "-"}</div></div>
          <div><div className="text-xs text-muted-foreground">Phone</div><div>{profile?.phone || "-"}</div></div>
          <div><div className="text-xs text-muted-foreground">Contact</div><div>{profile?.contact_method || "-"}</div></div>
        </CardContent>
      </Card>
    </>
  );
}

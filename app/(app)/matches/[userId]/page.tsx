import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, getMatchesForUser, getProfile } from "@/lib/data";

export default async function MatchDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const user = await getCurrentUser();
  if (!user) return null;
  const { userId } = await params;
  const [profile, matches] = await Promise.all([getProfile(userId), getMatchesForUser(user.id)]);
  const match = matches.find((item) => item.userId === userId);

  return (
    <>
      <PageHeader title={profile?.display_name || "Trader"} description="Trade creation uses server-side validation and updates collections only on completion." />
      <Card>
        <CardHeader>
          <CardTitle>Swap shape</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div>
            <div className="text-xs text-muted-foreground">Can give you</div>
            <div className="font-display text-3xl">{match?.receiveCount || 0}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">You can give</div>
            <div className="font-display text-3xl">{match?.giveCount || 0}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Balanced</div>
            <div className="font-display text-3xl">{match?.balancedCount || 0}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Score</div>
            <div className="font-display text-3xl">{match?.score || 0}</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

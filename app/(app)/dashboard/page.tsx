import Link from "next/link";
import { ArrowRight, Gavel, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { getAlbumStats, getCurrentUser, getMatchesForUser, getOpenAuctions } from "@/lib/data";
import { percent } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [stats, matches, auctions] = await Promise.all([
    getAlbumStats(user.id),
    getMatchesForUser(user.id),
    getOpenAuctions(),
  ]);

  return (
    <>
      <PageHeader title="Dashboard" description="Fastest route from pile of stickers to useful swap." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Completion" value={`${percent(stats.owned, stats.total)}%`} detail={`${stats.owned}/${stats.total} owned`} />
        <StatCard label="Missing" value={stats.missing} detail="Wanted and not owned" />
        <StatCard label="Duplicates" value={stats.duplicates} detail="Tradable inventory" />
        <StatCard label="Open auctions" value={auctions.length} detail="Sticker-only offers" />
      </section>
      <section className="mt-6 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Best matches today</CardTitle>
            <CardDescription>Ranked by balanced swaps, incoming help, and outgoing help.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {matches.slice(0, 5).map((match) => (
              <Link
                key={match.userId}
                href={`/matches/${match.userId}`}
                className="flex items-center justify-between rounded-md border border-border p-3 transition hover:bg-muted"
              >
                <div>
                  <div className="font-semibold">{match.displayName}</div>
                  <div className="text-sm text-muted-foreground">
                    Can give you {match.receiveCount}; you can give {match.giveCount}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl">{match.score}</div>
                  <div className="text-xs text-muted-foreground">score</div>
                </div>
              </Link>
            ))}
            {!matches.length ? <p className="text-sm text-muted-foreground">No matches yet. Load missing and duplicate stickers.</p> : null}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Auction Desk</CardTitle>
            <CardDescription>Premium duplicates, sticker packages only.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/auctions">
                <Gavel className="h-4 w-4" />
                View auctions
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/trades">
                <Repeat2 className="h-4 w-4" />
                Review trades
              </Link>
            </Button>
            <Link href="/album" className="inline-flex items-center gap-2 text-sm text-primary">
              Update album <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

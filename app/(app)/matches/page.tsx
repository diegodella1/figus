import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { getCurrentUser, getMatchesForUser } from "@/lib/data";

export default async function MatchesPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const matches = await getMatchesForUser(user.id);

  return (
    <>
      <PageHeader title="Matches" description="Best Matches, People Who Can Help Me, People I Can Help, and Perfect Swaps use one score." />
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <thead>
              <tr>
                <Th>Trader</Th>
                <Th>Can give me</Th>
                <Th>I can give</Th>
                <Th>Balanced</Th>
                <Th>Score</Th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match.userId}>
                  <Td>
                    <Link className="font-semibold text-primary" href={`/matches/${match.userId}`}>
                      {match.displayName}
                    </Link>
                    <div className="text-xs text-muted-foreground">{match.teamArea}</div>
                  </Td>
                  <Td>{match.receiveCount}</Td>
                  <Td>{match.giveCount}</Td>
                  <Td>{match.balancedCount}</Td>
                  <Td>{match.score}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

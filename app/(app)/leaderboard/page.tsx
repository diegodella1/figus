import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { getCatalog, getProfiles } from "@/lib/data";

export default async function LeaderboardPage() {
  const [profiles, catalog] = await Promise.all([getProfiles(), getCatalog()]);
  return (
    <>
      <PageHeader title="Leaderboard" description="Completion rankings and office market pulse." />
      <Card>
        <CardContent className="p-0">
          <Table>
            <thead><tr><Th>Collector</Th><Th>Area</Th><Th>Catalog size</Th></tr></thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id}><Td>{profile.display_name}</Td><Td>{profile.team_area}</Td><Td>{catalog.length}</Td></tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

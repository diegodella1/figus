import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { getProfiles } from "@/lib/data";

export default async function TradersPage() {
  const profiles = await getProfiles();
  return (
    <>
      <PageHeader title="Traders" description="Internal collector directory." />
      <Card>
        <CardContent className="p-0">
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Area</Th>
                <Th>Contact</Th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <Td><Link className="font-semibold text-primary" href={`/traders/${profile.id}`}>{profile.display_name}</Link></Td>
                  <Td>{profile.team_area}</Td>
                  <Td>{profile.slack_handle || profile.contact_method}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

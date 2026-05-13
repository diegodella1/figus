import { updateProfile } from "@/app/actions/profile";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCurrentUser, getProfile } from "@/lib/data";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const profile = await getProfile(user.id);

  return (
    <>
      <PageHeader title="Settings" description="Profile details used by traders to find you in person." />
      <Card>
        <CardContent className="p-5">
          <form action={updateProfile} className="grid gap-3 md:grid-cols-2">
            <Input name="displayName" required defaultValue={profile?.display_name || ""} placeholder="Display name" />
            <Input name="teamArea" defaultValue={profile?.team_area || ""} placeholder="Team or area" />
            <Input name="slackHandle" defaultValue={profile?.slack_handle || ""} placeholder="Slack handle" />
            <Input name="phone" defaultValue={profile?.phone || ""} placeholder="Phone" />
            <Input name="contactMethod" defaultValue={profile?.contact_method || ""} placeholder="Contact method" />
            <Input name="avatarUrl" defaultValue={profile?.avatar_url || ""} placeholder="Avatar URL" />
            <Button className="md:col-span-2">Save profile</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

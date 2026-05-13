import { updateProfile } from "@/app/actions/profile";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        <CardHeader>
          <CardTitle>👤 Trader profile</CardTitle>
          <CardDescription>These details help coworkers identify and contact you for swaps.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateProfile} className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="display-name">Display name</label>
              <Input id="display-name" name="displayName" required defaultValue={profile?.display_name || ""} placeholder="Display name" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="team-area">Team / area</label>
              <Input id="team-area" name="teamArea" defaultValue={profile?.team_area || ""} placeholder="Office, team, floor..." />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="slack-handle">Slack</label>
              <Input id="slack-handle" name="slackHandle" defaultValue={profile?.slack_handle || ""} placeholder="@name" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="phone">Phone</label>
              <Input id="phone" name="phone" defaultValue={profile?.phone || ""} placeholder="+54..." />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="contact-method">Contact preference</label>
              <Input id="contact-method" name="contactMethod" defaultValue={profile?.contact_method || ""} placeholder="Slack preferred, desk, WhatsApp..." />
            </div>
            <div>
              <label className="mb-1 block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground" htmlFor="avatar-url">Avatar URL</label>
              <Input id="avatar-url" name="avatarUrl" defaultValue={profile?.avatar_url || ""} placeholder="https://..." />
            </div>
            <Button className="md:col-span-2">💾 Save profile</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

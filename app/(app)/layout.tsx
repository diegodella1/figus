import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getCurrentUser, getOrCreateProfile } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const profile = await getOrCreateProfile(user.id, user.email);
  return <AppShell profile={profile}>{children}</AppShell>;
}

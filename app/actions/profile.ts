"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profileSchema } from "@/lib/validation";
import { getCurrentUser } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = profileSchema.parse({
    displayName: formData.get("displayName"),
    teamArea: formData.get("teamArea"),
    contactMethod: formData.get("contactMethod"),
    slackHandle: formData.get("slackHandle"),
    phone: formData.get("phone"),
    avatarUrl: formData.get("avatarUrl"),
  });

  const supabase = await createClient();
  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    display_name: parsed.displayName,
    team_area: parsed.teamArea || null,
    contact_method: parsed.contactMethod || null,
    slack_handle: parsed.slackHandle || null,
    phone: parsed.phone || null,
    avatar_url: parsed.avatarUrl || null,
  });

  if (error) throw error;
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

"use server";

import { redirect } from "next/navigation";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";

const allowedEmailDomains = ["roxom.com", "roxom.tv"];

export async function signInWithMagicLink(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/login?error=Supabase%20environment%20variables%20are%20not%20configured");
  }

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const domain = email.split("@")[1] || "";

  if (!allowedEmailDomains.includes(domain)) {
    redirect("/login?error=Use%20a%20roxom.com%20or%20roxom.tv%20email");
  }

  const supabase = await createClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${appUrl}/auth/callback?next=/dashboard`,
    },
  });

  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/login?sent=1");
}

export async function signInOrRegisterWithPassword(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/login?error=Supabase%20environment%20variables%20are%20not%20configured");
  }

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const intent = String(formData.get("intent") || "signin");
  const domain = email.split("@")[1] || "";

  if (!allowedEmailDomains.includes(domain)) {
    redirect("/login?error=Use%20a%20roxom.com%20or%20roxom.tv%20email");
  }

  if (password.length < 8) {
    redirect("/login?error=Password%20must%20be%20at%20least%208%20characters");
  }

  const supabase = await createClient();
  const result =
    intent === "register"
      ? await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback?next=/dashboard`,
          },
        })
      : await supabase.auth.signInWithPassword({ email, password });

  if (result.error) redirect(`/login?error=${encodeURIComponent(result.error.message)}`);
  redirect("/dashboard");
}

export async function sendPasswordRecovery(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/login?error=Supabase%20environment%20variables%20are%20not%20configured");
  }

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const domain = email.split("@")[1] || "";

  if (!allowedEmailDomains.includes(domain)) {
    redirect("/login?error=Use%20a%20roxom.com%20or%20roxom.tv%20email");
  }

  const supabase = await createClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${appUrl}/reset-password`,
  });

  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/login?recovery=1");
}

export async function updatePassword(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/login?error=Supabase%20environment%20variables%20are%20not%20configured");
  }

  const password = String(formData.get("password") || "");
  if (password.length < 8) {
    redirect("/reset-password?error=Password%20must%20be%20at%20least%208%20characters");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect(`/reset-password?error=${encodeURIComponent(error.message)}`);
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

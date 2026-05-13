import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResetPasswordForm } from "@/components/reset-password-form";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string; error_description?: string }>;
}) {
  const params = await searchParams;
  if (params.code) {
    redirect(`/auth/callback?code=${encodeURIComponent(params.code)}&next=/reset-password`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl">Reset password</CardTitle>
          <CardDescription>Set a new password for your Roxom account.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm initialError={params.error_description || params.error} />
        </CardContent>
      </Card>
    </main>
  );
}

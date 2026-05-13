import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResetPasswordForm } from "@/components/reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl">Reset password</CardTitle>
          <CardDescription>Set a new password for your Roxom account.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm initialError={params.error} />
        </CardContent>
      </Card>
    </main>
  );
}

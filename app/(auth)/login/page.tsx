import { Lock, UserPlus } from "lucide-react";
import { sendPasswordRecovery, signInOrRegisterWithPassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string; recovery?: string }>;
}) {
  const params = await searchParams;
  const error =
    params.error && !params.error.toLowerCase().includes("magic link")
      ? params.error
      : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl">Figu OTC</CardTitle>
          <CardDescription>The unofficial office trading desk for completing the album.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signInOrRegisterWithPassword} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Roxom email
              </label>
              <Input id="email" name="email" type="email" required placeholder="you@roxom.com" />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <Input id="password" name="password" type="password" required minLength={8} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button name="intent" value="signin" className="w-full">
                <Lock className="h-4 w-4" />
                Sign in
              </Button>
              <Button name="intent" value="register" variant="outline" className="w-full">
                <UserPlus className="h-4 w-4" />
                Register
              </Button>
            </div>
            {params.recovery ? <p className="text-sm text-primary">Recovery email requested. Check your inbox.</p> : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </form>
          <form action={sendPasswordRecovery} className="mt-5 border-t border-border pt-5">
            <label htmlFor="recovery-email" className="mb-2 block text-sm font-medium">
              Recover password
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input id="recovery-email" name="email" type="email" required placeholder="you@roxom.com" />
              <Button variant="secondary" className="sm:w-40">
                Send reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

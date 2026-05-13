import { updatePassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ResetPasswordForm({ initialError }: { initialError?: string }) {
  return (
    <form action={updatePassword} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          New password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      <Button className="w-full">Update password</Button>
      {initialError ? <p className="text-sm text-destructive">{initialError}</p> : null}
    </form>
  );
}

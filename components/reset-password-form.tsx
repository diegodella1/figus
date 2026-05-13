"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ResetPasswordForm({ initialError }: { initialError?: string }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"checking" | "ready" | "saving" | "done" | "error">("checking");
  const [message, setMessage] = useState(initialError || "");

  useEffect(() => {
    const supabase = createClient();

    async function prepareSession() {
      const query = new URLSearchParams(window.location.search);
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const code = query.get("code");
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      const queryError =
        query.get("error_description") ||
        query.get("error") ||
        hash.get("error_description") ||
        hash.get("error");

      if (queryError) {
        setMessage(queryError);
        setStatus("error");
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        window.history.replaceState(null, "", window.location.pathname);

        if (error) {
          setMessage(error.message);
          setStatus("error");
          return;
        }
      }

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        window.history.replaceState(null, "", window.location.pathname);

        if (error) {
          setMessage(error.message);
          setStatus("error");
          return;
        }
      }

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setMessage("Recovery session missing or expired. Request a new recovery email.");
        setStatus("error");
        return;
      }

      setStatus("ready");
    }

    prepareSession();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
      setStatus("error");
      return;
    }

    setStatus("done");
    setMessage("Password updated. You can now sign in.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          New password
        </label>
        <Input
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
          minLength={8}
          disabled={status === "checking" || status === "saving" || status === "done"}
        />
      </div>
      <Button className="w-full" disabled={status === "checking" || status === "saving" || status === "done"}>
        {status === "saving" ? "Updating..." : "Update password"}
      </Button>
      {status === "checking" ? <p className="text-sm text-muted-foreground">Checking recovery session...</p> : null}
      {message ? (
        <p className={status === "done" ? "text-sm text-primary" : "text-sm text-destructive"}>{message}</p>
      ) : null}
    </form>
  );
}

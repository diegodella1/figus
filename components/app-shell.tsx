import Link from "next/link";
import { Album, BarChart3, Gavel, LayoutDashboard, Repeat2, Search, Settings, Shield, Users } from "lucide-react";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/album", label: "My Album", icon: Album },
  { href: "/matches", label: "Matches", icon: Search },
  { href: "/traders", label: "Traders", icon: Users },
  { href: "/trades", label: "Trades", icon: Repeat2 },
  { href: "/auctions", label: "Auction Desk", icon: Gavel },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ profile, children }: { profile: Profile; children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-border bg-background/92 p-4 backdrop-blur lg:block">
        <Link href="/dashboard" className="block">
          <div className="font-display text-3xl font-semibold">Figu OTC</div>
          <p className="mt-1 text-xs text-muted-foreground">Unofficial office trading desk</p>
        </Link>
        <nav className="mt-8 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          {profile.role === "admin" ? (
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          ) : null}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-border bg-background/80 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{profile.display_name}</div>
              <div className="text-xs text-muted-foreground">{profile.team_area || "Collector"}</div>
            </div>
            <div className={cn("rounded-md border border-primary/40 px-3 py-1 text-xs font-semibold text-primary")}>
              Internal only
            </div>
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8">{children}</main>
        <footer className="px-4 pb-8 text-xs text-muted-foreground lg:px-8">
          Internal use only. Not affiliated with Panini, FIFA, or any official tournament organization.
        </footer>
      </div>
    </div>
  );
}

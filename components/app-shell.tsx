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
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-primary/25 bg-background/88 p-4 backdrop-blur-xl lg:block">
        <Link href="/dashboard" className="sticker-edge matchday-card block border border-primary/25 bg-card/80 p-4 shadow-desk">
          <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">North America 2026</div>
          <div className="mt-3 font-display text-4xl font-black leading-none">Figu OTC</div>
          <p className="mt-2 text-xs text-muted-foreground">Sticker trading desk for matchday swaps</p>
          <div className="mt-4 grid grid-cols-3 gap-1" aria-hidden="true">
            <span className="h-1.5 bg-[hsl(var(--wc-red))]" />
            <span className="h-1.5 bg-[hsl(var(--wc-green))]" />
            <span className="h-1.5 bg-[hsl(var(--wc-blue))]" />
          </div>
        </Link>
        <nav className="mt-8 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
            >
              <item.icon className="h-4 w-4 transition group-hover:text-primary" />
              {item.label}
            </Link>
          ))}
          {profile.role === "admin" ? (
            <Link
              href="/admin"
              className="group flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
            >
              <Shield className="h-4 w-4 transition group-hover:text-primary" />
              Admin
            </Link>
          ) : null}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-primary/20 bg-background/78 px-4 py-3 backdrop-blur-xl lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{profile.display_name}</div>
              <div className="text-xs text-muted-foreground">{profile.team_area || "Collector"}</div>
            </div>
            <div className={cn("sticker-edge border border-primary/45 bg-primary/12 px-3 py-1 text-xs font-black uppercase text-primary")}>
              Internal 26
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

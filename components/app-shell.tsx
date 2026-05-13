import Link from "next/link";
import { Album, BarChart3, Gavel, LayoutDashboard, Repeat2, Search, Settings, Shield, Users } from "lucide-react";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", emoji: "🏟️", icon: LayoutDashboard },
  { href: "/album", label: "My Album", emoji: "📒", icon: Album },
  { href: "/matches", label: "Matches", emoji: "🤝", icon: Search },
  { href: "/traders", label: "Traders", emoji: "👥", icon: Users },
  { href: "/trades", label: "Trades", emoji: "🔁", icon: Repeat2 },
  { href: "/auctions", label: "Auction Desk", emoji: "🏷️", icon: Gavel },
  { href: "/leaderboard", label: "Leaderboard", emoji: "🏆", icon: BarChart3 },
  { href: "/settings", label: "Settings", emoji: "⚙️", icon: Settings },
];

export function AppShell({ profile, children }: { profile: Profile; children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-white/20 bg-background/88 p-4 backdrop-blur-xl lg:block">
        <Link href="/dashboard" className="sticker-edge matchday-card block border border-white/35 bg-[hsl(var(--wc-white))] p-4 text-card-foreground shadow-desk">
          <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">North America 2026</div>
          <div className="geo-26 mt-3 inline-block font-display text-4xl font-black leading-none">Figu OTC</div>
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
              className="group flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm text-white/72 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
            >
              <span className="w-5 text-base" aria-hidden="true">{item.emoji}</span>
              <item.icon className="h-4 w-4 transition group-hover:text-primary" />
              {item.label}
            </Link>
          ))}
          {profile.role === "admin" ? (
            <Link
              href="/admin"
              className="group flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm text-white/72 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
            >
              <span className="w-5 text-base" aria-hidden="true">🛡️</span>
              <Shield className="h-4 w-4 transition group-hover:text-primary" />
              Admin
            </Link>
          ) : null}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-white/15 bg-background/78 px-4 py-3 text-white backdrop-blur-xl lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{profile.display_name}</div>
              <div className="text-xs text-muted-foreground">{profile.team_area || "Collector"}</div>
            </div>
            <div className={cn("sticker-edge border border-white/35 bg-white/10 px-3 py-1 text-xs font-black uppercase text-white")}>
              Internal 26
            </div>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="sticker-edge flex min-w-fit items-center gap-2 border border-white/25 bg-white/10 px-3 py-2 text-xs font-bold text-white/85"
              >
                <span aria-hidden="true">{item.emoji}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="px-4 py-6 lg:px-8">{children}</main>
        <footer className="px-4 pb-8 text-xs text-muted-foreground lg:px-8">
          Internal use only. Not affiliated with Panini, FIFA, or any official tournament organization.
        </footer>
      </div>
    </div>
  );
}

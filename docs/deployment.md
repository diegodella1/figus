# Figu OTC Deployment

Hosted Supabase is the default database/auth target. Raspberry Pi hosts the Next.js app.

## Environment

Copy `.env.example` to `.env.local` for development or `.env` for production.

Required:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://figu-otc.local:3000
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.

## Supabase

Run migrations in order:

```bash
supabase db push
```

Catalog data is import-driven. Use Admin CSV import with official checklist data when published or updated.

CSV columns:

```csv
code,team,number,label,section,rarity,source_url
ARG-01,Argentina,1,Official checklist name,Argentina,,https://...
```

Official references tracked in code:

- Panini official album page: `https://www.paniniamerica.net/fifa-world-cup-2026-official-sticker-collection-album.html`
- FIFA qualified teams: `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/world-cup-2026-who-has-qualified`
- FIFA team profiles: `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams`

## Raspberry Pi

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git curl build-essential
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
pnpm build
pnpm start
```

## systemd

```ini
[Unit]
Description=Figu OTC Next.js App
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/figu-otc
ExecStart=/usr/bin/pnpm start
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

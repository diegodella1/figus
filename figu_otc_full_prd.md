# PRD — Figu OTC

**Product:** Figu OTC  
**Tagline:** The unofficial office trading desk for completing the album.  
**Stack:** Next.js App Router, TypeScript, Supabase, Tailwind, shadcn/ui  
**Deployment:** Raspberry Pi local network  
**Audience:** Internal office/community use  
**Document purpose:** This PRD is written so Codex can read it and execute the build in phases.

---

# 1. Product Summary

Figu OTC is an internal web app for helping an office/community complete a World Cup sticker album through structured swaps.

Users register, load the stickers they have, mark their duplicates, mark the stickers they are missing, and then the system shows the best people to trade with.

The app should feel like a lightweight internal trading desk for figuritas:

- simple
- fast
- useful
- social
- a little playful
- not childish
- not a public marketplace
- not money-based

Core product idea:

> “I load what I have and what I need. The system tells me who I should trade with.”

Secondary product idea:

> “If I have a premium duplicate, I can list it on Auction Desk and let others offer packages of stickers I actually need.”

---

# 2. Product Name and Brand

## 2.1 Visible name

**Figu OTC**

## 2.2 Tagline

**The unofficial office trading desk for completing the album.**

## 2.3 Footer disclaimer

Use this in the footer and/or About page:

> Internal use only. Not affiliated with Panini, FIFA, or any official tournament organization.

## 2.4 Brand guardrails

Do not use:

- Panini logo
- FIFA logo
- World Cup logo
- official tournament visual identity
- official sticker scans by default
- official album artwork

Use neutral internal terminology:

- Sticker
- Album
- Team
- Country
- Collection
- Duplicate
- Missing
- Swap
- Trade
- Auction Desk
- Bid
- Offer

Avoid:

- official branding
- public marketplace behavior
- money
- payments
- pricing
- gambling language

---

# 3. Product Goals

Build a private internal web app where users can:

1. Register/login.
2. Create a profile.
3. Load their sticker collection.
4. Mark duplicate stickers.
5. Mark missing stickers.
6. See who has the stickers they need.
7. See who needs the stickers they have.
8. Discover best possible swaps.
9. Create and complete trades.
10. Track completed trades.
11. See rankings and office market stats.
12. List premium duplicates in Auction Desk.
13. Bid on auctions using sticker packages, not money.
14. Accept an auction bid and settle it as a trade.

---

# 4. Product Principles

## 4.1 Fast over perfect

Users should be able to update their sticker list in less than 60 seconds.

## 4.2 Matching is the core

The main value is not a beautiful album UI.  
The main value is:

> “Who can help me, and who can I help?”

## 4.3 Office-first

This is for internal, real-world, in-person swaps.  
No need to build heavy messaging or marketplace features.

## 4.4 No money

There are no prices, payments, credits, fiat values, crypto values, auctions with money, or payment integrations.

## 4.5 Utility over value

A “good trade” is one that helps people complete the album.

## 4.6 Human choice

The app suggests matches and ranks offers, but users decide.

## 4.7 Simple first

Build the MVP first:

```txt
load stickers → find matches → create trade → complete trade
```

Then add:

```txt
Auction Desk → bid with stickers → accept best offer → settle trade
```

---

# 5. Target Users

## 5.1 Regular office collector

Someone casually completing the album and looking for missing stickers.

## 5.2 Power collector

Someone with many duplicates who wants to trade actively.

## 5.3 Auction seller

Someone with a premium duplicate, such as Messi or a rare internal sticker, who wants to receive better offers.

## 5.4 Bidder

Someone who wants a premium sticker and can offer several useful duplicates.

## 5.5 Admin

Someone who manages the catalog, users, and system.

---

# 6. MVP Scope

The base MVP includes:

1. Authentication.
2. User profiles.
3. Sticker catalog.
4. Admin CSV catalog import.
5. My Album screen.
6. Bulk sticker input.
7. Quantity-based collection management.
8. Duplicate calculation.
9. Missing sticker calculation.
10. Matchmaking engine.
11. Best Matches screen.
12. Traders directory.
13. User profile view.
14. Trade creation.
15. Trade completion.
16. Basic leaderboards.
17. Dashboard.
18. Raspberry Pi deployment.

Auction Desk V1.5 includes:

1. Create auction for one duplicate sticker.
2. Create auction for a lot of duplicate stickers.
3. Optional title.
4. Optional description.
5. Optional wishlist.
6. Optional expiration date/time.
7. Browse open auctions.
8. Auction detail page.
9. Suggested bid builder.
10. Submit bid using multiple duplicate stickers.
11. Edit active bid.
12. Withdraw active bid.
13. Seller compares bids.
14. Seller accepts one bid.
15. Accepted bid settles atomically as a trade.
16. Other bids are rejected.
17. Invalid bids are detected.
18. My Auctions.
19. My Bids.
20. Auction summary in dashboard.

---

# 7. Out of Scope

Do not build in MVP:

- payments
- money bids
- sticker pricing
- public marketplace
- chat
- push notifications
- mobile native app
- OCR/camera scanning
- AI sticker recognition
- QR trading
- complex reputation scoring
- multi-office support
- public SEO pages
- official branding
- real-time bidding wars
- “you have been outbid” alerts
- sealed bidding
- anonymous bidding
- AI valuation
- external rarity data
- three-way trade settlement

---

# 8. Tech Stack

## 8.1 Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Recharts, optional for charts/leaderboards

## 8.2 Backend

- Supabase Auth
- Supabase Postgres
- Supabase Row Level Security
- Supabase RPC functions for critical atomic mutations
- Server Actions or API routes for app-level mutations

## 8.3 Deployment

Recommended:

- Next.js app running locally on Raspberry Pi
- Supabase hosted project for database/auth

Alternative:

- Next.js app + local Supabase Docker stack on Raspberry Pi

For MVP, prefer:

> Raspberry Pi for app hosting + hosted Supabase for stability.

---

# 9. Raspberry Pi Deployment

## 9.1 Local URL

Possible local app URLs:

```txt
http://figu-otc.local:3000
```

or:

```txt
http://<raspberry-pi-local-ip>:3000
```

## 9.2 Install dependencies

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git curl build-essential
```

## 9.3 Install Node.js LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

## 9.4 Install pnpm

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

## 9.5 Clone and run

```bash
git clone <repo-url> figu-otc
cd figu-otc
pnpm install
pnpm build
pnpm start
```

## 9.6 Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_NAME=Figu OTC
NEXT_PUBLIC_APP_TAGLINE=The unofficial office trading desk for completing the album.
NEXT_PUBLIC_APP_URL=http://figu-otc.local:3000
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

## 9.7 systemd service

Create:

```bash
sudo nano /etc/systemd/system/figu-otc.service
```

Service:

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

Enable:

```bash
sudo systemctl daemon-reload
sudo systemctl enable figu-otc
sudo systemctl start figu-otc
```

Logs:

```bash
journalctl -u figu-otc -f
```

---

# 10. Information Architecture

Main navigation:

1. Dashboard
2. My Album
3. Matches
4. Traders
5. Trades
6. Auction Desk
7. Leaderboard
8. Settings
9. Admin, only admins

Auction Desk navigation:

1. Open Auctions
2. Create Auction
3. My Auctions
4. My Bids

---

# 11. Core UX Screens

## 11.1 Login

Purpose:

Allow internal users to access the app.

Recommended auth:

- Supabase email magic link
- optional Google OAuth

Acceptance criteria:

- User can login.
- Unauthenticated users cannot access app pages.
- New users are redirected to profile setup.

---

## 11.2 Profile Setup

Fields:

- Display name, required
- Team/area, optional
- Contact method, optional
- Slack handle, optional
- Phone, optional
- Avatar URL, optional

Acceptance criteria:

- User cannot proceed without display name.
- User can edit profile later.

---

## 11.3 Dashboard

Purpose:

Give the user the fastest possible next action.

Sections:

```txt
Welcome, Diego
Album completion: 42%
Missing: 568
Duplicates: 86
Available matches: 12
Open auctions: 8
Your active bids: 3
```

Sections:

- Best matches today
- Quick actions
- Office market pulse
- Auction Desk summary
- High-demand duplicates suggestion

Best match card:

```txt
Gaston
Can give you: 8 stickers
You can give him: 5 stickers
Match quality: Strong
CTA: View swap
```

Auction card:

```txt
Auction Desk
Open auctions: 8
Your active bids: 3
Your open auctions: 1
CTA: View auctions
```

Acceptance criteria:

- Dashboard loads user stats.
- Dashboard shows next useful actions.
- Dashboard includes best matches and auction summaries.

---

## 11.4 My Album

Purpose:

Manage user collection.

Views:

- by team/country
- by code
- missing only
- duplicates only
- owned only

Each sticker shows:

- code
- team/country
- number
- label
- quantity owned
- derived status

Status rules:

```txt
quantity = 0 and wanted = true  -> missing
quantity = 1                   -> owned
quantity > 1                   -> owned with duplicates
duplicate_count                -> quantity - 1
wanted = false                 -> ignored/not collecting
```

Acceptance criteria:

- User can search sticker by code.
- User can filter by team.
- User can increment/decrement quantity.
- User can mark as missing.
- User can mark as owned.
- User can add duplicate quantity.

---

## 11.5 Bulk Input

Purpose:

Make data entry fast.

Input example:

```txt
ARG-01, ARG-02, BRA-15, MEX-22
```

Accept formats:

```txt
ARG-01
ARG 01
ARG01
arg-1
ARG, 1
BRA-15, MEX-22, USA-03
```

Normalize to:

```txt
ARG-01
BRA-15
MEX-22
USA-03
```

Modes:

1. Add as owned.
2. Add as duplicates.
3. Mark as missing.
4. Replace full collection, optional later.

Validation:

- Check code exists in catalog.
- Show invalid codes.
- Allow user to confirm valid codes and ignore invalid.

Preview:

```txt
Valid stickers: 18
Invalid stickers: 2

Invalid:
ARG-999
MESSI-01
```

Acceptance criteria:

- User can paste many codes.
- System normalizes codes.
- System validates against catalog.
- System saves valid entries.
- System reports invalid entries.

---

# 12. Base Matching Engine

## 12.1 Definitions

For current user A and another user B:

```txt
stickers_b_can_give_a = B duplicates ∩ A missing
stickers_a_can_give_b = A duplicates ∩ B missing
```

## 12.2 Counts

```txt
receive_count = count(stickers_b_can_give_a)
give_count = count(stickers_a_can_give_b)
balanced_count = min(receive_count, give_count)
```

## 12.3 Match type

```txt
if receive_count > 0 and give_count > 0:
  type = "perfect"
elif receive_count > 0 and give_count == 0:
  type = "they_can_help_me"
elif receive_count == 0 and give_count > 0:
  type = "i_can_help_them"
else:
  type = "none"
```

## 12.4 Match score

Simple MVP formula:

```txt
score = (balanced_count * 10) + (receive_count * 3) + (give_count * 2)
```

Perfect swaps should rank above one-way swaps.

## 12.5 Match quality labels

```txt
receive_count >= 10 and give_count >= 5 = Excellent
receive_count >= 5 and give_count >= 3 = Strong
receive_count >= 2 and give_count >= 1 = Good
receive_count >= 1 = Possible
```

---

# 13. Matches Screen

Tabs:

1. Best Matches
2. People Who Can Help Me
3. People I Can Help
4. Perfect Swaps

Match card:

```txt
Gaston
He has 8 stickers you need
You have 5 stickers he needs
Match quality: Strong
Potential swap size: 5-for-5
Extra possible asks: 3
CTA: Create trade
```

Acceptance criteria:

- Matches exclude current user.
- Matches only use duplicates as available supply.
- Matches only use missing stickers as demand.
- Users with no useful overlap are hidden.
- Matches are ordered by usefulness.

---

# 14. Trades

## 14.1 Trade statuses

For MVP:

```txt
proposed
completed
cancelled
```

## 14.2 Trade creation

Fields:

- requester_user_id
- counterparty_user_id
- requester gives sticker IDs
- requester receives sticker IDs
- status
- notes, optional

Do not update collections until trade is completed.

## 14.3 Trade completion

When completed:

Requester:

- decrease quantity by 1 for each sticker given
- increase quantity by 1 for each sticker received

Counterparty:

- decrease quantity by 1 for each sticker given
- increase quantity by 1 for each sticker received

Important:

- Must run atomically.
- Must validate both users still have duplicate availability.
- Use Postgres RPC or server-side transaction.

---

# 15. Auction Desk

## 15.1 Feature summary

Auction Desk lets a user list a valuable duplicate sticker or lot of stickers and receive offers from other users.

Offers are not money.  
Offers are packages of stickers.

Example:

Seller lists:

```txt
ARG-10 — Messi
```

Bids:

```txt
Gaston offers: FRA-03, BRA-11, USA-07
Ana offers: POR-04, MEX-09, GER-12, ENG-02
Javi offers: BRA-01, ESP-15
```

Seller can compare offers and accept the one that helps them most.

---

## 15.2 Auction principles

- Sticker-for-sticker only.
- No money.
- No pricing.
- No points.
- No credits.
- Best bid is based on usefulness.
- Seller always chooses manually.
- No real-time bidding wars in MVP.

---

## 15.3 Auction user stories

Seller:

- As a user, I want to list a duplicate sticker for auction.
- As a user, I want to list multiple duplicate stickers as a lot.
- As a user, I want to define what kind of stickers I want.
- As a user, I want to set an optional end date/time.
- As a user, I want to see bids sorted by usefulness.
- As a user, I want to accept the bid that helps me most.
- As a user, I want accepted bid to settle as a trade.

Bidder:

- As a user, I want to browse open auctions.
- As a user, I want to see auctions where I can make useful offers.
- As a user, I want the app to suggest which of my duplicates the seller needs.
- As a user, I want to submit a bid using multiple stickers.
- As a user, I want to edit or withdraw my bid while open.
- As a user, I want to know my bid status.

Admin:

- As an admin, I want to see all auctions.
- As an admin, I want to cancel problematic auctions.
- As an admin, I want to monitor auction activity.

---

## 15.4 Auction statuses

```txt
draft
open
accepted
cancelled
expired
```

MVP can skip draft.

Valid transitions:

```txt
draft -> open
open -> accepted
open -> cancelled
open -> expired
```

Once accepted, cancelled, or expired, auction cannot receive new bids.

---

## 15.5 Bid statuses

```txt
active
accepted
rejected
withdrawn
invalid
```

Valid transitions:

```txt
active -> accepted
active -> rejected
active -> withdrawn
active -> invalid
```

When one bid is accepted:

- accepted bid becomes accepted
- other active bids become rejected
- auction becomes accepted

---

## 15.6 Auction creation rules

A user can only auction stickers where:

```txt
quantity > 1
```

For a lot, every sticker in the lot must have duplicate availability.

If user has quantity 3, they own 1 and have 2 duplicates available.

---

## 15.7 Bid creation rules

A bidder can only offer stickers where:

```txt
quantity > 1
```

Bidder cannot bid on their own auction.

Bidder cannot offer more copies than duplicate availability.

Example:

If bidder has quantity 3 for BRA-01:

- 1 copy is owned
- 2 copies are duplicates
- bidder may offer up to 2 copies

---

## 15.8 Reservation rules

MVP:

Do not reserve stickers when listed or bid.

Instead:

- validate availability at listing time
- validate availability at bid time
- revalidate availability at accept time
- mark stale bids invalid

Optional V2:

- add reservation/commitment logic

---

## 15.9 Expiration rules

If auction has `ends_at` and current time is past `ends_at`:

- users cannot submit new bids
- auction displays as expired

Recommended office-use rule:

> Expiration stops new bids but does not block seller from accepting existing active valid bids.

Strict alternative:

> Seller cannot accept after expiration.

For MVP, use the office-use rule.

---

# 16. Bid Scoring

Bid score helps seller compare offers.

The score is advisory only.

## 16.1 Formula

For seller S and bid B:

```txt
score =
  useful_missing_count * 10
+ wishlist_match_count * 15
+ team_completion_bonus
+ low_supply_bonus
+ high_demand_bonus
```

## 16.2 Definitions

### useful_missing_count

Number of bid stickers the seller is missing.

```txt
bid stickers ∩ seller missing stickers
```

### wishlist_match_count

Number of bid stickers that match seller wishlist.

For MVP:

- if wishlist contains specific sticker codes, count exact matches
- if wishlist is only free text, ignore for scoring

### team_completion_bonus

```txt
If bid completes a team for seller:
  +25
If bid brings seller within 1 sticker of completing a team:
  +10
```

### low_supply_bonus

```txt
If total office duplicate supply for that sticker <= 1:
  +5 per sticker
```

### high_demand_bonus

```txt
If 5 or more users are missing this sticker:
  +3 per sticker
If 10 or more users are missing this sticker:
  +6 per sticker
```

## 16.3 Score labels

```txt
score >= 80  -> Excellent offer
score >= 50  -> Strong offer
score >= 25  -> Useful offer
score > 0    -> Possible offer
score = 0    -> Not useful for your album
```

## 16.4 Bid card copy

Do not show only a number.

Example:

```txt
Strong offer

Ana gives you 5 stickers you are missing.
This bid helps you complete Brazil.
It includes 1 sticker with low office supply.
```

---

# 17. Auction Screens

## 17.1 Auction Desk Home

Route:

```txt
/auctions
```

Purpose:

Show open auctions.

Sections:

- header
- create auction button
- filters
- open auction cards
- my active bids summary

Header copy:

```txt
Auction Desk
List premium duplicates and let the office bid with stickers you actually need.
```

Filters:

- all open auctions
- auctions I can bid on
- auctions where I have useful stickers
- ending soon
- my auctions
- my bids

Auction card:

```txt
Messi duplicate on the desk

Seller:
Diego

Lot:
ARG-10

Current bids:
4

Best current offer:
5 stickers seller needs

Ends:
Friday 17:00

CTA:
View auction
```

Acceptance criteria:

- User sees open auctions.
- User cannot bid on own auction.
- User can quickly see if they can make a useful bid.

---

## 17.2 Create Auction

Route:

```txt
/auctions/new
```

Fields:

- title, optional
- description, optional
- select stickers from my duplicates
- quantity per sticker
- wishlist text, optional
- wishlist sticker codes, optional
- ends at, optional

Sticker selector only shows stickers where user has duplicates.

Validation:

- at least one auction item
- quantity cannot exceed duplicate availability
- end time must be future if provided

CTA:

```txt
Create auction
```

Acceptance criteria:

- User can create single sticker auction.
- User can create lot auction.
- User cannot list stickers without duplicates.
- User cannot list more copies than available.
- New auction appears in open auctions.

---

## 17.3 Auction Detail

Route:

```txt
/auctions/[auctionId]
```

Sections:

1. auction header
2. seller info
3. lot items
4. wishlist
5. bid panel
6. existing bids
7. seller controls, if current user is seller

Header:

```txt
Messi duplicate on the desk

Status:
Open

Seller:
Diego

Ends:
Friday 17:00
```

Lot:

```txt
Seller gives:
ARG-10 — Argentina #10
```

Bid panel for non-seller:

```txt
Make an offer

Suggested from your duplicates:
BRA-03 — seller needs it
FRA-11 — seller needs it
POR-08 — seller needs it
MEX-04 — seller needs it
```

Existing bids:

```txt
Ana offers 4 useful stickers
Score: 58 — Strong offer
Status: Valid
```

Seller controls:

- accept bid
- cancel auction
- edit auction, optional

Acceptance criteria:

- Seller can see all bids.
- Bidder can submit/edit/withdraw own bid.
- Seller can accept valid bid.
- Invalid bids are clearly marked.

---

## 17.4 My Auctions

Route:

```txt
/auctions/mine
```

Shows:

- open auctions
- accepted auctions
- cancelled auctions
- expired auctions

Card:

```txt
ARG-10 Messi
Status: Open
Bids: 6
Best offer: 5 missing stickers
CTA: Review bids
```

---

## 17.5 My Bids

Route:

```txt
/auctions/bids
```

Shows bids by current user.

Statuses:

- active
- accepted
- rejected
- withdrawn
- invalid

Card:

```txt
Auction:
Messi duplicate on the desk

Your offer:
BRA-03, FRA-11, POR-08

Status:
Active

CTA:
Edit bid / Withdraw bid
```

---

# 18. Bid Builder UX

Bid builder should show three groups.

## 18.1 Best stickers to offer

These are bidder duplicates that seller is missing.

```txt
Best to offer
BRA-03 — seller needs this
FRA-11 — seller needs this
POR-08 — seller needs this
```

## 18.2 Wishlist matches

These match seller wishlist.

```txt
Wishlist matches
BRA-01 — requested by seller
```

## 18.3 Other duplicates

Other bidder duplicates.

```txt
Other duplicates
JPN-04
USA-19
GER-22
```

Default sort:

1. wishlist exact matches
2. seller missing stickers
3. low supply / high demand stickers
4. other duplicates

Acceptance criteria:

- Bidder can build offer quickly.
- Suggested options are personalized.
- Bidder understands why a sticker is suggested.

---

# 19. Database Schema

Existing base tables:

- profiles
- stickers
- user_stickers
- trades
- trade_items

---

## 19.1 profiles

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  team text,
  contact_method text,
  slack_handle text,
  phone text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

---

## 19.2 stickers

```sql
create table public.stickers (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  team_code text not null,
  team_name text not null,
  sticker_number integer not null,
  label text,
  category text not null default 'player',
  created_at timestamptz not null default now()
);
```

Categories:

```txt
player
badge
team_photo
special
extra
other
```

---

## 19.3 user_stickers

```sql
create table public.user_stickers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  sticker_id uuid not null references public.stickers(id) on delete cascade,
  quantity integer not null default 0 check (quantity >= 0),
  wanted boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, sticker_id)
);
```

Derived values:

```txt
is_missing = wanted = true and quantity = 0
duplicate_count = greatest(quantity - 1, 0)
```

---

## 19.4 trades

```sql
create table public.trades (
  id uuid primary key default gen_random_uuid(),
  requester_user_id uuid not null references public.profiles(id),
  counterparty_user_id uuid not null references public.profiles(id),
  status text not null default 'proposed' check (status in ('proposed', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  cancelled_at timestamptz
);
```

---

## 19.5 trade_items

```sql
create table public.trade_items (
  id uuid primary key default gen_random_uuid(),
  trade_id uuid not null references public.trades(id) on delete cascade,
  sticker_id uuid not null references public.stickers(id),
  from_user_id uuid not null references public.profiles(id),
  to_user_id uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);
```

---

## 19.6 auction_listings

```sql
create table public.auction_listings (
  id uuid primary key default gen_random_uuid(),

  seller_user_id uuid not null references public.profiles(id) on delete cascade,

  title text,
  description text,
  wishlist_text text,

  status text not null default 'open'
    check (status in ('draft', 'open', 'accepted', 'cancelled', 'expired')),

  ends_at timestamptz,

  accepted_bid_id uuid,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  accepted_at timestamptz,
  cancelled_at timestamptz,
  expired_at timestamptz
);
```

---

## 19.7 auction_listing_items

```sql
create table public.auction_listing_items (
  id uuid primary key default gen_random_uuid(),

  auction_id uuid not null references public.auction_listings(id) on delete cascade,
  sticker_id uuid not null references public.stickers(id) on delete restrict,

  quantity integer not null default 1 check (quantity > 0),

  created_at timestamptz not null default now(),

  unique (auction_id, sticker_id)
);
```

---

## 19.8 auction_wishlist_items

```sql
create table public.auction_wishlist_items (
  id uuid primary key default gen_random_uuid(),

  auction_id uuid not null references public.auction_listings(id) on delete cascade,
  sticker_id uuid not null references public.stickers(id) on delete cascade,

  priority integer not null default 1 check (priority >= 1 and priority <= 5),

  created_at timestamptz not null default now(),

  unique (auction_id, sticker_id)
);
```

---

## 19.9 auction_bids

```sql
create table public.auction_bids (
  id uuid primary key default gen_random_uuid(),

  auction_id uuid not null references public.auction_listings(id) on delete cascade,
  bidder_user_id uuid not null references public.profiles(id) on delete cascade,

  status text not null default 'active'
    check (status in ('active', 'accepted', 'rejected', 'withdrawn', 'invalid')),

  note text,

  computed_score integer not null default 0,
  computed_label text,
  computed_summary text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  accepted_at timestamptz,
  withdrawn_at timestamptz,
  rejected_at timestamptz,

  unique (auction_id, bidder_user_id)
);
```

MVP rule:

One active bid per user per auction.

If user edits bid, update the existing bid and replace bid items.

---

## 19.10 auction_bid_items

```sql
create table public.auction_bid_items (
  id uuid primary key default gen_random_uuid(),

  bid_id uuid not null references public.auction_bids(id) on delete cascade,
  sticker_id uuid not null references public.stickers(id) on delete restrict,

  quantity integer not null default 1 check (quantity > 0),

  created_at timestamptz not null default now(),

  unique (bid_id, sticker_id)
);
```

---

## 19.11 accepted bid foreign key

```sql
alter table public.auction_listings
add constraint auction_listings_accepted_bid_fk
foreign key (accepted_bid_id)
references public.auction_bids(id)
on delete set null;
```

---

# 20. Indexes

```sql
create index idx_user_stickers_user_id on public.user_stickers(user_id);
create index idx_user_stickers_sticker_id on public.user_stickers(sticker_id);
create index idx_user_stickers_quantity on public.user_stickers(quantity);
create index idx_stickers_code on public.stickers(code);
create index idx_trades_requester on public.trades(requester_user_id);
create index idx_trades_counterparty on public.trades(counterparty_user_id);

create index idx_auction_listings_seller
on public.auction_listings(seller_user_id);

create index idx_auction_listings_status
on public.auction_listings(status);

create index idx_auction_listings_ends_at
on public.auction_listings(ends_at);

create index idx_auction_listing_items_auction
on public.auction_listing_items(auction_id);

create index idx_auction_listing_items_sticker
on public.auction_listing_items(sticker_id);

create index idx_auction_bids_auction
on public.auction_bids(auction_id);

create index idx_auction_bids_bidder
on public.auction_bids(bidder_user_id);

create index idx_auction_bids_status
on public.auction_bids(status);

create index idx_auction_bid_items_bid
on public.auction_bid_items(bid_id);

create index idx_auction_bid_items_sticker
on public.auction_bid_items(sticker_id);
```

---

# 21. Useful Views

## 21.1 user_duplicate_stickers

```sql
create or replace view public.user_duplicate_stickers as
select
  us.user_id,
  us.sticker_id,
  s.code,
  s.team_code,
  s.team_name,
  s.sticker_number,
  s.label,
  greatest(us.quantity - 1, 0) as duplicate_count
from public.user_stickers us
join public.stickers s on s.id = us.sticker_id
where us.quantity > 1;
```

## 21.2 user_missing_stickers

```sql
create or replace view public.user_missing_stickers as
select
  us.user_id,
  us.sticker_id,
  s.code,
  s.team_code,
  s.team_name,
  s.sticker_number,
  s.label
from public.user_stickers us
join public.stickers s on s.id = us.sticker_id
where us.quantity = 0
and us.wanted = true;
```

Note:

For MVP, either create user_stickers rows for every sticker/user combination, or treat absence as quantity 0. Treating absence as missing is more efficient but makes queries more complex.

Recommended for simplicity:

> Treat absence as missing with left joins, or materialize rows on catalog import.

---

# 22. RLS Requirements

Enable RLS on all tables.

## 22.1 profiles

- authenticated users can read all profiles
- users can update own profile
- admins can update all profiles

## 22.2 stickers

- authenticated users can read stickers
- admins can insert/update/delete stickers

## 22.3 user_stickers

- authenticated users can read all user sticker data
- users can update only own collection
- admins can update any collection

## 22.4 trades

- users can read trades where they are requester or counterparty
- admins can read all trades
- users can create trades where requester_user_id = auth.uid()
- users can complete/cancel trades where they are requester or counterparty

## 22.5 trade_items

- users can read trade items for trades they are part of
- users can create trade items for trades they created
- users cannot edit completed trade items

## 22.6 auction_listings

- authenticated users can read listings
- seller can create listing where seller_user_id = auth.uid()
- seller can update/cancel own open listing
- admins can update all listings

## 22.7 auction_listing_items

- authenticated users can read listing items
- seller can insert/update/delete items for own auction while open
- admins can manage all

## 22.8 auction_wishlist_items

- authenticated users can read wishlist items
- seller can insert/update/delete wishlist items for own auction while open
- admins can manage all

## 22.9 auction_bids

Recommended MVP transparency:

- authenticated users can read all bids
- bidder can create bid where bidder_user_id = auth.uid()
- bidder can update/withdraw own active bid
- seller can accept/reject bids on own auction
- admins can manage all

Alternative privacy option:

- seller sees all bids on their auctions
- bidder sees own bids
- other users see bid count only

For MVP, use transparent internal version.

## 22.10 auction_bid_items

- authenticated users can read bid items
- bidder can insert/update/delete bid items for own active bid
- admins can manage all

---

# 23. Critical RPC Functions

## 23.1 complete_trade

Purpose:

Complete a normal trade atomically.

Validates:

1. Trade exists.
2. Caller is requester or counterparty.
3. Trade status is proposed.
4. Each from_user has duplicate availability.
5. Then updates both collections.
6. Marks trade completed.

---

## 23.2 accept_auction_bid

This is the most important auction function.

Inputs:

```txt
auction_id_input uuid
bid_id_input uuid
```

Validates:

1. Caller is seller of auction or admin.
2. Auction exists.
3. Auction status is open.
4. Bid exists.
5. Bid belongs to auction.
6. Bid status is active.
7. Seller still has duplicate availability for all listing items.
8. Bidder still has duplicate availability for all bid items.
9. Bidder is not seller.

Transaction:

1. Create trade record.
2. Create trade_items:
   - Seller gives auction listing items to bidder.
   - Bidder gives bid items to seller.
3. Decrement seller quantities for listing items.
4. Increment bidder quantities for listing items.
5. Decrement bidder quantities for bid items.
6. Increment seller quantities for bid items.
7. Mark trade completed.
8. Mark auction accepted.
9. Mark accepted bid accepted.
10. Mark other active bids rejected.
11. Store accepted_bid_id.
12. Commit transaction.

If any validation fails:

- update nothing
- return clear error
- optionally mark stale bid invalid

Pseudo:

```sql
create or replace function public.accept_auction_bid(
  auction_id_input uuid,
  bid_id_input uuid
)
returns uuid
language plpgsql
security definer
as $$
declare
  created_trade_id uuid;
begin
  -- validate caller
  -- validate auction
  -- validate bid
  -- validate sticker availability
  -- create trade
  -- create trade items
  -- update user_stickers quantities
  -- update auction and bids
  -- return created_trade_id
end;
$$;
```

Return:

```txt
created_trade_id
```

---

## 23.3 submit_auction_bid

Can be server action or RPC.

Validates:

- auction exists
- auction status is open
- bidder is not seller
- auction has not expired for new bids
- offered stickers exist
- bidder has duplicate quantity available
- offered quantities do not exceed duplicate availability
- bid has at least one item

Then:

- if bidder already has active bid, replace bid items
- recompute score
- save computed score/label/summary

---

## 23.4 withdraw_auction_bid

Validates:

- caller is bidder
- bid is active
- auction is open

Then:

- mark bid withdrawn
- do not delete bid

---

## 23.5 cancel_auction

Validates:

- caller is seller or admin
- auction status is open

Then:

- mark auction cancelled
- mark active bids rejected

---

## 23.6 expire_auctions

Find auctions where:

```txt
status = 'open'
and ends_at is not null
and ends_at < now()
```

Set:

```txt
status = 'expired'
expired_at = now()
```

For MVP, UI can also treat auctions as expired if `ends_at < now()` even before status update.

---

# 24. Suggested File Structure

```txt
/app
  /(auth)
    /login
      page.tsx
  /(app)
    /dashboard
      page.tsx
    /album
      page.tsx
    /matches
      page.tsx
      /[userId]
        page.tsx
    /traders
      page.tsx
      /[userId]
        page.tsx
    /trades
      page.tsx
      /[tradeId]
        page.tsx
    /auctions
      page.tsx
      /new
        page.tsx
      /mine
        page.tsx
      /bids
        page.tsx
      /[auctionId]
        page.tsx
    /leaderboard
      page.tsx
    /settings
      page.tsx
    /admin
      page.tsx

/components
  /auth
    LoginForm.tsx
  /dashboard
    StatCard.tsx
    BestMatches.tsx
    MarketPulse.tsx
    AuctionSummaryCard.tsx
  /album
    StickerGrid.tsx
    StickerRow.tsx
    StickerQuantityControl.tsx
    BulkInputModal.tsx
    TeamFilter.tsx
  /matches
    MatchCard.tsx
    MatchDetail.tsx
    SwapBuilder.tsx
  /trades
    TradeCard.tsx
    TradeStatusBadge.tsx
  /auctions
    AuctionCard.tsx
    AuctionStatusBadge.tsx
    CreateAuctionForm.tsx
    AuctionItemSelector.tsx
    WishlistInput.tsx
    BidBuilder.tsx
    BidCard.tsx
    BidScoreBadge.tsx
    AuctionSellerControls.tsx
    MyAuctionsList.tsx
    MyBidsList.tsx
  /leaderboard
    CompletionRanking.tsx
    HelpfulTradersRanking.tsx
    MarketTable.tsx
  /admin
    CatalogImport.tsx

/lib
  /supabase
    client.ts
    server.ts
  /stickers
    parser.ts
    queries.ts
    mutations.ts
  /matches
    scoring.ts
    queries.ts
  /trades
    mutations.ts
    validation.ts
  /auctions
    types.ts
    queries.ts
    mutations.ts
    scoring.ts
    validation.ts

/supabase
  /migrations
    0001_base_schema.sql
    0002_auction_desk.sql
```

---

# 25. TypeScript Types

```ts
export type AuctionStatus =
  | "draft"
  | "open"
  | "accepted"
  | "cancelled"
  | "expired";

export type BidStatus =
  | "active"
  | "accepted"
  | "rejected"
  | "withdrawn"
  | "invalid";

export type AuctionListing = {
  id: string;
  seller_user_id: string;
  title: string | null;
  description: string | null;
  wishlist_text: string | null;
  status: AuctionStatus;
  ends_at: string | null;
  accepted_bid_id: string | null;
  created_at: string;
  updated_at: string;
};

export type AuctionBid = {
  id: string;
  auction_id: string;
  bidder_user_id: string;
  status: BidStatus;
  note: string | null;
  computed_score: number;
  computed_label: string | null;
  computed_summary: string | null;
  created_at: string;
  updated_at: string;
};
```

---

# 26. Zod Validation

## 26.1 createAuctionSchema

```ts
import { z } from "zod";

export const createAuctionSchema = z.object({
  title: z.string().max(120).optional(),
  description: z.string().max(1000).optional(),
  wishlistText: z.string().max(1000).optional(),
  endsAt: z.string().datetime().optional().nullable(),
  items: z.array(
    z.object({
      stickerId: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ).min(1),
  wishlistStickerIds: z.array(z.string().uuid()).optional(),
});
```

## 26.2 submitBidSchema

```ts
export const submitBidSchema = z.object({
  auctionId: z.string().uuid(),
  note: z.string().max(1000).optional(),
  items: z.array(
    z.object({
      stickerId: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ).min(1),
});
```

## 26.3 acceptBidSchema

```ts
export const acceptBidSchema = z.object({
  auctionId: z.string().uuid(),
  bidId: z.string().uuid(),
});
```

---

# 27. UI Copy

## 27.1 App intro

```txt
Figu OTC
The unofficial office trading desk for completing the album.
```

## 27.2 Empty collection

```txt
Start by loading your album.
Paste the stickers you already have or mark the ones you’re missing.
```

## 27.3 No matches

```txt
No useful matches yet.
As more people load their duplicates, this page will get better.
```

## 27.4 No duplicates

```txt
You don’t have duplicates yet.
Once you add duplicates, others will be able to trade with you.
```

## 27.5 Auction Desk intro

```txt
List premium duplicates and let the office bid with stickers you actually need.
```

## 27.6 Create auction empty state

```txt
You don’t have duplicates available for auction yet.
Add your collection first, then come back to the desk.
```

## 27.7 No open auctions

```txt
No open auctions yet.
When someone lists a premium duplicate, it will appear here.
```

## 27.8 No useful bid items

```txt
You don’t currently have duplicates this seller needs.
You can still make an offer with other duplicates.
```

## 27.9 Accepted auction

```txt
Auction settled.
The trade was completed and both collections were updated.
```

## 27.10 Invalid bid

```txt
This offer is no longer valid.
One or more stickers are no longer available.
```

---

# 28. Error Messages

Use friendly, direct messages.

```txt
You can only auction stickers where you have duplicates.
```

```txt
This bid is no longer valid because one or more stickers are no longer available.
```

```txt
You cannot bid on your own auction.
```

```txt
This auction is no longer open.
```

```txt
You do not have permission to accept this bid.
```

```txt
This sticker is already part of the auction lot.
```

```txt
You already have an active bid on this auction. Edit your current bid instead.
```

```txt
This trade cannot be completed because one or more stickers are no longer available.
```

---

# 29. Analytics / Internal Metrics

Track internally:

- total users
- active users
- stickers loaded
- duplicates available
- matches generated
- trades proposed
- trades completed
- completion percentage per user
- open auctions
- auction bids submitted
- auction bids accepted
- invalid auction bids
- most wanted stickers
- most duplicated stickers
- most auctioned stickers

No external analytics needed for MVP.

---

# 30. Security Requirements

- App must require login.
- Use Supabase RLS.
- Admin-only catalog import.
- Do not expose service role key.
- Validate all inputs with Zod.
- Critical trade completion must be server-side.
- Critical auction acceptance must be server-side.
- Do not trust client-side calculations.
- Do not trust client-provided user IDs.
- Resolve current user server-side.
- All collection updates must be atomic.

Optional restrictions:

- allow only certain email domains
- require admin approval for new users
- disable public signups after initial onboarding

---

# 31. Performance Requirements

Expected scale:

- 10 to 200 users
- around 1,000 stickers
- at most a few hundred auctions
- at most a few thousand bids

Performance goals:

- Dashboard loads under 2 seconds on office Wi-Fi.
- Matches page loads under 3 seconds for 200 users.
- Bulk input of 500 codes processes quickly.
- Auction detail loads under 2 seconds.
- Accept bid transaction runs safely.

---

# 32. Design Direction

Visual style:

- clean
- internal tool
- dark mode optional, preferred
- trading desk vibe
- cards and badges
- clear typography
- mobile-friendly
- no official album visuals
- no childish sticker-book UI

Possible UI language:

- Best counterparties
- Available liquidity
- You can help them
- They can help you
- Strong match
- Complete the trade
- Office market
- Auction Desk
- Best offer
- Useful offer
- Lot
- Bid score

---

# 33. Development Phases for Codex

## Phase 0 — Inspect existing project

Before coding:

1. Inspect project structure.
2. Identify Supabase client setup.
3. Identify auth/protected routes.
4. Identify existing tables/types.
5. Identify existing trade logic if any.
6. Reuse UI components where possible.

Codex should output before coding:

```txt
Brief implementation plan:
- files to create
- files to modify
- database migration needed
- assumptions
```

---

## Phase 1 — Foundation

Build:

- Next.js app
- Supabase connection
- Auth
- Profiles
- Protected routes
- Basic layout
- Local env setup

Acceptance:

- User can login.
- User can create/edit profile.
- App has authenticated navigation.

---

## Phase 2 — Base Database and Sticker Catalog

Build:

- base schema
- profiles
- stickers
- user_stickers
- trades
- trade_items
- admin CSV import
- sticker list
- sticker search
- team filter

Acceptance:

- Admin can import catalog.
- Users can browse stickers.
- Codes are unique and normalized.

---

## Phase 3 — My Album

Build:

- quantity management
- owned/missing/duplicate logic
- bulk input
- filters
- completion percentage

Acceptance:

- User can update collection.
- User can paste sticker codes.
- Duplicates are calculated correctly.
- Missing stickers are calculated correctly.

---

## Phase 4 — Matching Engine

Build:

- best matches
- match scoring
- match detail page
- people who can help me
- people I can help

Acceptance:

- User sees useful overlaps.
- Match score is correct.
- Match detail shows exact give/receive lists.

---

## Phase 5 — Simple Trades

Build:

- create trade from match
- select stickers to give/receive
- trade status
- complete trade
- cancel trade
- trade history

Acceptance:

- Completing trade updates both users.
- Invalid trades cannot complete.
- Users can see trade history.

---

## Phase 6 — Leaderboards

Build:

- completion ranking
- helpful traders ranking
- most wanted stickers
- most duplicated stickers
- office market pulse

Acceptance:

- Rankings calculate correctly.
- Dashboard shows useful stats.

---

## Phase 7 — Auction Database Migration

Goal:

Add auction tables, indexes, RLS policies, and RPC.

Tasks:

1. Create migration file.
2. Add `auction_listings`.
3. Add `auction_listing_items`.
4. Add `auction_wishlist_items`.
5. Add `auction_bids`.
6. Add `auction_bid_items`.
7. Add accepted bid FK.
8. Add indexes.
9. Add RLS policies.
10. Add `accept_auction_bid` RPC.

Acceptance:

- Migration runs cleanly.
- Tables exist.
- RLS is enabled.
- Users can create auctions as themselves.
- Users can bid as themselves.
- Seller can accept bids on own auction.
- Accept bid is atomic.

---

## Phase 8 — Auction Queries and Types

Create:

- `/lib/auctions/types.ts`
- `/lib/auctions/queries.ts`
- `/lib/auctions/mutations.ts`
- `/lib/auctions/scoring.ts`
- `/lib/auctions/validation.ts`

Functions:

```ts
getOpenAuctions()
getAuctionById(auctionId)
getMyAuctions(userId)
getMyBids(userId)
getAuctionBids(auctionId)
getAvailableDuplicateStickers(userId)
getSuggestedBidItems(auctionId, bidderUserId)
createAuction(input)
submitAuctionBid(input)
withdrawAuctionBid(bidId)
cancelAuction(auctionId)
acceptAuctionBid(auctionId, bidId)
computeBidScore(...)
```

Acceptance:

- Queries return typed objects.
- Mutations validate input.
- No mutation trusts client-only user IDs.
- Current user is resolved server-side where needed.

---

## Phase 9 — Auction Desk Home

Build:

- `/auctions`
- nav item
- open auction list
- filters
- auction cards
- indication of useful bid opportunities

Acceptance:

- Page loads for authenticated users.
- Open auctions display correctly.
- Own auctions are marked.
- User cannot bid on own auction.
- Empty state is clean.

---

## Phase 10 — Create Auction

Build:

- `/auctions/new`
- form
- duplicate selector
- title/description/wishlist
- optional ends_at
- validation
- create listing and items

Acceptance:

- User can create single sticker auction.
- User can create lot auction.
- Invalid quantities are blocked.
- New auction appears in open list.

---

## Phase 11 — Auction Detail and Bid Builder

Build:

- `/auctions/[auctionId]`
- auction detail
- seller info
- lot items
- wishlist
- existing bids
- bid builder for non-seller
- suggestions from bidder duplicates seller needs
- submit/edit/withdraw bid

Acceptance:

- Bidder can submit valid bid.
- Bidder cannot submit invalid bid.
- Bidder cannot bid on own auction.
- Bid suggestions are useful.
- Existing bid can be edited.
- Existing bid can be withdrawn.

---

## Phase 12 — Seller Bid Review and Accept

Build:

- seller sees all bids
- sort by score
- score summary
- validity status
- accept button
- call `accept_auction_bid`
- redirect or show completed state

Acceptance:

- Seller can accept valid bid.
- Seller cannot accept invalid bid.
- Accepting bid updates both collections.
- Auction status becomes accepted.
- Accepted bid status becomes accepted.
- Other bids become rejected.
- Trade history reflects completed trade.

---

## Phase 13 — My Auctions and My Bids

Build:

- `/auctions/mine`
- `/auctions/bids`
- status lists
- edit/withdraw where valid

Acceptance:

- User can see auction activity.
- User can manage active auctions.
- User can track bids.

---

## Phase 14 — Dashboard Integration

Build:

- open auction count
- my active bid count
- my open auction count
- suggested auctions where I can make strong bid
- CTA to Auction Desk

Acceptance:

- Dashboard shows auction activity.
- User can jump to relevant auctions.

---

## Phase 15 — Raspberry Pi Deployment

Build:

- production build instructions
- `.env` config
- systemd service
- local hostname guidance
- logs instructions

Acceptance:

- App runs on Raspberry Pi.
- App restarts after reboot.
- App is reachable from office network.
- Logs can be inspected.

---

## Phase 16 — QA and Polish

Test:

- all core album flows
- match logic
- simple trades
- auction creation
- auction bidding
- stale bids
- accepted auction settlement
- RLS
- mobile UI
- empty states
- loading states
- error messages

Acceptance:

- No broken flows.
- No unauthorized access.
- No client-side-only critical validation.
- Clear UX.

---

# 34. QA Test Cases

## 34.1 Create user profile

Given user signs in  
When user sets display name  
Then profile is created.

## 34.2 Import catalog

Given admin uploads valid CSV  
When import runs  
Then stickers are created with normalized unique codes.

## 34.3 Bulk input

Given user pastes mixed-format codes  
When bulk input runs  
Then valid codes are normalized and saved.

## 34.4 Duplicate calculation

Given user has ARG-10 quantity 3  
Then duplicate count is 2.

## 34.5 Base match

Given User A is missing ARG-10  
And User B has ARG-10 quantity 2  
Then User B can help User A.

## 34.6 Perfect match

Given User A has BRA-01 duplicate and needs ARG-10  
And User B has ARG-10 duplicate and needs BRA-01  
Then system shows perfect match.

## 34.7 Complete simple trade

Given valid proposed trade  
When trade is completed  
Then both collections update atomically.

## 34.8 Create auction with valid duplicate

Given user has ARG-10 quantity 2  
When user creates auction with ARG-10 quantity 1  
Then auction is created.

## 34.9 Create auction without duplicate

Given user has ARG-10 quantity 1  
When user tries to auction ARG-10  
Then creation is blocked.

## 34.10 Submit valid bid

Given bidder has BRA-03 quantity 2  
And seller is missing BRA-03  
When bidder offers BRA-03  
Then bid is created and scored.

## 34.11 Submit invalid bid

Given bidder has BRA-03 quantity 1  
When bidder tries to offer BRA-03  
Then bid is blocked.

## 34.12 Accept auction bid

Given auction is open  
And seller has listed duplicate available  
And bidder has offered duplicate available  
When seller accepts bid  
Then both collections update atomically.

## 34.13 Accept stale bid

Given bidder offered BRA-03  
And later traded away BRA-03 duplicate  
When seller tries to accept bid  
Then acceptance fails and bid is marked invalid.

## 34.14 Own auction bid blocked

Given user created auction  
When same user tries to bid  
Then bid is blocked.

## 34.15 Expired auction

Given auction ended yesterday  
When user tries to bid  
Then bid is blocked.

## 34.16 Cancel auction

Given seller has open auction  
When seller cancels auction  
Then auction status becomes cancelled and no new bids are allowed.

## 34.17 RLS

Given User A is authenticated  
When User A tries to update User B’s auction directly  
Then update is denied.

---

# 35. Definition of Done

The full Figu OTC MVP + Auction Desk is done when:

1. Users can sign in.
2. Users can create profiles.
3. Admin can import sticker catalog.
4. Users can manage sticker quantities.
5. Users can paste bulk sticker codes.
6. System correctly calculates missing, owned, duplicate, and completion percentage.
7. Users can see best matches.
8. Users can create and complete simple trades.
9. Completed trades update both users atomically.
10. Leaderboard shows completion and helpful traders.
11. User can list a duplicate sticker in Auction Desk.
12. User can list multiple duplicate stickers as a lot.
13. Other users can bid with their own duplicates.
14. App suggests useful stickers to offer.
15. Seller can compare bids.
16. Bids are scored by usefulness, not money.
17. Seller can accept one bid.
18. Accepted bid updates both collections atomically.
19. Other bids are rejected.
20. Invalid bids are detected.
21. Users can see their auctions and bids.
22. App works on mobile.
23. App runs locally on Raspberry Pi.
24. RLS protects data.
25. No money, pricing, public marketplace behavior, official branding, or unnecessary complexity exists.

---

# 36. Codex Kickoff Prompt

Use this prompt before giving Codex this PRD:

```txt
You are working on Figu OTC, an internal office sticker trading app built with Next.js App Router, TypeScript, Supabase, Tailwind and shadcn/ui. The app will run locally on a Raspberry Pi.

Read the full PRD and build it in phases. Start by inspecting the existing project, then propose the files, migrations and assumptions before coding.

Do not overbuild. Do not add payments, chat, public marketplace behavior, official branding, real-time bidding, AI valuation or unnecessary complexity.

The key requirements are:
1. Users can load sticker collections quickly.
2. Matching must show useful swaps.
3. Simple trades must update both collections atomically.
4. Auction Desk lets users bid with sticker packages, not money.
5. Accepting an auction bid must atomically update both users’ collections using server-side logic or a Supabase RPC.
6. All input must be validated.
7. RLS must protect data.

Proceed phase by phase and stop after each major phase with a summary of what changed, how to test it, and what remains.
```

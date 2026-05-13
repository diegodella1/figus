create extension if not exists pgcrypto;

create type public.profile_role as enum ('member', 'admin');
create type public.trade_status as enum ('proposed', 'completed', 'cancelled');
create type public.auction_status as enum ('open', 'accepted', 'cancelled', 'expired');
create type public.bid_status as enum ('active', 'withdrawn', 'accepted', 'rejected', 'invalid');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (length(display_name) between 2 and 80),
  team_area text,
  contact_method text,
  slack_handle text,
  phone text,
  avatar_url text,
  role public.profile_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.stickers (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  team text not null,
  number integer not null check (number > 0),
  label text not null,
  section text,
  rarity text,
  source_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (code = upper(code)),
  unique (team, number)
);

create table public.user_stickers (
  user_id uuid not null references public.profiles(id) on delete cascade,
  sticker_id uuid not null references public.stickers(id) on delete cascade,
  quantity integer not null default 0 check (quantity >= 0),
  wanted boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, sticker_id)
);

create table public.trades (
  id uuid primary key default gen_random_uuid(),
  proposer_id uuid not null references public.profiles(id) on delete cascade,
  partner_id uuid not null references public.profiles(id) on delete cascade,
  status public.trade_status not null default 'proposed',
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  cancelled_at timestamptz,
  check (proposer_id <> partner_id)
);

create table public.trade_items (
  id uuid primary key default gen_random_uuid(),
  trade_id uuid not null references public.trades(id) on delete cascade,
  from_user_id uuid not null references public.profiles(id) on delete cascade,
  to_user_id uuid not null references public.profiles(id) on delete cascade,
  sticker_id uuid not null references public.stickers(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  check (from_user_id <> to_user_id)
);

create table public.auction_listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  description text,
  status public.auction_status not null default 'open',
  expires_at timestamptz,
  accepted_bid_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.auction_listing_items (
  id uuid primary key default gen_random_uuid(),
  auction_id uuid not null references public.auction_listings(id) on delete cascade,
  sticker_id uuid not null references public.stickers(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  unique (auction_id, sticker_id)
);

create table public.auction_wishlist_items (
  id uuid primary key default gen_random_uuid(),
  auction_id uuid not null references public.auction_listings(id) on delete cascade,
  sticker_id uuid not null references public.stickers(id) on delete cascade,
  unique (auction_id, sticker_id)
);

create table public.auction_bids (
  id uuid primary key default gen_random_uuid(),
  auction_id uuid not null references public.auction_listings(id) on delete cascade,
  bidder_id uuid not null references public.profiles(id) on delete cascade,
  status public.bid_status not null default 'active',
  note text,
  score integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (auction_id, bidder_id)
);

create table public.auction_bid_items (
  id uuid primary key default gen_random_uuid(),
  bid_id uuid not null references public.auction_bids(id) on delete cascade,
  sticker_id uuid not null references public.stickers(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  unique (bid_id, sticker_id)
);

alter table public.auction_listings
  add constraint auction_listings_accepted_bid_fk
  foreign key (accepted_bid_id) references public.auction_bids(id);

create index stickers_code_idx on public.stickers(code);
create index stickers_team_idx on public.stickers(team);
create index user_stickers_user_idx on public.user_stickers(user_id);
create index user_stickers_sticker_idx on public.user_stickers(sticker_id);
create index user_stickers_duplicates_idx on public.user_stickers(user_id, quantity) where quantity > 1;
create index user_stickers_missing_idx on public.user_stickers(user_id, wanted, quantity);
create index trades_user_status_idx on public.trades(proposer_id, partner_id, status);
create index trade_items_trade_idx on public.trade_items(trade_id);
create index auction_listings_status_idx on public.auction_listings(status, expires_at);
create index auction_bids_auction_status_idx on public.auction_bids(auction_id, status);

alter table public.profiles enable row level security;
alter table public.stickers enable row level security;
alter table public.user_stickers enable row level security;
alter table public.trades enable row level security;
alter table public.trade_items enable row level security;
alter table public.auction_listings enable row level security;
alter table public.auction_listing_items enable row level security;
alter table public.auction_wishlist_items enable row level security;
alter table public.auction_bids enable row level security;
alter table public.auction_bid_items enable row level security;

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "profiles readable by authenticated" on public.profiles
  for select to authenticated using (true);
create policy "users update own profile" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "users insert own profile" on public.profiles
  for insert to authenticated with check (id = auth.uid());

create policy "stickers readable by authenticated" on public.stickers
  for select to authenticated using (true);
create policy "admins manage stickers" on public.stickers
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "users read all collections for matching" on public.user_stickers
  for select to authenticated using (true);
create policy "users manage own collection" on public.user_stickers
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "trade participants read trades" on public.trades
  for select to authenticated using (auth.uid() in (proposer_id, partner_id));
create policy "users create own trades" on public.trades
  for insert to authenticated with check (proposer_id = auth.uid());
create policy "participants cancel proposed trades" on public.trades
  for update to authenticated
  using (auth.uid() in (proposer_id, partner_id) and status = 'proposed')
  with check (auth.uid() in (proposer_id, partner_id));

create policy "participants read trade items" on public.trade_items
  for select to authenticated using (
    exists (
      select 1 from public.trades t
      where t.id = trade_id and auth.uid() in (t.proposer_id, t.partner_id)
    )
  );
create policy "proposer creates trade items" on public.trade_items
  for insert to authenticated with check (
    exists (
      select 1 from public.trades t
      where t.id = trade_id and t.proposer_id = auth.uid() and t.status = 'proposed'
    )
  );

create policy "open auctions readable" on public.auction_listings
  for select to authenticated using (true);
create policy "seller creates auctions" on public.auction_listings
  for insert to authenticated with check (seller_id = auth.uid());
create policy "seller updates open auctions" on public.auction_listings
  for update to authenticated using (seller_id = auth.uid() and status = 'open') with check (seller_id = auth.uid());

create policy "auction items readable" on public.auction_listing_items
  for select to authenticated using (true);
create policy "seller creates listing items" on public.auction_listing_items
  for insert to authenticated with check (
    exists (select 1 from public.auction_listings a where a.id = auction_id and a.seller_id = auth.uid())
  );

create policy "wishlist readable" on public.auction_wishlist_items
  for select to authenticated using (true);
create policy "seller creates wishlist" on public.auction_wishlist_items
  for insert to authenticated with check (
    exists (select 1 from public.auction_listings a where a.id = auction_id and a.seller_id = auth.uid())
  );

create policy "bids readable by authenticated" on public.auction_bids
  for select to authenticated using (true);
create policy "users bid on others open auctions" on public.auction_bids
  for insert to authenticated with check (
    bidder_id = auth.uid()
    and exists (
      select 1 from public.auction_listings a
      where a.id = auction_id and a.seller_id <> auth.uid() and a.status = 'open'
    )
  );
create policy "bidder updates own active bids" on public.auction_bids
  for update to authenticated using (bidder_id = auth.uid() and status = 'active') with check (bidder_id = auth.uid());

create policy "bid items readable" on public.auction_bid_items
  for select to authenticated using (true);
create policy "bidder manages own bid items" on public.auction_bid_items
  for all to authenticated using (
    exists (select 1 from public.auction_bids b where b.id = bid_id and b.bidder_id = auth.uid() and b.status = 'active')
  ) with check (
    exists (select 1 from public.auction_bids b where b.id = bid_id and b.bidder_id = auth.uid() and b.status = 'active')
  );

create or replace function public.ensure_user_sticker(p_user_id uuid, p_sticker_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_stickers(user_id, sticker_id, quantity, wanted)
  values (p_user_id, p_sticker_id, 0, true)
  on conflict (user_id, sticker_id) do nothing;
end;
$$;

create or replace function public.complete_trade(p_trade_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_trade public.trades%rowtype;
  v_item record;
  v_available integer;
begin
  select * into v_trade
  from public.trades
  where id = p_trade_id
  for update;

  if not found then
    raise exception 'Trade not found';
  end if;

  if auth.uid() not in (v_trade.proposer_id, v_trade.partner_id) then
    raise exception 'Not a trade participant';
  end if;

  if v_trade.status <> 'proposed' then
    raise exception 'Trade is not proposed';
  end if;

  for v_item in select * from public.trade_items where trade_id = p_trade_id loop
    perform public.ensure_user_sticker(v_item.from_user_id, v_item.sticker_id);
    perform public.ensure_user_sticker(v_item.to_user_id, v_item.sticker_id);

    select quantity into v_available
    from public.user_stickers
    where user_id = v_item.from_user_id and sticker_id = v_item.sticker_id
    for update;

    if v_available < v_item.quantity then
      raise exception 'Sender no longer has required sticker';
    end if;
  end loop;

  for v_item in select * from public.trade_items where trade_id = p_trade_id loop
    update public.user_stickers
    set quantity = quantity - v_item.quantity, updated_at = now()
    where user_id = v_item.from_user_id and sticker_id = v_item.sticker_id;

    update public.user_stickers
    set quantity = quantity + v_item.quantity,
        wanted = case when quantity + v_item.quantity > 0 then false else wanted end,
        updated_at = now()
    where user_id = v_item.to_user_id and sticker_id = v_item.sticker_id;
  end loop;

  update public.trades
  set status = 'completed', completed_at = now()
  where id = p_trade_id;

  return p_trade_id;
end;
$$;

create or replace function public.accept_auction_bid(p_auction_id uuid, p_bid_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_auction public.auction_listings%rowtype;
  v_bid public.auction_bids%rowtype;
  v_trade_id uuid;
  v_item record;
  v_available integer;
begin
  select * into v_auction
  from public.auction_listings
  where id = p_auction_id
  for update;

  if not found then
    raise exception 'Auction not found';
  end if;

  if v_auction.seller_id <> auth.uid() then
    raise exception 'Only seller can accept bids';
  end if;

  if v_auction.status <> 'open' then
    raise exception 'Auction is not open';
  end if;

  select * into v_bid
  from public.auction_bids
  where id = p_bid_id and auction_id = p_auction_id
  for update;

  if not found or v_bid.status <> 'active' then
    raise exception 'Bid is not active';
  end if;

  if v_bid.bidder_id = v_auction.seller_id then
    raise exception 'Seller cannot accept own bid';
  end if;

  for v_item in select * from public.auction_listing_items where auction_id = p_auction_id loop
    perform public.ensure_user_sticker(v_auction.seller_id, v_item.sticker_id);
    select quantity into v_available
    from public.user_stickers
    where user_id = v_auction.seller_id and sticker_id = v_item.sticker_id
    for update;
    if v_available <= 1 or v_available < v_item.quantity then
      update public.auction_bids set status = 'invalid' where id = p_bid_id;
      raise exception 'Seller no longer has listed duplicate';
    end if;
  end loop;

  for v_item in select * from public.auction_bid_items where bid_id = p_bid_id loop
    perform public.ensure_user_sticker(v_bid.bidder_id, v_item.sticker_id);
    select quantity into v_available
    from public.user_stickers
    where user_id = v_bid.bidder_id and sticker_id = v_item.sticker_id
    for update;
    if v_available <= 1 or v_available < v_item.quantity then
      update public.auction_bids set status = 'invalid' where id = p_bid_id;
      raise exception 'Bidder no longer has offered duplicate';
    end if;
  end loop;

  insert into public.trades(proposer_id, partner_id, status, completed_at)
  values (v_auction.seller_id, v_bid.bidder_id, 'completed', now())
  returning id into v_trade_id;

  insert into public.trade_items(trade_id, from_user_id, to_user_id, sticker_id, quantity)
  select v_trade_id, v_auction.seller_id, v_bid.bidder_id, sticker_id, quantity
  from public.auction_listing_items
  where auction_id = p_auction_id;

  insert into public.trade_items(trade_id, from_user_id, to_user_id, sticker_id, quantity)
  select v_trade_id, v_bid.bidder_id, v_auction.seller_id, sticker_id, quantity
  from public.auction_bid_items
  where bid_id = p_bid_id;

  for v_item in select * from public.trade_items where trade_id = v_trade_id loop
    perform public.ensure_user_sticker(v_item.to_user_id, v_item.sticker_id);
    update public.user_stickers
    set quantity = quantity - v_item.quantity, updated_at = now()
    where user_id = v_item.from_user_id and sticker_id = v_item.sticker_id;
    update public.user_stickers
    set quantity = quantity + v_item.quantity,
        wanted = case when quantity + v_item.quantity > 0 then false else wanted end,
        updated_at = now()
    where user_id = v_item.to_user_id and sticker_id = v_item.sticker_id;
  end loop;

  update public.auction_bids
  set status = case when id = p_bid_id then 'accepted'::public.bid_status else 'rejected'::public.bid_status end,
      updated_at = now()
  where auction_id = p_auction_id and status = 'active';

  update public.auction_listings
  set status = 'accepted',
      accepted_bid_id = p_bid_id,
      updated_at = now()
  where id = p_auction_id;

  return v_trade_id;
end;
$$;

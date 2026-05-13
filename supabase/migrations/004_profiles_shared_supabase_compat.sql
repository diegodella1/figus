do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'team_area'
  ) then
    alter table public.profiles add column team_area text;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'contact_method'
  ) then
    alter table public.profiles add column contact_method text;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'slack_handle'
  ) then
    alter table public.profiles add column slack_handle text;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'phone'
  ) then
    alter table public.profiles add column phone text;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'role'
  ) then
    alter table public.profiles add column role public.profile_role not null default 'member';
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'updated_at'
  ) then
    alter table public.profiles add column updated_at timestamptz not null default now();
  end if;
end $$;

update public.profiles
set role = case when coalesce(is_admin, false) then 'admin'::public.profile_role else role end
where role is distinct from case when coalesce(is_admin, false) then 'admin'::public.profile_role else role end;

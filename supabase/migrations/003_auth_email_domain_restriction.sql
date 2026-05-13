create or replace function auth.enforce_roxom_email_domain()
returns trigger
language plpgsql
security definer
set search_path = auth, public
as $$
declare
  v_email text;
begin
  v_email := lower(coalesce(new.email, ''));

  if v_email = '' or (
    split_part(v_email, '@', 2) not in ('roxom.com', 'roxom.tv')
  ) then
    raise exception 'Only @roxom.com and @roxom.tv emails can register';
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_roxom_email_domain_on_users on auth.users;

create trigger enforce_roxom_email_domain_on_users
before insert or update of email on auth.users
for each row
execute function auth.enforce_roxom_email_domain();

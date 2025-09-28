-- Minimal key-value config table for admin invite token and similar settings
create table if not exists public.config (
  key text primary key,
  value text not null,
  updated_at timestamp with time zone default now()
);

create or replace function public.ensure_config_table()
returns void as $$
begin
  perform 1 from information_schema.tables where table_schema = 'public' and table_name = 'config';
  -- table is created above via create table if not exists
end;
$$ language plpgsql;

create or replace function public.set_config(k text, v text)
returns void as $$
begin
  insert into public.config(key, value) values (k, v)
  on conflict (key) do update set value = excluded.value, updated_at = now();
end;
$$ language plpgsql;

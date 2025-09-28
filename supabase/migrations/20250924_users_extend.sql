-- Extend users table with optional admin-related fields used by the app UI
alter table public.users add column if not exists display_name text;
alter table public.users add column if not exists photo_url text;
alter table public.users add column if not exists role text default 'user';
alter table public.users add column if not exists status text default 'active';

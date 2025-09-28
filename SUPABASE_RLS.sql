-- Supabase Row Level Security (RLS) policies for RuesDesignl
-- Run in the Supabase SQL editor. Assumes a table `users` with columns: id uuid (auth.uid), email text, is_admin boolean default false.

-- Enable RLS
alter table public.users enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;

-- Helper policies
-- Users: a user can read their row; admins can read all; users can update their own row
create policy "users read own or admin read all" on public.users
  for select using (auth.uid() = id or exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));
create policy "users update self" on public.users
  for update using (auth.uid() = id);

-- Products: public read; only admins write
create policy "products are viewable by everyone" on public.products
  for select using (true);
create policy "only admins can modify products" on public.products
  for insert with check (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));
create policy "only admins can update products" on public.products
  for update using (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));
create policy "only admins can delete products" on public.products
  for delete using (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));

-- Orders: admins full access; users can read own orders if you track customer_id
-- Adjust column names as needed (e.g., customer_id uuid)
create policy "orders readable by owner or admin" on public.orders
  for select using (
    exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin)
    or coalesce(customer_id, auth.uid()) = auth.uid()
  );
create policy "only admins can write orders" on public.orders
  for all using (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin))
  with check (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));

-- Bookings: similar to orders
create policy "bookings readable by owner or admin" on public.bookings
  for select using (
    exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin)
    or coalesce(user_id, auth.uid()) = auth.uid()
  );
create policy "only admins can write bookings" on public.bookings
  for all using (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin))
  with check (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));

-- Reviews: public read; owner or admin write
create policy "reviews readable by everyone" on public.reviews
  for select using (true);
create policy "reviews insert by logged-in users" on public.reviews
  for insert with check (auth.role() = 'authenticated');
create policy "reviews update by owner or admin" on public.reviews
  for update using (user_id = auth.uid() or exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));
create policy "reviews delete by owner or admin" on public.reviews
  for delete using (user_id = auth.uid() or exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));

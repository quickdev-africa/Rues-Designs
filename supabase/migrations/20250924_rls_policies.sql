-- Enable RLS for core tables
alter table public.users enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;
alter table public.categories enable row level security;

-- Users
create policy "users select self or admin" on public.users for select
  using (auth.uid() = id or exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));
create policy "users update self" on public.users for update using (auth.uid() = id);
create policy "users insert self" on public.users for insert with check (auth.uid() = id);

-- Products
create policy "products public read" on public.products for select using (true);
create policy "products admin write" on public.products for insert with check (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));
create policy "products admin update" on public.products for update using (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));
create policy "products admin delete" on public.products for delete using (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));

-- Categories public read; admin manage
create policy "categories public read" on public.categories for select using (true);
create policy "categories admin write" on public.categories for insert with check (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));
create policy "categories admin update" on public.categories for update using (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));
create policy "categories admin delete" on public.categories for delete using (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));

-- Orders
create policy "orders read own or admin" on public.orders for select using (
  exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin) or customer_id = auth.uid()
);
create policy "orders admin write" on public.orders for all using (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin)) with check (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));

-- Order Items: readable by order owner or admin; write admin
create policy "order_items read via orders" on public.order_items for select using (
  exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin) or exists(
    select 1 from public.orders o where o.id = order_id and o.customer_id = auth.uid()
  )
);
create policy "order_items admin write" on public.order_items for all using (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin)) with check (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));

-- Bookings
create policy "bookings read own or admin" on public.bookings for select using (
  exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin) or user_id = auth.uid()
);
create policy "bookings admin write" on public.bookings for all using (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin)) with check (exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));

-- Reviews
create policy "reviews public read" on public.reviews for select using (true);
create policy "reviews insert authenticated" on public.reviews for insert with check (auth.role() = 'authenticated');
create policy "reviews update own or admin" on public.reviews for update using (user_id = auth.uid() or exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));
create policy "reviews delete own or admin" on public.reviews for delete using (user_id = auth.uid() or exists(select 1 from public.users u where u.id = auth.uid() and u.is_admin));

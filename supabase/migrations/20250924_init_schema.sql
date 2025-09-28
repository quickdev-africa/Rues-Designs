-- Initial schema for RuesDesignl
-- Ensure pgcrypto is available for gen_random_uuid()
create extension if not exists pgcrypto;
-- Users: mirror auth.users via a public profile table
create table if not exists public.users (
  id uuid primary key,
  email text unique,
  full_name text,
  phone text,
  is_admin boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Categories
create table if not exists public.categories (
  id text primary key,
  name text not null,
  description text,
  parent_id text references public.categories(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  sku text unique,
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  images text[] default '{}',
  categories text[] default '{}',
  status text not null default 'active', -- active | archived
  stock_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Product <-> Category join for precise relations (optional alongside products.categories)
create table if not exists public.product_categories (
  product_id uuid references public.products(id) on delete cascade,
  category_id text references public.categories(id) on delete cascade,
  primary key (product_id, category_id)
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.users(id) on delete set null,
  status text not null default 'draft', -- draft | confirmed | fulfilled | canceled
  subtotal numeric(10,2) not null default 0,
  delivery_fee numeric(10,2) not null default 0,
  deposit numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  event_date date,
  delivery_address jsonb,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Order Items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete restrict,
  quantity integer not null default 1,
  unit_price numeric(10,2) not null default 0,
  line_total numeric(10,2) not null default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Availability (inventory reservations per date range)
create table if not exists public.availability (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  quantity_reserved integer not null default 1,
  created_at timestamp with time zone default now(),
  constraint chk_dates check (start_date <= end_date)
);

-- Reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamp with time zone default now()
);

-- Bookings (optional separate from orders if needed for quotes)
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  status text not null default 'pending',
  requested_date date,
  details jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Triggers to maintain updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_users before update on public.users
for each row execute function public.set_updated_at();
create trigger set_updated_at_categories before update on public.categories
for each row execute function public.set_updated_at();
create trigger set_updated_at_products before update on public.products
for each row execute function public.set_updated_at();
create trigger set_updated_at_orders before update on public.orders
for each row execute function public.set_updated_at();
create trigger set_updated_at_order_items before update on public.order_items
for each row execute function public.set_updated_at();
create trigger set_updated_at_bookings before update on public.bookings
for each row execute function public.set_updated_at();

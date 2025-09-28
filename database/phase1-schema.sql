-- Phase 1: Core Database Schema & RLS Policies
-- Run this in your Supabase SQL Editor

-- 1. USERS table (extend existing or create if needed)
CREATE TABLE IF NOT EXISTS public.users (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email text UNIQUE NOT NULL,
    full_name text,
    phone text,
    address jsonb, -- {street, city, state, zip, country}
    is_admin boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. CATEGORIES table
CREATE TABLE IF NOT EXISTS public.categories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    image_url text,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. PRODUCTS table
CREATE TABLE IF NOT EXISTS public.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    images jsonb DEFAULT '[]'::jsonb, -- Array of image URLs
    pricing jsonb NOT NULL DEFAULT '{}'::jsonb, -- {daily_rate, deposit, tax_rate, delivery_fee}
    specifications jsonb DEFAULT '{}'::jsonb, -- {dimensions, weight, capacity, etc}
    quantity_available integer DEFAULT 1,
    is_active boolean DEFAULT true,
    requires_delivery boolean DEFAULT false,
    delivery_radius_miles integer DEFAULT 25,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 4. ORDERS table
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    order_number text UNIQUE NOT NULL,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'delivered', 'active', 'returned', 'completed', 'cancelled')),
    
    -- Event Details
    event_date date NOT NULL,
    event_end_date date,
    rental_days integer NOT NULL DEFAULT 1,
    delivery_address jsonb, -- {street, city, state, zip, distance_miles}
    
    -- Pricing
    subtotal numeric(10,2) NOT NULL DEFAULT 0,
    tax_amount numeric(10,2) NOT NULL DEFAULT 0,
    delivery_fee numeric(10,2) NOT NULL DEFAULT 0,
    total_amount numeric(10,2) NOT NULL DEFAULT 0,
    deposit_amount numeric(10,2) NOT NULL DEFAULT 0,
    
    -- Payment
    stripe_payment_intent_id text,
    stripe_deposit_intent_id text,
    payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'authorized', 'paid', 'failed', 'refunded', 'partially_refunded')),
    
    -- Notes
    customer_notes text,
    admin_notes text,
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 5. ORDER_ITEMS table
CREATE TABLE IF NOT EXISTS public.order_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
    quantity integer NOT NULL DEFAULT 1,
    unit_price numeric(10,2) NOT NULL,
    total_price numeric(10,2) NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 6. AVAILABILITY table (inventory management)
CREATE TABLE IF NOT EXISTS public.availability (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
    date date NOT NULL,
    quantity_reserved integer DEFAULT 0,
    quantity_available integer NOT NULL,
    is_blocked boolean DEFAULT false, -- Manual block for maintenance
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    UNIQUE(product_id, date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_event_date ON public.orders(event_date);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON public.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_availability_product_date ON public.availability(product_id, date);

-- Generate order numbers function
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
BEGIN
    RETURN 'RD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS trigger AS $$
BEGIN
    IF NEW.order_number IS NULL THEN
        NEW.order_number := generate_order_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION set_order_number();

-- Update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_availability_updated_at BEFORE UPDATE ON public.availability FOR EACH ROW EXECUTE FUNCTION update_updated_at();
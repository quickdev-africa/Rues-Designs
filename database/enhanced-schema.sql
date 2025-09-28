-- Complete Rental Business Database Schema (6 Tables)
-- Apple-Quality Standards | Optimized Performance | Comprehensive Features

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- For geographical calculations

-- ===== TABLE 1: USERS (Enhanced Customer & Admin Management) =====
DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text UNIQUE NOT NULL,
    full_name text NOT NULL,
    phone text,
    address jsonb, -- {street, city, state, zip, lat, lng, formatted}
    role text DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    preferences jsonb DEFAULT '{}', -- {notifications, timezone, language}
    avatar_url text,
    is_active boolean DEFAULT true,
    last_login timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ===== TABLE 2: PRODUCTS (Complete Rental Inventory) =====
DROP TABLE IF EXISTS public.products CASCADE;
CREATE TABLE public.products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    daily_rate numeric(10,2) NOT NULL CHECK (daily_rate >= 0),
    security_deposit numeric(10,2) NOT NULL CHECK (security_deposit >= 0),
    images jsonb DEFAULT '[]', -- Array of Cloudinary URLs
    specifications jsonb DEFAULT '{}', -- {dimensions, weight, capacity, setup_time}
    quantity_available integer DEFAULT 1 CHECK (quantity_available >= 0),
    category text NOT NULL, -- 'tents', 'tables', 'chairs', 'linens', 'lighting', 'audio'
    tags text[] DEFAULT '{}', -- Searchable keywords
    is_active boolean DEFAULT true,
    requires_delivery boolean DEFAULT false,
    setup_time_minutes integer DEFAULT 0,
    weight_lbs numeric(5,2),
    dimensions jsonb, -- {length, width, height, unit}
    care_instructions text,
    replacement_cost numeric(10,2),
    popularity_score integer DEFAULT 0, -- For trending/featured products
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ===== TABLE 3: ORDERS (Complete Rental Management) =====
DROP TABLE IF EXISTS public.orders CASCADE;
CREATE TABLE public.orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number text UNIQUE NOT NULL,
    customer_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
    
    -- Guest customer info (for non-registered users)
    guest_info jsonb, -- {name, email, phone} when customer_id is null
    
    -- Rental period
    rental_start_date date NOT NULL,
    rental_end_date date NOT NULL,
    rental_days integer GENERATED ALWAYS AS (rental_end_date - rental_start_date + 1) STORED,
    
    -- Pickup/Delivery logistics
    fulfillment_type text NOT NULL CHECK (fulfillment_type IN ('pickup', 'delivery')),
    time_slot text, -- 'morning', 'afternoon', 'evening' or custom time
    
    -- Delivery address (when fulfillment_type = 'delivery')
    delivery_address jsonb, -- {street, city, state, zip, lat, lng, distance_miles}
    
    -- Pricing breakdown
    subtotal numeric(10,2) NOT NULL DEFAULT 0,
    delivery_fee numeric(10,2) DEFAULT 0,
    tax_amount numeric(10,2) DEFAULT 0,
    discount_amount numeric(10,2) DEFAULT 0,
    security_deposit numeric(10,2) NOT NULL DEFAULT 0,
    total_amount numeric(10,2) NOT NULL DEFAULT 0,
    
    -- Order lifecycle
    status text DEFAULT 'pending' CHECK (status IN (
        'pending',      -- Order created, awaiting payment
        'confirmed',    -- Payment received, order confirmed
        'preparing',    -- Items being prepared for pickup/delivery
        'ready',        -- Ready for pickup or out for delivery
        'active',       -- Items with customer (rental period active)
        'overdue',      -- Past return date
        'returned',     -- Items returned, pending inspection
        'completed',    -- Order fully completed
        'cancelled'     -- Order cancelled/refunded
    )),
    
    -- Payment tracking
    payment_status text DEFAULT 'pending' CHECK (payment_status IN (
        'pending',      -- No payment received
        'deposit_paid', -- Security deposit authorized
        'paid',         -- Full payment completed
        'failed',       -- Payment failed
        'refunded',     -- Payment refunded
        'partial_refund' -- Partial refund issued
    )),
    
    -- Notes and communication
    customer_notes text,
    admin_notes text,
    special_instructions text,
    
    -- Tracking
    tracking_events jsonb DEFAULT '[]', -- Array of status change events
    
    -- Important dates
    estimated_pickup_date timestamptz,
    actual_pickup_date timestamptz,
    estimated_return_date timestamptz,
    actual_return_date timestamptz,
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Order items junction table (separate from main orders for normalization)
DROP TABLE IF EXISTS public.order_items CASCADE;
CREATE TABLE public.order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id uuid REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity integer NOT NULL CHECK (quantity > 0),
    unit_price numeric(10,2) NOT NULL,
    total_price numeric(10,2) NOT NULL,
    notes text, -- Special handling notes for this item
    created_at timestamptz DEFAULT now()
);

-- ===== TABLE 4: PAYMENTS (Stripe Integration & Financial Tracking) =====
DROP TABLE IF EXISTS public.payments CASCADE;
CREATE TABLE public.payments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
    
    -- Stripe integration
    stripe_payment_intent_id text UNIQUE,
    stripe_charge_id text,
    stripe_refund_id text,
    
    -- Payment details
    amount numeric(10,2) NOT NULL CHECK (amount > 0),
    currency text DEFAULT 'usd',
    payment_type text NOT NULL CHECK (payment_type IN (
        'rental',       -- Main rental payment
        'deposit',      -- Security deposit
        'late_fee',     -- Late return fee
        'damage_fee',   -- Damage/replacement fee
        'delivery',     -- Delivery fee
        'refund'        -- Refund transaction
    )),
    
    -- Status tracking
    status text NOT NULL CHECK (status IN (
        'pending',      -- Payment initiated
        'processing',   -- Payment being processed
        'succeeded',    -- Payment completed successfully
        'failed',       -- Payment failed
        'cancelled',    -- Payment cancelled
        'refunded'      -- Payment refunded
    )),
    
    -- Payment method info
    payment_method jsonb, -- {type, last4, brand, exp_month, exp_year}
    
    -- Additional data
    metadata jsonb DEFAULT '{}',
    failure_reason text,
    refund_reason text,
    
    -- Timestamps
    processed_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ===== TABLE 5: LEADS (Sales Pipeline Management) =====
DROP TABLE IF EXISTS public.leads CASCADE;
CREATE TABLE public.leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Contact information
    email text NOT NULL,
    full_name text,
    phone text,
    company text,
    
    -- Lead source tracking
    source text CHECK (source IN ('website', 'referral', 'social', 'ads', 'phone', 'email', 'other')),
    source_details text, -- Specific campaign, referrer, etc.
    utm_data jsonb, -- {source, medium, campaign, term, content}
    
    -- Event details
    event_type text, -- 'wedding', 'birthday', 'corporate', 'other'
    event_date date,
    event_location text,
    guest_count integer,
    estimated_budget numeric(10,2),
    
    -- Lead content
    message text,
    interested_products text[], -- Array of product categories or names
    
    -- Pipeline management
    status text DEFAULT 'new' CHECK (status IN (
        'new',          -- Just received
        'contacted',    -- Initial contact made
        'quoted',       -- Quote provided
        'follow_up',    -- Awaiting response
        'negotiating',  -- In discussion
        'converted',    -- Became customer
        'lost',         -- Did not convert
        'spam'          -- Marked as spam
    )),
    
    -- Conversion tracking
    converted_to_customer_id uuid REFERENCES public.users(id),
    converted_to_order_id uuid REFERENCES public.orders(id),
    conversion_date timestamptz,
    
    -- Follow-up management
    next_followup_date date,
    followup_notes text,
    priority integer DEFAULT 1 CHECK (priority BETWEEN 1 AND 5), -- 1=low, 5=high
    
    -- Assignment
    assigned_to uuid REFERENCES public.users(id), -- Admin user handling this lead
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- ===== TABLE 6: SETTINGS (System Configuration) =====
DROP TABLE IF EXISTS public.settings CASCADE;
CREATE TABLE public.settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category text NOT NULL, -- 'store', 'business', 'pricing', 'notifications', etc.
    key text NOT NULL,
    value jsonb NOT NULL,
    description text,
    data_type text CHECK (data_type IN ('string', 'number', 'boolean', 'object', 'array')),
    is_public boolean DEFAULT false, -- Can be accessed by non-admin users
    updated_by uuid REFERENCES public.users(id),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    UNIQUE(category, key)
);

-- ===== PERFORMANCE INDEXES =====

-- Users table indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_active ON public.users(is_active);

-- Products table indexes
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_popularity ON public.products(popularity_score DESC);
CREATE INDEX idx_products_search ON public.products USING gin(to_tsvector('english', name || ' ' || coalesce(description, '')));
CREATE INDEX idx_products_tags ON public.products USING gin(tags);

-- Orders table indexes
CREATE INDEX idx_orders_customer ON public.orders(customer_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX idx_orders_dates ON public.orders(rental_start_date, rental_end_date);
CREATE INDEX idx_orders_created ON public.orders(created_at DESC);
CREATE INDEX idx_orders_number ON public.orders(order_number);

-- Order items indexes
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_order_items_product ON public.order_items(product_id);

-- Payments table indexes
CREATE INDEX idx_payments_order ON public.payments(order_id);
CREATE INDEX idx_payments_stripe ON public.payments(stripe_payment_intent_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_type ON public.payments(payment_type);

-- Leads table indexes
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_source ON public.leads(source);
CREATE INDEX idx_leads_created ON public.leads(created_at DESC);
CREATE INDEX idx_leads_followup ON public.leads(next_followup_date) WHERE next_followup_date IS NOT NULL;
CREATE INDEX idx_leads_priority ON public.leads(priority DESC);

-- Settings table indexes
CREATE INDEX idx_settings_category ON public.settings(category);
CREATE INDEX idx_settings_key ON public.settings(key);
CREATE INDEX idx_settings_public ON public.settings(is_public);

-- ===== FUNCTIONS & TRIGGERS =====

-- Auto-generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
    new_number text;
    counter integer;
BEGIN
    -- Generate base number with date
    new_number := 'RD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-';
    
    -- Find the next available counter for today
    SELECT COALESCE(MAX(CAST(RIGHT(order_number, 4) AS integer)), 0) + 1 
    INTO counter
    FROM public.orders 
    WHERE order_number LIKE new_number || '%';
    
    -- Pad with zeros
    new_number := new_number || LPAD(counter::text, 4, '0');
    
    RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Auto-assign order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS trigger AS $$
BEGIN
    IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
        NEW.order_number := generate_order_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION set_order_number();

-- Update timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER trigger_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_settings_updated_at BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Calculate order totals automatically
CREATE OR REPLACE FUNCTION calculate_order_totals()
RETURNS trigger AS $$
DECLARE
    item_total numeric(10,2);
    tax_rate numeric(5,4);
BEGIN
    -- Calculate subtotal from order items
    SELECT COALESCE(SUM(total_price), 0)
    INTO item_total
    FROM public.order_items
    WHERE order_id = NEW.id;
    
    NEW.subtotal := item_total;
    
    -- Get tax rate from settings
    SELECT COALESCE((value->>'rate')::numeric, 0.08)
    INTO tax_rate
    FROM public.settings
    WHERE category = 'pricing' AND key = 'tax_rate';
    
    -- Calculate tax (on subtotal + delivery fee)
    NEW.tax_amount := (NEW.subtotal + COALESCE(NEW.delivery_fee, 0)) * tax_rate;
    
    -- Calculate total
    NEW.total_amount := NEW.subtotal + COALESCE(NEW.delivery_fee, 0) + NEW.tax_amount - COALESCE(NEW.discount_amount, 0);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calculate_order_totals
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION calculate_order_totals();

-- ===== DEFAULT SETTINGS DATA =====
INSERT INTO public.settings (category, key, value, description, data_type, is_public) VALUES
-- Store information
('store', 'info', '{"name": "Rues Design & Rental", "address": "123 Main Street, City, ST 12345", "phone": "(555) 123-4567", "email": "info@ruesdesign.com", "website": "https://ruesdesign.com"}', 'Store contact and location information', 'object', true),

-- Business hours
('business', 'hours', '{"monday": {"open": "09:00", "close": "18:00", "closed": false}, "tuesday": {"open": "09:00", "close": "18:00", "closed": false}, "wednesday": {"open": "09:00", "close": "18:00", "closed": false}, "thursday": {"open": "09:00", "close": "18:00", "closed": false}, "friday": {"open": "09:00", "close": "18:00", "closed": false}, "saturday": {"open": "10:00", "close": "16:00", "closed": false}, "sunday": {"closed": true}}', 'Business operating hours by day', 'object', true),

-- Pickup time slots
('business', 'pickup_slots', '["09:00-12:00", "13:00-17:00", "17:00-20:00"]', 'Available pickup time slots', 'array', true),

-- Delivery zones and pricing
('delivery', 'zones', '[{"min_miles": 0, "max_miles": 5, "fee": 15, "name": "Zone 1"}, {"min_miles": 5, "max_miles": 10, "fee": 25, "name": "Zone 2"}, {"min_miles": 10, "max_miles": 15, "fee": 35, "name": "Zone 3"}]', 'Delivery pricing by distance zones', 'array', true),
('delivery', 'max_distance', '15', 'Maximum delivery distance in miles', 'number', true),

-- Pricing settings
('pricing', 'tax_rate', '0.08', 'Sales tax rate (8%)', 'number', false),
('pricing', 'late_fees', '{"daily_rate": 0.10, "max_percentage": 0.50, "grace_period_hours": 2}', 'Late fee calculation rules', 'object', false),
('pricing', 'damage_assessment', '{"inspection_required": true, "replacement_threshold": 0.75}', 'Damage assessment rules', 'object', false),

-- Notification settings
('notifications', 'email_templates', '{"confirmation": true, "reminder": true, "receipt": true, "late_notice": true}', 'Which email notifications are active', 'object', false),
('notifications', 'reminder_schedule', '{"pickup": 24, "return": 24, "late": 6}', 'Hours before event to send reminders', 'object', false),

-- System settings
('system', 'maintenance_mode', 'false', 'Enable maintenance mode', 'boolean', false),
('system', 'booking_lead_time', '24', 'Minimum hours required between booking and rental start', 'number', true),
('system', 'max_rental_days', '30', 'Maximum rental duration in days', 'number', true)

ON CONFLICT (category, key) DO NOTHING;

-- ===== SAMPLE DATA FOR TESTING =====

-- Sample products
INSERT INTO public.products (name, slug, description, daily_rate, security_deposit, category, tags, specifications, requires_delivery) VALUES
('Classic White Tent 20x20', 'classic-white-tent-20x20', 'Elegant 20x20 white tent perfect for medium gatherings. Seats up to 40 guests comfortably.', 150.00, 300.00, 'tents', ARRAY['tent', 'white', 'medium', 'wedding', 'party'], '{"capacity": "40 guests", "dimensions": "20x20 feet", "setup_time": "2 hours", "weather_resistant": true}', true),
('Premium Marquee 30x40', 'premium-marquee-30x40', 'Large premium marquee for grand celebrations. Perfect for weddings and corporate events.', 350.00, 700.00, 'tents', ARRAY['tent', 'marquee', 'large', 'wedding', 'corporate'], '{"capacity": "120 guests", "dimensions": "30x40 feet", "setup_time": "4 hours", "weather_resistant": true}', true),
('Round Table (8-person)', 'round-table-8-person', 'Classic round table seating 8 guests. Perfect for dining and conversation.', 25.00, 50.00, 'tables', ARRAY['table', 'round', 'dining', '8-person'], '{"diameter": "60 inches", "height": "30 inches", "seats": 8, "material": "wood"}', false),
('Chiavari Chair (Gold)', 'chiavari-chair-gold', 'Elegant gold chiavari chair. Classic wedding and event seating.', 8.00, 15.00, 'chairs', ARRAY['chair', 'chiavari', 'gold', 'wedding', 'elegant'], '{"material": "wood", "color": "gold", "weight_limit": "250 lbs", "stackable": true}', false),
('White Table Linen (120")', 'white-table-linen-120', 'Premium white table linen for round tables. Machine washable polyester.', 12.00, 25.00, 'linens', ARRAY['linen', 'white', 'table', '120-inch'], '{"size": "120 inch round", "material": "polyester", "care": "machine washable", "color": "white"}', false),
('LED String Lights (100ft)', 'led-string-lights-100ft', 'Warm white LED string lights for ambient lighting. Perfect for outdoor events.', 35.00, 70.00, 'lighting', ARRAY['lights', 'LED', 'string', 'warm-white', 'outdoor'], '{"length": "100 feet", "bulbs": "200 LED", "color": "warm white", "power": "plug-in"}', false)

ON CONFLICT (slug) DO NOTHING;
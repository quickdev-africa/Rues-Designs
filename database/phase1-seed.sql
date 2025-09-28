-- Phase 1: Seed Data
-- Run this to populate initial data for testing

-- Insert sample categories
INSERT INTO public.categories (name, slug, description, is_active, sort_order) VALUES
('Party Tents', 'party-tents', 'Premium tents for outdoor events and celebrations', true, 1),
('Tables & Chairs', 'tables-chairs', 'Elegant seating and dining solutions', true, 2),
('Linens & Decor', 'linens-decor', 'Beautiful linens and decorative items', true, 3),
('Audio Visual', 'audio-visual', 'Sound systems and lighting equipment', true, 4),
('Catering Equipment', 'catering-equipment', 'Professional food service equipment', true, 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
WITH category_ids AS (
    SELECT id, slug FROM public.categories
)
INSERT INTO public.products (
    category_id, 
    name, 
    slug, 
    description, 
    pricing, 
    specifications,
    quantity_available,
    requires_delivery,
    delivery_radius_miles,
    is_active
) 
SELECT 
    c.id,
    p.name,
    p.slug,
    p.description,
    p.pricing::jsonb,
    p.specifications::jsonb,
    p.quantity_available,
    p.requires_delivery,
    p.delivery_radius_miles,
    p.is_active
FROM category_ids c
CROSS JOIN (VALUES
    -- Party Tents
    ('party-tents', 'Classic White Tent 20x20', 'classic-white-tent-20x20', 'Elegant 20x20 white tent perfect for medium gatherings', '{"daily_rate": 150, "deposit": 300, "tax_rate": 0.08}', '{"dimensions": "20x20 feet", "capacity": "40 guests", "setup_time": "2 hours"}', 3, true, 25, true),
    ('party-tents', 'Premium Marquee 30x40', 'premium-marquee-30x40', 'Large premium marquee for grand celebrations', '{"daily_rate": 350, "deposit": 700, "tax_rate": 0.08}', '{"dimensions": "30x40 feet", "capacity": "120 guests", "setup_time": "4 hours"}', 2, true, 30, true),
    
    -- Tables & Chairs
    ('tables-chairs', 'Round Table (8-person)', 'round-table-8-person', 'Classic round table seating 8 guests', '{"daily_rate": 25, "deposit": 50, "tax_rate": 0.08}', '{"diameter": "60 inches", "height": "30 inches", "seats": 8}', 20, false, 0, true),
    ('tables-chairs', 'Chiavari Chair (Gold)', 'chiavari-chair-gold', 'Elegant gold chiavari chair', '{"daily_rate": 8, "deposit": 15, "tax_rate": 0.08}', '{"material": "Wood", "color": "Gold", "weight_limit": "250 lbs"}', 100, false, 0, true),
    
    -- Linens & Decor
    ('linens-decor', 'White Table Linen', 'white-table-linen', 'Premium white table linen for round tables', '{"daily_rate": 12, "deposit": 25, "tax_rate": 0.08}', '{"size": "120 inch round", "material": "Polyester", "care": "Machine washable"}', 50, false, 0, true),
    ('linens-decor', 'LED String Lights', 'led-string-lights', 'Warm white LED string lights for ambiance', '{"daily_rate": 35, "deposit": 70, "tax_rate": 0.08}', '{"length": "100 feet", "bulbs": "200 LED", "power": "Plugin required"}', 15, false, 0, true)
) AS p(category_slug, name, slug, description, pricing, specifications, quantity_available, requires_delivery, delivery_radius_miles, is_active)
WHERE c.slug = p.category_slug
ON CONFLICT (slug) DO NOTHING;

-- Create availability for the next 90 days for all products
INSERT INTO public.availability (product_id, date, quantity_available, quantity_reserved)
SELECT 
    p.id,
    d.date,
    p.quantity_available,
    0
FROM public.products p
CROSS JOIN (
    SELECT generate_series(
        CURRENT_DATE,
        CURRENT_DATE + interval '90 days',
        interval '1 day'
    )::date AS date
) d
ON CONFLICT (product_id, date) DO NOTHING;

-- Insert a sample admin user (update the email to match yours)
INSERT INTO public.users (id, email, full_name, is_admin) 
VALUES (
    gen_random_uuid(),
    'admin@ruesdesigns.com', 
    'Admin User',
    true
) ON CONFLICT (email) DO UPDATE SET is_admin = true;
-- Row Level Security Policies for Rental Business
-- Apple-Quality Security | Multi-Tenant Support | Admin/Customer Isolation

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- ===== USERS TABLE POLICIES =====

-- Users can view and update their own profile
CREATE POLICY "users_own_data" ON public.users
    FOR ALL
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Admins can manage all users
CREATE POLICY "admin_users_full_access" ON public.users
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Allow user registration (insert only)
CREATE POLICY "allow_user_registration" ON public.users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- ===== PRODUCTS TABLE POLICIES =====

-- Everyone can view active products (public catalog)
CREATE POLICY "products_public_read" ON public.products
    FOR SELECT
    USING (is_active = true);

-- Admins can manage all products
CREATE POLICY "admin_products_full_access" ON public.products
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- ===== ORDERS TABLE POLICIES =====

-- Customers can view their own orders
CREATE POLICY "customers_own_orders" ON public.orders
    FOR SELECT
    USING (
        auth.uid() = customer_id
        OR (
            customer_id IS NULL 
            AND auth.uid() IS NOT NULL
            AND guest_info->>'email' = (
                SELECT email FROM public.users WHERE id = auth.uid()
            )
        )
    );

-- Customers can create orders
CREATE POLICY "customers_create_orders" ON public.orders
    FOR INSERT
    WITH CHECK (
        auth.uid() = customer_id
        OR customer_id IS NULL -- Allow guest orders
    );

-- Customers can update their own pending orders
CREATE POLICY "customers_update_pending_orders" ON public.orders
    FOR UPDATE
    USING (
        auth.uid() = customer_id
        AND status = 'pending'
    )
    WITH CHECK (
        auth.uid() = customer_id
        AND status = 'pending'
    );

-- Admins can manage all orders
CREATE POLICY "admin_orders_full_access" ON public.orders
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- ===== ORDER ITEMS TABLE POLICIES =====

-- Customers can view items for their own orders
CREATE POLICY "customers_own_order_items" ON public.order_items
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id
            AND customer_id = auth.uid()
        )
    );

-- Customers can add items to their own pending orders
CREATE POLICY "customers_add_order_items" ON public.order_items
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id
            AND customer_id = auth.uid()
            AND status IN ('pending')
        )
    );

-- Customers can update items in their own pending orders
CREATE POLICY "customers_update_order_items" ON public.order_items
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id
            AND customer_id = auth.uid()
            AND status = 'pending'
        )
    );

-- Customers can delete items from their own pending orders
CREATE POLICY "customers_delete_order_items" ON public.order_items
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id
            AND customer_id = auth.uid()
            AND status = 'pending'
        )
    );

-- Admins can manage all order items
CREATE POLICY "admin_order_items_full_access" ON public.order_items
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- ===== PAYMENTS TABLE POLICIES =====

-- Customers can view payments for their own orders
CREATE POLICY "customers_own_payments" ON public.payments
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id
            AND customer_id = auth.uid()
        )
    );

-- Only payment system can create payments (service role)
-- This prevents direct customer manipulation of payment records
CREATE POLICY "service_role_payments_insert" ON public.payments
    FOR INSERT
    WITH CHECK (
        auth.role() = 'service_role'
        OR EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Admins can view and update all payments
CREATE POLICY "admin_payments_full_access" ON public.payments
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- ===== LEADS TABLE POLICIES =====

-- Only admins can access leads (sales pipeline)
CREATE POLICY "admin_leads_full_access" ON public.leads
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Allow anonymous lead submission (contact forms)
CREATE POLICY "anonymous_lead_submission" ON public.leads
    FOR INSERT
    WITH CHECK (true); -- Anyone can submit a lead

-- ===== SETTINGS TABLE POLICIES =====

-- Public settings can be read by everyone
CREATE POLICY "public_settings_read" ON public.settings
    FOR SELECT
    USING (is_public = true);

-- Authenticated users can read public settings
CREATE POLICY "authenticated_public_settings" ON public.settings
    FOR SELECT
    USING (
        is_public = true
        AND auth.uid() IS NOT NULL
    );

-- Admins can manage all settings
CREATE POLICY "admin_settings_full_access" ON public.settings
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- ===== HELPER FUNCTIONS FOR COMMON CHECKS =====

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users
        WHERE id = user_id
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user owns an order
CREATE OR REPLACE FUNCTION public.user_owns_order(user_id uuid, order_id uuid)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.orders
        WHERE id = order_id
        AND customer_id = user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user role
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS text AS $$
DECLARE
    user_role text;
BEGIN
    SELECT role INTO user_role
    FROM public.users
    WHERE id = auth.uid();
    
    RETURN COALESCE(user_role, 'anonymous');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===== BUSINESS LOGIC FUNCTIONS =====

-- Calculate delivery fee based on distance
CREATE OR REPLACE FUNCTION public.calculate_delivery_fee(delivery_miles numeric)
RETURNS numeric AS $$
DECLARE
    zone_fee numeric := 0;
    zone_record record;
BEGIN
    -- Get delivery zones from settings
    FOR zone_record IN 
        SELECT jsonb_array_elements(value) as zone
        FROM public.settings
        WHERE category = 'delivery' AND key = 'zones'
    LOOP
        IF delivery_miles >= (zone_record.zone->>'min_miles')::numeric 
           AND delivery_miles <= (zone_record.zone->>'max_miles')::numeric THEN
            zone_fee := (zone_record.zone->>'fee')::numeric;
            EXIT;
        END IF;
    END LOOP;
    
    RETURN zone_fee;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check product availability for date range
CREATE OR REPLACE FUNCTION public.check_product_availability(
    product_id uuid,
    start_date date,
    end_date date,
    quantity_needed integer DEFAULT 1
)
RETURNS boolean AS $$
DECLARE
    total_available integer;
    total_booked integer := 0;
BEGIN
    -- Get total quantity available
    SELECT quantity_available INTO total_available
    FROM public.products
    WHERE id = product_id;
    
    -- Calculate quantity already booked for overlapping dates
    SELECT COALESCE(SUM(oi.quantity), 0) INTO total_booked
    FROM public.order_items oi
    JOIN public.orders o ON oi.order_id = o.id
    WHERE oi.product_id = check_product_availability.product_id
    AND o.status NOT IN ('cancelled', 'completed')
    AND (
        (o.rental_start_date <= end_date AND o.rental_end_date >= start_date)
    );
    
    RETURN (total_available - total_booked) >= quantity_needed;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Generate quote for order items
CREATE OR REPLACE FUNCTION public.generate_quote(
    items jsonb, -- Array of {product_id, quantity}
    start_date date,
    end_date date,
    delivery_miles numeric DEFAULT 0
)
RETURNS jsonb AS $$
DECLARE
    rental_days integer;
    subtotal numeric := 0;
    security_deposit numeric := 0;
    delivery_fee numeric := 0;
    tax_rate numeric;
    tax_amount numeric;
    total_amount numeric;
    item record;
    product_info record;
    result jsonb;
BEGIN
    -- Calculate rental days
    rental_days := end_date - start_date + 1;
    
    -- Calculate delivery fee
    IF delivery_miles > 0 THEN
        delivery_fee := public.calculate_delivery_fee(delivery_miles);
    END IF;
    
    -- Process each item
    FOR item IN SELECT * FROM jsonb_array_elements(items)
    LOOP
        -- Get product details
        SELECT daily_rate, security_deposit as deposit, name
        INTO product_info
        FROM public.products
        WHERE id = (item.value->>'product_id')::uuid;
        
        IF product_info IS NOT NULL THEN
            subtotal := subtotal + (product_info.daily_rate * (item.value->>'quantity')::integer * rental_days);
            security_deposit := security_deposit + (product_info.deposit * (item.value->>'quantity')::integer);
        END IF;
    END LOOP;
    
    -- Get tax rate
    SELECT COALESCE((value->>'rate')::numeric, 0.08) INTO tax_rate
    FROM public.settings
    WHERE category = 'pricing' AND key = 'tax_rate';
    
    -- Calculate tax and total
    tax_amount := (subtotal + delivery_fee) * tax_rate;
    total_amount := subtotal + delivery_fee + tax_amount;
    
    -- Build result
    result := jsonb_build_object(
        'subtotal', subtotal,
        'security_deposit', security_deposit,
        'delivery_fee', delivery_fee,
        'tax_amount', tax_amount,
        'total_amount', total_amount,
        'rental_days', rental_days,
        'breakdown', jsonb_build_object(
            'daily_rates', subtotal / rental_days,
            'tax_rate', tax_rate,
            'delivery_miles', delivery_miles
        )
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===== ADMIN UTILITIES =====

-- Promote user to admin (can only be called by existing admin or service role)
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(user_email text)
RETURNS boolean AS $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Only admins or service role can promote users
    IF NOT (public.is_admin() OR auth.role() = 'service_role') THEN
        RAISE EXCEPTION 'Insufficient permissions to promote user';
    END IF;
    
    -- Find user by email
    SELECT id INTO target_user_id
    FROM public.users
    WHERE email = user_email;
    
    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'User not found: %', user_email;
    END IF;
    
    -- Update role
    UPDATE public.users
    SET role = 'admin', updated_at = now()
    WHERE id = target_user_id;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===== ANALYTICS FUNCTIONS =====

-- Get order statistics for dashboard
CREATE OR REPLACE FUNCTION public.get_order_stats(date_from date DEFAULT CURRENT_DATE - INTERVAL '30 days')
RETURNS jsonb AS $$
DECLARE
    stats jsonb;
BEGIN
    -- Only admins can view stats
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Admin access required';
    END IF;
    
    SELECT jsonb_build_object(
        'total_orders', COUNT(*),
        'total_revenue', COALESCE(SUM(total_amount), 0),
        'avg_order_value', COALESCE(AVG(total_amount), 0),
        'pending_orders', COUNT(*) FILTER (WHERE status = 'pending'),
        'active_rentals', COUNT(*) FILTER (WHERE status = 'active'),
        'completed_orders', COUNT(*) FILTER (WHERE status = 'completed')
    ) INTO stats
    FROM public.orders
    WHERE created_at >= date_from;
    
    RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
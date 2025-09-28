# Phase 1 Database Setup Instructions

## Overview
This setup will initialize the complete 6-table rental business database with Apple-quality architecture and comprehensive business logic.

## Required Files
- `enhanced-schema.sql` - Complete database schema with all tables, indexes, functions, and triggers
- `enhanced-rls.sql` - Row Level Security policies for multi-tenant security
- `enhanced-rental-ops.ts` - TypeScript operations layer for all database interactions

## Setup Steps

### 1. Supabase Database Setup

#### Step 1: Execute Schema
```sql
-- Copy and paste the entire contents of enhanced-schema.sql into Supabase SQL Editor
-- This creates:
-- - 6 tables: users, products, orders, order_items, payments, leads, settings
-- - All indexes for optimal performance
-- - Business logic functions and triggers
-- - Sample data and default settings
```

#### Step 2: Execute RLS Policies
```sql
-- Copy and paste the entire contents of enhanced-rls.sql into Supabase SQL Editor
-- This creates:
-- - Row Level Security policies for all tables
-- - Admin/customer access controls
-- - Business logic functions
-- - Analytics and utility functions
```

#### Step 3: Verify Tables Created
Expected tables:
- ✅ `public.users` (User profiles and admin management)
- ✅ `public.products` (Rental inventory with categories)
- ✅ `public.orders` (Complete order lifecycle management)
- ✅ `public.order_items` (Order line items with product relationships)
- ✅ `public.payments` (Stripe integration and financial tracking)
- ✅ `public.leads` (Sales pipeline and lead management)
- ✅ `public.settings` (System configuration and business rules)

### 2. Environment Variables

Add to your `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (for payment processing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email service (for notifications)
MAILERSEND_API_TOKEN=your_mailersend_token

# Google Maps (for delivery calculations)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Cloudinary (for image management)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 3. TypeScript Operations Setup

The `enhanced-rental-ops.ts` file provides:
- ✅ Complete type definitions for all database tables
- ✅ CRUD operations for all entities
- ✅ Business logic functions (quotes, availability, analytics)
- ✅ Admin utilities and user management
- ✅ Payment processing helpers
- ✅ Lead management and conversion tracking

### 4. Initial Admin Setup

After database setup, create your first admin user:

```sql
-- Execute in Supabase SQL Editor
-- Replace 'your-email@example.com' with your actual email
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'your-email@example.com',
    crypt('your-password', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '',
    ''
);

-- Then promote to admin
SELECT promote_user_to_admin('your-email@example.com');
```

### 5. Business Configuration

Configure your business settings via the admin panel or SQL:

```sql
-- Update store information
UPDATE public.settings 
SET value = '{"name": "Your Business Name", "address": "Your Address", "phone": "(555) 123-4567", "email": "info@yourbusiness.com"}'
WHERE category = 'store' AND key = 'info';

-- Update delivery zones (customize for your area)
UPDATE public.settings 
SET value = '[{"min_miles": 0, "max_miles": 10, "fee": 20, "name": "Zone 1"}, {"min_miles": 10, "max_miles": 20, "fee": 35, "name": "Zone 2"}]'
WHERE category = 'delivery' AND key = 'zones';

-- Update tax rate for your location
UPDATE public.settings 
SET value = '0.0875'
WHERE category = 'pricing' AND key = 'tax_rate';
```

## Key Features Implemented

### Database Architecture
- **6-Table Schema**: Users, Products, Orders, Order Items, Payments, Leads, Settings
- **Row Level Security**: Multi-tenant security with admin/customer isolation
- **Performance Indexes**: Optimized queries for all common operations
- **Business Logic**: Automated calculations, order numbering, status tracking

### Business Operations
- **Order Management**: Complete lifecycle from quote to completion
- **Inventory Tracking**: Real-time availability checking across date ranges
- **Payment Processing**: Stripe integration with security deposits and fees
- **Lead Pipeline**: Sales management with conversion tracking
- **Settings Management**: Configurable business rules and pricing

### Data Types and Validation
- **TypeScript Definitions**: Complete type safety for all operations
- **Data Validation**: Database constraints and business rule enforcement
- **JSONB Fields**: Flexible storage for addresses, preferences, metadata
- **Audit Trail**: Complete tracking of order status changes and updates

## Next Steps

After Phase 1 setup:
1. ✅ Verify all tables are created in Supabase
2. ✅ Test admin user creation and promotion
3. ✅ Configure business settings
4. ✅ Import initial product catalog
5. ⏭️ Begin Phase 2: Frontend Implementation

## Troubleshooting

### Common Issues
- **RLS Policy Errors**: Ensure you're using the service role key for admin operations
- **Function Errors**: Verify all required extensions are enabled in Supabase
- **Permission Denied**: Check that your user has admin role assigned
- **Missing Tables**: Ensure schema.sql ran completely without errors

### Test Queries
```sql
-- Verify all tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check sample data
SELECT name, category, daily_rate FROM public.products;

-- Test admin user
SELECT email, role FROM public.users WHERE role = 'admin';

-- Verify RLS policies
SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public';
```

## Support
- Review the COMPLETE-IMPLEMENTATION-PLAN.md for full system architecture
- All operations are documented in enhanced-rental-ops.ts
- Database schema includes comprehensive comments for each table and function
# Phase 1 Database Setup Instructions

## 🚀 Quick Setup Guide

### Step 1: Run Schema in Supabase SQL Editor

1. Open your Supabase dashboard
2. Go to **SQL Editor**
3. Create a new query
4. Copy and paste the **entire contents** of each file below **in order**:

#### A) Create Tables & Functions
Copy from `database/phase1-schema.sql` (153 lines) - creates all 6 tables, indexes, and functions

#### B) Set Up Security Policies  
Copy from `database/phase1-rls.sql` (100+ lines) - enables RLS and creates access policies  

#### C) Add Sample Data
Copy from `database/phase1-seed.sql` (50+ lines) - inserts categories, products, and availability

### Step 2: Verify Setup
Visit `/admin/phase1-setup` in your app to verify everything is working.

---

## Manual Verification

Check these in your Supabase dashboard:

### Tables Created (6 total)
- ✅ `users` - Customer profiles with admin flags
- ✅ `categories` - Product categories  
- ✅ `products` - Rental inventory with pricing
- ✅ `orders` - Customer bookings
- ✅ `order_items` - Products per order
- ✅ `availability` - Daily inventory tracking

### Sample Data Inserted
- ✅ 5 categories (Party Tents, Tables & Chairs, etc.)
- ✅ 6+ products with realistic pricing
- ✅ 90 days of availability per product

### Row Level Security
- ✅ RLS enabled on all tables
- ✅ Users see own data, admins see all
- ✅ Public can view active products/categories

---

## Troubleshooting

### "Missing tables" error?
You need to run the SQL scripts first. The app checks for required tables before proceeding.

### "Access denied" on admin pages?
1. Make sure your user exists in the `public.users` table
2. Set `is_admin = true` for your user
3. Use the bootstrap admin feature in `/admin/phase1-setup`

### RLS blocking queries?
Check that policies are created correctly and your user has the right permissions.

---

## Phase 1 Complete! ✅

Once setup is complete, you'll have:
- Complete rental database schema
- Secure access policies  
- Sample data for testing
- Ready for Phase 2 (Cart & Pricing)
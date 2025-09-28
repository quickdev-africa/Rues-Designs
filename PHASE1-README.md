# Phase 1: Database Schema & RLS Implementation

## 🎯 Deliverables
✅ **Schema**: 6 tables (users, products, categories, orders, order_items, availability)  
✅ **RLS Policies**: Owner/admin access patterns implemented  
✅ **Seed Data**: Sample products, categories, and availability records  
✅ **Environment Setup**: Placeholders for Stripe, MailerSend, Google APIs  
✅ **Integration**: Compatible with existing admin pages  

## 📁 Files Created

### Database Schema
- `database/phase1-schema.sql` - Core table definitions and functions
- `database/phase1-rls.sql` - Row Level Security policies  
- `database/phase1-seed.sql` - Sample data for testing

### Code Integration
- `lib/rental-ops.ts` - TypeScript operations for all tables
- `env-variables.md` - Environment variable documentation

## 🚀 Installation Steps

### 1. Run Database Scripts
Execute these in your Supabase SQL Editor in order:

```sql
-- 1. Create tables and functions
\i database/phase1-schema.sql

-- 2. Set up RLS policies
\i database/phase1-rls.sql

-- 3. Add sample data
\i database/phase1-seed.sql
```

### 2. Environment Variables
Add these to your `.env.local`:

```bash
# Already have these
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Add these placeholders for upcoming phases
GOOGLE_MAPS_API_KEY=placeholder
STRIPE_PUBLISHABLE_KEY=placeholder
STRIPE_SECRET_KEY=placeholder
MAILERSEND_API_KEY=placeholder
```

### 3. Update Imports
Replace old operations imports with:

```typescript
import { productOps, categoryOps, orderOps, userOps } from '@/lib/rental-ops'
```

## 📊 Database Schema Overview

### Core Tables
- **users** - Customer profiles with admin flags
- **categories** - Product categories with sorting
- **products** - Rental items with pricing/specs
- **orders** - Rental bookings with payment tracking
- **order_items** - Individual products per order
- **availability** - Daily inventory tracking

### Key Features
- **Auto-generated order numbers** (RD-YYYYMMDD-XXXX format)
- **JSONB pricing** - Flexible rate structures  
- **JSONB specifications** - Product details/dimensions
- **Date-based availability** - Prevents double-booking
- **RLS security** - Users see own data, admins see all

## 🔒 Security Model

### Public Access (no auth required)
- View active categories and products
- Check product availability dates

### User Access (authenticated)
- View/create/edit own orders (pending status only)
- View own profile and order history

### Admin Access (is_admin = true)
- Full CRUD on all tables
- Manage inventory and availability
- View all orders and customers

## ✅ Verification Steps

1. **Tables Created**: Check Supabase dashboard for 6 new tables
2. **Sample Data**: Visit `/admin/products` - should show sample items  
3. **RLS Working**: Non-admin users can't see admin data
4. **Operations**: Import `rental-ops` and test basic queries

## 🔄 Integration with Existing Code

This schema **extends** your current setup:
- Existing admin pages will work unchanged
- New `rental-ops.ts` provides enhanced functionality
- Old `supabase-ops.ts` remains for backward compatibility
- Admin dashboard can now show real rental data

## 📈 Next Steps - Phase 2

With Phase 1 complete, you're ready for:
- **Cart functionality** - Add products to orders
- **Pricing engine** - Calculate totals with taxes/delivery
- **Distance quotes** - Google Maps integration
- **Availability checking** - Real-time inventory

## 🐛 Troubleshooting

### Common Issues
- **RLS blocking queries**: Check user has correct `is_admin` flag
- **Foreign key errors**: Ensure parent records exist (categories before products)
- **Missing tables**: Re-run schema.sql in correct order

### Test Queries
```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Verify sample data
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM categories;

-- Check RLS is working
SELECT * FROM orders; -- Should only show user's own orders
```

Phase 1 provides the foundation for a complete rental management system! 🎉
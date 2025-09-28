📋 **QUICK REFERENCE: SQL SETUP**

## 🗄️ Database Files Ready for Copy-Paste

### **File 1: Enhanced Schema**
📁 **Location**: `database/enhanced-schema.sql`
🎯 **Purpose**: Creates complete 6-table rental business database
⏱️ **Time**: ~2 minutes to execute

**What it creates:**
- `users` - Enhanced customer & admin management 
- `products` - Complete rental inventory with specs
- `orders` - Sophisticated order lifecycle management
- `order_items` - Normalized order line items
- `payments` - Stripe integration & financial tracking
- `leads` - Sales pipeline management
- `settings` - Configurable business rules

**Plus:** Indexes, functions, triggers, sample data

### **File 2: Security Policies**  
📁 **Location**: `database/enhanced-rls.sql`
🎯 **Purpose**: Sets up Row Level Security and business logic
⏱️ **Time**: ~1 minute to execute

**What it creates:**
- RLS policies for all tables
- Admin/customer access controls
- Business logic functions
- Analytics and utility functions

## 🚀 **Copy-Paste Instructions**

1. **Open Supabase Dashboard**
2. **Go to SQL Editor**
3. **Copy entire contents of `enhanced-schema.sql`**
4. **Paste and execute**
5. **Copy entire contents of `enhanced-rls.sql`**
6. **Paste and execute**
7. **Done!** ✨

## ✅ **Verification**
Visit: `http://localhost:3000/admin/integration`
- Health check will verify all tables/functions created
- Migration tools will upgrade existing data
- Ready to use enhanced features!

**Total Setup Time: ~5 minutes** 🎯
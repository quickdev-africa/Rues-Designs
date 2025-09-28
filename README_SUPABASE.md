# Supabase Schema & RLS

This project includes SQL migrations under `supabase/migrations`:

- `20250924_init_schema.sql`: Creates core tables (`users`, `categories`, `products`, `product_categories`, `orders`, `order_items`, `availability`, `reviews`, `bookings`) and `updated_at` triggers.
- `20250924_rls_policies.sql`: Enables RLS and adds policies (public read for products/categories, admin write; users can read/update their own profile; orders/bookings/reviews have scoped access).
- `20250924_seed_minimal.sql`: Minimal categories/products seed for local/dev.

How to apply (Supabase SQL Editor)
- Paste each file contents into the Supabase SQL editor and run in order:
  1. `20250924_init_schema.sql`
  2. `20250924_rls_policies.sql`
  3. `20250924_seed_minimal.sql`

Recommended env vars (see `.env.example`)
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Stripe: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- MailerSend: `MAILERSEND_API_KEY`, `MAILERSEND_FROM_EMAIL`
- Google Maps: `GOOGLE_MAPS_API_KEY`

Code expectations
- `products.categories` is a `text[]` used by the UI; `product_categories` is available for strict joins if needed.
- Admin-only writes rely on `users.is_admin = true`. After signing in once, set your admin flag in Supabase.

Next
-- If you want CLI-based migrations with `supabase` CLI, I can add a script and format files accordingly.

Bootstrap admin after first login
- Sign in via `/admin/login`.
- In Supabase → Auth → Users, copy your UUID, then:
  `update public.users set is_admin = true where id = 'YOUR-USER-UUID';`

Generate and use DB types (optional but recommended)
```
brew install supabase/tap/supabase
cd "/Users/user/Rues Designs/RuesDesignl"
supabase gen types typescript --project-id YOUR_PROJECT_REF --schema public > lib/database.types.ts
```
Then import types in `lib/supabase.ts`:
`import type { Database } from './database.types'`

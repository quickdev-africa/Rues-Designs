# Phase 1 Environment Variables
# Add these to your .env.local file

# Phase 1 - Basic setup (already have these)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Phase 2 - Distance & Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Phase 3 - Payments
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Phase 4 - Email
MAILERSEND_API_KEY=your_mailersend_api_key
MAILERSEND_FROM_EMAIL=orders@yourdomain.com
MAILERSEND_FROM_NAME="Rues Designs"

# Phase 5 - Admin & Operations
ADMIN_NOTIFICATION_EMAIL=admin@yourdomain.com
CRON_SECRET=your_random_cron_secret

# Optional - File uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
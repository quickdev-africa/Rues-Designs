# RuesDesignl Party Rental Website

This is a Next.js 14 project for the RuesDesignl party rental website, featuring TypeScript, App Router, Tailwind CSS, DaisyUI, ESLint, Prettier, and a modern folder structure. It includes essential dependencies for rapid development and scalability.

## Features
- Next.js 14 with App Router
- TypeScript support
- Tailwind CSS & DaisyUI for UI
- ESLint & Prettier for code quality
- Supabase integration (Auth, DB)
- React Hook Form for forms
- Lucide React icons
- Date-fns for date utilities
- Material UI components

## Folder Structure
- `components/` - Reusable React components
- `lib/` - Utility libraries and helpers
- `styles/` - Global and custom styles
- `public/` - Static assets (images, etc.)

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in your environment variables.
3. Run the development server:
   ```sh
   npm run dev
   ```

## Environment Variables
See `.env.example` for required variables.

### Cloudinary Configuration
Add these to `.env.local` for image uploads via Cloudinary:

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (e.g., `your_cloud_name`)
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- Optional: `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` if you use an unsigned preset

Uploads use a signed approach via `/api/cloudinary/sign` to protect your secret.

## Supabase CRUD Code Samples

### Add a Product
```ts
import { supabase } from './lib/supabase';

export async function addProduct(product) {
  const { data, error } = await supabase.from('products').insert(product).select('id').single();
  if (error) throw error;
  return data.id;
}
```

### Get All Products
```ts
import { supabase } from './lib/supabase';

export async function getProducts() {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}
```

### Update a Booking
```ts
import { supabase } from './lib/supabase';

export async function updateBooking(bookingId, data) {
  const { error } = await supabase.from('bookings').update(data).eq('id', bookingId);
  if (error) throw error;
}
```

### Delete a Review
```ts
import { supabase } from './lib/supabase';

export async function deleteReview(reviewId) {
  const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
  if (error) throw error;
}
```

### Subscribe to Auth Changes
```ts
import { supabase } from './lib/supabase';

export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => callback(session));
}
```

---

© 2025 RuesDesignl. All rights reserved.

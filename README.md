# RuesDesignl Party Rental Website

This is a Next.js 14 project for the RuesDesignl party rental website, featuring TypeScript, App Router, Tailwind CSS, DaisyUI, ESLint, Prettier, and a modern folder structure. It includes essential dependencies for rapid development and scalability.

## Features
- Next.js 14 with App Router
- TypeScript support
- Tailwind CSS & DaisyUI for UI
- ESLint & Prettier for code quality
- Firebase integration
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

## Firestore CRUD Code Samples

### Add a Product
```ts
import { db } from './lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function addProduct(product) {
  const docRef = await addDoc(collection(db, 'products'), product);
  return docRef.id;
}
```

### Get All Products
```ts
import { db } from './lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

### Update a Booking
```ts
import { db } from './lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export async function updateBooking(bookingId, data) {
  const bookingRef = doc(db, 'bookings', bookingId);
  await updateDoc(bookingRef, data);
}
```

### Delete a Review
```ts
import { db } from './lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export async function deleteReview(reviewId) {
  await deleteDoc(doc(db, 'reviews', reviewId));
}
```

### Listen to User Profile Changes
```ts
import { db } from './lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export function listenToUserProfile(userId, callback) {
  return onSnapshot(doc(db, 'users', userId), (doc) => {
    callback(doc.data());
  });
}
```

## Advanced Firestore Queries & Batch Operations

### Query Bookings by Status and Date
```ts
import { db } from './lib/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export async function getBookingsByStatusAndDate(status, startDate) {
  const q = query(
    collection(db, 'bookings'),
    where('status', '==', status),
    where('dates.start', '>=', startDate),
    orderBy('dates.start', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

### Get Products in a Category
```ts
import { db } from './lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function getProductsByCategory(categoryId) {
  const q = query(
    collection(db, 'products'),
    where('categories', 'array-contains', categoryId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

### Batch Write: Add Multiple Reviews
```ts
import { db } from './lib/firebase';
import { writeBatch, collection, doc } from 'firebase/firestore';

export async function addMultipleReviews(reviews) {
  const batch = writeBatch(db);
  reviews.forEach((review) => {
    const reviewRef = doc(collection(db, 'reviews'));
    batch.set(reviewRef, review);
  });
  await batch.commit();
}
```

### Batch Update: Mark Products as Archived
```ts
import { db } from './lib/firebase';
import { writeBatch, doc } from 'firebase/firestore';

export async function archiveProducts(productIds) {
  const batch = writeBatch(db);
  productIds.forEach((id) => {
    const productRef = doc(db, 'products', id);
    batch.update(productRef, { status: 'archived' });
  });
  await batch.commit();
}
```

---

© 2025 RuesDesignl. All rights reserved.

import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, writeBatch } from 'firebase/firestore';

export async function addProduct(product) {
  const docRef = await addDoc(collection(db, 'products'), product);
  return docRef.id;
}

export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateBooking(bookingId, data) {
  const bookingRef = doc(db, 'bookings', bookingId);
  await updateDoc(bookingRef, data);
}

export async function deleteReview(reviewId) {
  await deleteDoc(doc(db, 'reviews', reviewId));
}

export async function getProductsByCategory(categoryId) {
  const q = query(
    collection(db, 'products'),
    where('categories', 'array-contains', categoryId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addMultipleReviews(reviews) {
  const batch = writeBatch(db);
  reviews.forEach((review) => {
    const reviewRef = doc(collection(db, 'reviews'));
    batch.set(reviewRef, review);
  });
  await batch.commit();
}

export async function archiveProducts(productIds) {
  const batch = writeBatch(db);
  productIds.forEach((id) => {
    const productRef = doc(db, 'products', id);
    batch.update(productRef, { status: 'archived' });
  });
  await batch.commit();
}

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// Error handling and retry logic
export async function safeSignInWithEmail(email, password, retries = 3) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (retries > 0) return safeSignInWithEmail(email, password, retries - 1);
    throw error;
  }
}

export async function safeSignInWithGoogle(retries = 3) {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    if (retries > 0) return safeSignInWithGoogle(retries - 1);
    throw error;
  }
}

// Connection status monitoring
export function monitorAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

export default app;

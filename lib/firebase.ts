// Compatibility shim to avoid breaking imports while migrating to Supabase.
// If you still import { db, auth, storage } from './firebase', update code to use Supabase equivalents.
// For now, we export minimal placeholders and guidance.

export const db = undefined as unknown as never
export const auth = undefined as unknown as never
export const storage = undefined as unknown as never

export function monitorAuthState() {
  throw new Error('Firebase auth is no longer available. Use supabase.auth APIs from lib/supabase.ts')
}

export async function safeSignInWithEmail() {
  throw new Error('Use supabase.auth.signInWithPassword({ email, password })')
}

export async function safeSignInWithGoogle() {
  throw new Error('Use supabase.auth.signInWithOAuth({ provider: "google" })')
}

export default {}

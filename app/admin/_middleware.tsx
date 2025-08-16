import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase/auth';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function middleware(req: NextRequest) {
  // Only run on /admin routes
  const url = req.nextUrl.clone();
  if (!url.pathname.startsWith('/admin')) return NextResponse.next();

  // Check Firebase Auth session (client-side only, so this is a placeholder)
  // In production, use a server-side session or custom claims for admin
  // For now, redirect to /demo if not logged in
  // (You may want to implement a more robust SSR auth solution)
  // This is a placeholder for client-side admin guard
  return NextResponse.next();
}

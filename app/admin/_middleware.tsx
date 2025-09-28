import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Only run on /admin routes
  const url = req.nextUrl.clone();
  if (!url.pathname.startsWith('/admin')) return NextResponse.next();

  // Admin auth handled via Supabase (see AdminGuard)
  // In production, use Supabase server-side session or RLS policies
  // For now, redirect to /demo if not logged in
  // (You may want to implement a more robust SSR auth solution)
  // This is a placeholder for client-side admin guard
  return NextResponse.next();
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { userOps } from '../../../../lib/seamless-integration';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const headerToken = authHeader.replace('Bearer ', '').trim();
    const body = await req.json();
    const { email, is_admin = false } = body as { email: string; is_admin?: boolean };
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    // Enhanced admin validation with seamless fallback
    let isCallerAdmin = false;
    if (headerToken && headerToken.length > 20) {
      const authClient = createClient(url, anonKey, { global: { headers: { Authorization: `Bearer ${headerToken}` } } });
      const { data: userData, error: userErr } = await authClient.auth.getUser();
      if (!userErr && userData?.user?.id) {
        try {
          // Try enhanced admin check first
          isCallerAdmin = await userOps.isAdmin(userData.user.id);
        } catch (enhancedError) {
          // Fallback to legacy admin check
          console.warn('Enhanced admin check failed, falling back to legacy:', enhancedError);
          const service = createClient(url, serviceKey);
          const { data: profile, error: profErr } = await service
            .from('users')
            .select('is_admin, role')
            .eq('id', userData.user.id)
            .single();
          if (!profErr && (profile?.is_admin || profile?.role === 'admin')) isCallerAdmin = true;
        }
      }
    }

    if (!isCallerAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Enhanced user creation/update with backward compatibility
    try {
      // Try enhanced user promotion for admins
      if (is_admin) {
        await userOps.promoteToAdmin(email);
        return NextResponse.json({ ok: true, promoted: true, message: 'User promoted to admin' });
      } else {
        // For staff, create/update using enhanced schema with fallback
        const supabase = createClient(url, serviceKey);
        const { data: existing, error: selErr } = await supabase
          .from('users')
          .select('id, display_name, full_name')
          .eq('email', email)
          .maybeSingle();
        if (selErr) throw selErr;

        if (existing) {
          const { error: updErr } = await supabase
            .from('users')
            .update({ 
              role: 'staff',
              is_admin: false,
              is_active: true,
                            full_name: null // Will be set when user updates profile
            } as any)
            .eq('id', existing.id);
          if (updErr) throw updErr;
          return NextResponse.json({ ok: true, updated: true });
        }

        // Create new staff user
        const { error: insErr } = await supabase
          .from('users')
          .insert({
            id: crypto.randomUUID(),
            email,
            role: 'staff',
            is_admin: false,
            is_active: true,
            preferences: {}
          } as any);
        if (insErr) throw insErr;

        return NextResponse.json({ ok: true, created: true });
      }
    } catch (enhancedError: any) {
      console.warn('Enhanced user operations failed, falling back to legacy:', enhancedError);
      
      // Fallback to legacy user creation
      const supabase = createClient(url, serviceKey);
      const { data: existing, error: selErr } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();
      if (selErr) throw selErr;

      if (existing) {
        const { error: updErr } = await supabase
          .from('users')
          .update({ is_admin: is_admin, role: is_admin ? 'admin' : 'staff' } as any)
          .eq('id', existing.id);
        if (updErr) throw updErr;
        return NextResponse.json({ ok: true, updated: true });
      }

      const { error: insErr } = await supabase
        .from('users')
        .insert({
          id: crypto.randomUUID(),
          email,
          is_admin,
          role: is_admin ? 'admin' : 'staff',
        } as any);
      if (insErr) throw insErr;

      return NextResponse.json({ ok: true, created: true });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

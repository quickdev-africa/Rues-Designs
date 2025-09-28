import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, email, bootstrap } = body;
    
    if (!bootstrap || !userId || !email) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const supabase = createClient(url, serviceKey);

    // Use service role to bypass RLS and set admin flag
    const { error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: email,
        full_name: email,
  role: 'admin',
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) throw error;

    return NextResponse.json({ ok: true, message: 'Admin access granted' });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
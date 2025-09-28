import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// POST: rotate and return a new token (copy this to env for client fallback if desired)
export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(url, serviceKey);
    const token = crypto.randomUUID() + crypto.randomUUID();
    const { error } = await supabase.rpc('set_config', { k: 'ADMIN_INVITE_SECRET', v: token });
    if (error) throw error;
    return NextResponse.json({ ok: true, token });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

// GET: fetch current token (masked) if needed for diagnostics
export async function GET() {
  try {
    const supabase = createClient(url, serviceKey);
    const { data, error } = await supabase.from('config').select('value').eq('key', 'ADMIN_INVITE_SECRET').maybeSingle();
    if (error) throw error;
    const value = data?.value || '';
    const masked = value ? value.slice(0, 4) + '...' + value.slice(-4) : '';
    return NextResponse.json({ ok: true, masked });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

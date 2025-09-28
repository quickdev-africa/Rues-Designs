import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Support Tickets
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, subject, message } = body;
    const { error } = await supabase
      .from('support_tickets')
      .insert({
        user_id: userId,
        subject,
        message,
        status: 'open',
      });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Support error' }, { status: 400 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ tickets: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Support error' }, { status: 400 });
  }
}

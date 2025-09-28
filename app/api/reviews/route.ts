import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: List all reviews
export async function GET() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ reviews: data });
}

// POST: Create a new review
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { error } = await supabase
      .from('reviews')
      .insert(body);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// PUT: Update a review
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...fields } = body;
    const { error } = await supabase
      .from('reviews')
      .update(fields)
      .eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE: Delete a review
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

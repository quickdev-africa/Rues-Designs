import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: List all categories
export async function GET() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ categories: data });
}

// POST: Create a new category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { error } = await supabase
      .from('categories')
      .insert(body);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// PUT: Update a category
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...fields } = body;
    const { error } = await supabase
      .from('categories')
      .update(fields)
      .eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE: Delete a category
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import Supabase client as needed

export async function GET() {
  // TODO: Fetch FAQs
  return NextResponse.json({ success: true, data: [] });
}

export async function POST(req: NextRequest) {
  // TODO: Create new FAQ
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  // TODO: Update FAQ
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  // TODO: Delete FAQ
  return NextResponse.json({ success: true });
}

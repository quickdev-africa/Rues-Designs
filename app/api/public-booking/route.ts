import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const BookingSchema = z.object({
  customerName: z.string().min(2),
  zip: z.string().min(3).max(10),
  zone: z.string().min(1),
  deliveryFee: z.number().min(0),
  status: z.string().min(1),
  total: z.number().min(0),
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const booking = BookingSchema.parse(body);
    const { error } = await supabase
      .from('orders')
      .insert({
        customerName: booking.customerName,
        zip: booking.zip,
        zone: booking.zone,
        deliveryFee: booking.deliveryFee,
        status: booking.status,
        total: booking.total,
      });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Invalid request' }, { status: 400 });
  }
}

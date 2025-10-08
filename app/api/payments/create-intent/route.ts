import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return new Response(JSON.stringify({ error: 'Stripe not configured' }), { status: 501 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-08-27.basil',
  });
  try {
    const body = await request.json();
    const { orderId, amount, currency } = body;
    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: currency || 'usd',
      metadata: { orderId },
    });
    // Save payment record in Supabase
    const { error } = await supabase
      .from('payments')
      .insert({
        order_id: orderId,
        stripe_payment_intent_id: paymentIntent.id,
        amount,
        currency: currency || 'usd',
        status: paymentIntent.status,
      });
    if (error) throw error;
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Payment error' }, { status: 400 });
  }
}

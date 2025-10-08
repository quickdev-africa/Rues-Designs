import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  const body = await req.json();
  const { items, email, name, zip, zone, deliveryFee } = body;

  // Calculate total
  const cartTotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const grandTotal = cartTotal + deliveryFee;

  // Create Stripe PaymentIntent
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: grandTotal * 100, // amount in kobo
      currency: "ngn",
      receipt_email: email,
      metadata: {
        name,
        zip,
        zone,
        items: JSON.stringify(items),
      },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

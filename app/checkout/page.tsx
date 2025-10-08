"use client";
// ...existing code...
import { useCart } from "../../components/ui/CartContext";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutPage() {
  const { items, rentalDays, setRentalDays, clearCart } = useCart();
  const [pickupTime, setPickupTime] = useState("");
  const pickupSlots = ["9:00 AM - 11:00 AM", "12:00 PM - 2:00 PM", "3:00 PM - 5:00 PM"];
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState<'delivery' | 'pickup' | null>(null);
  const [zipApplied, setZipApplied] = useState(false);
  const [phone, setPhone] = useState("");
  const businessAddress = "123 Main St, City, Country";
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState("");
  // Start at sign-in/guest selection unless user is already logged in and step is not explicitly set to 'select'
  const [step, setStep] = useState<'select' | 'account' | 'guest' | 'checkout'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const stepParam = params.get('step');
      if (stepParam === 'select' || stepParam === 'account' || stepParam === 'guest' || stepParam === 'checkout') {
        return stepParam;
      }
    }
    return 'select';
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Always start at sign-in/guest selection unless user is already logged in
  React.useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (data?.user) {
        setUser(data.user);
        // Only set step to checkout if not explicitly set to 'select'
        if (window.location.search.indexOf('step=select') === -1) {
          setStep('checkout');
        }
      } else {
        setStep('select');
      }
    });
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
    if (error) setAuthError(error.message);
    else {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setStep('checkout');
    }
  }
  const [zip, setZip] = useState("");
  const [zone, setZone] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [stripeIntent, setStripeIntent] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity * rentalDays, 0);
  const grandTotal = cartTotal + deliveryFee;

  // Zone table from backend
  const zoneTable = [
    { id: "A", name: "Core", coverage: "North Laurel...", zip_codes: ["20707"], distance: "0–5 miles", price: 19, notes: "" },
    { id: "B", name: "Howard County", coverage: "Howard County..", zip_codes: ["20723"], distance: "5–10 miles", price: 31, notes: "" },
    { id: "C", name: "PG/Anne Arundel", coverage: "PG/Anne Arundel", zip_codes: ["20724"], distance: "10–15 miles", price: 44, notes: "" },
    { id: "D", name: "Distant suburbs", coverage: "Distant suburbs", zip_codes: ["21075"], distance: "15–25 miles", price: 63, notes: "" },
    { id: "E", name: "Expansion", coverage: "Baltimore/DC", zip_codes: [], distance: "25+ miles", price: 0, notes: "Case-by-case" },
  ];

  function handleZipChange(e: any) {
    const value = e.target.value;
    setZip(value);
    if (method === 'pickup') {
      setZone('Pickup');
      setDeliveryFee(0);
      return;
    }
    // Find zone by zip code
    let found = false;
    for (const zoneObj of zoneTable) {
      if (zoneObj.zip_codes.includes(value)) {
        setZone(`Zone ${zoneObj.id} (${zoneObj.name})`);
        setDeliveryFee(zoneObj.price);
        found = true;
        break;
      }
    }
    if (!found) {
      setZone("Expansion (Custom)");
      setDeliveryFee(0);
    }
  }

  function handleCheckout() {
    setCheckoutError("");
    // Validate required fields
    if (!name || !email || !zip || !phone || !rentalDays) {
      setCheckoutError("Please fill in all required fields.");
      return;
    }
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        email,
        name,
        zip,
        zone,
        deliveryFee,
        phone,
        rentalDays,
        method,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.clientSecret) {
          setStripeIntent(data.clientSecret);
        } else {
          setCheckoutError("Payment error: " + (data.error || "Unknown error"));
        }
      })
      .catch(err => {
        setCheckoutError("Network error: " + err.message);
      });
  }

  return (
  <div className="p-6 max-w-3xl mx-auto">
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      {/* Only show order summary on delivery/pickup selection and zip code entry steps */}
      {(step === 'guest' || (step === 'checkout' && user)) && method === null && (
        <span className="font-medium text-[#D4AF36] underline text-lg">
          Show Order Summary: <span className="font-bold">${items.length > 0 ? items.reduce((sum, item) => sum + item.price * item.quantity * rentalDays, 0) : 0}</span>
        </span>
      )}
      {method === 'delivery' && !zipApplied && (
        <span className="font-medium text-[#D4AF36] underline text-lg">
          Show Order Summary: <span className="font-bold">${items.length > 0 ? items.reduce((sum, item) => sum + item.price * item.quantity * rentalDays, 0) : 0}</span>
        </span>
      )}
    </div>
    {/* Delivery/Pickup selection after login/guest */}
    {(step === 'guest' || (step === 'checkout' && user)) && method === null && (
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center">How would you like to get your order?</h2>
        <div className="flex justify-center gap-4 mb-6">
          <button className={`border rounded-lg px-8 py-6 text-xl font-semibold flex items-center gap-2 ${method === 'delivery' ? 'border-blue-600' : 'border-gray-300'}`} onClick={() => setMethod('delivery')}>
            <span>🚚</span> I'd like it delivered
          </button>
          <button className={`border rounded-lg px-8 py-6 text-xl font-semibold flex items-center gap-2 ${method === 'pickup' ? 'border-blue-600' : 'border-gray-300'}`} onClick={() => setMethod('pickup')}>
            <span>🛍️</span> I'll pick it up
          </button>
        </div>
      </div>
    )}
    {/* Pickup: show form immediately */}
    {method === 'pickup' && (
      <form className="space-y-4">
        <input className="input input-bordered w-full" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
        <input className="input input-bordered w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="input input-bordered w-full" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
        <div className="flex gap-4 items-center mb-4">
          <label className="block font-semibold text-base">Number of Rental Days</label>
          <input type="number" min={1} className="input input-bordered w-24 font-semibold text-base" value={rentalDays} onChange={e => setRentalDays(Number(e.target.value))} required />
        </div>
        <div className="flex gap-4">
          <div className="font-semibold">Zone: <span className="text-[#D4AF36]">Pickup</span></div>
          <div className="font-semibold">Delivery Fee: <span className="text-[#D4AF36]">Free</span></div>
        </div>
        <div className="bg-gray-50 p-6 rounded mb-4">
          <div className="font-bold text-lg mb-2">Pickup Location</div>
          <div className="mb-4 text-base text-gray-700">{businessAddress}</div>
          <div className="font-bold text-lg mb-2">Order Summary</div>
          {items.length === 0 ? (
            <div className="text-gray-400 text-base">Cart is empty.</div>
          ) : (
            <ul className="mb-4">
              {items.map(item => (
                <li key={item.id} className="flex justify-between text-base mb-2">
                  <span className="font-medium">{item.name} <span className="text-gray-500">x {item.quantity} @ ${item.price} per day</span></span>
                  <span className="font-semibold">${item.price * item.quantity * rentalDays}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-between text-base mb-1">
            <span className="font-medium">Rental Days:</span>
            <span className="font-semibold text-base">{rentalDays}</span>
          </div>
          <div className="flex justify-between text-base font-bold mb-1">
            <span>Subtotal:</span>
            <span>${items.reduce((sum, item) => sum + item.price * item.quantity * rentalDays, 0)}</span>
          </div>
          <div className="flex justify-between text-base mb-1">
            <span className="font-medium">Delivery Fee:</span>
            <span className="font-semibold">Free</span>
          </div>
          <div className="flex justify-between text-xl mt-2">
            <span className="font-bold">Total:</span>
            <span className="text-[#D4AF36] font-bold">${items.reduce((sum, item) => sum + item.price * item.quantity * rentalDays, 0)}</span>
          </div>
        </div>
        {/* Error message */}
        {checkoutError && (
          <div className="text-red-600 mb-2">{checkoutError}</div>
        )}
        {/* Stripe payment UI */}
        {stripeIntent ? (
          <Elements stripe={stripePromise} options={{ clientSecret: stripeIntent }}>
            <StripePaymentForm stripeIntent={stripeIntent} onSuccess={() => { setConfirmed(true); clearCart(); }} />
          </Elements>
        ) : (
          <button type="button" className="w-full bg-[#D4AF36] text-white py-3 rounded font-semibold text-lg" onClick={handleCheckout} disabled={items.length === 0}>Pay with Card</button>
        )}
        {confirmed && (
          <div className="mt-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
            <strong>Order Confirmed!</strong> <br />
            Stripe Payment Intent: {stripeIntent}
          </div>
        )}
      </form>
    )}
    {/* Delivery: show zip code input, then form */}
    {method === 'delivery' && !zipApplied && (
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Enter a zip code to get delivery options.</h2>
        <div className="flex justify-center gap-2">
          <input className="input input-bordered w-48" placeholder="Zip Code" value={zip} onChange={handleZipChange} />
          <button className="bg-[#D4AF36] text-white px-6 py-2 rounded font-semibold" onClick={() => setZipApplied(true)}>Apply</button>
        </div>
      </div>
    )}
    {method === 'delivery' && zipApplied && (
      <form className="space-y-4">
        <input className="input input-bordered w-full" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
        <input className="input input-bordered w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="input input-bordered w-full" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
        <input className="input input-bordered w-full" placeholder="Delivery Address" value={address} onChange={e => setAddress(e.target.value)} required />
        <div className="flex gap-4 items-center mb-4">
          <label className="block font-semibold text-base">Number of Rental Days</label>
          <input type="number" min={1} className="input input-bordered w-24 font-semibold text-base" value={rentalDays} onChange={e => setRentalDays(Number(e.target.value))} required />
        </div>
        <div className="flex gap-4">
          <div className="font-semibold">Zone: <span className="text-[#D4AF36]">{zone}</span></div>
          <div className="font-semibold">Delivery Fee: <span className="text-[#D4AF36]">${deliveryFee}</span></div>
        </div>
        <div className="bg-gray-50 p-6 rounded mb-4">
          <div className="font-bold text-lg mb-2">Order Summary</div>
          {items.length === 0 ? (
            <div className="text-gray-400 text-base">Cart is empty.</div>
          ) : (
            <ul className="mb-4">
              {items.map(item => (
                <li key={item.id} className="flex justify-between text-base mb-2">
                  <span className="font-medium">{item.name} <span className="text-gray-500">x {item.quantity} @ ${item.price} per day</span></span>
                  <span className="font-semibold">${item.price * item.quantity * rentalDays}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-between text-base mb-1">
            <span className="font-medium">Rental Days:</span>
            <span className="font-semibold text-base">{rentalDays}</span>
          </div>
          <div className="flex justify-between text-base font-bold mb-1">
            <span>Subtotal:</span>
            <span>${items.reduce((sum, item) => sum + item.price * item.quantity * rentalDays, 0)}</span>
          </div>
          <div className="flex justify-between text-base mb-1">
            <span className="font-medium">Delivery Fee:</span>
            <span className="font-semibold">${deliveryFee}</span>
          </div>
          <div className="flex justify-between text-xl mt-2">
            <span className="font-bold">Total:</span>
            <span className="text-[#D4AF36] font-bold">${items.reduce((sum, item) => sum + item.price * item.quantity * rentalDays, 0) + deliveryFee}</span>
          </div>
        </div>
        {/* Error message */}
        {checkoutError && (
          <div className="text-red-600 mb-2">{checkoutError}</div>
        )}
        {/* Stripe payment UI */}
        {stripeIntent ? (
          <Elements stripe={stripePromise} options={{ clientSecret: stripeIntent }}>
            <StripePaymentForm stripeIntent={stripeIntent} onSuccess={() => { setConfirmed(true); clearCart(); }} />
          </Elements>
        ) : (
          <button type="button" className="w-full bg-[#D4AF36] text-white py-3 rounded font-semibold text-lg" onClick={handleCheckout} disabled={items.length === 0}>Proceed to Payment</button>
        )}
        {confirmed && (
          <div className="mt-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
            <strong>Order Confirmed!</strong> <br />
            Stripe Payment Intent: {stripeIntent}
          </div>
        )}
      </form>
    )}
    {/* Account/Guest selection remains unchanged */}
    {step === 'select' && (
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Check out with your Account</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input className="input input-bordered w-full" type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
            <input className="input input-bordered w-full" type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
            <button type="submit" className="w-full bg-[#D4AF36] text-white py-2 rounded font-semibold">Sign In & Checkout</button>
            {authError && <div className="text-red-600">{authError}</div>}
          </form>
        </div>
        <div className="flex-1 border-l pl-8">
          <h2 className="text-2xl font-semibold mb-4">Guest Checkout</h2>
          <p className="mb-4">Proceed and create an account later.</p>
          <button className="w-full bg-[#D4AF36] text-white py-2 rounded font-semibold text-lg" onClick={() => setStep('guest')}>Continue as Guest</button>
        </div>
      </div>
    )}
  </div>
  );
}

// StripePaymentForm component
function StripePaymentForm({ stripeIntent, onSuccess }: { stripeIntent: string, onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(stripeIntent, {
      payment_method: {
        card: cardElement!,
      },
    });
    if (result.error) {
      setError(result.error.message || "Payment failed");
      setProcessing(false);
    } else if (result.paymentIntent?.status === "succeeded") {
      setError("");
      setProcessing(false);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded" />
      {error && <div className="text-red-600">{error}</div>}
      <button type="submit" className="w-full bg-[#31473A] text-white py-3 rounded font-semibold text-lg" disabled={processing}>
        {processing ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
}

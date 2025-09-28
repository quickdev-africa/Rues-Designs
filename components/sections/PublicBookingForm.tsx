"use client";
import { useState } from 'react';

export default function PublicBookingForm() {
  const [customerName, setCustomerName] = useState('');
  const [zip, setZip] = useState('');
  const [zone, setZone] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [status, setStatus] = useState('pending');
  const [total, setTotal] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  async function handleZoneLookup() {
    setLookupLoading(true);
    setLookupError('');
    try {
      const res = await fetch('/api/zone-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zip }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Zone not found');
      setZone(data.zone);
      setDeliveryFee(data.price);
    } catch (err: any) {
      setLookupError(err.message);
      setZone('');
      setDeliveryFee(0);
    } finally {
      setLookupLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError('');
    setSubmitted(false);
    try {
      const res = await fetch('/api/public-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, zip, zone, deliveryFee, status, total }),
      });
      if (!res.ok) throw new Error('Booking failed');
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message);
    }
  }

  return (
    <form className="max-w-lg mx-auto p-8 bg-white rounded shadow space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Book Your Event</h2>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Name</label>
        <input
          className="input input-bordered w-full text-gray-900 bg-gray-50"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Zip Code</label>
        <div className="flex gap-2">
          <input
            className="input input-bordered w-full text-gray-900 bg-gray-50"
            value={zip}
            onChange={e => setZip(e.target.value)}
            required
          />
          <button
            type="button"
            className="btn btn-secondary"
            disabled={lookupLoading || !zip}
            onClick={handleZoneLookup}
          >
            {lookupLoading ? '...' : 'Lookup'}
          </button>
        </div>
        {zone && (
          <div className="mt-2 text-sm text-gray-700">
            <span className="font-semibold">Zone:</span> {zone} &nbsp;|&nbsp;
            <span className="font-semibold">Delivery Fee:</span> ${deliveryFee}
          </div>
        )}
        {lookupError && <div className="mt-2 text-red-600 text-sm">{lookupError}</div>}
      </div>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Total (excl. delivery)</label>
        <input
          type="number"
          className="input input-bordered w-full text-gray-900 bg-gray-50"
          value={total}
          onChange={e => setTotal(Number(e.target.value))}
          min={0}
          step={0.01}
          required
        />
      </div>
      <div className="mt-4">
        <strong>Booking Total (incl. delivery):</strong> ${total + deliveryFee}
      </div>
      <button className="btn btn-primary w-full text-white font-bold" type="submit">
        Book Now
      </button>
      {submitError && <div className="mt-4 text-red-600">{submitError}</div>}
      {submitted && <div className="mt-4 text-green-600">Booking successful! We’ll contact you soon.</div>}
    </form>
  );
}

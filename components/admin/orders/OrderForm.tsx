"use client";
import { useState } from 'react';


interface OrderFormProps {
  onSubmit: (order: any) => void;
  initialData?: any;
}

export default function OrderForm({ onSubmit, initialData }: OrderFormProps) {
  const [customerName, setCustomerName] = useState(initialData?.customerName || '');
  const [status, setStatus] = useState(initialData?.status || 'pending');
  const [total, setTotal] = useState(initialData?.total || 0);
  const [zip, setZip] = useState(initialData?.zip || '');
  const [zone, setZone] = useState(initialData?.zone || '');
  const [deliveryFee, setDeliveryFee] = useState(initialData?.deliveryFee || 0);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  return (
    <form
      className="space-y-6 bg-white rounded-lg shadow p-8 max-w-lg mx-auto"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ customerName, status, total, zip, zone, deliveryFee });
      }}
    >
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Customer Name</label>
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
            onClick={async () => {
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
            }}
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
        <label className="block mb-2 font-semibold text-gray-700">Status</label>
        <select
          className="select select-bordered w-full text-gray-900 bg-gray-50"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Total</label>
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
      <button className="btn btn-primary w-full text-white font-bold" type="submit">
        {initialData ? 'Update Order' : 'Create Order'}
      </button>
    </form>
  );
}

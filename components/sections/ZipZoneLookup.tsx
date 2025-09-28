"use client";
import { useState } from 'react';

export default function ZipZoneLookup() {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<{ zone: string; price: number } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/zone-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zip }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Zone & Delivery Fee Lookup</h2>
      <form onSubmit={handleLookup} className="space-y-4">
        <input
          type="text"
          value={zip}
          onChange={e => setZip(e.target.value)}
          placeholder="Enter Zip Code"
          className="border px-3 py-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-black text-gold px-4 py-2 rounded w-full font-semibold"
          disabled={loading}
        >
          {loading ? 'Looking up...' : 'Find Zone & Fee'}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <div><strong>Zone:</strong> {result.zone}</div>
          <div><strong>Delivery Fee:</strong> ${result.price}</div>
        </div>
      )}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
}

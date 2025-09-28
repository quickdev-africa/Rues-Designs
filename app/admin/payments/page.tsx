"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("payments")
        .select("id, order_id, stripe_payment_intent_id, amount, currency, status, created_at")
        .order("created_at", { ascending: false });
      if (!active) return;
      setPayments(error ? [] : data || []);
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>
      {loading ? (
        <div>Loading payments...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Payment ID</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Stripe Intent</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Currency</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {payments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-900 font-mono">{payment.id}</td>
                  <td className="px-4 py-2 text-gray-900 font-mono">{payment.order_id}</td>
                  <td className="px-4 py-2 text-gray-900 font-mono">{payment.stripe_payment_intent_id}</td>
                  <td className="px-4 py-2 text-gray-900 font-semibold">${payment.amount}</td>
                  <td className="px-4 py-2 text-gray-900">{payment.currency}</td>
                  <td className="px-4 py-2 text-gray-900">{payment.status}</td>
                  <td className="px-4 py-2 text-gray-700">{new Date(payment.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {payments.length === 0 && <div className="p-4 text-center text-gray-500">No payments found.</div>}
        </div>
      )}
    </div>
  );
}
// ...existing code...

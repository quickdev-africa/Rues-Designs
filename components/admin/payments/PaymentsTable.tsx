import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function PaymentsTable() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from('payments')
        .select('id, customer, status, amount, method, created_at')
        .order('created_at', { ascending: false });
      if (!active) return;
      setPayments(data || []);
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);
  if (loading) return <div>Loading payments...</div>;
  if (!payments.length) return <div>No payments found.</div>;
  return (
    <div className="admin-ui overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gold" style={{ borderColor: '#D4AF36' }}>
        <thead className="bg-gold/10">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">ID</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Method</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gold/20">
          {payments.map(p => (
            <tr key={p.id} className="hover:bg-gold/10">
              <td className="px-4 py-2 text-black">{p.id}</td>
              <td className="px-4 py-2 text-black">{p.customer}</td>
              <td className="px-4 py-2 text-black">{p.status}</td>
              <td className="px-4 py-2 text-black">${p.amount}</td>
              <td className="px-4 py-2 text-black">{p.method}</td>
              <td className="px-4 py-2 text-black">{new Date(p.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

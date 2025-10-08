import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function CustomersTable() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from('customers')
        .select('id, name, email, phone, rental_history')
        .order('name', { ascending: true });
      if (!active) return;
      setCustomers(data || []);
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);
  if (loading) return <div>Loading customers...</div>;
  if (!customers.length) return <div>No customers found.</div>;
  return (
    <div className="admin-ui overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gold" style={{ borderColor: '#D4AF36' }}>
        <thead className="bg-gold/10">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Email</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Phone</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Rental History</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gold/20">
          {customers.map(c => (
            <tr key={c.id} className="hover:bg-gold/10">
              <td className="px-4 py-2 text-black">{c.name}</td>
              <td className="px-4 py-2 text-black">{c.email}</td>
              <td className="px-4 py-2 text-black">{c.phone}</td>
              <td className="px-4 py-2 text-black">{Array.isArray(c.rental_history) ? c.rental_history.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function InventoryTable() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from('inventory')
        .select('id, name, stock, status, last_maintenance, damaged, lost')
        .order('name', { ascending: true });
      if (!active) return;
      if (error) {
        setItems([]);
        setError(error.message);
      } else {
        setItems(data || []);
      }
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);

  if (loading) return <div>Loading inventory...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!items.length) return <div>No inventory items found.</div>;

  return (
    <div className="admin-ui overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gold" style={{ borderColor: '#D4AF36' }}>
        <thead className="bg-gold/10">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Stock</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Damaged</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Lost</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Last Maintenance</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gold/20">
          {items.map(item => (
            <tr key={item.id} className="hover:bg-gold/10">
              <td className="px-4 py-2 text-black">{item.name}</td>
              <td className="px-4 py-2 text-black">{item.stock}</td>
              <td className="px-4 py-2 text-black">{item.status}</td>
              <td className="px-4 py-2 text-black">{item.damaged || 0}</td>
              <td className="px-4 py-2 text-black">{item.lost || 0}</td>
              <td className="px-4 py-2 text-black">{item.last_maintenance ? new Date(item.last_maintenance).toLocaleDateString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

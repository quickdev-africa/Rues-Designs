"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function OperationsTable() {
  const [operations, setOperations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from('operations')
        .select('id, type, driver, warehouse, scheduled_at, status')
        .order('scheduled_at', { ascending: false });
      if (!active) return;
      setOperations(data || []);
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);
  if (loading) return <div>Loading operations...</div>;
  if (!operations.length) return <div>No operations found.</div>;
  return (
    <div className="admin-ui overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gold" style={{ borderColor: '#D4AF36' }}>
        <thead className="bg-gold/10">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Type</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Driver</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Warehouse</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Scheduled</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gold/20">
          {operations.map(o => (
            <tr key={o.id} className="hover:bg-gold/10">
              <td className="px-4 py-2 text-black">{o.type}</td>
              <td className="px-4 py-2 text-black">{o.driver}</td>
              <td className="px-4 py-2 text-black">{o.warehouse}</td>
              <td className="px-4 py-2 text-black">{o.scheduled_at ? new Date(o.scheduled_at).toLocaleString() : '-'}</td>
              <td className="px-4 py-2 text-black">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

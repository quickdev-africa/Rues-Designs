import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function SupportTable() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('id, subject, status, created_at, customer')
        .order('created_at', { ascending: false });
      if (!active) return;
      setTickets(data || []);
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);
  if (loading) return <div>Loading support tickets...</div>;
  if (!tickets.length) return <div>No support tickets found.</div>;
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.subject}</td>
              <td>{t.status}</td>
              <td>{t.customer}</td>
              <td>{new Date(t.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

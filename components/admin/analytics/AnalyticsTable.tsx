import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AnalyticsTable() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('id, user_id, event_type, event_data, created_at')
        .order('created_at', { ascending: false });
      if (!active) return;
      setEvents(data || []);
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);
  if (loading) return <div>Loading analytics...</div>;
  if (!events.length) return <div>No analytics events found.</div>;
  return (
    <div className="admin-ui overflow-x-auto bg-white rounded-lg shadow p-4">
      <table className="min-w-full divide-y divide-gold" style={{ borderColor: '#D4AF36' }}>
        <thead className="bg-gold/10">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Event ID</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">User ID</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Type</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Data</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gold/20">
          {events.map(event => (
            <tr key={event.id} className="hover:bg-gold/10">
              <td className="px-4 py-2 text-black font-mono">{event.id}</td>
              <td className="px-4 py-2 text-black font-mono">{event.user_id || '-'}</td>
              <td className="px-4 py-2 text-black">{event.event_type}</td>
              <td className="px-4 py-2 text-black text-xs">{JSON.stringify(event.event_data)}</td>
              <td className="px-4 py-2 text-black">{new Date(event.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

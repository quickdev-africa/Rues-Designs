"use client";
import { useEffect, useState } from "react";
import AdminGuard from "../../../components/admin/AdminGuard";
import { supabase } from "../../../lib/supabase";

export default function AdminAnalyticsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("analytics_events")
        .select("id, user_id, event_type, event_data, created_at")
        .order("created_at", { ascending: false });
      if (!active) return;
      setEvents(error ? [] : data || []);
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);

  return (
    <AdminGuard>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Analytics Events</h1>
        {loading ? (
          <div>Loading analytics...</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Event ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Data</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {events.map(event => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-900 font-mono">{event.id}</td>
                    <td className="px-4 py-2 text-gray-900 font-mono">{event.user_id || '-'}</td>
                    <td className="px-4 py-2 text-gray-900">{event.event_type}</td>
                    <td className="px-4 py-2 text-gray-900 text-xs">{JSON.stringify(event.event_data)}</td>
                    <td className="px-4 py-2 text-gray-700">{new Date(event.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {events.length === 0 && <div className="p-4 text-center text-gray-500">No analytics events found.</div>}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}

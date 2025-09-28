"use client";
import { useEffect, useState } from "react";
import AdminGuard from "../../../components/admin/AdminGuard";
import { supabase } from "../../../lib/supabase";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("support_tickets")
        .select("id, user_id, subject, message, status, created_at")
        .order("created_at", { ascending: false });
      if (!active) return;
      setTickets(error ? [] : data || []);
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);

  return (
    <AdminGuard>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Support Tickets</h1>
        {loading ? (
          <div>Loading tickets...</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ticket ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Message</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {tickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-900 font-mono">{ticket.id}</td>
                    <td className="px-4 py-2 text-gray-900 font-mono">{ticket.user_id || '-'}</td>
                    <td className="px-4 py-2 text-gray-900">{ticket.subject}</td>
                    <td className="px-4 py-2 text-gray-900 text-xs">{ticket.message}</td>
                    <td className="px-4 py-2 text-gray-900">{ticket.status}</td>
                    <td className="px-4 py-2 text-gray-700">{new Date(ticket.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {tickets.length === 0 && <div className="p-4 text-center text-gray-500">No support tickets found.</div>}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}

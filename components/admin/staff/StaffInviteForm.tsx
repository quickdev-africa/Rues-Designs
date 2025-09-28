"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { userOps } from "../../../lib/seamless-integration";

export default function StaffInviteForm({ onInvited }: { onInvited?: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("staff");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Enhanced invitation with seamless fallback
      try {
        // Try enhanced user promotion first
        if (role === 'admin') {
          await userOps.promoteToAdmin(email);
          setSuccess("Admin user promoted successfully!");
        } else {
          // For staff invites, use the existing API
          const { data: sessionData } = await supabase.auth.getSession();
          const accessToken = sessionData?.session?.access_token;
          const res = await fetch('/api/admin/invite', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken || ''}`,
            },
            body: JSON.stringify({ email, role: 'staff' }),
          });
          if (!res.ok) {
            const j = await res.json().catch(() => ({}));
            throw new Error(j.error || `Invite failed (${res.status})`);
          }
          setSuccess("Staff invitation sent!");
        }
      } catch (enhancedError: any) {
        // Fallback to original API for both admin and staff
        console.warn('Enhanced invite failed, falling back to legacy:', enhancedError);
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData?.session?.access_token;
        const res = await fetch('/api/admin/invite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken || ''}`,
          },
          body: JSON.stringify({ email, role }),
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error || `Invite failed (${res.status})`);
        }
        setSuccess(`${role === 'admin' ? 'Admin' : 'Staff'} invitation sent!`);
      }
      
      setEmail("");
      setRole("staff");
      if (onInvited) onInvited();
    } catch (err: any) {
      setError(err.message || "Error sending invite");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mb-6" onSubmit={handleInvite}>
      <div className="flex gap-2 items-end">
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          type="email"
          placeholder="Staff Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <button className="bg-gray-900 text-white rounded-md px-4 py-2 hover:bg-black transition-colors disabled:opacity-60" type="submit" disabled={loading}>
          {loading ? "Inviting..." : "Invite"}
        </button>
      </div>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {success && <div className="text-green-600 mt-2">{success}</div>}
    </form>
  );
}

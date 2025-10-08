"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function StaffTable() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from('users')
  .select('id, email, display_name, created_at, status, role')
        .order('created_at', { ascending: false });
      if (!active) return;
      if (error) {
        setStaff([]);
      } else {
        setStaff(data || []);
      }
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);

  async function handleRoleChange(id: string, role: string) {
    setError("");
    try {
      const { error } = await supabase.from('users').update({ role }).eq('id', id);
      if (error) throw error;
      setStaff(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    } catch (err: any) {
      setError(err.message || "Error updating role");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this staff account?")) return;
    setError("");
    try {
      const { error } = await supabase.from('users').delete().eq('id', id);
      if (error) throw error;
      setStaff(prev => prev.filter(u => u.id !== id));
    } catch (err: any) {
      setError(err.message || "Error deleting staff");
    }
  }

  async function handleBatchDelete() {
    if (!selected.length) return;
    if (!confirm(`Delete ${selected.length} selected staff accounts?`)) return;
    setBatchLoading(true);
    setError("");
    try {
      const { error } = await supabase.from('users').delete().in('id', selected);
      if (error) throw error;
      setStaff(prev => prev.filter(u => !selected.includes(u.id)));
      setSelected([]);
    } catch (err: any) {
      setError(err.message || "Error deleting staff");
    } finally {
      setBatchLoading(false);
    }
  }

  function handleSelect(id: string, checked: boolean) {
    setSelected(prev => checked ? [...prev, id] : prev.filter(sid => sid !== id));
  }

  function handleSelectAll(checked: boolean) {
    setSelected(checked ? staff.map(s => s.id) : []);
  }

  if (loading) return <div className="text-gray-700">Loading...</div>;
  if (!staff.length) return <div className="text-gray-700">No staff found.</div>;

  return (
    <div className="overflow-x-auto">
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="mb-3 flex gap-2 items-center">
        <button
          className="text-white bg-[#D4AF36] hover:bg-[#C19A2B] text-sm rounded-md px-3 py-1.5"
          onClick={handleBatchDelete}
          disabled={!selected.length || batchLoading}
        >
          {batchLoading ? "Deleting..." : `Delete Selected (${selected.length})`}
        </button>
        <span className="text-xs text-gray-600">Batch actions: select multiple staff to delete</span>
      </div>
      <table className="w-full border border-gray-200 rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left text-sm text-gray-700">
            <th className="p-3">
              <input
                type="checkbox"
                checked={selected.length === staff.length && staff.length > 0}
                onChange={e => handleSelectAll(e.target.checked)}
              />
            </th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Created</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selected.includes(user.id)}
                  onChange={e => handleSelect(user.id, e.target.checked)}
                />
              </td>
              <td className="p-3">{user.display_name || "-"}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <select
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={user.role}
                  onChange={e => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td className="p-3">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  (user as any).status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {(user as any).status || 'active'}
                </span>
              </td>
              <td className="p-3">{user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}</td>
              <td className="p-3">
                <button
                  className="text-white bg-[#D4AF36] hover:bg-[#C19A2B] text-xs rounded-md px-2.5 py-1"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

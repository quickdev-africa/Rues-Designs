"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function StaffTable() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setStaff(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function handleRoleChange(id: string, role: string) {
    setError("");
    try {
      await updateDoc(doc(db, "users", id), { role });
    } catch (err: any) {
      setError(err.message || "Error updating role");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this staff account?")) return;
    setError("");
    try {
      await deleteDoc(doc(db, "users", id));
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
      await Promise.all(selected.map(id => deleteDoc(doc(db, "users", id))));
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

  if (loading) return <div>Loading...</div>;
  if (!staff.length) return <div>No staff found.</div>;

  return (
    <div className="overflow-x-auto">
      {error && <div className="text-error mb-2">{error}</div>}
      <div className="mb-2 flex gap-2 items-center">
        <button
          className="btn btn-sm btn-error"
          onClick={handleBatchDelete}
          disabled={!selected.length || batchLoading}
        >
          {batchLoading ? "Deleting..." : `Delete Selected (${selected.length})`}
        </button>
        <span className="text-xs text-gray-500">Batch actions: select multiple staff to delete</span>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === staff.length && staff.length > 0}
                onChange={e => handleSelectAll(e.target.checked)}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((user) => (
            <tr key={user.id} className="hover:bg-base-200 transition">
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(user.id)}
                  onChange={e => handleSelect(user.id, e.target.checked)}
                />
              </td>
              <td>{user.name || user.displayName || "-"}</td>
              <td>{user.email}</td>
              <td>
                <select
                  className="select select-xs"
                  value={user.role || "user"}
                  onChange={e => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td>
                <span className={`badge ${user.status === "active" ? "badge-success" : "badge-ghost"}`}>{user.status || "active"}</span>
              </td>
              <td>{user.createdAt?.toDate?.().toLocaleDateString?.() || "-"}</td>
              <td>
                <button
                  className="btn btn-xs btn-error"
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

"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../lib/firebase";

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
      await addDoc(collection(db, "users"), {
        email,
        role,
        status: "invited",
        createdAt: serverTimestamp(),
      });
      setSuccess("Invitation sent!");
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
          className="input input-bordered w-full"
          type="email"
          placeholder="Staff Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <select
          className="select select-bordered"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Inviting..." : "Invite"}
        </button>
      </div>
      {error && <div className="text-error mt-2">{error}</div>}
      {success && <div className="text-success mt-2">{success}</div>}
    </form>
  );
}

"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    let active = true;
    async function ensureRecoverySession() {
      try {
        // After clicking the email link, Supabase redirects here with a recovery session
        // available via getSession(). If absent, guide user to request reset again.
        const { data } = await supabase.auth.getSession();
        if (!active) return;
        if (!data.session) {
          setError("Invalid or expired recovery link. Please request a new reset email.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    ensureRecoverySession();
    return () => {
      active = false;
    };
  }, []);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage("Password updated. You can now sign in.");
      setTimeout(() => router.replace("/admin/login"), 1200);
    } catch (e: any) {
      setError(e?.message || "Failed to update password");
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading…</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleUpdate} className="bg-white border border-gray-200 p-8 rounded-lg w-full max-w-md flex flex-col gap-4 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Set a new password</h1>
        <label className="text-sm font-medium text-gray-700" htmlFor="password">New password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
          placeholder="••••••••"
          required
        />
        <label className="text-sm font-medium text-gray-700" htmlFor="confirm">Confirm password</label>
        <input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
          placeholder="••••••••"
          required
        />
        <button type="submit" className="mt-2 bg-gray-900 text-white py-2 rounded-md hover:bg-black transition-colors">Update password</button>
        {error && <div className="text-red-600 text-sm" role="alert">{error}</div>}
        {message && <div className="text-green-700 text-sm">{message}</div>}
      </form>
    </div>
  );
}

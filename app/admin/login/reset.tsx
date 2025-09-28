"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import Link from "next/link";

export default function AdminResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/login/update-password`,
      });
      if (error) throw error;
      setMessage("Password reset email sent. Check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleReset} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-primary text-white py-2 rounded" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
        <p className="text-sm text-gray-600">After clicking the email link, you will be redirected here to set a new password.</p>
        <Link href="/admin/login" className="text-blue-600 text-sm underline text-center">Back to login</Link>
        {message && <div className="text-green-600 text-sm">{message}</div>}
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    </div>
  );
}

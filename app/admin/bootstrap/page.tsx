"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminBootstrapPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleBootstrap() {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      if (!user) {
        setError("You must be signed in to bootstrap admin access.");
        return;
      }

      // Use service role to bypass RLS and directly update
      const res = await fetch('/api/admin/bootstrap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          email: user.email,
          bootstrap: true 
        })
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Failed (${res.status})`);
      }

      setMessage("✅ Admin access granted! Redirecting to dashboard...");
      setTimeout(() => router.replace("/admin"), 1500);
    } catch (e: any) {
      setError(e?.message || "Bootstrap failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border border-gray-200 p-8 rounded-lg w-full max-w-md text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Admin Bootstrap</h1>
        <p className="text-sm text-gray-600 mb-6">
          This will promote your current account to admin. Use this only once to get initial access.
        </p>
        <button 
          onClick={handleBootstrap} 
          disabled={loading}
          className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black disabled:opacity-60"
        >
          {loading ? "Promoting to admin..." : "Grant Admin Access"}
        </button>
        {message && <div className="mt-4 text-green-700 text-sm">{message}</div>}
        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
      </div>
    </div>
  );
}
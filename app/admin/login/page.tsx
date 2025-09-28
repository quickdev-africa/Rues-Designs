"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.replace("/admin");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
    setLoading(false);
  }

  async function handleCreateAdmin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Create new user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      if (error) throw error;
      // Insert admin role in public.users table
      const userId = data.user?.id;
      if (userId) {
        const { error: dbError } = await supabase.from("users").upsert([
          {
            id: userId,
            email,
            role: "admin",
            full_name: fullName,
            is_active: true,
            updated_at: new Date().toISOString()
          }
        ]);
        if (dbError) throw dbError;
      }
      setSuccess(`Admin created! You can now login with ${email}`);
      setEmail("");
      setPassword("");
      setFullName("");
      setIsCreatingAdmin(false);
    } catch (err: any) {
      setError(err.message || "Failed to create admin");
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
      if (error) throw error;
      // Supabase will redirect after OAuth
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={isCreatingAdmin ? handleCreateAdmin : handleLogin}
        className="bg-white border border-gray-200 p-8 rounded-lg w-full max-w-md flex flex-col gap-4 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          {isCreatingAdmin ? "Create Admin" : "Admin Login"}
        </h1>
        {isCreatingAdmin && (
          <>
            <label className="text-sm font-medium text-gray-700" htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Admin Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
              required
            />
          </>
        )}
        <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
          required
        />
        <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
          required
        />
        <button type="submit" className="mt-2 bg-gray-900 text-white py-2 rounded-md hover:bg-black transition-colors disabled:opacity-60" disabled={loading}>
          {loading ? (isCreatingAdmin ? "Creating Admin..." : "Logging in...") : (isCreatingAdmin ? "Create Admin" : "Sign in")}
        </button>
        {!isCreatingAdmin && (
          <button type="button" onClick={handleGoogle} className="bg-white text-gray-900 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-60" disabled={loading}>
            {loading ? "Please wait..." : "Continue with Google"}
          </button>
        )}
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => {
              setIsCreatingAdmin(!isCreatingAdmin);
              setError("");
              setSuccess("");
              setEmail("");
              setPassword("");
              setFullName("");
            }}
            className="text-gray-700 underline hover:text-gray-900"
          >
            {isCreatingAdmin ? "Back to Login" : "Create New Admin"}
          </button>
        </div>
        {error && <div className="text-red-600 text-sm" role="alert">{error}</div>}
        {success && <div className="text-green-600 text-sm" role="alert">{success}</div>}
      </form>
    </div>
  );
}

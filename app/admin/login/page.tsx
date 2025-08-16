"use client";
import { useState } from "react";
import { auth } from "../../../lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/admin");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.replace("/admin");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-primary text-white py-2 rounded" disabled={loading}>
          {loading ? "Logging in..." : "Login as Admin"}
        </button>
        <button type="button" onClick={handleGoogle} className="bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? "Please wait..." : "Login with Google"}
        </button>
        <Link href="/admin/login/reset" className="text-blue-600 text-sm underline text-center">Forgot password?</Link>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    </div>
  );
}

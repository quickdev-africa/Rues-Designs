import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#D4AF36]" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#D4AF36]" required />
          </div>
          <button type="submit" className="w-full bg-[#D4AF36] text-white py-2 rounded-md font-semibold hover:bg-[#C09F27] transition-colors">Login</button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <Link href="/register" className="text-[#D4AF36] font-medium hover:underline">Register</Link>
        </div>
      </div>
    </main>
  );
}

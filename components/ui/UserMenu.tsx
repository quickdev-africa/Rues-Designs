"use client";
import { useState } from 'react';
import Link from 'next/link';
import { HiUserCircle } from 'react-icons/hi';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  // This would come from your auth context in a real app
  const isLoggedIn = false;
  
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="My Account"
        onClick={() => setOpen(v => !v)}
        title="My Account"
      >
        <HiUserCircle size={28} className="text-gray-500" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
          {isLoggedIn ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                <p className="text-xs text-gray-500 truncate">customer@example.com</p>
              </div>
              <Link href="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                My Account
              </Link>
              <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                Orders
              </Link>
              <Link href="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                Wishlist
              </Link>
              <div className="border-t border-gray-100 mt-1 pt-1">
                <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                  Admin Dashboard
                </Link>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Account</p>
                <p className="text-xs text-gray-500">Login or register to continue</p>
              </div>
              <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                Login
              </Link>
              <Link href="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

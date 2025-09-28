'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import Link from 'next/link';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // For demo purposes - login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    remember: false
  });
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login process
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  // Handle login form changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  return (
    <main>
      <PageHeader
        title="My Account"
        subtitle={isLoggedIn ? "Manage your account settings and view orders" : "Sign in to access your account"}
        bgImage="/images/stock/category-accent-chairs.png"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isLoggedIn ? (
          // Login form
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
              
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <a href="/account/forgot-password" className="text-sm text-[#D4AF37] hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      checked={loginForm.remember}
                      onChange={handleLoginChange}
                      className="h-4 w-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] text-white py-2 px-4 rounded-md hover:bg-[#C09F27] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/account/register" className="text-[#D4AF37] hover:underline">
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Account dashboard when logged in
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Account Dashboard</h2>
                <button
                  onClick={handleLogout}
                  className="text-sm text-[#D4AF37] hover:underline"
                >
                  Sign Out
                </button>
              </div>
              <p className="text-gray-600 mt-1">Welcome back, Demo User!</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Orders</h3>
                  <p className="text-gray-600 mb-3">View and track your recent orders.</p>
                  <Link href="/account/orders" className="text-[#D4AF37] hover:underline text-sm font-medium">
                    View Orders →
                  </Link>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Account Details</h3>
                  <p className="text-gray-600 mb-3">Update your personal information.</p>
                  <Link href="/account/details" className="text-[#D4AF37] hover:underline text-sm font-medium">
                    Edit Details →
                  </Link>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Wishlist</h3>
                  <p className="text-gray-600 mb-3">Items you've saved for later.</p>
                  <Link href="/account/wishlist" className="text-[#D4AF37] hover:underline text-sm font-medium">
                    View Wishlist →
                  </Link>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
                
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700">
                      <div>Order #</div>
                      <div>Date</div>
                      <div>Status</div>
                      <div className="text-right">Total</div>
                    </div>
                  </div>
                  
                  <div className="divide-y">
                    {/* Sample order data */}
                    {[
                      { id: '1234', date: 'Aug 10, 2025', status: 'Completed', total: '$348.50' },
                      { id: '1233', date: 'Jul 29, 2025', status: 'Processing', total: '$218.00' },
                      { id: '1232', date: 'Jun 15, 2025', status: 'Completed', total: '$592.75' }
                    ].map((order) => (
                      <div key={order.id} className="px-4 py-3">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="text-[#D4AF37] hover:underline">
                            <Link href={`/account/orders/${order.id}`}>#{order.id}</Link>
                          </div>
                          <div className="text-gray-600">{order.date}</div>
                          <div>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-right font-medium">{order.total}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

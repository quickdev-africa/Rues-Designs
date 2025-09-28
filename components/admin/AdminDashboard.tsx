import React from "react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats cards will go here */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-2xl font-semibold text-gray-900">--</div>
          <div className="text-sm text-gray-600">Total Products</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-2xl font-semibold text-gray-900">--</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-2xl font-semibold text-gray-900">--</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-2xl font-semibold text-gray-900">--</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
      </div>
      {/* More dashboard widgets, charts, and recent activity will go here */}
      <div className="mt-10">
        {/* Zone & Delivery Fee Lookup Widget */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Zone & Delivery Fee Lookup</h2>
          <div className="max-w-md">
            {/* Import and render the ZipZoneLookup component */}
            {/* @ts-ignore-next-line */}
            {require('../sections/ZipZoneLookup').default()}
          </div>
        </div>
      </div>
    </div>
  );
}

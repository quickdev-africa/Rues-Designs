import React from "react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats cards will go here */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
          <div className="text-2xl font-bold">--</div>
          <div className="text-gray-500">Total Products</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
          <div className="text-2xl font-bold">--</div>
          <div className="text-gray-500">Total Bookings</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
          <div className="text-2xl font-bold">--</div>
          <div className="text-gray-500">Total Users</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
          <div className="text-2xl font-bold">--</div>
          <div className="text-gray-500">Total Revenue</div>
        </div>
      </div>
      {/* More dashboard widgets, charts, and recent activity will go here */}
    </div>
  );
}

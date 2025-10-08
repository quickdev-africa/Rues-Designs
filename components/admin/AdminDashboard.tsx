"use client";
import React, { useEffect, useState } from "react";
import ZipZoneLookup from "../sections/ZipZoneLookup";
import { supabase } from "../../lib/supabase";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, created_at");
      if (!error && data) setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <div className="admin-ui">
      <h1 className="text-2xl font-bold text-black mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Modern stat cards */}
        {["Total Products", "Total Bookings", "Total Users", "Total Revenue"].map((label, idx) => (
          <div
            key={label}
            className="bg-white border-2 border-gold rounded-xl p-6 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl flex flex-col items-start"
            style={{ borderColor: "#D4AF36" }}
          >
            <div className="text-3xl font-bold text-black mb-2">--</div>
            <div className="text-sm font-semibold text-gold tracking-wide" style={{ color: "#D4AF36" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
      {/* More dashboard widgets, charts, and recent activity will go here */}
      {/* User List Section */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-2" style={{ color: "#D4AF36" }}>
          New User Registrations
        </h2>
        <div className="bg-white rounded-xl shadow p-4">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 font-bold text-black">Email</th>
                <th className="py-2 px-4 font-bold text-black">Registered At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className="hover:bg-gold/10">
                  <td className="py-2 px-4 text-black">{user.email}</td>
                  <td className="py-2 px-4 text-black">
                    {new Date(user.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="py-2 px-4 text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

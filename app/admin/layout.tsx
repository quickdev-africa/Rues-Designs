import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      <main className="flex-1 bg-white p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}

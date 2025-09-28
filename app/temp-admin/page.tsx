"use client";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function TempAdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <AdminDashboard />
      </main>
    </div>
  );
}
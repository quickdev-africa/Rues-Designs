"use client";
import AdminGuard from "../../../components/admin/AdminGuard";

export default function AdminSettingsPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h1>
        <div className="bg-white border border-gray-200 rounded-lg p-5 max-w-xl">
          <p className="text-sm text-gray-700">Store settings (business hours, delivery zones, pricing rules) will appear here.</p>
        </div>
      </div>
    </AdminGuard>
  );
}

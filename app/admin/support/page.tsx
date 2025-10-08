"use client";
import AdminGuard from "../../../components/admin/AdminGuard";
import SupportTable from "../../../components/admin/support/SupportTable";

export default function AdminSupportPage() {
  return (
    <AdminGuard>
      <div className="p-6">
  <h1 className="heading-1 mb-6">Support</h1>
        <SupportTable />
      </div>
    </AdminGuard>
  );
}

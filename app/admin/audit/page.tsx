import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminAuditPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Audit Trail</h1>
        {/* Activity logs for all admin actions */}
      </div>
    </AdminGuard>
  );
}

import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminLogsPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Error Logs & Notifications</h1>
        {/* Error log table, notifications, export will go here */}
      </div>
    </AdminGuard>
  );
}

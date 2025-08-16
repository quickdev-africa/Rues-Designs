import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminSettingsPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        {/* Business hours, delivery zones, pricing rules will go here */}
      </div>
    </AdminGuard>
  );
}

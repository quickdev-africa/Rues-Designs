import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminMessagingPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Messaging & Notifications</h1>
        {/* Internal messaging, customer notifications, reminders */}
      </div>
    </AdminGuard>
  );
}

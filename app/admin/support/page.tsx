import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminSupportPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Customer Support</h1>
        {/* Ticketing system or chat for customer inquiries */}
      </div>
    </AdminGuard>
  );
}

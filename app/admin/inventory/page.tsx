import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminInventoryPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
        {/* Track stock, damaged/lost items, maintenance schedules */}
      </div>
    </AdminGuard>
  );
}

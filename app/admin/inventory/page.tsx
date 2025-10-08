import AdminGuard from "../../../components/admin/AdminGuard";
import InventoryTable from "../../../components/admin/inventory/InventoryTable";
import LowStockAlert from "../../../components/admin/inventory/LowStockAlert";

export default function AdminInventoryPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
        {/* Low stock alert */}
        <LowStockAlert />
        {/* Track stock, damaged/lost items, maintenance schedules */}
        <InventoryTable />
      </div>
    </AdminGuard>
  );
}

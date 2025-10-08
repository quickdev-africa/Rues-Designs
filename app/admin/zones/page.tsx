import AdminGuard from "../../../components/admin/AdminGuard";
import ZonesTable from "../../../components/admin/zones/ZonesTable";
import ZoneForm from "../../../components/admin/zones/ZoneForm";

export default function AdminZonesPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Zone Management</h1>
        <ZoneForm />
        <ZonesTable />
      </div>
    </AdminGuard>
  );
}

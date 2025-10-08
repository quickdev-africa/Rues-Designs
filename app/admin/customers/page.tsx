import AdminGuard from "../../../components/admin/AdminGuard";
import CustomersTable from "../../../components/admin/customers/CustomersTable";

export default function AdminCustomersPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Customers</h1>
        <CustomersTable />
      </div>
    </AdminGuard>
  );
}

import AdminGuard from "../../../components/admin/AdminGuard";
import OperationsTable from "../../../components/admin/operations/OperationsTable";

export default function AdminOperationsPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Operations</h1>
        <OperationsTable />
      </div>
    </AdminGuard>
  );
}

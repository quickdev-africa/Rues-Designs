import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminPaymentsPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Payments & Invoicing</h1>
        {/* Manage payments, refunds, invoices, financial reports */}
      </div>
    </AdminGuard>
  );
}

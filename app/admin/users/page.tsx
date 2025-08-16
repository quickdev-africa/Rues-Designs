import AdminGuard from "../../../components/admin/AdminGuard";
import StaffInviteForm from "../../../components/admin/staff/StaffInviteForm";
import StaffTable from "../../../components/admin/staff/StaffTable";

export default function AdminUsersPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">User Management (Staff & Admin Roles)</h1>
        <StaffInviteForm />
        <StaffTable />
      </div>
    </AdminGuard>
  );
}

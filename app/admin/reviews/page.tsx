import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminReviewsPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Reviews Moderation</h1>
        {/* Review table, approve/reject/delete will go here */}
      </div>
    </AdminGuard>
  );
}

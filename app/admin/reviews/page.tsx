import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminReviewsPage() {
  return (
    <AdminGuard>
      <div>
  <h1 className="heading-1 mb-4">Reviews Moderation</h1>
        {/* Review table, approve/reject/delete will go here */}
      </div>
    </AdminGuard>
  );
}

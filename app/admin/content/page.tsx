import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminContentPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Content Management</h1>
        {/* Manage banners, FAQs, blog posts, static pages */}
      </div>
    </AdminGuard>
  );
}

import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminCategoriesPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Categories Management</h1>
        {/* Category table, add/edit/delete, image upload will go here */}
      </div>
    </AdminGuard>
  );
}


import AdminGuard from "../../../components/admin/AdminGuard";
import ProductTable from "../../../components/admin/products/ProductTable";
import ProductForm from "../../../components/admin/products/ProductForm";

export default function AdminProductsPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Products Management</h1>
  <ProductForm />
  <ProductTable />
      </div>
    </AdminGuard>
  );
}

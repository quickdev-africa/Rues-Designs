
"use client";
import OrdersTable from '../../../components/admin/orders/OrdersTable';
import AdminGuard from "../../../components/admin/AdminGuard";
import { useRouter } from 'next/navigation';

export default function AdminBookingsPage() {
  const router = useRouter();
  return (
    <AdminGuard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Bookings Management</h1>
          <button
            className="btn btn-primary"
            onClick={() => router.push('/admin/orders/new')}
          >
            New Booking
          </button>
        </div>
        <OrdersTable />
      </div>
    </AdminGuard>
  );
}

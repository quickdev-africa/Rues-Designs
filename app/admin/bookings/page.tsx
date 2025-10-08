
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
            style={{ backgroundColor: '#D4AF36', borderColor: '#D4AF36' }}
            className="btn font-semibold px-6 py-2 rounded-lg shadow transition border-2 text-white hover:bg-[#F7E9B7] hover:text-black disabled:bg-[#F7E9B7] disabled:text-white disabled:opacity-60"
            onClick={() => router.push('/admin/orders/new')}
            disabled={false}
          >
            New Booking
          </button>
        </div>
        <OrdersTable />
      </div>
    </AdminGuard>
  );
}

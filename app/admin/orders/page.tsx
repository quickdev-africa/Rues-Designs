import OrdersTable from '@/components/admin/orders/OrdersTable';

export default function OrdersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders & Bookings</h1>
      <OrdersTable />
    </div>
  );
}

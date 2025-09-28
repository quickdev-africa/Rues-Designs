import OrderDetails from '../../../../components/admin/orders/OrderDetails';
import { notFound } from 'next/navigation';

export default async function OrderDetailsPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  if (!orderId) return notFound();
  return (
    <div className="p-6">
      <OrderDetails orderId={orderId} />
    </div>
  );
}

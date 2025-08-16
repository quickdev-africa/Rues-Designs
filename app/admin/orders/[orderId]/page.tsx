import OrderDetails from '../../../../components/admin/orders/OrderDetails';
import { notFound } from 'next/navigation';

interface Props {
  params: { orderId: string };
}

export default function OrderDetailsPage({ params }: Props) {
  if (!params.orderId) return notFound();
  return (
    <div className="p-6">
      <OrderDetails orderId={params.orderId} />
    </div>
  );
}

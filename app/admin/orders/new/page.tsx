
"use client";
import OrderForm from '../../../../components/admin/orders/OrderForm';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';

export default function NewOrderPage() {
  const router = useRouter();
  const handleCreate = async (order: any) => {
    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          customerName: order.customerName,
          status: order.status,
          total: order.total,
          zip: order.zip,
          zone: order.zone,
          deliveryFee: order.deliveryFee,
        });
      if (error) throw error;
      router.push('/admin/orders');
    } catch (err) {
      alert('Failed to create order: ' + (err as any).message);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Order</h1>
      <OrderForm onSubmit={handleCreate} />
    </div>
  );
}

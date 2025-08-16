
"use client";
import OrderForm from '../../../../components/admin/orders/OrderForm';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';

export default function NewOrderPage() {
  const router = useRouter();
  const handleCreate = async (order: any) => {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...order,
        createdAt: serverTimestamp(),
      });
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

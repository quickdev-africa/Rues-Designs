"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';
import OrderActions from './OrderActions';
import OrderStatusBadge from './OrderStatusBadge';

interface Order {
  id: string;
  customerName: string;
  status: string;
  total: number;
  createdAt: string;
  zip?: string;
  zone?: string;
  deliveryFee?: number;
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('id, customerName, status, total, created_at, zip, zone, deliveryFee')
        .order('created_at', { ascending: false });
      if (!active) return;
      if (error) {
        setOrders([]);
      } else {
        const mapped = (data || []).map((o: any) => ({
          id: o.id,
          customerName: o.customerName,
          status: o.status,
          total: o.total,
          createdAt: o.created_at,
          zip: o.zip,
          zone: o.zone,
          deliveryFee: o.deliveryFee,
        })) as Order[];
        setOrders(mapped);
      }
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);

  if (loading) return <div>Loading orders...</div>;

  const router = useRouter();
  const handleView = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`);
  };
  const handleDelete = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      const { error } = await supabase.from('orders').delete().eq('id', orderId);
      if (error) throw error;
      setOrders(orders => orders.filter(o => o.id !== orderId));
    } catch (err) {
      alert('Failed to delete order: ' + (err as any).message);
    }
  };
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Order ID</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Zone</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Delivery Fee</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-900 font-mono">{order.id}</td>
              <td className="px-4 py-2 text-gray-900">{order.customerName}</td>
              <td className="px-4 py-2"><OrderStatusBadge status={order.status} /></td>
              <td className="px-4 py-2 text-gray-900 font-semibold">${order.total.toFixed(2)}</td>
              <td className="px-4 py-2 text-gray-900">{order.zone || '-'}</td>
              <td className="px-4 py-2 text-gray-900">{order.deliveryFee ? `$${order.deliveryFee}` : '-'}</td>
              <td className="px-4 py-2 text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2"><OrderActions orderId={order.id} onView={() => handleView(order.id)} onDelete={() => handleDelete(order.id)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <div className="p-4 text-center text-gray-500">No orders found.</div>}
    </div>
  );
}

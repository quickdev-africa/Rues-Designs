"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

interface OrderDetailsProps {
  orderId: string;
}

export default function OrderDetails({ orderId }: OrderDetailsProps) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState('');
  const [total, setTotal] = useState(0);
  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      if (error) {
        setOrder(null);
      } else if (data) {
        setOrder(data);
        setStatus(data.status);
        setTotal(data.total);
      }
      setLoading(false);
    }
    fetchOrder();
  }, [orderId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status, total })
        .eq('id', orderId);
      if (error) throw error;
      setOrder({ ...order, status, total });
      setEdit(false);
    } catch (err) {
      alert('Failed to update order: ' + (err as any).message);
    }
  };

  if (loading) return <div>Loading order...</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Details</h2>
      <div className="space-y-3">
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Order ID:</span>
          <span className="font-mono text-gray-900">{order.id}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Customer:</span>
          <span className="text-gray-900">{order.customerName}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Status:</span>
          {edit ? (
            <select className="select select-bordered" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          ) : (
            <span className="text-gray-900">{order.status}</span>
          )}
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Total:</span>
          {edit ? (
            <input type="number" className="input input-bordered w-32" value={total} onChange={e => setTotal(Number(e.target.value))} />
          ) : (
            <span className="text-gray-900 font-semibold">${order.total?.toFixed(2)}</span>
          )}
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Zip Code:</span>
          <span className="text-gray-900">{order.zip || '-'}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Zone:</span>
          <span className="text-gray-900">{order.zone || '-'}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Delivery Fee:</span>
          <span className="text-gray-900">{order.deliveryFee ? `$${order.deliveryFee}` : '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Date:</span>
          <span className="text-gray-900">{order.created_at ? new Date(order.created_at).toLocaleString() : ''}</span>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        {edit ? (
          <>
            <button className="btn bg-[#D4AF36] text-white" onClick={handleUpdate}>Save</button>
            <button className="btn bg-transparent text-[#D4AF36] border border-[#D4AF36]" onClick={() => setEdit(false)}>Cancel</button>
          </>
        ) : (
          <button className="btn border border-[#D4AF36] text-[#D4AF36] bg-white hover:bg-[#D4AF36]/10" onClick={() => setEdit(true)}>Edit</button>
        )}
      </div>
    </div>
  );
}

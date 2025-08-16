import React from 'react';

interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  let color = 'bg-blue-100 text-blue-800';
  if (status === 'completed') color = 'bg-green-100 text-green-800';
  else if (status === 'cancelled') color = 'bg-red-100 text-red-800';
  else if (status === 'pending') color = 'bg-yellow-100 text-yellow-800';
  else if (status === 'confirmed') color = 'bg-indigo-100 text-indigo-800';

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${color}`}>{status}</span>
  );
}

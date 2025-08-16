"use client";

interface OrderActionsProps {
  orderId: string;
  onView: () => void;
  onDelete: () => void;
}

export default function OrderActions({ orderId, onView, onDelete }: OrderActionsProps) {
  return (
    <div className="flex gap-2">
      <button className="btn btn-xs btn-outline" onClick={onView}>View</button>
      <button className="btn btn-xs btn-outline btn-error" onClick={onDelete}>Delete</button>
    </div>
  );
}

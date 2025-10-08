import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function LowStockAlert() {
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('inventory')
        .select('id, name, stock')
        .lt('stock', 5);
      setLowStockItems(data || []);
    }
    load();
  }, []);
  if (!lowStockItems.length) return null;
  return (
    <div className="admin-ui bg-gold/10 border-l-4 border-gold text-gold p-4 mb-4 rounded" style={{ borderColor: '#D4AF36', color: '#D4AF36' }}>
      <strong>Low Stock Alert:</strong>
      <ul className="list-disc ml-6">
        {lowStockItems.map(item => (
          <li key={item.id}>{item.name} ({item.stock} left)</li>
        ))}
      </ul>
    </div>
  );
}

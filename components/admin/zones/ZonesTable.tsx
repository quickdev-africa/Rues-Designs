"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function ZonesTable() {
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from('zones')
        .select('id, name, zip_codes, delivery_fee, schedule')
        .order('name', { ascending: true });
      if (!active) return;
      if (error) {
        setZones([]);
        setError(error.message);
      } else {
        setZones(data || []);
      }
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);

  if (loading) return <div>Loading zones...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!zones.length) return <div>No zones found.</div>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Zip Codes</th>
            <th>Delivery Fee</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody>
          {zones.map(zone => (
            <tr key={zone.id}>
              <td>{zone.name}</td>
              <td>{Array.isArray(zone.zip_codes) ? zone.zip_codes.join(", ") : zone.zip_codes}</td>
              <td>${zone.delivery_fee}</td>
              <td>{zone.schedule || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

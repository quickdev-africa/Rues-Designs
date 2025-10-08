"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function ZoneForm({ onCreated }: { onCreated?: () => void }) {
  const [name, setName] = useState("");
  const [zipCodes, setZipCodes] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [schedule, setSchedule] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.from('zones').insert({
        name,
        zip_codes: zipCodes.split(/[,\s]+/).map(z => z.trim()),
        delivery_fee: parseFloat(deliveryFee),
        schedule,
      });
      if (error) throw error;
      setName("");
      setZipCodes("");
      setDeliveryFee("");
      setSchedule("");
      if (onCreated) onCreated();
    } catch (err: any) {
      setError(err.message || "Error creating zone");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="input input-bordered w-full"
          placeholder="Zone Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="input input-bordered w-full"
          placeholder="Zip Codes (comma or space separated)"
          value={zipCodes}
          onChange={e => setZipCodes(e.target.value)}
          required
        />
        <input
          className="input input-bordered w-full"
          type="number"
          min="0"
          step="0.01"
          placeholder="Delivery Fee"
          value={deliveryFee}
          onChange={e => setDeliveryFee(e.target.value)}
          required
        />
        <input
          className="input input-bordered w-full"
          placeholder="Delivery Schedule (optional)"
          value={schedule}
          onChange={e => setSchedule(e.target.value)}
        />
      </div>
      {error && <div className="text-error mt-2">{error}</div>}
      <button className="btn btn-primary mt-4" type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Zone"}
      </button>
    </form>
  );
}

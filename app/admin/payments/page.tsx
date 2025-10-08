"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import PaymentsTable from "../../../components/admin/payments/PaymentsTable";

export default function AdminPaymentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>
      <PaymentsTable />
    </div>
  );
}
// ...existing code...

import React from "react";
import { getAuth } from "firebase/auth";
import { redirect } from "next/navigation";

import AdminDashboard from "../../components/admin/AdminDashboard";
import AdminGuard from "../../components/admin/AdminGuard";

export default function AdminHomePage() {
  return (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  );
}

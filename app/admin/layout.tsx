"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminGuard from "../../components/admin/AdminGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/admin/login" || pathname.startsWith("/admin/login/");

  useEffect(() => {
    // Hide global site header/footer while in admin routes
    document.body.classList.add("admin-route");
    return () => {
      document.body.classList.remove("admin-route");
    };
  }, []);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-white">
        <style jsx global>{`
          body.admin-route header, body.admin-route footer { display: none !important; }
          body.admin-route { background: #ffffff; }
        `}</style>
        <main className="p-6">{children}</main>
      </div>
    );
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-white text-black admin-ui">
        <style jsx global>{`
          body.admin-route header, body.admin-route footer { display: none !important; }
          body.admin-route {
            background: var(--color-secondary);
            color: var(--color-primary);
            font-family: var(--font-admin);
          }
        `}</style>
        <AdminSidebar />
        <main className="flex-1 bg-white p-6 overflow-auto admin-ui">{children}</main>
      </div>
    </AdminGuard>
  );
}

import React from "react";
import Link from "next/link";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 min-h-screen">
      <h2 className="font-bold text-lg mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded px-3 py-2 hover:bg-gray-800 hover:text-yellow-300 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

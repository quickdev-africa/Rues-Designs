"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  return (
  <aside className="w-64 bg-white text-black border-r border-gray-200 flex flex-col p-4 min-h-screen font-body">
      <h2 className="font-heading text-lg tracking-wide mb-4 text-gold">Admin</h2>
      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-body transition-colors ${
                active
                  ? "bg-gold text-primary font-semibold"
                  : "hover:bg-gold hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

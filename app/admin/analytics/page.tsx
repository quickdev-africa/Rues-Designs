"use client";
import AdminGuard from "../../../components/admin/AdminGuard";
import AnalyticsTable from "../../../components/admin/analytics/AnalyticsTable";

export default function AdminAnalyticsPage() {
  // Example metrics (replace with real data hooks)
  const metrics = [
    { label: "Revenue (Monthly)", value: "$1,200,000" },
    { label: "Total Bookings", value: "320" },
    { label: "Active Customers", value: "180" },
    { label: "Low Inventory Items", value: "5" },
    { label: "Deliveries Scheduled", value: "22" },
  ];

  return (
    <AdminGuard>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Analytics & Reporting</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
              <div className="text-xs font-semibold text-gray-500 mb-2">{m.label}</div>
              <div className="text-3xl font-bold text-[#D4AF36]">{m.value}</div>
            </div>
          ))}
        </div>
        {/* Chart widgets placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Revenue Trend</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">[Chart]</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Bookings by Zone</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">[Chart]</div>
          </div>
        </div>
        <AnalyticsTable />
      </div>
    </AdminGuard>
  );
}

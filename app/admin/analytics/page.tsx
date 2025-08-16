import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminAnalyticsPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Analytics</h1>
        {/* Charts, stats, export tools will go here */}
      </div>
    </AdminGuard>
  );
}

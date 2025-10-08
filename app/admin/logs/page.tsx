import AdminGuard from "../../../components/admin/AdminGuard";
export default function AdminLogsPage() {
  // Example log data (replace with real data hooks)
  const logs = [
    { id: 1, type: "login", user: "admin", message: "Admin logged in", date: "2025-09-28 09:12" },
    { id: 2, type: "update", user: "warehouse", message: "Inventory updated", date: "2025-09-28 09:15" },
    { id: 3, type: "error", user: "operations", message: "Failed booking sync", date: "2025-09-28 09:20" },
    { id: 4, type: "access", user: "admin", message: "Settings changed", date: "2025-09-28 09:25" },
  ];

  return (
    <AdminGuard>
      <div className="p-6">
  <h1 className="heading-1 mb-4">Activity Logs & Monitoring</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
            <div className="text-xs font-semibold text-gray-500 mb-2">Total Logins</div>
            <div className="text-3xl font-bold text-[#31473A]">{logs.filter(l => l.type === "login").length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
            <div className="text-xs font-semibold text-gray-500 mb-2">Inventory Updates</div>
            <div className="text-3xl font-bold text-[#D4AF36]">{logs.filter(l => l.type === "update").length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
            <div className="text-xs font-semibold text-gray-500 mb-2">Errors</div>
            <div className="text-3xl font-bold text-red-600">{logs.filter(l => l.type === "error").length}</div>
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Message</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-900 font-mono">{log.id}</td>
                  <td className="px-4 py-2 text-gray-900">{log.type}</td>
                  <td className="px-4 py-2 text-gray-900">{log.user}</td>
                  <td className="px-4 py-2 text-gray-900 text-xs">{log.message}</td>
                  <td className="px-4 py-2 text-gray-700">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminGuard>
  );
}

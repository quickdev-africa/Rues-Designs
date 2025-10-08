"use client";
import AdminGuard from "../../../components/admin/AdminGuard";

export default function AdminSettingsPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Gateway Settings */}
          <section className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-2">Stripe Payment Gateway</h2>
            <form className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Publishable Key</label>
                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md" placeholder="pk_live_..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Secret Key</label>
                <input type="password" className="mt-1 block w-full border-gray-300 rounded-md" placeholder="sk_live_..." />
              </div>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save Stripe Keys</button>
            </form>
          </section>

          {/* Email Settings */}
          <section className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-2">Email Settings</h2>
            <form className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Sender Name</label>
                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md" placeholder="Rues Designs" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sender Email</label>
                <input type="email" className="mt-1 block w-full border-gray-300 rounded-md" placeholder="hello@ruesdesigns.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Server</label>
                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md" placeholder="smtp.mailgun.org" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Password</label>
                <input type="password" className="mt-1 block w-full border-gray-300 rounded-md" />
              </div>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save Email Settings</button>
            </form>
          </section>

          {/* Accounting Export */}
          <section className="bg-white border border-gray-200 rounded-lg p-5 col-span-2">
            <h2 className="text-lg font-semibold mb-2">Accounting Export</h2>
            <form className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Export Format</label>
                <select className="mt-1 block w-full border-gray-300 rounded-md">
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel (.xlsx)</option>
                  <option value="quickbooks">QuickBooks</option>
                </select>
              </div>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Export Data</button>
            </form>
          </section>
        </div>
      </div>
    </AdminGuard>
  );
}

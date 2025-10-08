import AdminGuard from "../../../components/admin/AdminGuard";
import ZoneMap from "../../../components/admin/zones/ZoneMap";

export default function ZoneMapDemoPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Zone Map</h1>
        <ZoneMap />
      </div>
    </AdminGuard>
  );
}

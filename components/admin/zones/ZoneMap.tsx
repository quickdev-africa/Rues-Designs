import dynamic from 'next/dynamic';

const Map = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

export default function ZoneMap() {
  // Example: Centered on Lagos, Nigeria
  return (
    <div className="h-64 w-full rounded shadow mb-4">
      <Map center={[6.5244, 3.3792]} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Add zone polygons/markers here */}
      </Map>
    </div>
  );
}

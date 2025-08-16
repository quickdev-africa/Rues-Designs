export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <span className="loading loading-spinner loading-lg text-primary" aria-label="Loading..." />
    </div>
  );
}

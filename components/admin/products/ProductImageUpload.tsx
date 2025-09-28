import { useState } from "react";
// Using Cloudinary direct upload with server-side signature

export default function ProductImageUpload({ productId, onUploaded }: {
  productId: string;
  onUploaded?: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string | undefined
      if (!cloudName) {
        throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME')
      }
      // Request a signature from our API
      const signRes = await fetch('/api/cloudinary/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: `products/${productId}` }),
      })
      const signJson = await signRes.json()
      if (!signRes.ok) throw new Error(signJson.error || 'Sign failed')

      const form = new FormData()
      form.append('file', file)
      form.append('api_key', signJson.api_key)
      form.append('timestamp', String(signJson.timestamp))
      form.append('signature', signJson.signature)
      form.append('folder', `products/${productId}`)
      if (uploadPreset) form.append('upload_preset', uploadPreset)

      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`
      const resp = await fetch(uploadUrl, { method: 'POST', body: form })
      const json = await resp.json()
      if (!resp.ok) throw new Error(json.error?.message || 'Upload failed')

      const url = json.secure_url as string
      setUploading(false)
      setProgress(0)
      setFile(null)
      if (url && onUploaded) onUploaded(url)
    } catch (err: any) {
      setError(err.message || 'Upload failed')
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleUpload} className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/*"
        className="file-input file-input-bordered w-full"
        onChange={e => setFile(e.target.files?.[0] || null)}
        disabled={uploading}
      />
  {progress > 0 && <progress className="progress w-full" value={progress} max={100} />}
      {error && <div className="text-error">{error}</div>}
      <button className="btn btn-secondary" type="submit" disabled={uploading || !file}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </form>
  );
}

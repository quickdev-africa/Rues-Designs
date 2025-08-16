import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../../../lib/firebase";

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
    const storage = getStorage();
    const storageRef = ref(storage, `products/${productId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => {
        setError(err.message || "Upload failed");
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setUploading(false);
        setProgress(0);
        setFile(null);
        if (onUploaded) onUploaded(url);
      }
    );
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

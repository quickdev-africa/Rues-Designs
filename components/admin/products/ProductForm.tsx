"use client";
import { useState } from "react";
import { addDoc, collection, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import ProductImageUpload from "./ProductImageUpload";

export default function ProductForm({ onCreated }: { onCreated?: () => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("active");
  const [imageUrl, setImageUrl] = useState("");
  const [newProductId, setNewProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name,
        category,
        price: parseFloat(price),
        status,
        imageUrl,
        createdAt: serverTimestamp(),
      });
      setNewProductId(docRef.id);
      setName("");
      setCategory("");
      setPrice("");
      setStatus("active");
      setImageUrl("");
      if (onCreated) onCreated();
    } catch (err: any) {
      setError(err.message || "Error creating product");
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUploaded(url: string) {
    setImageUrl(url);
    if (newProductId) {
      await updateDoc(doc(db, "products", newProductId), { imageUrl: url });
    }
  }

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="input input-bordered w-full"
          placeholder="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="input input-bordered w-full"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
        <input
          className="input input-bordered w-full"
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <select
          className="select select-bordered w-full"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div>
          <label className="block mb-1 font-semibold">Product Image</label>
          {imageUrl && (
            <img src={imageUrl} alt="Product" className="mb-2 max-h-32 rounded" />
          )}
          {newProductId ? (
            <ProductImageUpload productId={newProductId} onUploaded={handleImageUploaded} />
          ) : (
            <div className="text-xs text-gray-500">Save product first to upload image.</div>
          )}
        </div>
      </div>
      {error && <div className="text-error mt-2">{error}</div>}
      <button className="btn btn-primary mt-4" type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
}

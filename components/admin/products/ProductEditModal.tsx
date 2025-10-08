import { useState } from "react";
import adminCategories from '../../../data/adminCategories.json';
import { supabase } from "../../../lib/supabase";
import ProductImageUpload from "./ProductImageUpload";

export default function ProductEditModal({ product, onClose, onUpdated }: {
  product: any;
  onClose: () => void;
  onUpdated?: () => void;
}) {
  const [name, setName] = useState(product.name || "");
  const [category, setCategory] = useState(product.category || "");
  const [price, setPrice] = useState(product.price?.toString() || "");
  const [status, setStatus] = useState(product.status || "active");
  const [imageUrl, setImageUrl] = useState(product.imageUrl || "");
  const [description, setDescription] = useState(product.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const pricing: any = typeof product.pricing === 'object' ? { ...product.pricing } : {};
      if (!isNaN(parseFloat(price))) {
        pricing.price = parseFloat(price);
      }
      const updates: any = {
        name,
        category,
        description,
        status,
        images: imageUrl ? [imageUrl] : [],
        pricing,
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from('products').update(updates).eq('id', product.id);
      if (error) throw error;
      if (onUpdated) onUpdated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Error updating product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 md:p-6 rounded shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-4">
            <input
              className="input input-bordered w-full"
              placeholder="Product Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {adminCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Product Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
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
              <ProductImageUpload
                productId={product.id}
                onUploaded={url => setImageUrl(url)}
              />
            </div>
          </div>
          {error && <div className="text-error mt-2">{error}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn border border-[#D4AF36] text-[#D4AF36] bg-white hover:bg-[#D4AF36]/10" onClick={onClose} disabled={loading}>Cancel</button>
            <button className="btn bg-[#D4AF36] text-white" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import ProductEditModal from "./ProductEditModal";

export default function ProductTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    let active = true;
    async function load() {
      // Fetch from Supabase and normalize fields for UI
      const { data, error } = await supabase
        .from('products')
        .select('id, name, status, created_at, images, categories, pricing')
        .order('created_at', { ascending: false });
      if (!active) return;
      if (error) {
        setProducts([]);
      } else {
        const mapped = (data || []).map(p => ({
          id: p.id,
          name: (p as any).name,
          status: (p as any).status || 'active',
          created_at: (p as any).created_at,
          imageUrl: Array.isArray((p as any).images) ? (p as any).images[0] : '',
          category: Array.isArray((p as any).categories) ? (p as any).categories[0] : '-',
          price: typeof (p as any).pricing === 'object' && (p as any).pricing ? ((p as any).pricing.price ?? (p as any).pricing.base ?? 0) : 0,
        }));
        setProducts(mapped);
      }
      setLoading(false);
    }
    load();
    return () => { active = false };
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    setError("");
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err.message || "Error deleting product");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleBatchDelete() {
    if (!selected.length) return;
    if (!confirm(`Delete ${selected.length} selected products?`)) return;
    setBatchLoading(true);
    setError("");
    try {
      const { error } = await supabase.from('products').delete().in('id', selected);
      if (error) throw error;
      setProducts(prev => prev.filter(p => !selected.includes(p.id)));
      setSelected([]);
    } catch (err: any) {
      setError(err.message || "Error deleting products");
    } finally {
      setBatchLoading(false);
    }
  }

  function handleSelect(id: string, checked: boolean) {
    setSelected(prev => checked ? [...prev, id] : prev.filter(sid => sid !== id));
  }

  function handleSelectAll(checked: boolean) {
    setSelected(checked ? products.map(p => p.id) : []);
  }

  if (loading) return <div>Loading...</div>;
  if (!products.length) return <div>No products found.</div>;

  // Filter by search
  const filtered = products.filter((p: any) =>
    (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase())
  );

  // Sort locally based on selected field
  const sorted = [...filtered].sort((a: any, b: any) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    const field = sortBy;
    const av = field === 'createdAt' ? a.created_at : a[field];
    const bv = field === 'createdAt' ? b.created_at : b[field];
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
    const as = String(av ?? '');
    const bs = String(bv ?? '');
    return as.localeCompare(bs) * dir;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const clampedPage = Math.min(page, totalPages);
  const paginated = sorted.slice((clampedPage - 1) * pageSize, clampedPage * pageSize);

  function handleSort(field: string) {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  }

  return (
    <div className="overflow-x-auto">
      {editProduct && (
        <ProductEditModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdated={() => {}}
        />
      )}
      {error && <div className="text-error mb-2">{error}</div>}
      <div className="mb-2 flex gap-2 items-center">
        <input
          className="input input-bordered input-sm w-64"
          placeholder="Search products..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <button
          className="btn btn-sm btn-error"
          onClick={handleBatchDelete}
          disabled={!selected.length || batchLoading}
        >
          {batchLoading ? "Deleting..." : `Delete Selected (${selected.length})`}
        </button>
        <span className="text-xs text-gray-500">Batch actions: select multiple products to delete</span>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th className="w-8">
              <input
                type="checkbox"
                checked={selected.length === paginated.length && paginated.length > 0}
                onChange={e => handleSelectAll(e.target.checked)}
              />
            </th>
            <th className="cursor-pointer w-56" onClick={() => handleSort("name")}>Name {sortBy === "name" && (sortDir === "asc" ? "▲" : "▼")}</th>
            <th className="cursor-pointer w-40" onClick={() => handleSort("category")}>Category {sortBy === "category" && (sortDir === "asc" ? "▲" : "▼")}</th>
            <th className="cursor-pointer w-24" onClick={() => handleSort("price")}>Price {sortBy === "price" && (sortDir === "asc" ? "▲" : "▼")}</th>
            <th className="cursor-pointer w-24" onClick={() => handleSort("status")}>Status {sortBy === "status" && (sortDir === "asc" ? "▲" : "▼")}</th>
            <th className="cursor-pointer w-40" onClick={() => handleSort("createdAt")}>Created {sortBy === "createdAt" && (sortDir === "asc" ? "▲" : "▼")}</th>
            <th className="w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((product) => (
            <tr key={product.id} className="hover:bg-base-200 transition">
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(product.id)}
                  onChange={e => handleSelect(product.id, e.target.checked)}
                />
              </td>
              <td>
                <div className="flex items-center gap-3">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt="Product" className="w-10 h-10 rounded object-cover border" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-base-300 flex items-center justify-center text-xs text-gray-400">No Image</div>
                  )}
                  <span className="font-semibold" title={product.name}>{product.name}</span>
                </div>
              </td>
              <td>
                <span className="badge badge-outline" title={product.category}>{product.category}</span>
              </td>
              <td>
                <span className="font-mono">${product.price}</span>
              </td>
              <td>
                <span className={`badge ${product.status === "active" ? "badge-success" : "badge-ghost"}`}>{product.status}</span>
              </td>
              <td>
                <span className="text-xs" title={product.createdAt?.toDate?.().toLocaleString?.() || "-"}>
                  {product.createdAt?.toDate?.().toLocaleDateString?.() || "-"}
                </span>
              </td>
              <td>
                <div className="flex gap-2">
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => setEditProduct(product)}
                    title="Edit product"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    title="Delete product"
                  >
                    {deletingId === product.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center gap-2">
        <button className="btn btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <button className="btn btn-sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import AdminGuard from "../../../components/admin/AdminGuard";
import { Modal } from "../../../components/Modal";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import ProductImageUpload from "../../../components/admin/products/ProductImageUpload";

// Helper to fetch and update categories.json (simulate API for now)
async function fetchCategories() {
  const res = await fetch("/data/adminCategories.json");
  return res.json();
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ id: "", name: "", imageUrl: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  function openEdit(idx: number) {
    setEditIdx(idx);
    setForm(categories[idx]);
    setModalOpen(true);
  }
  function openAdd() {
    setForm({ id: "", name: "", imageUrl: "" });
    setEditIdx(null);
    setModalOpen(true);
  }
  function handleChange(e: any) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleImage(url: string) {
    setForm(f => ({ ...f, imageUrl: url }));
  }
  function handleSave() {
    if (editIdx !== null) {
      const updated = [...categories];
      updated[editIdx] = form;
      setCategories(updated);
    } else {
      setCategories([...categories, { ...form, id: form.id || form.name.toLowerCase().replace(/\s+/g, "-") }]);
    }
    setModalOpen(false);
  }
  function handleDelete(idx: number) {
    if (window.confirm("Delete this category?")) {
      setCategories(categories.filter((_, i) => i !== idx));
    }
  }

  return (
    <AdminGuard>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Categories Management</h1>
        <Button variant="accent" onClick={openAdd} className="mb-4">Add Category</Button>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">ID</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={cat.id} className="border-t">
                <td className="p-2"><img src={cat.imageUrl} alt={cat.name} className="w-16 h-16 object-cover rounded" /></td>
                <td className="p-2 font-semibold">{cat.name}</td>
                <td className="p-2 text-xs text-gray-500">{cat.id}</td>
                <td className="p-2">
                  <Button variant="outline" onClick={() => openEdit(idx)} className="mr-2">Edit</Button>
                  <Button variant="error" onClick={() => handleDelete(idx)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editIdx !== null ? "Edit Category" : "Add Category"}>
          <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="ID (slug)" name="id" value={form.id} onChange={handleChange} required />
          <div className="mb-4">
            <span className="block mb-1 font-heading text-primary">Image</span>
            {form.imageUrl && <img src={form.imageUrl} alt="Category" className="w-24 h-24 object-cover rounded mb-2" />}
            <ProductImageUpload productId={form.id || "category-temp"} onUploaded={handleImage} />
          </div>
          <Button variant="accent" onClick={handleSave}>{editIdx !== null ? "Save Changes" : "Add Category"}</Button>
        </Modal>
      </div>
    </AdminGuard>
  );
}

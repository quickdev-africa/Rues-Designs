"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { addProduct, getProducts } from "../../lib/firestore-ops";

export default function FirestoreTestPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  // Monitor auth state and fetch user profile (Supabase)
  useEffect(() => {
    let mounted = true;
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(user);
      setUserData(null);
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('id, email, role')
          .eq('id', user.id)
          .single();
        if (error && error.code !== 'PGRST116') { // not found is handled below
          console.error(error);
        }
        if (data) {
          setUserData({ email: data.email, admin: data.role === 'admin' });
        } else {
          // Create user row on first login
          const { data: inserted, error: insertError } = await supabase
            .from('users')
            .insert({ id: user.id, email: user.email, role: 'customer' })
            .select('email, role')
            .single();
          if (insertError) {
            console.error(insertError);
          }
          if (inserted) setUserData({ email: inserted.email, admin: inserted.role === 'admin' });
        }
      }
    }
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  async function handleAddProduct() {
    if (!user) {
      setError("You must be logged in to add a product.");
      return;
    }
    if (!userData?.admin) {
      setError("You must be an admin to add a product.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const id = await addProduct({
        name: "Test Chair",
        description: "A comfortable test chair.",
        images: [],
        pricing: { base: 10, perDay: 2, deposit: 5 },
        availability: [],
        categories: [],
        status: "active"
      });
      setSuccess("Product added with ID: " + id);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  async function handleGetProducts() {
    if (!user) {
      setError("You must be logged in to view products.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await getProducts();
      setProducts(data);
      setSuccess("Fetched " + data.length + " products.");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSuccess("Logged out.");
  }

  return (
    <div style={{ padding: 24 }}>
  <h2>Supabase Test Page</h2>
      {user && (
        <div style={{ marginBottom: 8 }}>
          Logged in as <b>{user.email}</b>
          {userData?.admin && <span style={{ color: 'green', marginLeft: 8 }}>(Admin)</span>}
          <button onClick={handleLogout} style={{ marginLeft: 16 }}>Log out</button>
        </div>
      )}
  {!user && <div style={{ color: 'orange', marginBottom: 8 }}>Please log in to use Supabase features.</div>}
      {!userData?.admin && user && (
  <div style={{ color: 'red', marginBottom: 8 }}>You are not an admin. Ask a project owner to set <b>role: 'admin'</b> in your user row in Supabase.</div>
      )}
      <button onClick={handleAddProduct} disabled={loading || !userData?.admin}>Add Test Product</button>
      <button onClick={handleGetProducts} disabled={loading || !user}>Get Products</button>
      {loading && <div style={{ color: 'blue' }}>Loading...</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name} - {p.description}</li>
        ))}
      </ul>
      <div style={{ marginTop: 24, fontSize: 14, color: '#555' }}>
        <strong>How to check in Supabase:</strong>
        <ol>
          <li>Go to <a href="https://app.supabase.com/" target="_blank" rel="noopener noreferrer">Supabase Dashboard</a>.</li>
          <li>Select your project.</li>
          <li>Open <b>Table editor</b> and view the <b>products</b> and <b>users</b> tables.</li>
        </ol>
      </div>
    </div>
  );
}

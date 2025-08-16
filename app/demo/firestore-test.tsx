"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { addProduct, getProducts } from "../../lib/firestore-ops";

export default function FirestoreTestPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  // Monitor auth state and fetch user data
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setUserData(null);
      if (u) {
        const userRef = doc(db, "users", u.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          // Create user doc on first login
          const newUser = { email: u.email, admin: false };
          await setDoc(userRef, newUser);
          setUserData(newUser);
        }
      }
    });
    return () => unsub();
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
    await signOut(auth);
    setSuccess("Logged out.");
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Firestore Test Page</h2>
      {user && (
        <div style={{ marginBottom: 8 }}>
          Logged in as <b>{user.email}</b>
          {userData?.admin && <span style={{ color: 'green', marginLeft: 8 }}>(Admin)</span>}
          <button onClick={handleLogout} style={{ marginLeft: 16 }}>Log out</button>
        </div>
      )}
      {!user && <div style={{ color: 'orange', marginBottom: 8 }}>Please log in to use Firestore features.</div>}
      {!userData?.admin && user && (
        <div style={{ color: 'red', marginBottom: 8 }}>You are not an admin. Ask a project owner to set <b>admin: true</b> in your user document in Firestore.</div>
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
        <strong>How to check in Firebase Console:</strong>
        <ol>
          <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a>.</li>
          <li>Select your project.</li>
          <li>Click <b>Firestore Database</b> in the left sidebar.</li>
          <li>Expand the <b>products</b> collection to see your test product.</li>
        </ol>
      </div>
    </div>
  );
}

"use client";
import { useWishlist } from "../../components/ui/WishlistContext";
import { useState } from "react";
import emailjs from 'emailjs-com';

const STORE_EMAILS = ["ruesdesigns07@gmail.com", "ruesdesignsandrentals@gmail.com", "info@ruesdesigns.org"];
const EMAILJS_SERVICE_ID = "service_iajc9kc"; // Replace with your actual EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_vaw6jk6";
const EMAILJS_PUBLIC_KEY = "XoOjR0qSKUFcZ_CMk";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  async function handleSendWishlist() {
    if (!userName || !userEmail || !userPhone) {
      setError("Please enter your name, email, and phone number.");
      return;
    }
    setSending(true);
    setError("");
    try {
      // Format wishlist items as a string
      const wishlistString = items.map(item => `${item.name} - $${item.price.toFixed(2)}`).join('\n');

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          wishlist: wishlistString,
          to_email: STORE_EMAILS.join(", "),
          user_name: userName,
          user_email: userEmail,
          user_phone: userPhone,
        },
        EMAILJS_PUBLIC_KEY
      );
      if (result.status !== 200) throw new Error("Failed to send wishlist");
      setSent(true);
      clearWishlist();
      setUserName("");
      setUserEmail("");
      setUserPhone("");
    } catch (err: any) {
      setError(err.message || "Error sending wishlist");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-gray-500">
          Your wishlist is empty.<br />
          <a href="/shop/categories" className="inline-block mt-4 px-4 py-2 bg-[#D4AF36] text-white rounded font-semibold hover:bg-black transition">Return to Collections</a>
        </div>
      ) : (
        <div className="space-y-6">
          <ul className="divide-y divide-gray-200 mb-6">
            {items.map(item => (
              <li key={item.id} className="flex items-center py-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover mr-4" />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                </div>
                <button
                  className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              placeholder="Your Name"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              disabled={sending}
            />
            <input
              type="email"
              className="w-full px-4 py-2 border rounded"
              placeholder="Your Email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              disabled={sending}
            />
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded"
              placeholder="Your Phone Number"
              value={userPhone}
              onChange={e => setUserPhone(e.target.value)}
              disabled={sending}
            />
            <button
              className="w-full px-6 py-2 bg-[#D4AF36] text-white rounded font-semibold hover:bg-black transition"
              onClick={handleSendWishlist}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Wishlist to Store"}
            </button>
          </div>
          {sent && <div className="text-green-600 mt-4">Wishlist sent successfully!</div>}
          {error && <div className="text-red-600 mt-4">{error}</div>}
        </div>
      )}
    </div>
  );
}

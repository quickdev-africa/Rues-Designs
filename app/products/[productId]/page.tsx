"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { useCart } from "../../../components/ui/CartContext";

const defaultProduct = {
  id: "",
  name: "",
  category: "",
  price: 0,
  images: [],
  colors: [],
  description: "",
  info: "",
  recommendations: []
};

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId as string;
  const { addItem } = useCart();

  const [product, setProduct] = useState(defaultProduct);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [rentalDates, setRentalDates] = useState({ start: "", end: "" });
  const [quantity, setQuantity] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProductAndRecommendations() {
      if (!productId) return;
      // Fetch main product
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      if (error || !data) return;

      // Fetch recommendations: 3 products from same category, excluding current product
      let recommendations: any[] = [];
      if (data.category) {
        const { data: recs, error: recError } = await supabase
          .from('products')
          .select('*')
          .eq('category', data.category)
          .neq('id', productId)
          .limit(3);
        if (!recError && Array.isArray(recs)) {
          recommendations = recs.map(rec => ({
            id: rec.id,
            name: rec.name,
            price: rec.daily_rate,
            image: Array.isArray(rec.images) && rec.images.length > 0 ? rec.images[0] : '',
            category: rec.category,
            description: rec.description,
          }));
        }
      }

      setProduct({
        ...data,
        price: data.daily_rate,
        images: Array.isArray(data.images) ? data.images : [],
        colors: data.colors || [],
        recommendations,
      });
      setSelectedColor((data.colors && data.colors[0]) || "");
      setSelectedImage((Array.isArray(data.images) && data.images[0]) || "");
    }
    fetchProductAndRecommendations();
  }, [productId]);

  const handleAddToCart = () => {
    setLoading(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: selectedImage,
      quantity,
      // color: selectedColor, // Uncomment if you use colors
      // rentalDates, // Uncomment if you use rental dates
    });
    setTimeout(() => {
      setLoading(false);
      // Optionally show a notification or redirect
    }, 500);
  };

  return (
    <main className="bg-white min-h-screen font-sans">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4">
        <nav className="text-xs text-gray-500 py-2">
          <span className="hover:underline cursor-pointer" onClick={() => router.push("/products")}>Products</span>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </nav>
      </div>

      {/* Product Display Area */}
      <section className="w-[90vw] max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-2 md:mt-12" style={{paddingLeft: 'max(env(safe-area-inset-left), 2rem)', paddingRight: 'max(env(safe-area-inset-right), 2rem)'}}>
        {/* Left: Product Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 justify-start md:justify-start md:pt-0" style={{alignItems: 'flex-start'}}>
          <span className="bg-[#D4AF36] text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">{product.category}</span>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
          <div className="text-2xl font-semibold text-gray-900 mb-2">{product.price ? `$${product.price}` : <span className="text-gray-400"></span>}</div>
          {/* Date range picker (placeholder) */}
          <div>
            <label className="block text-base font-medium mb-1 text-gray-800">Rental Dates</label>
            <div className="flex gap-2">
              <input type="date" className="border rounded px-2 py-1 text-base" value={rentalDates.start} onChange={e => setRentalDates(d => ({ ...d, start: e.target.value }))} />
              <span className="self-center text-base">to</span>
              <input type="date" className="border rounded px-2 py-1 text-base" value={rentalDates.end} onChange={e => setRentalDates(d => ({ ...d, end: e.target.value }))} />
            </div>
          </div>
          {/* Shipping/Pickup */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-gray-800">Ships:</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Weekly</span>
              <span className="text-green-600 text-xs ml-2">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-gray-800">Pickup:</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Available</span>
            </div>
          </div>
          {/* Quantity selector */}
          <div>
            <label className="block text-base font-medium mb-1 text-gray-800">Quantity</label>
            <input type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="border rounded px-2 py-1 w-20 text-base" />
          </div>
          {/* Action Buttons */}
          <button className="w-full bg-[#D4AF36] text-white font-semibold py-3 rounded-lg text-lg transition hover:bg-[#bfa12e] disabled:opacity-60" onClick={handleAddToCart} disabled={loading}>
            {loading ? "Adding..." : "Add to Cart"}
          </button>
          <button className="w-full border border-[#D4AF36] text-[#D4AF36] font-semibold py-3 rounded-lg text-lg mt-2 transition hover:bg-[#f9f6ef]">Add to Wishlist</button>
          <a href="/contact" className="block text-center text-blue-600 text-sm mt-2 hover:underline">Need help? Contact us</a>
        </div>
        {/* Right: Product Image */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-start md:justify-start">
          <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center" style={{ minHeight: 320, maxWidth: 600 }}>
            {selectedImage ? (
              <Image src={selectedImage} alt={product.name} fill className="object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2">
            {product.images && product.images.map((img: string) => (
              <button key={img} className={`w-16 h-16 rounded border ${selectedImage === img ? 'border-[#D4AF36]' : 'border-gray-200'}`} onClick={() => setSelectedImage(img)}>
                <Image src={img} alt="Thumbnail" width={64} height={64} className="object-cover rounded" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Information Section */}
      <section className="w-[90vw] max-w-6xl mx-auto px-2 mt-8">
        <button className="w-full flex justify-between items-center py-4 border-b text-3xl font-bold text-gray-900" onClick={() => setShowInfo(v => !v)}>
          Product Information
          <span>{showInfo ? "-" : "+"}</span>
        </button>
        {showInfo && (
          <div className="py-4 text-gray-700 text-base border-b">
            <p>{product.description}</p>
          </div>
        )}
      </section>

      {/* Recommendations Section */}
      <section className="max-w-7xl mx-auto px-4 mt-8 mb-16">
        <h2 className="text-3xl font-bold mb-4 text-center">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {product.recommendations && product.recommendations.slice(0, 3).map((rec: any) => (
            <div key={rec.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
              {rec.image ? (
                <Image src={rec.image} alt={rec.name} width={180} height={180} className="object-cover rounded mb-2" />
              ) : (
                <div className="w-[180px] h-[180px] flex items-center justify-center text-gray-400 bg-gray-100 rounded mb-2">No Image</div>
              )}
              <div className="text-sm font-semibold text-gray-900 mb-1 text-center">{rec.name}</div>
              <div className="text-xs text-gray-500 mb-1 text-center">{rec.price ? `$${rec.price}` : ""}</div>
              <div className="text-xs text-gray-400 mb-1 text-center">{rec.category}</div>
              <a href={`/products/${rec.id}`} className="mt-2 px-4 py-2 bg-[#D4AF36] text-white rounded font-semibold text-sm">View Product</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

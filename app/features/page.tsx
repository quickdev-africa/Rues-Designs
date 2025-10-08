
import React from "react";
import SimpleHeroSection from '@/components/layout/SimpleHeroSection';
import Link from "next/link";

const collections = [
  {
    name: "Bohemian Romance",
    count: 24,
    description: "A free-spirited collection featuring warm earth tones, eclectic textiles, and natural materials. Perfect for creating a relaxed yet sophisticated atmosphere.",
  },
  {
    name: "Modern Minimal",
    count: 18,
    description: "Clean lines, monochromatic palettes, and architectural forms define this contemporary collection. Ideal for sleek, sophisticated events.",
  },
  {
    name: "Vintage Luxe",
    count: 32,
    description: "Timeless elegance with rich textures, ornate details, and classic silhouettes. This collection brings old-world charm to any celebration.",
  },
  {
    name: "Garden Romance",
    count: 22,
    description: "Bring the outdoors in with this lush, botanical-inspired collection featuring floral elements, natural textures, and soft pastels.",
  },
  {
    name: "Glam & Gold",
    count: 20,
    description: "Make a statement with this luxurious collection showcasing metallic finishes, plush textures, and dramatic silhouettes.",
  },
  {
    name: "Rustic Charm",
    count: 28,
    description: "Warm and inviting, this collection blends natural woods, weathered finishes, and homespun textures for a cozy, down-to-earth feel.",
  },
];

export default function FeaturesPage() {
  return (
    <main>
      <SimpleHeroSection
        imageUrl="/images/hero_pg4.jpg"
        title="We’ve thought of everything — so you don’t have to."
        subtitle="Our rentals and features are built around one goal: stress-free, stunning events"
        height="h-[50vh]"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          {collections.map((col) => (
            <div key={col.name} className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-2">{col.name}</h2>
              <p className="text-gray-700 mb-2">{col.count} items</p>
              <p className="text-gray-600 mb-4">{col.description}</p>
              <Link href="#" className="px-4 py-2 bg-[#D4AF37] text-white rounded-md font-medium hover:bg-[#bfa12c] transition-colors self-end">View Collection</Link>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Need Something Custom?</h2>
          <p className="text-gray-700 mb-4">We can create bespoke rental collections tailored to your specific event vision. Our design team will work with you to curate the perfect selection of pieces.</p>
          <Link href="#" className="inline-block px-6 py-3 bg-[#D4AF37] text-white rounded-md font-medium hover:bg-[#bfa12c] transition-colors">Request Custom Collection</Link>
        </div>
      </div>
    </main>
  );
}

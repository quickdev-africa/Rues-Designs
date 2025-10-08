'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { categoryInfo, CategoryInfo } from '../../../../data/categoryData';
import { supabase } from '../../../../lib/supabase';
import HeroSection from '../../../../components/shop/HeroSection';
import Breadcrumbs from '../../../../components/ui/Breadcrumbs';
import ProductGrid from '../../../../components/shop/ProductGrid';
import CategoryGuide from '../../../../components/shop/CategoryGuide';
import { placeholderImage } from '../../../../lib/placeholders';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category: CategoryInfo | undefined = categoryInfo[categoryId as string];
  
  const [categoryProducts, setCategoryProducts] = React.useState<any[]>([]);
  React.useEffect(() => {
    async function fetchProducts() {
      if (!categoryId) return;
      const { data, error } = await supabase
        .from('products')
        .select('id, name, slug, description, daily_rate, category, images')
        .eq('category', categoryId);
      if (error || !data) {
        setCategoryProducts([]);
      } else {
        // Map Supabase fields to ProductGrid format
        const mapped = (data || []).map(p => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.daily_rate,
          category: p.category,
          images: Array.isArray(p.images) ? p.images : [],
        }));
        setCategoryProducts(mapped);
      }
    }
    fetchProducts();
  }, [categoryId]);
  
  if (!category) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold">Category Not Found</h1>
        <p className="mt-4">
          The category you're looking for doesn't exist. Please return to the 
          <Link href="/shop" className="text-brand-primary ml-1 hover:underline">
            shop
          </Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroSection 
        title={category.name}
        description={category.description}
  imageUrl="/images/hero_category_all.jpg" // Use the provided elegant table setup image
        height="medium"
      />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: category.name, href: `/shop/category/${category.id}` }
          ]}
        />
      </div>
      
      {/* Products Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <h2 className="text-2xl font-semibold mb-2 md:mb-0">
            {categoryProducts.length} items in {category.name}
          </h2>
          <div className="flex items-center gap-4">
            <select 
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              defaultValue="featured"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
            <Link href="/shop/categories" className="ml-2 text-brand-primary underline text-sm font-medium whitespace-nowrap">Go back to collection</Link>
          </div>
        </div>
        
        {/* Product Grid */}
        <ProductGrid products={categoryProducts} />
      </section>
      
      {/* Category Guide */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">
            {category.name} Rental Guide
          </h2>
          
          <CategoryGuide category={category} />
          
          <div className="mt-8 text-center">
            <Link 
              href="/contact"
              className="inline-flex items-center px-4 py-2 text-brand-primary hover:underline"
            >
              Need help with your selection? Talk to our design team
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

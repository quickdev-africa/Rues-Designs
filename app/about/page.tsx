'use client';

import React from 'react';
import SimpleHeroSection from '@/components/layout/SimpleHeroSection';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';

export default function AboutPage() {
  return (
    <main>
      <SimpleHeroSection
        imageUrl="/images/hero_pg3.jpg"
        title="Designed for every occasion."
        subtitle="We don’t just rent items — we create experiences."
        height="h-[50vh]"
        // Both heading and subheading will have bold shadow and white text (handled in the component)
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-black">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Rues Design was founded with a simple yet powerful vision: to create extraordinary event
                experiences through thoughtfully curated rentals that transform any space into a memorable setting.
              </p>
              <p className="text-gray-700 mb-4">
                What began as a small collection of unique furniture pieces has grown into a comprehensive
                inventory of premium event rentals, each selected with an eye for design, quality, and versatility.
              </p>
              <p className="text-gray-700">
                We believe that every event tells a story, and the elements you choose to include should
                enhance that narrative. Our team works closely with clients to understand their vision and bring
                it to life through our carefully selected pieces.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/about/about-story.jpg" 
                alt="The Rues Design team setting up an event" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>
        {/* New About Page Layout */}
        {/* Old About, Values, and Background sections removed for new layout. */}
          {/* Premium About Page Layout for Rues Designs */}
          <section className="w-full min-h-screen bg-white flex flex-col items-center px-6 md:px-0 pt-20 pb-32">
            {/* Hero Headline */}
            <div className="w-full max-w-6xl mx-auto mb-16 text-left">
              <h1 className="text-3xl font-bold text-[#D4AF36] mb-6">Rues Designs</h1>
              <p className="font-sans font-medium text-black text-[28px] md:text-[24px] leading-tight max-w-2xl">
                Premium event rentals for modern celebrations.
              </p>
            </div>
            {/* Three-Column Info Row */}
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
              {/* Column 1 */}
              <div className="flex flex-col">
                <hr className="w-12 border-t mb-4" style={{ borderColor: '#D4AF36', borderTopWidth: '2px' }} />
                <h2 className="font-sans font-bold text-[22px] text-black mb-3">Who We Are</h2>
                <p className="font-sans text-[18px] text-gray-700 leading-relaxed">
                  We’re a collective of creatives, planners, and perfectionists who believe design is what transforms an event into an experience. From intimate gatherings to grand celebrations, we bring style, structure, and storytelling to every detail.
                </p>
              </div>
              {/* Column 2 */}
              <div className="flex flex-col">
                <hr className="w-12 border-t mb-4" style={{ borderColor: '#D4AF36', borderTopWidth: '2px' }} />
                <h2 className="font-sans font-bold text-[22px] text-black mb-3">What We Do</h2>
                <p className="font-sans text-[18px] text-gray-700 leading-relaxed">
                  We curate and rent contemporary event essentials — from elegant tablescapes and lounge seating to linens, décor, and custom setups. Our team designs cohesive looks, helps you plan effortlessly, and ensures every item feels tailored to your vision.
                </p>
              </div>
              {/* Column 3 */}
              <div className="flex flex-col">
                <hr className="w-12 border-t mb-4" style={{ borderColor: '#D4AF36', borderTopWidth: '2px' }} />
                <h2 className="font-sans font-bold text-[22px] text-black mb-3">Contact Us</h2>
                <p className="font-sans text-[18px] text-gray-700 leading-relaxed">
                  Planning a celebration? Styling a shoot? Hosting something unforgettable? We’re here to make it effortless — from concept to clean-up. Get in touch so we can help bring your next event to life.
                </p>
              </div>
            </div>
            
            {/* Large Subheadline Section */}
            <div className="w-full max-w-6xl mx-auto mb-16 text-left">
              <h2 className="text-3xl font-bold text-[#D4AF36] mb-4">10+ years of design & celebration</h2>
              <p className="font-sans text-[18px] text-gray-700 leading-relaxed max-w-3xl">
                We’ve helped clients craft weddings, dinners, corporate events, and styled shoots that feel timeless, personal, and deeply intentional. With each project, we refine the art of modern rentals — where form meets feeling.
              </p>
              {/* Image Block */}
        <div class="mt-8 relative h-96 rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-amber-100 to-amber-50">
            
            <img 
                src="/images/about/styled-outdoor-event.jpg" 
                alt="The Rues Design team setting up an event" 
                class="w-full h-full object-cover"
                loading="eager"
            />
        </div>
            </div>
          </section>
        {/* Ready to Create Something Beautiful Section (preserved) */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Something Beautiful?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's work together to bring your event vision to life with our curated collection of rental pieces.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-md font-medium hover:bg-[#C09F27] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

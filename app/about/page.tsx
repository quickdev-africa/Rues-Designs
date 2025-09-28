'use client';

import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="About Rues Design"
        subtitle="Learn more about our passion for creating beautiful event experiences"
        bgImage="/images/stock/background-about.jpg"
      />
      
      <section className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
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
              src="/images/stock/about-story.jpg" 
              alt="The Rues Design team setting up an event" 
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Our Values</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            These core principles guide everything we do at Rues Design
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">Quality</h3>
            <p className="text-gray-700">
              We meticulously maintain our inventory and only offer pieces that meet our high standards for design and durability.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">Creativity</h3>
            <p className="text-gray-700">
              We're constantly seeking unique items that inspire and help our clients create truly distinctive events.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">Service</h3>
            <p className="text-gray-700">
              We're committed to exceptional service, from the first consultation to final pickup, ensuring a seamless experience.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            The passionate professionals behind Rues Design
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Emma Johnson',
              role: 'Founder & Creative Director',
              image: '/images/stock/team-member-1.jpg',
              bio: 'With over 15 years of experience in event design, Emma brings creative vision and industry expertise to every project.'
            },
            {
              name: 'Michael Chen',
              role: 'Operations Manager',
              image: '/images/stock/team-member-2.jpg',
              bio: 'Michael ensures that every logistical detail is handled with precision, from inventory management to delivery coordination.'
            },
            {
              name: 'Sophia Rodriguez',
              role: 'Client Experience Specialist',
              image: '/images/stock/team-member-3.jpg',
              bio: 'Sophia works directly with clients to understand their needs and helps transform their vision into reality.'
            }
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-[#D4AF37] mb-3">{member.role}</p>
                <p className="text-gray-700">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
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
    </main>
  );
}

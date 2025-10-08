'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import AnimatedCard from '../ui/AnimatedCard';
import Link from 'next/link';

const packages = [
  {
    title: 'Wedding Worlds',
    image: '/images/stock/featured-wedding.jpg',
    link: '/shop/categories',
  },
  {
    title: 'Summer Breeze Lounge & Dine',
    image: '/images/stock/featured-lounge.jpg',
    link: '/shop/categories',
  },
  {
    title: 'Large Barbecue & Champagne Spritzer',
    image: '/images/stock/featured-bbq.jpg',
    link: '/shop/categories',
  },
];

export default function FeaturedPackagesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <AnimatedSection className="py-12 bg-white">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Featured Event Packages
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {packages.map((pkg, index) => (
            <Link href={pkg.link} key={pkg.title}>
              <motion.div
                className="relative h-[400px] w-full overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="absolute inset-0"
                  animate={{
                    filter: hoveredIndex === index ? 'brightness(0.7)' : 'brightness(1)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="h-full w-full object-cover" 
                  />
                </motion.div>
                
                {/* Title overlay - only visible on hover */}
                {hoveredIndex === index && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg px-6 text-center">
                      {pkg.title}
                    </h3>
                  </motion.div>
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

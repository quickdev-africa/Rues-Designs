'use client';
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import AnimatedCard from '../ui/AnimatedCard';
import Link from 'next/link';

const looks = [
  {
    title: 'Modern Lounge',
    description: 'Curated lounge sets for stylish events.',
    image: '/images/stock/look-lounge.jpg',
    link: '/features',
  },
  {
    title: 'Elegant Dining',
    description: 'Beautiful dining setups for any occasion.',
    image: '/images/stock/look-dining.jpg',
    link: '/features',
  },
];

export default function RentTheLookSection() {
  return (
    <AnimatedSection className="py-12 bg-white" delay={0.3}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Rent the Look
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
          {looks.map((look, index) => (
            <Link href={look.link} key={look.title}>
              <AnimatedCard 
                className="overflow-hidden bg-gray-50 flex flex-col h-full cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                delay={0.2 * index}
              >
                <div className="relative h-96 w-full">
                  <img src={look.image} alt={look.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{look.title}</h3>
                  <p className="text-gray-600 leading-tight text-lg">{look.description}</p>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

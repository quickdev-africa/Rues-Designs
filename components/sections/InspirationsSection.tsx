'use client';
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import AnimatedCard from '../ui/AnimatedCard';

const inspirations = [
  {
    title: 'Bringing a touch of Sylt to Hamburg',
    image: '/images/stock/inspiration-sylt.jpg',
    link: '#',
  },
  {
    title: 'Exclusive Hospitality Experience',
    image: '/images/stock/inspiration-hospitality.jpg',
    link: '#',
  },
  {
    title: 'Industrial Lounge with Charm',
    image: '/images/stock/inspiration-industrial.jpg',
    link: '#',
  },
];

export default function InspirationsSection() {
  return (
    <AnimatedSection className="py-12 bg-gray-50" delay={0.3}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Inspirations
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {inspirations.map((item, index) => (
            <AnimatedCard 
              key={item.title}
              className="block rounded-lg shadow hover:shadow-lg overflow-hidden bg-white"
              delay={0.1 * index}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                transition: { type: 'spring', stiffness: 300 }
              }}
            >
              <a href={item.link} className="block">
                <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
                <div className="p-4 text-center font-medium text-gray-800">{item.title}</div>
              </a>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

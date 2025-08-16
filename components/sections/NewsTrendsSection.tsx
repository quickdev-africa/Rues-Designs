'use client';
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import AnimatedCard from '../ui/AnimatedCard';

const news = [
  {
    title: 'New Arrivals for 2025',
    description: 'Discover the latest additions to our rental collection and stay ahead of event trends.',
    date: 'Aug 2025',
    link: '#',
  },
  {
    title: 'Event Design Trends',
    description: 'Explore creative ideas and inspiration for your next event.',
    date: 'Jul 2025',
    link: '#',
  },
];

export default function NewsTrendsSection() {
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
          News & Trends
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((item, index) => (
            <AnimatedCard 
              key={item.title}
              className="rounded-lg shadow-lg overflow-hidden bg-gray-50 flex flex-col"
              delay={0.2 * index}
            >
              <div className="p-4 flex-1 flex flex-col">
                <span className="text-xs text-gray-400 mb-2">{item.date}</span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 flex-1">{item.description}</p>
                <motion.a 
                  href={item.link} 
                  className="mt-auto inline-block text-primary font-medium hover:underline"
                  whileHover={{ 
                    x: 3,
                    transition: { duration: 0.2 }
                  }}
                >
                  Read More
                </motion.a>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

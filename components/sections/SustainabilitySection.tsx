'use client';
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';

export default function SustainabilitySection() {
  return (
    <AnimatedSection className="py-12 bg-white" delay={0.2}>
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Sustainability & Circular Economy
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-700 max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          We believe in a circular economy: our products are designed for reuse, repair, and recycling. Renting with us means less waste and a more sustainable future for events.
        </motion.p>
        <motion.a 
          href="#" 
          className="inline-block text-primary font-medium hover:underline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ 
            x: 3,
            transition: { duration: 0.2 }
          }}
        >
          Learn More
        </motion.a>
      </div>
    </AnimatedSection>
  );
}

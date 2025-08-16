'use client';
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';

export default function ContactSection() {
  return (
    <AnimatedSection className="py-16 bg-secondary/20" delay={0.2}>
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-3xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Ready to start planning your perfect event?
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-700 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our event specialists are here to help you select the perfect pieces for your occasion.
          Have a question or need a custom quote? Reach out for a free consultation.
        </motion.p>
        
        {/* Call to action buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a 
            href="/browse" 
            className="px-8 py-3 bg-accent text-white font-medium rounded-lg shadow-md hover:bg-accent/90 transition-all transform hover:-translate-y-1"
          >
            Browse Collection
          </a>
          <a 
            href="/contact" 
            className="px-8 py-3 border border-accent text-accent bg-white font-medium rounded-lg hover:bg-accent/5 transition-all"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

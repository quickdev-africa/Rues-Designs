'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import AnimatedCard from '../ui/AnimatedCard';

// Icons for the steps
const icons = {
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
    </svg>
  ),
  'check-circle': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  ),
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
    </svg>
  ),
  party: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.75 6.75 0 01-.937-.171.75.75 0 00-.475-1.27c-.228-.042-.46-.07-.696-.07a6.75 6.75 0 01-6.75-6.75.75.75 0 00-1.5 0 8.25 8.25 0 008.25 8.25c.43 0 .854-.046 1.262-.138a.75.75 0 00.511-.703 8.25 8.25 0 001.09-16.38A.75.75 0 0012 .75z" />
      <path d="M14.22 14.22a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H12.75a.75.75 0 000 1.5h6.44l-4.97 4.97a.75.75 0 000 1.06z" />
    </svg>
  )
};

const steps = [
  { 
    title: 'Browse', 
    description: 'Explore our extensive collection of premium event rentals, from furniture to décor and tableware.',
    icon: 'search'
  },
  { 
    title: 'Select', 
    description: 'Choose the perfect items that match your event theme, style, and requirements.',
    icon: 'check-circle'
  },
  { 
    title: 'Book', 
    description: 'Secure your items with our simple booking process and receive confirmation instantly.',
    icon: 'calendar'
  },
  { 
    title: 'Enjoy', 
    description: 'We handle delivery, setup, and collection while you focus on enjoying your special occasion.',
    icon: 'party'
  },
];

export default function HowItWorksSection() {
  // Reference to the section element for parallax calculations
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Get scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform the scroll progress into a parallax effect
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "30%"]
  );
  
  return (
    <div ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Parallax background image */}
      <motion.div 
        className="absolute inset-0 bg-rent z-0"
        style={{ 
          backgroundImage: `url('/images/backgrounds/rent-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%", /* Position to focus on the table setting */
          y: backgroundY,
          scale: 1.2, // Slightly larger to avoid empty edges when moving
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      ></motion.div>
      
      {/* Overlay to ensure text readability - adjusted for the elegant dining image */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/65 backdrop-blur-[1px] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 mix-blend-multiply z-0"></div>
      {/* Warm golden glow overlay to complement the candle lights in the image */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent mix-blend-overlay z-0"></div>
      
      {/* Very subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-0" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column: Title and description */}
          <div className="flex flex-col justify-center">
            <motion.h2 
              className="text-4xl font-bold mb-6 text-left text-primary"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              How Renting Works
            </motion.h2>
            
            <motion.div
              className="w-20 h-1 bg-accent mb-8 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            />
            
            <motion.p 
              className="text-lg text-gray-800 mb-6 max-w-lg font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Our simple rental process makes event planning effortless. Follow these easy steps to create your perfect event without the hassle of purchasing items you'll only use once.
            </motion.p>
            
            <motion.p
              className="text-lg text-gray-800 mb-6 max-w-lg font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              We handle everything from delivery to setup to collection, so you can focus on enjoying your special occasion.
            </motion.p>
          </div>
          
          {/* Right column: Steps cards with timeline */}
          <div>
            <div className="relative">
              {/* Animated Timeline line */}
              <motion.div 
                className="absolute left-6 top-8 bottom-8 w-0.5 bg-accent/30 z-0 hidden sm:block"
                initial={{ height: 0 }}
                whileInView={{ height: "80%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                viewport={{ once: true }}
              ></motion.div>
              
              {/* Mobile-friendly steps grid */}
              <div className="grid grid-cols-1 gap-8">
                {steps.map((step, idx) => (
                  <AnimatedCard 
                    key={step.title} 
                    className={`rounded-xl bg-white/85 backdrop-blur-sm p-6 flex items-start gap-6 relative overflow-hidden border border-white/60 shadow-md transition-all hover:shadow-lg hover:border-accent/30 ${idx % 2 === 1 ? 'sm:ml-4' : ''}`}
                    delay={0.15 * idx}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                      borderColor: "rgba(212, 175, 55, 0.5)" // Using the actual gold color (D4AF37) with 50% opacity to match the image
                    }}
                  >
                    {/* Icon circle with number - with pulse animation on hover */}
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 relative z-10 group">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-accent group-hover:scale-110 transition-transform">
                          {icons[step.icon as keyof typeof icons]}
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {idx + 1}
                      </div>
                      {/* Pulse effect on hover */}
                      <div className="absolute inset-0 rounded-full bg-accent opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-700"></div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    {/* Subtle decorative elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-accent/5 -mr-10 -mt-10 z-0"></div>
                    {idx % 2 === 0 && (
                      <div className="absolute bottom-0 right-0 w-12 h-12 rounded-full bg-accent/5 -mr-6 -mb-6 z-0"></div>
                    )}
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

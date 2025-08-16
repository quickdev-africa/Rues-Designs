'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from '../ui/motion';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;
  
  // Auto-rotate slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);
    
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Slider background images with overlay */}
      <AnimatePresence mode="wait">
        {currentSlide === 0 && (
          <motion.div
            key="slide1"
            className="absolute inset-0 w-full h-full z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/images/stock/party-hero.jpg"
              alt="Party setup with elegant decor and rentals"
              fill
              priority
              className="object-cover object-center brightness-[0.85]"
              sizes="100vw"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10"></div>
          </motion.div>
        )}
        
        {currentSlide === 1 && (
          <motion.div
            key="slide2"
            className="absolute inset-0 w-full h-full z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/images/stock/party-hero2.jpg"
              alt="Elegant party setup with premium decor rentals"
              fill
              priority
              className="object-cover object-center brightness-[0.85]"
              sizes="100vw"
            />
            {/* Gradient overlay for better text readability - slightly different gradient for variety */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16 md:py-24 flex flex-col items-center justify-center gap-8">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            <motion.div 
              key="content1"
              className="flex-1 max-w-xl p-8 self-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ color: "#D4AF37", textShadow: "0px 2px 4px rgba(0,0,0,0.5)" }}
              >
                Transform Your Event Dreams Into Reality
              </motion.h1>
              
              <motion.p 
                className="text-lg text-white mb-8"
                style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.7)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Premium party rental services for any occasion. From elegant furniture and décor to tableware and accessories, we provide everything you need to create an unforgettable event experience.
              </motion.p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <motion.a 
                  href="/products" 
                  className="px-6 py-3 text-white font-semibold rounded-md shadow-md transition-all relative overflow-hidden group"
                  style={{ 
                    background: "linear-gradient(to right, #31473A, #3c5848)",
                    border: "1px solid #D4AF37"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(212, 175, 55, 0.8)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Browse Catalog</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#b7953a] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                
                <motion.a 
                  href="/contact" 
                  className="px-6 py-3 text-white font-semibold rounded-md shadow-md transition-all relative overflow-hidden group"
                  style={{ 
                    background: "linear-gradient(to right, #31473A, #3c5848)",
                    border: "1px solid #D4AF37"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(212, 175, 55, 0.8)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Get Quote</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#b7953a] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </div>
              
              {/* Trust indicators */}
              <motion.div 
                className="flex flex-wrap gap-x-8 gap-y-3 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-gold-500 text-sm md:text-base font-semibold">500+</span>
                  <span className="text-xs md:text-sm opacity-80">Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold-500 text-sm md:text-base font-semibold">24/7</span>
                  <span className="text-xs md:text-sm opacity-80">Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold-500 text-sm md:text-base font-semibold">Free</span>
                  <span className="text-xs md:text-sm opacity-80">Delivery</span>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {currentSlide === 1 && (
            <motion.div 
              key="content2"
              className="flex-1 max-w-2xl mx-auto p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ color: "#D4AF37", textShadow: "0px 2px 4px rgba(0,0,0,0.5)" }}
              >
                Premium Event Rentals | Elevate Your Special Occasions
              </motion.h1>
              
              <motion.p 
                className="text-lg text-white mb-8 mx-auto max-w-lg"
                style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.7)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Top-rated party equipment and décor rentals in the Bay Area. From elegant tablescapes to premium furniture - we bring your event vision to life with unparalleled service and quality.
              </motion.p>
              
              <div className="flex justify-center mb-8">
                <motion.a 
                  href="/contact" 
                  className="px-8 py-4 text-white font-semibold rounded-md shadow-md transition-all relative overflow-hidden group"
                  style={{ 
                    background: "linear-gradient(to right, #31473A, #3c5848)",
                    border: "1px solid #D4AF37"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(212, 175, 55, 0.8)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 text-lg">Get Your Custom Quote Today</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#b7953a] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </div>
              
              {/* Trust indicators */}
              <motion.div 
                className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-gold-500 text-sm md:text-base font-semibold">500+</span>
                  <span className="text-xs md:text-sm opacity-80">Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold-500 text-sm md:text-base font-semibold">24/7</span>
                  <span className="text-xs md:text-sm opacity-80">Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold-500 text-sm md:text-base font-semibold">Free</span>
                  <span className="text-xs md:text-sm opacity-80">Delivery</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Slider navigation dots */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {[...Array(totalSlides)].map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-gold-500 w-6' : 'bg-white/50 hover:bg-white/70'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

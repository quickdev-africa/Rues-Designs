
'use client';
import React from 'react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const categories = [
  { name: 'TABLETOP', image: '/images/stock/category-tabletop.png', link: '/shop?category=tabletop' },
  { name: 'LINEN', image: '/images/stock/category-linen.png', link: '/shop?category=linen' },
  { name: 'DRAPING', image: '/images/stock/category-draping.png', link: '/shop?category=draping' },
  { name: 'CANDELABRAS AND CANDLE HOLDERS', image: '/images/stock/category-candle.png', link: '/shop?category=candles' },
  { name: 'PEDESTALS', image: '/images/stock/category-pedestals.png', link: '/shop?category=pedestals' },
  { name: 'TABLES', image: '/images/stock/category-tables.png', link: '/shop?category=tables' },
  { name: 'DINING CHAIRS', image: '/images/stock/category-dining-chairs.png', link: '/shop?category=dining-chairs' },
  { name: 'BAR STOOLS AND COCKTAIL TABLES', image: '/images/stock/category-bar-cocktail.png', link: '/shop?category=bar-cocktail' },
  { name: 'SHELVES & BARS', image: '/images/stock/category-shelves-bars.png', link: '/shop?category=shelves-bars' },
  { name: 'ACCENT CHAIRS', image: '/images/stock/category-accent-chairs.png', link: '/shop?category=accent-chairs' },
  { name: 'SOFAS', image: '/images/stock/category-sofas.png', link: '/shop?category=sofas' },
  { name: 'BANQUET SOFAS', image: '/images/stock/category-banquet-sofas.png', link: '/shop?category=banquet-sofas' },
  { name: 'COFFEE AND SIDE TABLES', image: '/images/stock/category-coffee-side.png', link: '/shop?category=coffee-side' },
  { name: 'BACKDROPS', image: '/images/stock/category-backdrops.png', link: '/shop?category=backdrops' },
  { name: 'PROPS', image: '/images/stock/category-props.png', link: '/shop?category=props' },
];

export default function ProductCategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: 'beforeChildren'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatedSection className="py-8 bg-gray-50 w-full" delay={0.2}>
      <div className="max-w-full px-0 sm:px-2 mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center w-full"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Discover Our Product Categories
        </motion.h2>
        
        <div className="relative">
          {/* Left scroll button */}
          <motion.button 
            onClick={scrollLeft} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
            aria-label="Scroll left"
            whileHover={{ scale: 1.2, backgroundColor: '#FFF6E5' }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </motion.button>
          
          {/* Scrollable container */}
          <motion.div
            ref={scrollRef}
            className="flex gap-3 sm:gap-5 overflow-x-auto scrollbar-hide w-full px-10"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {categories.map((cat, idx) => (
              <motion.a
                key={cat.name + idx}
                href={cat.link}
                aria-label={`Browse ${cat.name.toLowerCase()} category`}
                className="flex flex-col items-center min-w-[80px] max-w-[100px] sm:min-w-[110px] sm:max-w-[130px] mx-1 sm:mx-2 bg-white rounded-xl shadow hover:shadow-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer relative overflow-hidden"
                tabIndex={0}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-[55px] h-[40px] sm:w-[80px] sm:h-[60px] object-contain mb-1 sm:mb-2"
                  style={{ aspectRatio: '32/25' }}
                />
                <div className="text-[10px] sm:text-xs font-normal text-gray-900 mb-1 sm:mb-2 text-center whitespace-normal lowercase tracking-tight">
                  {cat.name.toLowerCase()}
                </div>
              </motion.a>
            ))}
          </motion.div>
          
          {/* Right scroll button */}
          <motion.button 
            onClick={scrollRight} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
            aria-label="Scroll right"
            whileHover={{ scale: 1.2, backgroundColor: '#FFF6E5' }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </motion.button>
        </div>
      </div>
    </AnimatedSection>
  );
}

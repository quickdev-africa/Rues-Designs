import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  whileHover?: any;
  onClick?: () => void;
  showGoldAccent?: boolean;
}

const defaultHoverAnimation = {
  scale: 1.03,
  y: -5,
  transition: { type: 'spring', stiffness: 300 },
};

export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  whileHover = defaultHoverAnimation,
  onClick,
  showGoldAccent = false,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration }}
      whileHover={whileHover}
      onClick={onClick}
    >
      {showGoldAccent && (
        <>
          {/* Gold border accent on top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-600 to-gold-300 rounded-t-lg" />
          
          {/* Gold border accent on left */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold-600 to-gold-300 rounded-l-lg" />
        </>
      )}
      
      {children}
    </motion.div>
  );
}

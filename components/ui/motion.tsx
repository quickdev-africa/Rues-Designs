'use client';

import {
  motion as framerMotion,
  AnimatePresence as framerAnimatePresence
} from 'framer-motion';

// Re-export specific components from framer-motion
export const motion = framerMotion;
export const AnimatePresence = framerAnimatePresence;

// Export commonly used motion components
export const MotionDiv = framerMotion.div;
export const MotionSection = framerMotion.section;
export const MotionHeader = framerMotion.header;
export const MotionFooter = framerMotion.footer;
export const MotionSpan = framerMotion.span;
export const MotionP = framerMotion.p;
export const MotionH1 = framerMotion.h1;
export const MotionH2 = framerMotion.h2;
export const MotionH3 = framerMotion.h3;
export const MotionUl = framerMotion.ul;
export const MotionLi = framerMotion.li;
export const MotionA = framerMotion.a;
export const MotionButton = framerMotion.button;
export const MotionImg = framerMotion.img;

// Export types
export type { Variant, Variants } from 'framer-motion';

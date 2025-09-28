'use client';

import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  height?: 'small' | 'medium' | 'large';
}

export default function HeroSection({ 
  title, 
  description, 
  imageUrl, 
  height = 'large' 
}: HeroSectionProps) {
  // Determine the height class based on the prop
  const heightClass = {
    small: 'min-h-[200px] md:min-h-[250px]',
    medium: 'min-h-[300px] md:min-h-[350px]',
    large: 'min-h-[400px] md:min-h-[600px]'
  }[height];

  return (
    <section className={`relative ${heightClass} overflow-hidden`}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover object-center brightness-[0.85]"
          sizes="100vw"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col items-start justify-center">
        <div className="max-w-xl p-4 md:p-8">
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "#D4AF37", textShadow: "0px 2px 4px rgba(0,0,0,0.5)" }}
          >
            {title}
          </h1>
          
          <p 
            className="text-base md:text-lg text-white"
            style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.7)" }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

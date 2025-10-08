"use client";
import Image from "next/image";
import React from "react";

interface SimpleHeroSectionProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  height?: string;
}

const SimpleHeroSection: React.FC<SimpleHeroSectionProps> = ({
  imageUrl,
  title,
  subtitle,
  height = "h-[50vh]",
}) => {
  return (
    <section className={`relative w-full ${height} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-12 w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ textShadow: '0 4px 16px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.7)' }}>
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-lg md:text-2xl font-medium text-white max-w-2xl mx-auto" style={{ textShadow: '0 4px 16px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.7)' }}>
            {subtitle}
          </h2>
        )}
      </div>
    </section>
  );
};

export default SimpleHeroSection;

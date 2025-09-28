'use client';

import React from 'react';
import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export default function PageHeader({ title, subtitle, bgImage }: PageHeaderProps) {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background Image with Overlay */}
      {bgImage && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={bgImage}
            alt={`${title} background`}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
        </div>
      )}
      
      {/* Content */}
      <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col items-center text-center ${!bgImage ? 'bg-gradient-to-r from-gray-800 to-gray-900' : ''}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl max-w-3xl text-gray-100/90">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

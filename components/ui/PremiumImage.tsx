'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getOptimizedCloudinaryUrl } from '@/lib/utils/cloudinary';

type AspectRatio = 'video' | 'square' | 'golden' | 'auto';

interface PremiumImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  aspectRatio?: AspectRatio;
  priority?: boolean;
}

const aspectRatioClasses: Record<AspectRatio, string> = {
  video: 'aspect-video',
  square: 'aspect-square',
  golden: 'aspect-[1.618/1]',
  auto: 'aspect-auto',
};

export default function PremiumImage({
  src,
  alt,
  width,
  height,
  aspectRatio = 'auto',
  priority = false,
}: PremiumImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback safe alt text with absolute constraint against used/pre-owned terms
  const fallbackAlt = "Factory pristine electric powertrain specification asset";
  const rawAlt = alt || fallbackAlt;

  // Strict sanitization for forbidden "0 Km" rule violations
  const forbiddenTerms = [
    'used', 'pre-owned', 'mileage', 'wear', 'tear', 
    'scratch', 'trade-in', 'échanges'
  ];
  
  const hasForbiddenTerm = forbiddenTerms.some(term => 
    rawAlt.toLowerCase().includes(term)
  );
  
  const safeAlt = hasForbiddenTerm ? fallbackAlt : rawAlt;

  const cloudinaryLoader = ({ src: loaderSrc, width: loaderWidth, quality }: { src: string; width: number; quality?: number }) => {
    return getOptimizedCloudinaryUrl(loaderSrc, loaderWidth, quality);
  };

  return (
    <div 
      className={`relative overflow-hidden bg-brand-obsidian border border-brand-espresso ${aspectRatioClasses[aspectRatio]}`}
      style={aspectRatio === 'auto' ? { width, height } : undefined}
    >
      <Image
        loader={cloudinaryLoader}
        src={src}
        alt={safeAlt}
        width={width}
        height={height}
        priority={priority}
        className={`object-cover w-full h-full transition-opacity duration-700 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Luxury Placeholder Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-brand-obsidian animate-pulse" />
      )}
    </div>
  );
}

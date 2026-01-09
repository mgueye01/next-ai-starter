'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  title?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  onLoad?: () => void;
  enabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  title,
  aspectRatio,
  onLoad,
  enabled = true,
  placeholder,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set mounted state and detect mobile after hydration
  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const rootMargin = isMobile ? '100px' : '50px';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.1
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [enabled, isMobile]);

  // Handle image loading
  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setError(true);
  };

  // Get aspect ratio classes
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'portrait':
        return 'aspect-[3/4]';
      case 'landscape':
        return 'aspect-[4/3]';
      case 'square':
        return 'aspect-square';
      default:
        return 'aspect-auto';
    }
  };

  // Generate placeholder image URL (low quality, blurred)
  const getPlaceholderSrc = () => {
    if (placeholder) return placeholder;

    // Create a low-quality version of the image for faster loading
    try {
      const url = new URL(src);
      if (url.hostname.includes('unsplash.com')) {
        // Use smaller dimensions for mobile (uses state to avoid hydration mismatch)
        const width = isMobile ? '30' : '50';
        return `${src}&w=${width}&q=10&blur=2`;
      }
    } catch {
      // Handle invalid URLs gracefully
    }
    return src;
  };
  
  // Mobile-optimized image dimensions
  const getOptimizedSrc = () => {
    try {
      const url = new URL(src);
      if (url.hostname.includes('unsplash.com')) {
        // Use state to avoid hydration mismatch - default to desktop size on SSR
        const width = isMobile ? '800' : '1200'; // Fixed widths for consistency
        return `${src}&w=${width}&q=80&auto=format`;
      }
    } catch {
      // Handle invalid URLs gracefully
    }
    return src;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden bg-[#ECEEDF] ${getAspectRatioClass()} ${className} mobile-optimized will-change-transform`}
    >
      {/* Loading placeholder */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#ECEEDF] via-[#BBDCE5]/20 to-[#D9C4B0]/20 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
               style={{
                 background: 'linear-gradient(90deg, transparent, rgba(187, 220, 229, 0.4), transparent)',
                 animation: 'shimmer 1.2s infinite'
               }}
          />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image non disponible</div>
          </div>
        </div>
      )}

      {/* Placeholder image (blurred, low quality) */}
      {enabled && !isInView && !error && (
        <img
          src={getPlaceholderSrc()}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm opacity-60"
          loading="eager"
        />
      )}

      {/* Main image */}
      {(isInView || !enabled) && !error && (
        <motion.img
          ref={imgRef}
          src={getOptimizedSrc()}
          alt={alt}
          title={title}
          className="w-full h-full object-cover"
          loading={enabled ? "lazy" : "eager"}
          onLoad={handleImageLoad}
          onError={handleImageError}
          decoding="async"
          style={{
            WebkitUserSelect: 'none',
            userSelect: 'none',
            WebkitTouchCallout: 'none'
          }}
          draggable={false}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0,
            filter: isLoaded ? 'blur(0px)' : 'blur(4px)'
          }}
          transition={{
            duration: isMobile ? 0.4 : 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      )}

      {/* Loading indicator */}
      {!isLoaded && !error && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#ECEEDF]/30 backdrop-blur-sm">
          <motion.div
            className="w-6 h-6 md:w-8 md:h-8 border-2 border-[#BBDCE5]/50 border-t-[#BBDCE5] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
};

// Add the shimmer animation to your global CSS or Tailwind config
const shimmerKeyframes = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
`;
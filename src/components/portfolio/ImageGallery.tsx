'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioImage, GalleryProps, FilterOption, PhotographyType } from './types';
import { LazyImage } from './LazyImage';
import { ImageLightbox } from './ImageLightbox';
import { GalleryFilter } from './GalleryFilter';
import { RefreshCw } from 'lucide-react';

export const ImageGallery: React.FC<GalleryProps> = ({
  images,
  category = 'all',
  layout = 'masonry',
  columns = 3,
  showFilters = true,
  enableLightbox = true,
  lazyLoad = true,
  animated = true
}) => {
  const [filteredImages, setFilteredImages] = useState<PortfolioImage[]>(images);
  const [selectedCategory, setSelectedCategory] = useState<PhotographyType | 'all'>(category);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Filter images based on selected category
  useEffect(() => {
    const filtered = selectedCategory === 'all' 
      ? images 
      : images.filter(img => img.category === selectedCategory);
    setFilteredImages(filtered);
  }, [selectedCategory, images]);

  // Generate filter options with counts
  const filterOptions: FilterOption[] = [
    { 
      value: 'all', 
      label: 'Tout', 
      count: images.length 
    },
    ...Array.from(new Set(images.map(img => img.category))).map(cat => ({
      value: cat,
      label: getCategoryLabel(cat),
      count: images.filter(img => img.category === cat).length
    }))
  ];

  const handleImageLoad = useCallback((imageId: string) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  }, []);

  const openLightbox = useCallback((index: number) => {
    if (enableLightbox) {
      setLightboxIndex(index);
    }
  }, [enableLightbox]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Pull-to-refresh functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartY || isRefreshing) return;
    
    const touch = e.touches[0];
    const currentY = touch.clientY;
    const pullDistance = currentY - touchStartY;
    const scrollTop = galleryRef.current?.scrollTop || 0;
    
    // Only trigger pull-to-refresh if at top of container and pulling down
    if (scrollTop === 0 && pullDistance > 100) {
      handleRefresh();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh - in real app, you'd refetch data
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getGridClasses = () => {
    const baseClasses = 'gap-3 md:gap-4 p-3 md:p-4';
    const mobileColumns = typeof window !== 'undefined' 
      ? (window.innerWidth < 640 ? 1 : window.innerWidth < 768 ? 2 : columns)
      : columns;
    
    switch (layout) {
      case 'masonry':
        return `columns-1 sm:columns-2 md:columns-${columns} space-y-3 md:space-y-4 ${baseClasses}`;
      case 'grid':
        return `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} ${baseClasses}`;
      case 'justified':
        return `flex flex-wrap justify-center ${baseClasses}`;
      default:
        return `columns-1 sm:columns-2 md:columns-${columns} space-y-3 md:space-y-4 ${baseClasses}`;
    }
  };

  const getImageAnimation = (index: number) => {
    if (!animated) return {};
    
    return {
      initial: { opacity: 0, y: 50, scale: 0.95 },
      animate: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.3 }
      }
    };
  };

  return (
    <div className="w-full">
      {showFilters && (
        <div className="mb-6">
          <GalleryFilter
            options={filterOptions}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      )}

      {/* Pull-to-refresh indicator */}
      {isRefreshing && (
        <div className="md:hidden flex items-center justify-center py-4">
          <RefreshCw className="w-6 h-6 text-[#BBDCE5] animate-spin" />
          <span className="ml-2 text-[#8B7355] text-sm">Actualisation...</span>
        </div>
      )}

      <motion.div 
        ref={galleryRef}
        className={`${getGridClasses()} overflow-hidden`}
        layout={animated}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`
                break-inside-avoid cursor-pointer group touch-manipulation
                ${layout === 'masonry' ? 'mb-3 md:mb-4' : ''}
                ${layout === 'justified' ? 'flex-grow' : ''}
              `}
              {...getImageAnimation(index)}
              whileHover={animated ? { 
                scale: 1.02, 
                transition: { duration: 0.2 } 
              } : {}}
              whileTap={{ scale: 0.98 }}
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  aspectRatio={image.aspectRatio}
                  onLoad={() => handleImageLoad(image.id)}
                  enabled={lazyLoad}
                />
                
                {/* Mobile-friendly overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 md:group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    className="text-white text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-4"
                    initial={false}
                    animate={{
                      opacity: 0,
                      y: 16
                    }}
                    whileHover={{
                      opacity: 1,
                      y: 0
                    }}
                  >
                    <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 leading-tight">{image.title}</h3>
                    <p className="text-xs md:text-sm text-gray-200">{getCategoryLabel(image.category)}</p>
                    {image.metadata?.location && (
                      <p className="text-xs text-gray-300 mt-1">{image.metadata.location}</p>
                    )}
                  </motion.div>
                </div>

                {/* Featured Badge - Mobile optimized */}
                {image.featured && (
                  <div className="absolute top-2 md:top-3 right-2 md:right-3">
                    <div className="bg-gradient-to-r from-[#CFAB8D] to-[#D9C4B0] text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                      ❤️ Coup de coeur
                    </div>
                  </div>
                )}
                
                {/* Loading indicator */}
                {!loadedImages.has(image.id) && (
                  <div className="absolute inset-0 bg-[#ECEEDF]/50 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#BBDCE5] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      {enableLightbox && lightboxIndex !== null && (
        <ImageLightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % filteredImages.length)}
          onPrev={() => setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1)}
        />
      )}
    </div>
  );
};

function getCategoryLabel(category: PhotographyType): string {
  const labels: Record<PhotographyType, string> = {
    portrait: 'Portraits',
    wedding: 'Mariages',
    commercial: 'Commercial',
    event: 'Événements',
    product: 'Produits',
    fashion: 'Mode',
    corporate: 'Corporate',
    family: 'Famille',
    lifestyle: 'Lifestyle',
    artistic: 'Artistique'
  };
  return labels[category] || category;
}
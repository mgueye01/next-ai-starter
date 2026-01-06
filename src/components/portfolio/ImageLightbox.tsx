'use client';

import React, { useEffect, useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Share2, Heart } from 'lucide-react';
import { PortfolioImage } from './types';

interface ImageLightboxProps {
  images: PortfolioImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}) => {
  const currentImage = images[currentIndex];
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose, onNext, onPrev]);

  // Touch gesture handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && images.length > 1) {
      onNext();
    }
    if (isRightSwipe && images.length > 1) {
      onPrev();
    }
  };

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Prevent iOS rubber band scrolling
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title,
          text: `Découvrez cette photo: ${currentImage.title}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      // Fallback: copy URL to clipboard
      await navigator.clipboard.writeText(window.location.href);
      // You might want to show a toast notification here
    }
  }, [currentImage]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = currentImage.src;
    link.download = `${currentImage.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentImage]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleBackdropClick}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
              <h2 className="text-lg md:text-xl font-semibold truncate">{currentImage.title}</h2>
              <span className="text-sm text-gray-300 flex-shrink-0">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-1 md:space-x-2">
              <button
                onClick={handleShare}
                className="p-2 md:p-2 hover:bg-white/10 rounded-full transition-colors touch-manipulation"
                title="Partager"
              >
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              
              <button
                onClick={handleDownload}
                className="p-2 md:p-2 hover:bg-white/10 rounded-full transition-colors touch-manipulation"
                title="Télécharger"
              >
                <Download className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 md:p-2 hover:bg-white/10 rounded-full transition-colors touch-manipulation"
                title="Fermer"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Hidden on mobile, swipe gestures preferred */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm touch-manipulation"
              title="Image précédente"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={onNext}
              className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm touch-manipulation"
              title="Image suivante"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Mobile tap zones for navigation */}
            <div className="md:hidden absolute inset-0 flex">
              <button
                onClick={onPrev}
                className="flex-1 bg-transparent"
                aria-label="Image précédente"
              />
              <button
                onClick={onNext}
                className="flex-1 bg-transparent"
                aria-label="Image suivante"
              />
            </div>
          </>
        )}

        {/* Main Image */}
        <motion.div
          ref={imageRef}
          className="relative max-w-7xl max-h-[80vh] w-full touch-none select-none"
          key={currentIndex}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-full h-full object-contain rounded-lg shadow-2xl"
            style={{ 
              maxHeight: '80vh',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              WebkitTouchCallout: 'none'
            }}
            draggable={false}
          />
          
          {/* Mobile swipe indicator */}
          <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="flex space-x-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
            {images.length > 1 && (
              <span className="text-xs text-white/70 ml-2">Glissez pour naviguer</span>
            )}
          </div>
        </motion.div>

        {/* Footer with metadata */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6 bg-gradient-to-t from-black/50 to-transparent">
          <div className="text-white max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                {currentImage.metadata?.description && (
                  <p className="text-gray-300 mb-2 text-sm md:text-base leading-tight">{currentImage.metadata.description}</p>
                )}
                
                <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-400">
                  {currentImage.metadata?.location && (
                    <span className="flex items-center gap-1">📍 {currentImage.metadata.location}</span>
                  )}
                  
                  {currentImage.metadata?.date && (
                    <span className="flex items-center gap-1">📅 {new Date(currentImage.metadata.date).toLocaleDateString('fr-FR')}</span>
                  )}
                  
                  {currentImage.metadata?.camera && (
                    <span className="flex items-center gap-1">📷 {currentImage.metadata.camera}</span>
                  )}
                  
                  {currentImage.metadata?.lens && (
                    <span className="flex items-center gap-1">🔍 {currentImage.metadata.lens}</span>
                  )}
                </div>
              </div>
              
              {/* Thumbnail Navigation - Hidden on mobile for better UX */}
              {images.length > 1 && (
                <div className="hidden md:flex space-x-2 overflow-x-auto max-w-xs">
                  {images.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((img, idx) => {
                    const actualIndex = Math.max(0, currentIndex - 2) + idx;
                    return (
                      <button
                        key={img.id}
                        onClick={() => {
                          const diff = actualIndex - currentIndex;
                          if (diff > 0) {
                            for (let i = 0; i < diff; i++) onNext();
                          } else if (diff < 0) {
                            for (let i = 0; i < Math.abs(diff); i++) onPrev();
                          }
                        }}
                        className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all touch-manipulation ${
                          actualIndex === currentIndex 
                            ? 'border-white shadow-lg' 
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img.src}
                          alt=""
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
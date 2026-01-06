'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FilterOption, PhotographyType } from './types';

interface GalleryFilterProps {
  options: FilterOption[];
  selectedCategory: PhotographyType | 'all';
  onCategoryChange: (category: PhotographyType | 'all') => void;
}

export const GalleryFilter: React.FC<GalleryFilterProps> = ({
  options,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex flex-wrap justify-center gap-2 p-4">
        {options.map((option) => {
          const isSelected = option.value === selectedCategory;
          
          return (
            <motion.button
              key={option.value}
              onClick={() => onCategoryChange(option.value)}
              className={`
                relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                ${isSelected 
                  ? 'text-white shadow-lg' 
                  : 'text-[#6B5B47] hover:text-white hover:shadow-md'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {/* Background with gradient */}
              <motion.div
                className={`
                  absolute inset-0 rounded-full transition-all duration-300
                  ${isSelected 
                    ? 'bg-gradient-to-r from-[#CFAB8D] to-[#BBDCE5]' 
                    : 'bg-white hover:bg-gradient-to-r hover:from-[#CFAB8D]/80 hover:to-[#BBDCE5]/80'
                  }
                `}
                layoutId={isSelected ? "activeFilter" : undefined}
              />
              
              {/* Glass effect overlay */}
              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
              
              {/* Content */}
              <span className="relative z-10 flex items-center gap-2">
                {option.icon && <span>{option.icon}</span>}
                {option.label}
                <span className={`
                  ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                  ${isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-[#6B5B47]/10 text-[#6B5B47]'
                  }
                `}>
                  {option.count}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Active category indicator */}
      <motion.div
        className="text-center text-[#8B7355] text-sm"
        key={selectedCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {selectedCategory === 'all' 
          ? `Affichage de toutes les photos (${options.find(o => o.value === 'all')?.count || 0})`
          : `Filtré par: ${options.find(o => o.value === selectedCategory)?.label} (${options.find(o => o.value === selectedCategory)?.count || 0})`
        }
      </motion.div>
    </div>
  );
};

// Category icons mapping
export const categoryIcons: Record<PhotographyType | 'all', string> = {
  all: '🎨',
  portrait: '👤',
  wedding: '💒',
  commercial: '🏢',
  event: '🎉',
  product: '📦',
  fashion: '👗',
  corporate: '💼',
  family: '👨‍👩‍👧‍👦',
  lifestyle: '🌟',
  artistic: '🎭'
};
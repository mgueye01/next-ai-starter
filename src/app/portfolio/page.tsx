'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Filter, Grid3X3, List, Eye, Star } from 'lucide-react';

// Import our new portfolio components
import { ImageGallery } from '@/components/portfolio/ImageGallery';
import { ProjectShowcase } from '@/components/portfolio/ProjectShowcase';
import { PortfolioSections } from '@/components/portfolio/PortfolioSections';
import { portfolioImages, projectShowcases } from '@/components/portfolio/PortfolioData';
import { PhotographyType } from '@/components/portfolio/types';

type ViewMode = 'gallery' | 'projects' | 'sections';
type LayoutMode = 'masonry' | 'grid' | 'justified';

export default function Portfolio() {
  const [viewMode, setViewMode] = useState<ViewMode>('gallery');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('masonry');
  
  // Calculate statistics
  const totalImages = portfolioImages.length;
  const featuredImages = portfolioImages.filter(img => img.featured).length;
  const categories = Array.from(new Set(portfolioImages.map(img => img.category)));
  const totalProjects = projectShowcases.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.main 
      className="min-h-screen pt-32 pb-20 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-elgato-brown mb-6">
            Portfolio
          </h1>
          <p className="text-lg md:text-xl text-elgato-text-light max-w-3xl mx-auto leading-relaxed mb-8">
            Découvrez mon travail photographique à travers différents univers. 
            Chaque image raconte une histoire unique, capturée avec passion dans les plus beaux lieux de Paris et d'ailleurs.
          </p>
          
          {/* Statistics */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8"
            variants={itemVariants}
          >
            <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-elgato-sand">{totalImages}+</div>
              <div className="text-sm text-elgato-text-light">Photos</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-elgato-sand">{totalProjects}</div>
              <div className="text-sm text-elgato-text-light">Projets</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-elgato-sand">{categories.length}</div>
              <div className="text-sm text-elgato-text-light">Catégories</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-elgato-sand">{featuredImages}</div>
              <div className="text-sm text-elgato-text-light">Coups de cœur</div>
            </div>
          </motion.div>
        </motion.div>

        {/* View Mode Controls */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 p-4 bg-white/80 backdrop-blur-sm rounded-2xl"
          variants={itemVariants}
        >
          {/* View Mode Selector */}
          <div className="flex bg-elgato-cream rounded-xl p-1">
            <button
              onClick={() => setViewMode('gallery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'gallery' 
                  ? 'bg-white text-elgato-brown shadow-md' 
                  : 'text-elgato-text-light hover:text-elgato-brown'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              Galerie
            </button>
            <button
              onClick={() => setViewMode('projects')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'projects' 
                  ? 'bg-white text-elgato-brown shadow-md' 
                  : 'text-elgato-text-light hover:text-elgato-brown'
              }`}
            >
              <List className="w-4 h-4" />
              Projets
            </button>
            <button
              onClick={() => setViewMode('sections')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'sections' 
                  ? 'bg-white text-elgato-brown shadow-md' 
                  : 'text-elgato-text-light hover:text-elgato-brown'
              }`}
            >
              <Eye className="w-4 h-4" />
              Services
            </button>
          </div>

          {/* Layout Controls (only for gallery view) */}
          {viewMode === 'gallery' && (
            <div className="flex bg-elgato-cream rounded-xl p-1">
              <button
                onClick={() => setLayoutMode('masonry')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  layoutMode === 'masonry' 
                    ? 'bg-white text-elgato-brown shadow-md' 
                    : 'text-elgato-text-light hover:text-elgato-brown'
                }`}
              >
                Masonry
              </button>
              <button
                onClick={() => setLayoutMode('grid')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  layoutMode === 'grid' 
                    ? 'bg-white text-elgato-brown shadow-md' 
                    : 'text-elgato-text-light hover:text-elgato-brown'
                }`}
              >
                Grille
              </button>
              <button
                onClick={() => setLayoutMode('justified')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  layoutMode === 'justified' 
                    ? 'bg-white text-elgato-brown shadow-md' 
                    : 'text-elgato-text-light hover:text-elgato-brown'
                }`}
              >
                Justifié
              </button>
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants}>
          {viewMode === 'gallery' && (
            <ImageGallery
              images={portfolioImages}
              layout={layoutMode}
              columns={3}
              showFilters={true}
              enableLightbox={true}
              lazyLoad={true}
              animated={true}
            />
          )}

          {viewMode === 'projects' && (
            <ProjectShowcase
              projects={projectShowcases}
              layout="grid"
              showFilters={true}
            />
          )}

          {viewMode === 'sections' && (
            <PortfolioSections defaultSection="photo" />
          )}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="mt-20 mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-light text-elgato-brown mb-8 text-center">
            Ce que disent mes clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "Des photos magnifiques qui ont capturé parfaitement l'essence de notre mariage",
                author: "Marie & Pierre",
                rating: 5
              },
              {
                text: "Un photographe exceptionnel avec un œil artistique remarquable",
                author: "Sophie L.",
                rating: 5
              },
              {
                text: "Professionnel, créatif et à l'écoute. Je recommande vivement !",
                author: "Thomas M.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-elgato-cream hover:border-elgato-sand/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-elgato-sand text-elgato-sand" />
                  ))}
                </div>
                <blockquote className="text-elgato-brown leading-relaxed mb-4 italic text-center">
                  "{testimonial.text}"
                </blockquote>
                <cite className="text-elgato-text-light font-medium not-italic block text-center text-sm">
                  — {testimonial.author}
                </cite>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-12 text-center bg-gradient-to-r from-elgato-blue to-elgato-sand-light rounded-3xl p-8 md:p-12 border border-elgato-sand/30"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-light text-elgato-brown mb-4">
            Prêt pour votre séance photo ?
          </h2>
          <p className="text-base md:text-lg text-elgato-brown/80 mb-8 max-w-2xl mx-auto">
            Contactez-moi pour discuter de votre projet et créer ensemble des images mémorables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 min-w-[200px] bg-elgato-sand text-elgato-brown rounded-xl font-medium border-2 border-transparent hover:bg-elgato-sand-dark transition-colors duration-300 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2"
              >
                Me contacter
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/services/tarifs"
                className="flex items-center justify-center gap-2 px-8 py-4 min-w-[200px] border-2 border-elgato-brown text-elgato-brown rounded-xl font-medium hover:bg-elgato-brown/10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elgato-sand focus-visible:ring-offset-2"
              >
                Voir les tarifs
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Category Navigation (Mobile-friendly) */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={itemVariants}
        >
          {[
            { category: 'portrait', label: 'Portraits', emoji: '👤' },
            { category: 'wedding', label: 'Mariages', emoji: '💒' },
            { category: 'commercial', label: 'Commercial', emoji: '🏢' },
            { category: 'event', label: 'Événements', emoji: '🎉' }
          ].map(({ category, label, emoji }) => {
            const count = portfolioImages.filter(img => img.category === category).length;
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setViewMode('gallery');
                  // This would trigger the filter in ImageGallery
                }}
                className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {emoji}
                </div>
                <div className="font-medium text-elgato-brown group-hover:text-elgato-sand transition-colors">
                  {label}
                </div>
                <div className="text-sm text-elgato-text-light">
                  {count} photos
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </motion.main>
  );
}
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, User, Camera, Tag, ExternalLink } from 'lucide-react';
import { ProjectShowcase as ProjectType } from './types';
import { ImageGallery } from './ImageGallery';

interface ProjectShowcaseProps {
  projects: ProjectType[];
  layout?: 'grid' | 'list';
  showFilters?: boolean;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  layout = 'grid',
  showFilters = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const categories = Array.from(new Set(projects.map(p => p.category)));

  return (
    <div className="w-full">
      {/* Filter Bar */}
      {showFilters && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#CFAB8D] text-white'
                  : 'bg-white text-[#6B5B47] hover:bg-[#CFAB8D]/10'
              }`}
            >
              Tous les projets ({projects.length})
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#CFAB8D] text-white'
                    : 'bg-white text-[#6B5B47] hover:bg-[#CFAB8D]/10'
                }`}
              >
                {getCategoryLabel(category)} ({projects.filter(p => p.category === category).length})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Projects Grid/List */}
      <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'}>
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
            >
              <ProjectCard 
                project={project}
                layout={layout}
                isExpanded={expandedProject === project.id}
                onToggle={() => setExpandedProject(
                  expandedProject === project.id ? null : project.id
                )}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectType;
  layout: 'grid' | 'list';
  isExpanded: boolean;
  onToggle: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  layout,
  isExpanded,
  onToggle
}) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
        layout === 'list' ? 'md:flex' : ''
      } ${isExpanded ? 'ring-2 ring-[#CFAB8D]' : ''}`}
      whileHover={{ y: -5 }}
    >
      {/* Cover Image */}
      <div className={`relative ${layout === 'list' ? 'md:w-1/2' : 'aspect-[4/3]'} overflow-hidden`}>
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <div className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
              ⭐ Projet vedette
            </div>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
          <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
        
        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/70 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
            {getCategoryLabel(project.category)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${layout === 'list' ? 'md:w-1/2 flex flex-col justify-between' : ''}`}>
        <div>
          <h3 className="text-xl font-semibold text-[#6B5B47] mb-2 group-hover:text-[#CFAB8D] transition-colors">
            {project.title}
          </h3>
          
          <p className="text-[#8B7355] text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
          
          {/* Metadata */}
          <div className="space-y-2 mb-4">
            {project.client && (
              <div className="flex items-center text-sm text-[#8B7355]">
                <User className="w-4 h-4 mr-2" />
                <span>Client: {project.client}</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-[#8B7355]">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(project.date).toLocaleDateString('fr-FR')}</span>
            </div>
            
            <div className="flex items-center text-sm text-[#8B7355]">
              <Camera className="w-4 h-4 mr-2" />
              <span>{project.images.length} photos</span>
            </div>
          </div>
          
          {/* Services */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.services.map((service, index) => (
              <span
                key={index}
                className="bg-[#BBDCE5]/30 text-[#6B5B47] text-xs px-2 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={onToggle}
            className="text-[#CFAB8D] hover:text-[#6B5B47] font-medium text-sm transition-colors"
          >
            {isExpanded ? 'Masquer les détails' : 'Voir les détails'}
          </button>
          
          <div className="flex space-x-2">
            <span className="text-xs text-[#8B7355]">
              {project.images.length} photos
            </span>
          </div>
        </div>
        
        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 border-t border-gray-200 pt-6"
            >
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-[#6B5B47] mb-2">Galerie du projet</h4>
                <ImageGallery
                  images={project.images}
                  columns={2}
                  showFilters={false}
                  animated={false}
                  layout="grid"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
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
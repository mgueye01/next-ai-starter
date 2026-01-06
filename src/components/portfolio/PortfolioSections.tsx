'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Camera, Video, Edit, Palette } from 'lucide-react';

interface ContentSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  mediaType: 'photo' | 'video' | 'content';
  content: any[];
  featured: boolean;
}

interface PortfolioSectionsProps {
  sections?: ContentSection[];
  defaultSection?: string;
}

export const PortfolioSections: React.FC<PortfolioSectionsProps> = ({
  sections = defaultSections,
  defaultSection = 'photo'
}) => {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});

  const currentSection = sections.find(s => s.id === activeSection);

  const toggleVideoPlay = (videoId: string) => {
    setIsPlaying(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  return (
    <div className="w-full">
      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 p-4">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`
              flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300
              ${activeSection === section.id
                ? 'bg-gradient-to-r from-[#CFAB8D] to-[#BBDCE5] text-white shadow-lg'
                : 'bg-white text-[#6B5B47] hover:bg-[#CFAB8D]/10 border border-[#D9C4B0]'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`p-2 rounded-full ${
              activeSection === section.id
                ? 'bg-white/20'
                : 'bg-[#CFAB8D]/10'
            }`}>
              {section.icon}
            </div>
            <div className="text-left">
              <div className="font-semibold">{section.title}</div>
              <div className={`text-sm ${
                activeSection === section.id ? 'text-white/80' : 'text-[#8B7355]'
              }`}>
                {section.content.length} éléments
              </div>
            </div>
            {section.featured && (
              <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                NEW
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Section Content */}
      <AnimatePresence mode="wait">
        {currentSection && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-light text-[#6B5B47] mb-4">
                {currentSection.title}
              </h2>
              <p className="text-lg text-[#8B7355] max-w-3xl mx-auto">
                {currentSection.description}
              </p>
            </div>

            {/* Content Grid */}
            {currentSection.mediaType === 'photo' && (
              <PhotoSection content={currentSection.content} />
            )}
            
            {currentSection.mediaType === 'video' && (
              <VideoSection 
                content={currentSection.content}
                isPlaying={isPlaying}
                onTogglePlay={toggleVideoPlay}
              />
            )}
            
            {currentSection.mediaType === 'content' && (
              <ContentSection content={currentSection.content} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Photo Section Component
const PhotoSection: React.FC<{ content: any[] }> = ({ content }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {content.map((item, index) => (
      <motion.div
        key={index}
        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -10 }}
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-gray-300">{item.category}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

// Video Section Component
const VideoSection: React.FC<{
  content: any[];
  isPlaying: { [key: string]: boolean };
  onTogglePlay: (id: string) => void;
}> = ({ content, isPlaying, onTogglePlay }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {content.map((item, index) => (
      <motion.div
        key={index}
        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-black"
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
      >
        <div className="aspect-video relative">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={() => onTogglePlay(item.id)}
              className="p-4 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
            >
              {isPlaying[item.id] ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
          </div>
        </div>
        
        <div className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#6B5B47] mb-2">{item.title}</h3>
          <p className="text-[#8B7355] text-sm mb-3">{item.description}</p>
          <div className="flex justify-between items-center text-sm text-[#8B7355]">
            <span>{item.duration}</span>
            <span>{item.category}</span>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

// Content Creation Section Component
const ContentSection: React.FC<{ content: any[] }> = ({ content }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {content.map((item, index) => (
      <motion.div
        key={index}
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 group"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
      >
        <div className="flex items-center mb-4">
          <div className="p-3 bg-[#CFAB8D]/10 rounded-full mr-4 group-hover:bg-[#CFAB8D]/20 transition-colors">
            {getContentIcon(item.type)}
          </div>
          <div>
            <h3 className="font-semibold text-[#6B5B47]">{item.title}</h3>
            <p className="text-sm text-[#8B7355]">{item.type}</p>
          </div>
        </div>
        
        <p className="text-[#8B7355] mb-4">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#CFAB8D] font-medium">{item.client}</span>
          <span className="text-xs text-[#8B7355]">{item.date}</span>
        </div>
      </motion.div>
    ))}
  </div>
);

// Helper function to get content icons
const getContentIcon = (type: string) => {
  switch (type) {
    case 'copywriting':
      return <Edit className="w-5 h-5 text-[#CFAB8D]" />;
    case 'design':
      return <Palette className="w-5 h-5 text-[#CFAB8D]" />;
    case 'social-media':
      return <Camera className="w-5 h-5 text-[#CFAB8D]" />;
    default:
      return <Edit className="w-5 h-5 text-[#CFAB8D]" />;
  }
};

// Default sections data
const defaultSections: ContentSection[] = [
  {
    id: 'photo',
    title: 'Photographie',
    description: 'Portfolio complet de mes créations photographiques, des portraits aux mariages en passant par les événements corporatifs.',
    icon: <Camera className="w-5 h-5" />,
    mediaType: 'photo',
    featured: true,
    content: [
      {
        src: 'https://images.unsplash.com/photo-1494790108755-2616c28ca2ed?w=600&h=800&fit=crop',
        title: 'Portrait Emma',
        category: 'Portrait'
      },
      {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop',
        title: 'Mariage Château',
        category: 'Mariage'
      },
      {
        src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=800&fit=crop',
        title: 'Événement Corporate',
        category: 'Événement'
      },
      {
        src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop',
        title: 'Architecture',
        category: 'Commercial'
      },
      {
        src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop',
        title: 'Mode Urbaine',
        category: 'Fashion'
      },
      {
        src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=800&fit=crop',
        title: 'Famille',
        category: 'Famille'
      }
    ]
  },
  {
    id: 'video',
    title: 'Vidéo',
    description: 'Créations vidéo pour mariages, événements et contenus promotionnels. Captation et montage professionnel.',
    icon: <Video className="w-5 h-5" />,
    mediaType: 'video',
    featured: false,
    content: [
      {
        id: 'video-1',
        title: 'Film de Mariage - Château de Versailles',
        description: 'Teaser romantique de 2 minutes capturant l\'essence d\'un mariage d\'exception',
        thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop',
        duration: '2:30',
        category: 'Mariage'
      },
      {
        id: 'video-2',
        title: 'Corporate Video - Tech Summit',
        description: 'Aftermovie dynamique d\'un événement tech parisien',
        thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=450&fit=crop',
        duration: '1:45',
        category: 'Corporate'
      },
      {
        id: 'video-3',
        title: 'Fashion Film - Collection AW24',
        description: 'Film mode artistique pour présentation de collection',
        thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=450&fit=crop',
        duration: '3:15',
        category: 'Mode'
      },
      {
        id: 'video-4',
        title: 'Portrait Cinématographique',
        description: 'Série de portraits filmés avec éclairage cinéma',
        thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616c28ca2ed?w=800&h=450&fit=crop',
        duration: '1:20',
        category: 'Portrait'
      }
    ]
  },
  {
    id: 'content',
    title: 'Création de Contenu',
    description: 'Services de création de contenu pour réseaux sociaux, sites web et campagnes marketing.',
    icon: <Edit className="w-5 h-5" />,
    mediaType: 'content',
    featured: true,
    content: [
      {
        title: 'Stratégie Social Media - Concept Store',
        type: 'social-media',
        description: 'Création de contenu Instagram et Facebook pour l\'ouverture d\'un concept store parisien',
        client: 'Concept Store Marais',
        date: 'Mars 2024'
      },
      {
        title: 'Copywriting - Site Web Photographer',
        type: 'copywriting',
        description: 'Rédaction de contenus pour site web professionnel de photographe',
        client: 'Studio Photo Paris',
        date: 'Février 2024'
      },
      {
        title: 'Design Visuel - Identité Mariage',
        type: 'design',
        description: 'Création de l\'identité visuelle complète pour un mariage de luxe',
        client: 'Marie & Pierre D.',
        date: 'Janvier 2024'
      },
      {
        title: 'Campagne Instagram - Fashion Brand',
        type: 'social-media',
        description: 'Contenu créatif pour campagne de lancement collection streetwear',
        client: 'Urban Style Paris',
        date: 'Avril 2024'
      },
      {
        title: 'Brand Story - Restaurant Gastronomique',
        type: 'copywriting',
        description: 'Storytelling et contenus pour restaurant étoilé parisien',
        client: 'Restaurant Le Jardin',
        date: 'Mars 2024'
      },
      {
        title: 'Kit Média - Événement Corporate',
        type: 'design',
        description: 'Création de tous les supports visuels pour événement d\'entreprise',
        client: 'Tech Summit Paris',
        date: 'Janvier 2024'
      }
    ]
  }
];
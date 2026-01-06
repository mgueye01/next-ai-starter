import { PortfolioImage, ProjectShowcase, PhotographyType } from './types';

// Sample portfolio images with realistic photography metadata
export const portfolioImages: PortfolioImage[] = [
  // Portrait Photography
  {
    id: 'portrait-001',
    src: 'https://images.unsplash.com/photo-1494790108755-2616c28ca2ed?w=800&h=1200&fit=crop&crop=face',
    alt: 'Portrait naturel d\'une jeune femme',
    title: 'Portrait Naturel - Emma',
    category: 'portrait',
    aspectRatio: 'portrait',
    featured: true,
    metadata: {
      camera: 'Canon R5',
      lens: '85mm f/1.4',
      location: 'Paris, Montmartre',
      date: '2024-03-15',
      description: 'Portrait naturel capturé dans les rues pavées de Montmartre'
    }
  },
  {
    id: 'portrait-002',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop&crop=face',
    alt: 'Portrait masculin professionnel',
    title: 'Portrait Corporate - Thomas',
    category: 'portrait',
    aspectRatio: 'portrait',
    metadata: {
      camera: 'Canon R6',
      lens: '50mm f/1.8',
      location: 'Studio Paris 15e',
      date: '2024-02-28',
      description: 'Portrait corporate pour LinkedIn'
    }
  },
  {
    id: 'portrait-003',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1200&fit=crop&crop=face',
    alt: 'Portrait artistique en noir et blanc',
    title: 'Portrait Artistique - Léa',
    category: 'portrait',
    aspectRatio: 'portrait',
    featured: true,
    metadata: {
      camera: 'Sony A7R IV',
      lens: '135mm f/1.8',
      location: 'Jardin du Luxembourg',
      date: '2024-01-20',
      description: 'Portrait artistique en lumière naturelle'
    }
  },

  // Wedding Photography
  {
    id: 'wedding-001',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
    alt: 'Cérémonie de mariage élégante',
    title: 'Mariage Château de Versailles',
    category: 'wedding',
    aspectRatio: 'landscape',
    featured: true,
    metadata: {
      camera: 'Canon R5',
      lens: '24-70mm f/2.8',
      location: 'Château de Versailles',
      date: '2024-06-15',
      description: 'Cérémonie romantique dans les jardins du château'
    }
  },
  {
    id: 'wedding-002',
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=1200&fit=crop',
    alt: 'Détail robe de mariée',
    title: 'Détails - Robe de Mariée',
    category: 'wedding',
    aspectRatio: 'portrait',
    metadata: {
      camera: 'Sony A7III',
      lens: '90mm Macro',
      location: 'Hôtel des Grands Boulevards',
      date: '2024-05-22',
      description: 'Détails délicats de la robe Vera Wang'
    }
  },
  {
    id: 'wedding-003',
    src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&h=800&fit=crop',
    alt: 'Premier regard des mariés',
    title: 'Premier Regard - Marie & Pierre',
    category: 'wedding',
    aspectRatio: 'landscape',
    metadata: {
      camera: 'Canon R6',
      lens: '70-200mm f/2.8',
      location: 'Domaine de Chantilly',
      date: '2024-04-18',
      description: 'Moment émouvant du premier regard'
    }
  },

  // Commercial Photography
  {
    id: 'commercial-001',
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    alt: 'Intérieur de boutique moderne',
    title: 'Boutique Concept Store',
    category: 'commercial',
    aspectRatio: 'landscape',
    featured: true,
    metadata: {
      camera: 'Sony A7R IV',
      lens: '16-35mm f/2.8',
      location: 'Le Marais, Paris',
      date: '2024-03-08',
      description: 'Photographie architecturale pour nouveau concept store'
    }
  },
  {
    id: 'commercial-002',
    src: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=800&fit=crop',
    alt: 'Produit cosmétique luxury',
    title: 'Cosmétiques Luxury Line',
    category: 'product',
    aspectRatio: 'square',
    metadata: {
      camera: 'Canon R5',
      lens: '100mm Macro',
      location: 'Studio Boulogne',
      date: '2024-02-14',
      description: 'Packshot produits pour campagne digitale'
    }
  },

  // Event Photography
  {
    id: 'event-001',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop',
    alt: 'Conférence d\'entreprise',
    title: 'Conférence Tech Summit 2024',
    category: 'event',
    aspectRatio: 'landscape',
    metadata: {
      camera: 'Sony A7III',
      lens: '24-105mm f/4',
      location: 'Palais des Congrès',
      date: '2024-01-25',
      description: 'Couverture complète de l\'événement tech'
    }
  },

  // Fashion Photography
  {
    id: 'fashion-001',
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1200&fit=crop',
    alt: 'Mode streetwear parisien',
    title: 'Streetwear Collection AW24',
    category: 'fashion',
    aspectRatio: 'portrait',
    featured: true,
    metadata: {
      camera: 'Canon R6',
      lens: '85mm f/1.4',
      location: 'Pont Alexandre III',
      date: '2024-03-30',
      description: 'Shooting mode pour collection automne-hiver'
    }
  },

  // Family Photography
  {
    id: 'family-001',
    src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=800&fit=crop',
    alt: 'Famille heureuse au parc',
    title: 'Séance Famille - Les Dubois',
    category: 'family',
    aspectRatio: 'landscape',
    metadata: {
      camera: 'Canon R5',
      lens: '50mm f/1.8',
      location: 'Parc des Buttes-Chaumont',
      date: '2024-04-05',
      description: 'Séance famille printanière en extérieur'
    }
  },

  // Corporate Photography
  {
    id: 'corporate-001',
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=800&fit=crop',
    alt: 'Équipe en réunion',
    title: 'Corporate - Startup Fintech',
    category: 'corporate',
    aspectRatio: 'landscape',
    metadata: {
      camera: 'Sony A7III',
      lens: '35mm f/1.4',
      location: 'La Défense',
      date: '2024-02-20',
      description: 'Reportage corporate pour startup en croissance'
    }
  },

  // Lifestyle Photography
  {
    id: 'lifestyle-001',
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop',
    alt: 'Lifestyle parisien café',
    title: 'Morning Coffee - Lifestyle',
    category: 'lifestyle',
    aspectRatio: 'portrait',
    metadata: {
      camera: 'Canon R6',
      lens: '50mm f/1.4',
      location: 'Café de Flore, Saint-Germain',
      date: '2024-03-12',
      description: 'Séance lifestyle authentique'
    }
  },

  // Artistic Photography
  {
    id: 'artistic-001',
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop',
    alt: 'Art conceptuel urbain',
    title: 'Urban Geometry',
    category: 'artistic',
    aspectRatio: 'portrait',
    featured: true,
    metadata: {
      camera: 'Sony A7R IV',
      lens: '24mm f/1.4',
      location: 'Fondation Cartier',
      date: '2024-01-30',
      description: 'Exploration artistique des formes urbaines'
    }
  }
];

// Sample project showcases
export const projectShowcases: ProjectShowcase[] = [
  {
    id: 'wedding-chateau-versailles',
    title: 'Mariage au Château de Versailles',
    description: 'Un mariage d\'exception dans les jardins du château de Versailles. Une journée magique capturée avec élégance et romantisme, de la préparation aux festivités de la soirée.',
    category: 'wedding',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
    images: portfolioImages.filter(img => img.id.startsWith('wedding-')),
    client: 'Marie & Pierre Dubois',
    date: '2024-06-15',
    services: ['Cérémonie religieuse', 'Cocktail', 'Soirée dansante', 'Photo de couple'],
    featured: true
  },
  {
    id: 'corporate-tech-summit',
    title: 'Tech Summit Paris 2024',
    description: 'Couverture complète de l\'événement tech le plus important de l\'année. Conférences, networking, interviews et moments spontanés capturés avec dynamisme.',
    category: 'event',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop',
    images: portfolioImages.filter(img => img.category === 'event'),
    client: 'Tech Summit Organization',
    date: '2024-01-25',
    services: ['Conférences', 'Networking', 'Interviews', 'Social media content'],
    featured: true
  },
  {
    id: 'fashion-streetwear-aw24',
    title: 'Collection Streetwear AW24',
    description: 'Shooting mode pour une nouvelle collection streetwear. Jeu entre architecture parisienne et vêtements urbains contemporains.',
    category: 'fashion',
    coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1200&fit=crop',
    images: portfolioImages.filter(img => img.category === 'fashion'),
    client: 'Urban Style Paris',
    date: '2024-03-30',
    services: ['Lookbook', 'E-commerce', 'Social media', 'Campaign'],
    featured: false
  },
  {
    id: 'portraits-montmartre',
    title: 'Série Portraits Montmartre',
    description: 'Une série de portraits intimes capturés dans les rues authentiques de Montmartre. Chaque visage raconte une histoire unique.',
    category: 'portrait',
    coverImage: 'https://images.unsplash.com/photo-1494790108755-2616c28ca2ed?w=800&h=1200&fit=crop&crop=face',
    images: portfolioImages.filter(img => img.category === 'portrait'),
    date: '2024-03-15',
    services: ['Portraits individuels', 'Retouches artistiques', 'Tirage fine art'],
    featured: true
  },
  {
    id: 'commercial-concept-store',
    title: 'Concept Store Le Marais',
    description: 'Photographie architecturale et d\'ambiance pour l\'ouverture d\'un nouveau concept store dans le Marais. Mise en valeur des espaces et des produits.',
    category: 'commercial',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    images: portfolioImages.filter(img => img.category === 'commercial'),
    client: 'Concept Store Marais',
    date: '2024-03-08',
    services: ['Architecture d\'intérieur', 'Produits', 'Ambiance', 'Site web'],
    featured: false
  },
  {
    id: 'family-buttes-chaumont',
    title: 'Séance Famille aux Buttes-Chaumont',
    description: 'Une séance famille naturelle et spontanée dans le cadre verdoyant du parc des Buttes-Chaumont. Moments de complicité et de joie.',
    category: 'family',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=800&fit=crop',
    images: portfolioImages.filter(img => img.category === 'family'),
    client: 'Famille Dubois',
    date: '2024-04-05',
    services: ['Séance extérieure', 'Photos naturelles', 'Album famille', 'Tirages'],
    featured: false
  }
];
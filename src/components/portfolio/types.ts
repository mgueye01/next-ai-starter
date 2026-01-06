export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: PhotographyType;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  featured?: boolean;
  metadata?: {
    camera?: string;
    lens?: string;
    location?: string;
    date?: string;
    description?: string;
  };
}

export interface ProjectShowcase {
  id: string;
  title: string;
  description: string;
  category: PhotographyType;
  coverImage: string;
  images: PortfolioImage[];
  client?: string;
  date: string;
  services: string[];
  featured: boolean;
}

export type PhotographyType = 
  | 'portrait' 
  | 'wedding' 
  | 'commercial' 
  | 'event' 
  | 'product'
  | 'fashion'
  | 'corporate'
  | 'family'
  | 'lifestyle'
  | 'artistic';

export interface GalleryProps {
  images: PortfolioImage[];
  category?: PhotographyType | 'all';
  layout?: 'masonry' | 'grid' | 'justified';
  columns?: 2 | 3 | 4 | 5;
  showFilters?: boolean;
  enableLightbox?: boolean;
  lazyLoad?: boolean;
  animated?: boolean;
}

export interface FilterOption {
  value: PhotographyType | 'all';
  label: string;
  count: number;
  icon?: string;
}
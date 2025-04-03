
import React from 'react';
import { ComponentItem } from "@/types/component";
import EnhancedMediaShowcase from "@/components/media/EnhancedMediaShowcase";

const AdvancedMediaGalleryComponent: ComponentItem = {
  id: 201,
  name: "Advanced Media Gallery",
  category: "Media",
  framework: "React",
  description: "A powerful, flexible media gallery component with multiple view modes, filtering, and a rich media viewer",
  code: `import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Filter, Grid3X3, LayoutList } from 'lucide-react';

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'audio';
  thumbnail: string;
  source: string;
  duration?: string;
  tags?: string[];
  featured?: boolean;
}

interface EnhancedMediaGalleryProps {
  items: MediaItem[];
  title?: string;
  subtitle?: string;
  viewMode?: 'grid' | 'carousel';
  autoplay?: boolean;
}

const EnhancedMediaGallery: React.FC<EnhancedMediaGalleryProps> = ({
  items,
  title,
  subtitle,
  viewMode = 'grid',
  autoplay = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentViewMode, setCurrentViewMode] = useState<'grid' | 'carousel'>(viewMode);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>(items);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  
  // Extract all unique tags
  const allTags = [...new Set(items.flatMap(item => item.tags || []))];
  
  // Filter items based on selected tag
  useEffect(() => {
    if (selectedFilter) {
      setFilteredItems(items.filter(item => item.tags?.includes(selectedFilter)));
    } else {
      setFilteredItems(items);
    }
  }, [selectedFilter, items]);
  
  // Auto-advance carousel if enabled
  useEffect(() => {
    if (currentViewMode === 'carousel' && autoplay) {
      const timer = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % filteredItems.length);
      }, 5000);
      
      return () => clearInterval(timer);
    }
  }, [autoplay, filteredItems.length, currentViewMode]);
  
  // Carousel navigation
  const nextSlide = () => {
    setActiveIndex(prev => (prev + 1) % filteredItems.length);
  };
  
  const prevSlide = () => {
    setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  };
  
  // Open media item in modal
  const openMediaModal = (item: MediaItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };
  
  return (
    <div className="w-full">
      {/* Header with title and view toggles */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Filter dropdown */}
          <div className="relative">
            <div className="flex items-center gap-2 text-sm">
              <button 
                className={\`flex items-center gap-1 px-3 py-1 rounded-md \${selectedFilter ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}\`}
                onClick={() => setSelectedFilter(null)}
              >
                <Filter className="h-4 w-4" />
                {selectedFilter || 'All'}
              </button>
              
              <div className="flex flex-wrap gap-1 max-w-sm">
                {allTags.slice(0, 3).map(tag => (
                  <button
                    key={tag}
                    className={\`px-2 py-1 text-xs rounded-full \${selectedFilter === tag ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}\`}
                    onClick={() => setSelectedFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
                {allTags.length > 3 && (
                  <button className="px-2 py-1 text-xs rounded-full bg-muted hover:bg-muted/80">
                    +{allTags.length - 3}
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* View toggle */}
          <div className="flex items-center gap-1 bg-muted p-0.5 rounded-md">
            <button
              className={\`p-1.5 rounded-md \${currentViewMode === 'grid' ? 'bg-background shadow' : ''}\`}
              onClick={() => setCurrentViewMode('grid')}
              title="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              className={\`p-1.5 rounded-md \${currentViewMode === 'carousel' ? 'bg-background shadow' : ''}\`}
              onClick={() => setCurrentViewMode('carousel')}
              title="Carousel view"
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Grid view */}
      {currentViewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden bg-muted rounded-lg aspect-[4/3] cursor-pointer"
              onClick={() => openMediaModal(item)}
            >
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Media type indicator */}
              {item.type !== 'image' && (
                <div className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5">
                  {item.type === 'video' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                  )}
                </div>
              )}
              
              {/* Duration badge */}
              {item.duration && (
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                  {item.duration}
                </div>
              )}
              
              {/* Featured badge */}
              {item.featured && (
                <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs px-2 py-0.5 rounded">
                  Featured
                </div>
              )}
              
              {/* Overlay with title on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white font-medium text-sm">{item.title}</h3>
                <p className="text-white/80 text-xs line-clamp-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Carousel view */}
      {currentViewMode === 'carousel' && (
        <div className="relative mt-4 overflow-hidden rounded-xl">
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden relative">
            {/* Carousel items */}
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id}
                className={\`absolute inset-0 transition-opacity duration-500 \${idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}\`}
                onClick={() => openMediaModal(item)}
              >
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 md:p-8 text-white">
                  <h3 className="text-lg md:text-2xl font-bold">{item.title}</h3>
                  <p className="text-sm md:text-base text-white/80 mt-2 max-w-xl">{item.description}</p>
                  
                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-white/20 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Media type indicator */}
                {item.type !== 'image' && (
                  <div className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2">
                    {item.type === 'video' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                      </svg>
                    )}
                  </div>
                )}
                
                {/* Duration badge */}
                {item.duration && (
                  <div className="absolute top-4 left-4 bg-black/60 text-white text-sm px-3 py-1 rounded">
                    {item.duration}
                  </div>
                )}
              </div>
            ))}
            
            {/* Navigation buttons */}
            <button 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {filteredItems.map((_, idx) => (
                <button
                  key={idx}
                  className={\`w-2 h-2 rounded-full transition-all \${idx === activeIndex ? 'bg-white w-4' : 'bg-white/50'}\`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(idx);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Media viewer modal */}
      {modalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
          <div className="max-w-5xl w-full max-h-[90vh] bg-background rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative">
              {/* Media content */}
              <div className="aspect-video bg-black">
                {selectedItem.type === 'image' && (
                  <img 
                    src={selectedItem.source} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-contain"
                  />
                )}
                
                {selectedItem.type === 'video' && (
                  <video 
                    src={selectedItem.source}
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                )}
                
                {selectedItem.type === 'audio' && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8">
                    <img 
                      src={selectedItem.thumbnail} 
                      alt={selectedItem.title}
                      className="w-48 h-48 rounded-lg object-cover shadow-lg mb-6"
                    />
                    <audio 
                      src={selectedItem.source}
                      controls
                      autoPlay
                      className="w-full max-w-md"
                    />
                  </div>
                )}
              </div>
              
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 bg-black/50 text-white p-1 rounded-full"
                onClick={() => setModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            {/* Media info */}
            <div className="p-6">
              <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
              <p className="text-muted-foreground mt-2">{selectedItem.description}</p>
              
              {/* Tags */}
              {selectedItem.tags && selectedItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedItem.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-muted rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedMediaGallery;`,
  component: EnhancedMediaShowcase,
  tags: ["Media", "Gallery", "Carousel", "Interactive", "Filter"],
  isNew: true,
  fileSize: "14.8 KB",
  price: "0"
};

export default AdvancedMediaGalleryComponent;

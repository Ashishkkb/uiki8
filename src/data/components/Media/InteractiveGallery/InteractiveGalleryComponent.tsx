
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  description?: string;
  tags?: string[];
}

interface InteractiveGalleryProps {
  images?: GalleryImage[];
  layout?: 'grid' | 'masonry' | 'carousel';
  gap?: number;
  enableFullscreen?: boolean;
  showImageInfo?: boolean;
  enableLightbox?: boolean;
  columns?: number;
  aspectRatio?: string;
  rounded?: string;
  hoverEffect?: 'zoom' | 'fade' | 'slide' | 'shine' | 'none';
  className?: string;
}

const defaultImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    alt: 'A cat',
    description: 'A beautiful cat sitting on a windowsill',
    tags: ['animal', 'cat', 'pet']
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1583795128727-6ec3642408f8',
    alt: 'Mountainous landscape',
    description: 'Stunning mountain range landscape at sunset',
    tags: ['nature', 'mountain', 'sunset']
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e',
    alt: 'Beach with palm trees',
    description: 'Tropical beach with palm trees and crystal clear water',
    tags: ['beach', 'tropical', 'vacation']
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
    alt: 'City skyline',
    description: 'Modern city skyline with skyscrapers at night',
    tags: ['city', 'urban', 'architecture']
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1566864222010-d45675442c31',
    alt: 'Forest path',
    description: 'Mystical forest path with sunlight streaming through trees',
    tags: ['nature', 'forest', 'path']
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28',
    alt: 'Desert landscape',
    description: 'Vast desert landscape with rolling sand dunes',
    tags: ['desert', 'landscape', 'nature']
  }
];

const InteractiveGallery: React.FC<InteractiveGalleryProps> = ({
  images = defaultImages,
  layout = 'grid',
  gap = 4,
  enableFullscreen = true,
  showImageInfo = true,
  enableLightbox = true,
  columns = 3,
  aspectRatio = '1/1',
  rounded = 'rounded-lg',
  hoverEffect = 'zoom',
  className
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [filteredTag, setFilteredTag] = useState<string | null>(null);
  
  const filteredImages = filteredTag 
    ? images.filter(img => img.tags?.includes(filteredTag))
    : images;
  
  const handleImageClick = (image: GalleryImage, index: number) => {
    if (enableLightbox) {
      setSelectedImage(image);
      setCurrentIndex(index);
    }
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
    setSelectedImage(filteredImages[currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1]);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
    setSelectedImage(filteredImages[currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1]);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedImage(null);
    }
  };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  const getHoverEffectClass = () => {
    switch (hoverEffect) {
      case 'zoom':
        return 'group-hover:scale-110 transition-transform duration-300';
      case 'fade':
        return 'group-hover:opacity-80 transition-opacity duration-300';
      case 'slide':
        return 'transition-transform duration-300 group-hover:translate-y-2';
      case 'shine':
        return 'before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] group-hover:before:translate-x-[200%] before:transition-transform before:duration-1000 overflow-hidden relative';
      default:
        return '';
    }
  };
  
  // Define the layout classes
  const getLayoutClass = () => {
    if (layout === 'masonry') {
      // For masonry layout, we define column heights
      return `columns-1 sm:columns-2 md:columns-${Math.min(columns, 4)} gap-${gap} space-y-${gap}`;
    } else if (layout === 'carousel') {
      return 'flex overflow-x-auto snap-x snap-mandatory scroll-smooth';
    } else {
      // Default grid layout
      return `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(columns, 4)} gap-${gap}`;
    }
  };
  
  // Extract all tags from all images
  const allTags = Array.from(
    new Set(images.flatMap(img => img.tags || []))
  );
  
  return (
    <div 
      className={cn("w-full", className)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Tags filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filteredTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilteredTag(null)}
            className="text-xs"
          >
            All
          </Button>
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={filteredTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setFilteredTag(tag === filteredTag ? null : tag)}
              className="text-xs"
            >
              {tag}
            </Button>
          ))}
        </div>
      )}
      
      {/* Gallery Layout */}
      <div className={cn(getLayoutClass())}>
        {filteredImages.map((image, index) => (
          <div 
            key={image.id}
            className={cn(
              "group relative cursor-pointer overflow-hidden",
              layout === 'carousel' ? `flex-none w-[85%] md:w-[40%] snap-center p-2` : '',
              layout === 'masonry' ? 'mb-4 break-inside-avoid' : '',
              rounded
            )}
            style={
              layout !== 'masonry' && layout !== 'carousel' 
                ? { aspectRatio } 
                : undefined
            }
            onClick={() => handleImageClick(image, index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                "w-full h-full object-cover",
                rounded,
                getHoverEffectClass()
              )}
            />
            
            {/* Image overlay with info */}
            {showImageInfo && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <h3 className="font-semibold">{image.alt}</h3>
                {image.description && (
                  <p className="text-sm text-gray-200 mt-1">{image.description}</p>
                )}
                {image.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {image.tags.map(tag => (
                      <span 
                        key={tag}
                        className="text-xs bg-white/20 px-2 py-0.5 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFilteredTag(tag === filteredTag ? null : tag);
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="absolute top-4 right-4 flex space-x-2"
              onClick={e => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className="h-6 w-6" />
              </Button>
              
              {enableFullscreen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={toggleFullscreen}
                >
                  <Maximize className="h-6 w-6" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-14 w-14"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft className="h-10 w-10" />
            </Button>
            
            <div className="relative max-h-[80vh] max-w-[90vw]" onClick={e => e.stopPropagation()}>
              <motion.img
                key={selectedImage.id}
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[80vh] max-w-[90vw] object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
              
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4"
                >
                  <h3 className="text-lg font-semibold">{selectedImage.alt}</h3>
                  {selectedImage.description && (
                    <p className="mt-1">{selectedImage.description}</p>
                  )}
                  {selectedImage.tags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedImage.tags.map(tag => (
                        <span 
                          key={tag}
                          className="text-xs bg-white/20 px-2 py-0.5 rounded-full cursor-pointer"
                          onClick={() => {
                            setFilteredTag(tag);
                            setSelectedImage(null);
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-14 w-14"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className="h-10 w-10" />
            </Button>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="flex space-x-1">
                {filteredImages.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === currentIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                      setSelectedImage(filteredImages[idx]);
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveGallery;

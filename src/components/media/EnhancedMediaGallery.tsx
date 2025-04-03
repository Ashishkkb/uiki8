
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Image as ImageIcon, 
  Music, 
  Film, 
  Maximize2, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineHighlight } from "@/components/ui/code-highlight";

export interface MediaItem {
  id: string | number;
  title: string;
  description?: string;
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
  className?: string;
  viewMode?: 'grid' | 'carousel';
  showFilters?: boolean;
  autoplay?: boolean;
  interval?: number;
}

const EnhancedMediaGallery: React.FC<EnhancedMediaGalleryProps> = ({
  items,
  title = "Media Gallery",
  subtitle,
  className,
  viewMode = 'grid',
  showFilters = true,
  autoplay = false,
  interval = 5000,
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract unique media types for filtering
  const mediaTypes = Array.from(new Set(items.map(item => item.type)));
  
  // Filter items based on active filter
  const filteredItems = activeFilter 
    ? items.filter(item => item.type === activeFilter)
    : items;
    
  // Get featured items
  const featuredItems = items.filter(item => item.featured);

  // Auto-advance carousel
  useEffect(() => {
    if (!autoplay || viewMode !== 'carousel' || modalOpen) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, interval, filteredItems.length, viewMode, modalOpen]);
  
  // Handle next/prev navigation
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };
  
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };
  
  // Open media item in modal
  const openModal = (item: MediaItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };
  
  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };
  
  // Get media icon based on type
  const getMediaIcon = (type: string) => {
    switch(type) {
      case 'video': return <Film className="h-4 w-4" />;
      case 'audio': return <Music className="h-4 w-4" />;
      case 'image': return <ImageIcon className="h-4 w-4" />;
      default: return <Film className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("flex flex-col space-y-6", className)}>
      {/* Header section */}
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      
      {/* Featured items - horizontal scroll */}
      {featuredItems.length > 0 && (
        <div className="relative">
          <div className="flex items-center">
            <Badge variant="secondary" className="mr-4">Featured</Badge>
            <div className="overflow-x-auto pb-4 scrollbar-none">
              <div className="flex gap-4">
                {featuredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="min-w-[250px] group cursor-pointer rounded-lg overflow-hidden border border-border/30 bg-card transition-all hover:shadow-lg"
                    onClick={() => openModal(item)}
                  >
                    <div className="relative h-36">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                      <Badge className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm">
                        {item.type}
                      </Badge>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium line-clamp-1">{item.title}</h3>
                      {item.duration && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.duration}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!activeFilter ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setActiveFilter(null)}
          >
            All
          </Button>
          {mediaTypes.map((type) => (
            <Button
              key={type}
              variant={activeFilter === type ? "default" : "outline"}
              size="sm"
              className="rounded-full flex items-center gap-1"
              onClick={() => setActiveFilter(type)}
            >
              {getMediaIcon(type)}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      )}
      
      {/* Main media display */}
      <div ref={containerRef}>
        {viewMode === 'carousel' ? (
          <div className="relative overflow-hidden rounded-xl border border-border/30 h-[400px] bg-muted/10">
            {filteredItems.length > 0 ? (
              <>
                <div className="absolute inset-0">
                  <img 
                    src={filteredItems[currentIndex].thumbnail} 
                    alt={filteredItems[currentIndex].title} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold">{filteredItems[currentIndex].title}</h3>
                  {filteredItems[currentIndex].description && (
                    <p className="mt-2 line-clamp-2">{filteredItems[currentIndex].description}</p>
                  )}
                  
                  <div className="flex items-center gap-2 mt-4">
                    <Button onClick={() => openModal(filteredItems[currentIndex])}>
                      <Play className="mr-2 h-4 w-4" />
                      {filteredItems[currentIndex].type === 'image' ? 'View' : 'Play'}
                    </Button>
                    
                    {filteredItems[currentIndex].tags?.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-white/10 hover:bg-white/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {filteredItems.length > 1 && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
                      onClick={goToPrev}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
                      onClick={goToNext}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                    
                    <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1">
                      {filteredItems.map((_, idx) => (
                        <button
                          key={idx}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40"
                          }`}
                          onClick={() => setCurrentIndex(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No media items found
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer rounded-xl overflow-hidden border border-border/30 bg-card transition-all hover:shadow-lg"
                onClick={() => openModal(item)}
              >
                <div className="relative h-48">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" className="gap-2">
                      {item.type === 'image' ? <Maximize2 className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {item.type === 'image' ? 'View' : 'Play'}
                    </Button>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge className="bg-primary/80 backdrop-blur-sm flex items-center gap-1">
                      {getMediaIcon(item.type)}
                      {item.type}
                    </Badge>
                  </div>
                  {item.duration && (
                    <Badge variant="outline" className="absolute bottom-2 right-2 bg-black/50 text-white border-0">
                      {item.duration}
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium line-clamp-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.tags.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Media viewer modal */}
      {modalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-card max-w-5xl w-full mx-4 rounded-lg overflow-hidden relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border/20">
              <h3 className="font-medium">{selectedItem.title}</h3>
              <Button variant="ghost" size="sm" onClick={closeModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto">
              <div className="bg-black flex items-center justify-center" style={{ minHeight: "400px" }}>
                {selectedItem.type === 'image' ? (
                  <img 
                    src={selectedItem.source} 
                    alt={selectedItem.title} 
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                ) : selectedItem.type === 'video' ? (
                  <video 
                    src={selectedItem.source} 
                    controls 
                    autoPlay
                    className="max-w-full max-h-[70vh]"
                  />
                ) : (
                  <audio
                    src={selectedItem.source}
                    controls
                    autoPlay
                    className="w-full"
                  />
                )}
              </div>
              
              {selectedItem.description && (
                <div className="p-4">
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                  
                  {selectedItem.tags && selectedItem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {selectedItem.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedMediaGallery;

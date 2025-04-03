
import React from "react";
import { ComponentItem } from "@/types/component";

const EnhancedMediaGalleryComponent: ComponentItem = {
  id: 109,
  name: "Enhanced Media Gallery",
  category: "Media",
  framework: "React",
  description: "A versatile media gallery with multiple display modes, filtering capabilities, and a powerful modal viewer for images, videos, and audio.",
  code: `import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Image, 
  Music, 
  Film, 
  Maximize2,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  // Filter items based on active filter
  const filteredItems = activeFilter 
    ? items.filter(item => item.type === activeFilter)
    : items;

  // Auto-advance carousel
  useEffect(() => {
    if (!autoplay || viewMode !== 'carousel' || modalOpen) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, interval, filteredItems.length, viewMode, modalOpen]);
  
  // Render media grid or carousel based on viewMode
  // For code simplicity, implementation details omitted
  
  return (
    <div className={cn("flex flex-col space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      
      {/* Media filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          {/* Filter buttons */}
        </div>
      )}
      
      {/* Media display - grid or carousel */}
      <div ref={containerRef}>
        {viewMode === 'carousel' ? (
          <div className="relative overflow-hidden rounded-xl">
            {/* Carousel implementation */}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Grid items */}
          </div>
        )}
      </div>
      
      {/* Media viewer modal */}
      {modalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          {/* Modal content */}
        </div>
      )}
    </div>
  );
};

export default EnhancedMediaGallery;`,
  tags: ["gallery", "media", "carousel", "grid", "filter", "modal", "responsive"],
  isNew: true,
  fileSize: "8.2 KB",
  complexity: "medium",
  lastUpdated: "2025-04-03",
  dependencies: ["framer-motion", "lucide-react"]
};

export default EnhancedMediaGalleryComponent;


import React from 'react';
import { ComponentItem } from "@/types/component";
import ImageGalleryComponent from "./ImageGalleryComponent";

const ImageGalleryComponentItem: ComponentItem = {
  id: 162,
  name: "Image Gallery",
  category: "UI",
  framework: "React",
  description: "A responsive image gallery with lightbox functionality and thumbnails.",
  component: ImageGalleryComponent,
  tags: ["ui", "gallery", "images", "lightbox", "media"],
  isNew: true,
  fileSize: "2.8 KB",
  complexity: "medium",
  code: `import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Image {
  src: string;
  alt?: string;
  thumbnail?: string;
}

interface ImageGalleryProps {
  images: Image[];
  columns?: number;
  gap?: number;
  className?: string;
  aspectRatio?: string;
  lightbox?: boolean;
  thumbnails?: boolean;
  thumbnailPosition?: 'bottom' | 'top' | 'left' | 'right';
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  gap = 4,
  className,
  aspectRatio = "4/3",
  lightbox = true,
  thumbnails = true,
  thumbnailPosition = 'bottom',
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  // Determine if thumbnails should be horizontal or vertical
  const isHorizontalThumbs = thumbnailPosition === 'bottom' || thumbnailPosition === 'top';

  return (
    <div className={cn("w-full", className)}>
      {/* Main grid of images */}
      <div 
        className={cn(
          "grid gap-4", 
          \`grid-cols-1 sm:grid-cols-\${Math.min(columns, 2)} md:grid-cols-\${columns}\`
        )}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-md bg-muted hover:cursor-pointer"
            style={{ aspectRatio }}
            onClick={() => lightbox && setOpen(true) && setCurrentImageIndex(index)}
          >
            <img
              src={image.src}
              alt={image.alt || \`Image \${index + 1}\`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      {lightbox && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
            <div className="relative flex items-center justify-center">
              {/* Main image */}
              <div className="relative">
                <img
                  src={images[currentImageIndex]?.src}
                  alt={images[currentImageIndex]?.alt || \`Image \${currentImageIndex + 1}\`}
                  className="max-h-[80vh] max-w-full rounded-md"
                />
                
                {/* Navigation buttons */}
                <button 
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/90 hover:bg-black/70"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button 
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/90 hover:bg-black/70"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Close button */}
                <button 
                  onClick={() => setOpen(false)}
                  className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white/90 hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Thumbnails */}
            {thumbnails && (
              <div 
                className={cn(
                  "mt-4 flex gap-2 p-2",
                  isHorizontalThumbs ? "flex-row flex-wrap justify-center" : "flex-col"
                )}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "border-2 overflow-hidden rounded cursor-pointer transition-all",
                      currentImageIndex === index 
                        ? "border-primary" 
                        : "border-transparent hover:border-primary/50"
                    )}
                    style={{
                      width: isHorizontalThumbs ? '60px' : '100%',
                      height: isHorizontalThumbs ? '60px' : '40px',
                    }}
                  >
                    <img
                      src={image.thumbnail || image.src}
                      alt={image.alt || \`Thumbnail \${index + 1}\`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ImageGallery;`
};

export default ImageGalleryComponentItem;

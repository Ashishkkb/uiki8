
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    alt: "Portrait of a woman with glasses",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    alt: "Portrait of a man with beard",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    alt: "Portrait of a woman with colorful background",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    alt: "Portrait of a smiling man",
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
    alt: "Portrait of a woman looking away",
  },
  {
    src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
    alt: "Portrait of a man looking at camera",
  },
];

const ImageGalleryComponent = () => {
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

  return (
    <div className="w-full">
      {/* Main grid of images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-md bg-muted hover:cursor-pointer"
            style={{ aspectRatio: "4/3" }}
            onClick={() => {
              setCurrentImageIndex(index);
              setOpen(true);
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
          <div className="relative flex items-center justify-center">
            {/* Main image */}
            <div className="relative">
              <img
                src={images[currentImageIndex]?.src}
                alt={images[currentImageIndex]?.alt}
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
          <div className="mt-4 flex gap-2 p-2 flex-row flex-wrap justify-center">
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
                style={{ width: '60px', height: '60px' }}
              >
                <img
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGalleryComponent;


import React from 'react';
import { ComponentItem } from "@/types/component";
import AnimatedCarousel from './AnimatedCarouselComponent';

const AnimatedCarouselComponentItem: ComponentItem = {
  id: 105,
  name: "Animated Carousel",
  description: "Advanced carousel component with multiple animation effects and customizable options",
  category: "UI",
  framework: "React",
  language: "TypeScript",
  tags: ["Carousel", "Animation", "Slideshow", "Interactive", "Gallery"],
  isNew: true,
  component: () => <AnimatedCarousel />,
  code: `import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface AnimatedCarouselProps {
  items: {
    id: string | number;
    image: string;
    title: string;
    description?: string;
  }[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  effect?: 'fade' | 'slide' | 'zoom' | 'flip';
  showArrows?: boolean;
  showIndicators?: boolean;
  aspectRatio?: 'square' | 'video' | 'wide' | 'vertical';
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[16/9]',
  vertical: 'aspect-[9/16]',
};

// Animation variants for different effects
const itemVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  },
  slide: {
    hidden: { x: 300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: -300, opacity: 0, transition: { duration: 0.5 } },
  },
  zoom: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 1.2, opacity: 0, transition: { duration: 0.5 } },
  },
  flip: {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { rotateY: -90, opacity: 0, transition: { duration: 0.5 } },
  },
};

const AnimatedCarousel = ({
  items,
  className,
  autoPlay = true,
  interval = 5000,
  effect = 'fade',
  showArrows = true,
  showIndicators = true,
  aspectRatio = 'video',
}: AnimatedCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance slides if autoPlay is enabled
  React.useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <Carousel
        className="w-full"
        onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={item.id}>
              <div className={cn("relative overflow-hidden", aspectRatioClasses[aspectRatio])}>
                <motion.div
                  className="h-full w-full"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={itemVariants[effect]}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm opacity-90">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {showArrows && (
          <>
            <CarouselPrevious 
              className="absolute left-2 top-1/2 -translate-y-1/2" 
              variant="secondary"
              size="icon"
            >
              <ChevronLeft className="h-5 w-5" />
            </CarouselPrevious>
            <CarouselNext 
              className="absolute right-2 top-1/2 -translate-y-1/2" 
              variant="secondary"
              size="icon"
            >
              <ChevronRight className="h-5 w-5" />
            </CarouselNext>
          </>
        )}
      </Carousel>
      
      {showIndicators && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === activeIndex 
                  ? "bg-white w-6" 
                  : "bg-white/50 hover:bg-white/80"
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={\`Go to slide \${index + 1}\`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const AnimatedCarouselDemo = () => {
  const demoItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      title: "Mountain Peaks",
      description: "Serene mountain landscape at sunset"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      title: "Forest Valley",
      description: "Lush green forest with morning fog"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      title: "Sunlit Woods",
      description: "Sunlight filtering through dense trees"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      title: "Coastal Cliffs",
      description: "Dramatic coastline with waves crashing below"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm text-muted-foreground mb-3">Fade Effect</h3>
        <AnimatedCarousel 
          items={demoItems} 
          effect="fade"
          aspectRatio="video"
          className="max-w-3xl mx-auto"
        />
      </div>
      
      <div>
        <h3 className="text-sm text-muted-foreground mb-3">Zoom Effect</h3>
        <AnimatedCarousel 
          items={demoItems} 
          effect="zoom"
          aspectRatio="square"
          className="max-w-md mx-auto"
        />
      </div>
    </div>
  );
};

export default AnimatedCarouselDemo;`
};

export default AnimatedCarouselComponentItem;

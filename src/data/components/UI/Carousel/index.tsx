
import { ComponentItem } from "@/types/component";
import CarouselComponent from "./CarouselComponent";

const CarouselComponentItem: ComponentItem = {
  id: 59,
  name: "Carousel",
  category: "UI",
  framework: "React",
  description: "A carousel component for cycling through elements like slides, images, or cards.",
  component: CarouselComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["UI", "carousel", "slider", "gallery", "slideshow"],
  isNew: true,
  fileSize: "3.2kb",
  complexity: "medium",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React from 'react';
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CustomCarouselProps {
  items: React.ReactNode[];
  opts?: {
    align?: "start" | "center" | "end";
    loop?: boolean;
    dragFree?: boolean;
  };
  className?: string;
  contentClassName?: string;
  itemClassName?: string;
  showControls?: boolean;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  items,
  opts = { align: "center", loop: true },
  className,
  contentClassName,
  itemClassName,
  showControls = true,
}) => {
  return (
    <Carousel className={cn("w-full", className)} opts={opts}>
      <CarouselContent className={contentClassName}>
        {items.map((item, index) => (
          <CarouselItem key={index} className={itemClassName}>
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {showControls && (
        <>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </>
      )}
    </Carousel>
  );
};

export default CustomCarousel;`,
};

export default CarouselComponentItem;

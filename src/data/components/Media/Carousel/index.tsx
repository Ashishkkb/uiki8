
import React from 'react';
import { ComponentItem } from "@/types/component";
import CarouselComponent from "@/components/media/CarouselComponent";

const CarouselComponentData: ComponentItem = {
  id: 501,
  name: "Carousel",
  category: "Media",
  framework: "React",
  description: "An image carousel component with automatic sliding, navigation arrows, and indicators",
  code: `import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface CarouselSlide {
  id: string | number;
  content: React.ReactNode;
}

export interface CarouselComponentProps {
  slides: CarouselSlide[];
  autoSlide?: boolean;
  interval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  className?: string;
}

const CarouselComponent = ({
  slides,
  autoSlide = false,
  interval = 5000,
  showArrows = true,
  showIndicators = true,
  className = "",
}) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(() => {
      nextSlide();
    }, interval);
    return () => clearInterval(slideInterval);
  }, [current, autoSlide, interval]);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className={\`relative w-full \${className}\`}>
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              {slide.content}
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {showArrows && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
      
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={\`w-3 h-3 rounded-full \${
                index === current ? "bg-white" : "bg-white/50"
              }\`}
              onClick={() => goToSlide(index)}
              aria-label={\`Go to slide \${index + 1}\`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;`,
  component: () => (
    <CarouselComponent 
      slides={[
        { id: 1, content: <div className="h-40 bg-blue-300 flex items-center justify-center">Slide 1</div> },
        { id: 2, content: <div className="h-40 bg-green-300 flex items-center justify-center">Slide 2</div> },
        { id: 3, content: <div className="h-40 bg-purple-300 flex items-center justify-center">Slide 3</div> }
      ]} 
      showIndicators={true}
      showArrows={true}
    />
  ),
  tags: ["media", "carousel", "slider", "gallery"],
  fileSize: "2.0 KB",
  price: "Free"
};

export default CarouselComponentData;

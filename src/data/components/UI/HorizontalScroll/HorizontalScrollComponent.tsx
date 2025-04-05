
import React, { useRef, useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  showControls?: boolean;
  gap?: number;
  scrollAmount?: number;
}

const HorizontalScrollComponent: React.FC<HorizontalScrollProps> = ({
  children,
  className,
  itemClassName,
  showControls = true,
  gap = 4,
  scrollAmount = 300
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const newScrollLeft = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      {showControls && (
        <>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute left-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm",
              !canScrollLeft && "opacity-0"
            )}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute right-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm",
              !canScrollRight && "opacity-0"
            )}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
      
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex overflow-x-auto scrollbar-none",
          `gap-${gap}`
        )}
        onScroll={checkScrollability}
      >
        {React.Children.map(children, (child) => (
          <div className={cn("flex-none", itemClassName)}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollComponent;

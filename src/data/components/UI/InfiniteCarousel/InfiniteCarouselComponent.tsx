
import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface InfiniteCarouselProps {
  items: React.ReactNode[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  gap?: number;
  itemClassName?: string;
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
  items,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className,
  gap = 16,
  itemClassName
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current || items.length === 0) return;
    
    const scroller = scrollerRef.current;
    
    // Create a duplicate set of items to ensure continuous scrolling
    const duplicateContent = () => {
      if (!scroller || !containerRef.current) return;
      
      // Clear existing duplicated content
      const originalItems = scroller.querySelectorAll('[data-item="original"]');
      scroller.querySelectorAll('[data-item="duplicate"]').forEach(el => el.remove());
      
      // Determine if we need duplication based on container width
      if (scroller.scrollWidth <= containerRef.current.clientWidth) {
        // Duplicate content until we have enough to scroll continuously
        let duplicatedItems = Array.from(originalItems).map(item => {
          const clone = item.cloneNode(true) as HTMLElement;
          clone.setAttribute('data-item', 'duplicate');
          clone.setAttribute('aria-hidden', 'true');
          return clone;
        });

        duplicatedItems.forEach(item => scroller.appendChild(item));
        
        // Check if we need even more duplication
        if (scroller.scrollWidth < containerRef.current.clientWidth * 2) {
          duplicatedItems.forEach(item => {
            const clone = item.cloneNode(true) as HTMLElement;
            scroller.appendChild(clone);
          });
        }
      }
    };

    duplicateContent();
    
    // Set up scrolling animation
    let scrollDirection = direction === 'left' ? 1 : -1;
    let scrollAmount = 0;
    
    const scroll = () => {
      if (!scroller || !containerRef.current) return;
      
      if (!(pauseOnHover && isHovering)) {
        scrollAmount += speed / 60;
        
        // Reset position when we've scrolled through one complete set of items
        if (scrollAmount >= scroller.scrollWidth / 2) {
          scrollAmount = 0;
        }
        
        scroller.style.transform = `translateX(${scrollDirection * scrollAmount}px)`;
      }
      
      requestAnimationFrame(scroll);
    };
    
    const animation = requestAnimationFrame(scroll);
    
    // Handle window resize
    const handleResize = () => {
      duplicateContent();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('resize', handleResize);
    };
  }, [items.length, speed, direction, pauseOnHover, isHovering]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        ref={scrollerRef} 
        className={cn("inline-flex flex-nowrap", gap > 0 && `gap-[${gap}px]`)}
        style={{ gap: `${gap}px` }}
      >
        {items.map((item, index) => (
          <div 
            key={index}
            data-item="original"
            className={cn("flex-shrink-0", itemClassName)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;

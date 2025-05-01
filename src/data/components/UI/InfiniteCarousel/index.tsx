
import React from 'react';
import InfiniteCarouselComponent from './InfiniteCarouselComponent';
import { ComponentItem } from '@/types/component';

const InfiniteCarouselComponentItem: ComponentItem = {
  id: 111,
  name: "Infinite Carousel",
  category: "UI",
  framework: "React",
  description: "A carousel component that scrolls infinitely with pausable animation on hover.",
  component: () => (
    <div className="space-y-8 w-full">
      <div>
        <p className="text-sm mb-3 text-muted-foreground">Brand Logos (Left to Right)</p>
        <InfiniteCarouselComponent
          items={Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center h-16 w-32 bg-muted/30 rounded-md">
              <span className="text-sm font-medium">Logo {i + 1}</span>
            </div>
          ))}
          speed={20}
          direction="left"
          className="py-4"
        />
      </div>
      
      <div>
        <p className="text-sm mb-3 text-muted-foreground">Testimonials (Right to Left)</p>
        <InfiniteCarouselComponent
          items={Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col p-4 h-40 w-64 bg-muted/20 border rounded-lg">
              <p className="text-sm leading-relaxed flex-1">
                "This is an amazing testimonial about how great this product is and how it changed my life."
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="h-8 w-8 bg-muted rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Client {i + 1}</p>
                  <p className="text-xs text-muted-foreground">CEO, Company {i + 1}</p>
                </div>
              </div>
            </div>
          ))}
          speed={15}
          direction="right"
          className="py-4"
          gap={24}
        />
      </div>
      
      <div>
        <p className="text-sm mb-3 text-muted-foreground">Product Showcase (hover to pause)</p>
        <InfiniteCarouselComponent
          items={Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center p-3 h-48 w-40 border rounded-lg">
              <div className="h-24 w-24 bg-muted/30 rounded mb-3 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Product Image</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Product {i + 1}</p>
                <p className="text-xs text-muted-foreground mt-1">${(19.99 + i).toFixed(2)}</p>
              </div>
            </div>
          ))}
          speed={25}
          direction="left"
          pauseOnHover={true}
          className="py-4"
          gap={16}
        />
      </div>
    </div>
  ),
  code: `import React, { useRef, useEffect, useState } from 'react';
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
      
      // Duplicate content until we have enough to scroll continuously
      let duplicatedItems = Array.from(originalItems).map(item => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute('data-item', 'duplicate');
        clone.setAttribute('aria-hidden', 'true');
        return clone;
      });

      duplicatedItems.forEach(item => scroller.appendChild(item));
    };

    duplicateContent();
    
    // Set up scrolling animation
    let scrollDirection = direction === 'left' ? 1 : -1;
    let scrollAmount = 0;
    
    const scroll = () => {
      if (!scroller) return;
      
      if (!(pauseOnHover && isHovering)) {
        scrollAmount += speed / 60;
        
        // Reset position when we've scrolled through one complete set of items
        if (scrollAmount >= scroller.scrollWidth / 2) {
          scrollAmount = 0;
        }
        
        scroller.style.transform = \`translateX(\${scrollDirection * scrollAmount}px)\`;
      }
      
      requestAnimationFrame(scroll);
    };
    
    const animation = requestAnimationFrame(scroll);
    
    window.addEventListener('resize', duplicateContent);
    
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('resize', duplicateContent);
    };
  }, [items.length, speed, direction, pauseOnHover, isHovering]);

  return (
    <div 
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        ref={scrollerRef} 
        className="inline-flex flex-nowrap"
        style={{ gap: \`\${gap}px\` }}
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

export default InfiniteCarousel;`,
  tags: ["ui", "carousel", "animation", "infinite", "scroll"],
  isNew: true,
};

export default InfiniteCarouselComponentItem;

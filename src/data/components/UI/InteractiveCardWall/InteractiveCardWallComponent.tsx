
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ExternalLink } from "lucide-react";

interface CardData {
  id: number;
  title: string;
  description: string;
  color: string;
  image?: string;
  isNew?: boolean;
  link?: string;
}

interface InteractiveCardProps {
  card: CardData;
  containerRect: { x: number; y: number; width: number; height: number };
  mousePosition: { x: number; y: number };
  depth: number;
  isHovering: boolean;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

interface InteractiveCardWallProps {
  cards?: CardData[];
  columns?: number;
  gap?: number;
  depth?: number;
  className?: string;
}

// Demo card data
const defaultCards: CardData[] = [
  {
    id: 1,
    title: "Interactive Animation",
    description: "Create engaging user experiences with interactive 3D animations",
    color: "bg-gradient-to-br from-blue-500 to-indigo-700",
    isNew: true
  },
  {
    id: 2,
    title: "Responsive Design",
    description: "Build layouts that work perfectly across all devices and screen sizes",
    color: "bg-gradient-to-br from-purple-500 to-pink-700"
  },
  {
    id: 3,
    title: "Performance Optimized",
    description: "Smooth animations with optimized rendering performance",
    color: "bg-gradient-to-br from-amber-500 to-red-700"
  },
  {
    id: 4,
    title: "Customizable Components",
    description: "Easily adapt and extend components to match your design system",
    color: "bg-gradient-to-br from-emerald-500 to-teal-700",
    isNew: true
  },
  {
    id: 5,
    title: "Modern UI Patterns",
    description: "Implement the latest interface patterns for better user experiences",
    color: "bg-gradient-to-br from-rose-500 to-red-800"
  },
  {
    id: 6,
    title: "Accessibility First",
    description: "Built with accessibility in mind for all users",
    color: "bg-gradient-to-br from-cyan-500 to-blue-700"
  }
];

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  card,
  containerRect,
  mousePosition,
  depth,
  isHovering,
  isActive,
  onHover,
  onLeave
}) => {
  // Calculate the position of the card relative to the mouse
  const relativeX = mousePosition.x - containerRect.x;
  const relativeY = mousePosition.y - containerRect.y;
  
  // Calculate the center of the container
  const centerX = containerRect.width / 2;
  const centerY = containerRect.height / 2;
  
  // Calculate how far the mouse is from the center, as a percentage of container dimensions
  const offsetX = isHovering ? (relativeX - centerX) / centerX : 0;
  const offsetY = isHovering ? (relativeY - centerY) / centerY : 0;
  
  // Calculate rotation (less rotation when active for better readability)
  const rotateY = isActive ? offsetX * 5 : offsetX * 10;
  const rotateX = isActive ? -offsetY * 5 : -offsetY * 10;
  
  // Calculate Z translation for 3D effect (push card forward when active)
  const z = isActive ? depth * 1.5 : isHovering ? depth * 0.5 : 0;
  
  return (
    <motion.div
      className={cn(
        "relative rounded-xl overflow-hidden transition-shadow cursor-pointer transform-gpu",
        isActive ? "shadow-xl z-10" : "shadow-md hover:shadow-lg"
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
        z
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div 
        className={cn(
          "p-5 h-full",
          card.color
        )}
      >
        <div 
          className="relative z-10 text-white"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
        >
          <h3 className="text-xl font-bold mb-2">{card.title}</h3>
          <p className="text-sm opacity-90">{card.description}</p>
          
          {card.link && (
            <div className="mt-4 flex">
              <a 
                href={card.link} 
                className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-2"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span>Learn more</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
        
        {card.isNew && (
          <Badge className="absolute right-2 top-2 gap-1 bg-primary px-2">
            <Sparkles className="h-3 w-3" />
            NEW
          </Badge>
        )}
      </div>
    </motion.div>
  );
};

const InteractiveCardWall: React.FC<InteractiveCardWallProps> = ({
  cards = defaultCards,
  columns = 3,
  gap = 20,
  depth = 40,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerRect, setContainerRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  
  // Update container rect when mounting and on window resize
  useEffect(() => {
    const updateRect = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerRect({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    };
    
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, []);
  
  // Handle mouse movement inside the container
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsHovering(true);
  };
  
  // Handle mouse leaving the container
  const handleMouseLeave = () => {
    setIsHovering(false);
    setActiveCardIndex(null);
  };
  
  // Calculate grid layout styles
  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: `${gap}px`,
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full p-8 overflow-hidden bg-gradient-to-br from-background to-muted/50 rounded-lg shadow-sm border border-border/10",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">Interactive Card Wall</h2>
      <div 
        className="grid relative"
        style={gridStyle}
      >
        {cards.map((card, index) => (
          <InteractiveCard
            key={card.id}
            card={card}
            containerRect={containerRect}
            mousePosition={mousePosition}
            depth={depth}
            isHovering={isHovering}
            isActive={activeCardIndex === index}
            onHover={() => setActiveCardIndex(index)}
            onLeave={() => setActiveCardIndex(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveCardWall;

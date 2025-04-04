
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
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

interface InteractiveCardWallProps {
  cards?: CardData[];
  columns?: number;
  gap?: number;
  depth?: number;
  className?: string;
}

const InteractiveCardWallComponent: React.FC<InteractiveCardWallProps> = ({
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
  
  // Handle mouse movement and calculate relative position
  const handleMouseMove = (e: React.MouseEvent) => {
    setIsHovering(true);
    setMousePosition({
      x: e.clientX - containerRect.x,
      y: e.clientY - containerRect.y,
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setActiveCardIndex(null);
  };
  
  // Calculate grid layout
  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
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

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  card,
  containerRect,
  mousePosition,
  depth,
  isHovering,
  isActive,
  onHover,
  onLeave,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRect, setCardRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  // Update card rect when mounting
  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardRect({
        x: rect.left - containerRect.x,
        y: rect.top - containerRect.y,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [containerRect]);
  
  // Calculate rotation and translation based on mouse position
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const translateZ = useMotionValue(0);
  
  useEffect(() => {
    if (!isHovering) {
      // Reset transforms when not hovering
      rotateX.set(0);
      rotateY.set(0);
      translateZ.set(0);
      return;
    }
    
    const cardCenterX = cardRect.x + cardRect.width / 2;
    const cardCenterY = cardRect.y + cardRect.height / 2;
    
    // Calculate distance from mouse to card center (normalized)
    const distanceX = (mousePosition.x - cardCenterX) / (containerRect.width / 2);
    const distanceY = (mousePosition.y - cardCenterY) / (containerRect.height / 2);
    
    // Apply rotation based on distance (inverted for correct rotation direction)
    rotateX.set(-distanceY * 10); // Rotate around X axis (horizontal)
    rotateY.set(distanceX * 10);  // Rotate around Y axis (vertical)
    
    // Add extra depth when card is active (hovered)
    translateZ.set(isActive ? depth + 20 : 0);
  }, [mousePosition, cardRect, containerRect, isHovering, isActive, rotateX, rotateY, translateZ, depth]);
  
  // Transform the shadow based on rotation
  const boxShadow = useTransform(
    [rotateX, rotateY, translateZ],
    ([rx, ry, tz]) => {
      const shadowX = ry * 5;
      const shadowY = -rx * 5;
      const shadowBlur = 15 + Math.abs(tz) / 10;
      const shadowIntensity = Math.min(0.4 + (Math.abs(tz) / depth) * 0.2, 0.6);
      
      return `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowIntensity})`;
    }
  );
  
  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-lg p-6 cursor-pointer bg-card"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        translateZ,
        boxShadow,
        zIndex: isActive ? 10 : 1,
        background: `linear-gradient(135deg, ${card.color}20, ${card.color}05)`,
        border: `1px solid ${card.color}30`,
        transformStyle: 'preserve-3d',
        transition: isHovering ? 'none' : 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {card.isNew && (
        <Badge className="absolute right-2 top-2 gap-1 bg-primary px-2 z-10">
          <Sparkles className="h-3 w-3" />
          NEW
        </Badge>
      )}
      
      <motion.div
        className="relative z-10"
        style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
      >
        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
        <p className="text-muted-foreground mb-4">{card.description}</p>
        
        {card.link && (
          <div className="flex justify-end">
            <a 
              href={card.link}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              <span className="mr-1">Learn more</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </motion.div>
      
      {/* Background shine effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x - cardRect.x}px ${mousePosition.y - cardRect.y}px, ${card.color}40 0%, ${card.color}00 70%)`,
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </motion.div>
  );
};

const defaultCards: CardData[] = [
  {
    id: 1,
    title: "Animated UI Components",
    description: "Discover our library of beautiful animated UI components for modern web applications.",
    color: "#7C3AED",
    isNew: true,
    link: "#"
  },
  {
    id: 2,
    title: "Responsive Layouts",
    description: "Explore responsive layout patterns that work on any device or screen size.",
    color: "#EC4899",
  },
  {
    id: 3,
    title: "Interactive Data Visualizations",
    description: "Turn your data into beautiful, interactive visualizations that tell a story.",
    color: "#3B82F6",
    link: "#"
  },
  {
    id: 4,
    title: "Performance Optimization",
    description: "Learn techniques to optimize your web app for blazing fast performance.",
    color: "#10B981",
  },
  {
    id: 5,
    title: "Accessibility Guidelines",
    description: "Build inclusive web applications that everyone can use with ease.",
    color: "#F59E0B",
    link: "#"
  },
  {
    id: 6,
    title: "Motion Design Principles",
    description: "Master the principles of motion design to create delightful user experiences.",
    color: "#8B5CF6",
    isNew: true,
  }
];

export default InteractiveCardWallComponent;

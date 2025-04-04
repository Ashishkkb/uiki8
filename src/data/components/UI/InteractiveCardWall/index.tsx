
import { ComponentItem } from "@/types/component";
import InteractiveCardWallComponent from "./InteractiveCardWallComponent";

const InteractiveCardWallComponentItem: ComponentItem = {
  id: 42,
  name: "Interactive Card Wall",
  category: "UI",
  framework: "React",
  description: "A stunning 3D interactive card wall with parallax effects that respond to mouse movement, creating an immersive user experience.",
  component: InteractiveCardWallComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["3D", "Interactive", "Animation", "Cards", "Parallax"],
  isNew: true,
  fileSize: "12kb",
  is3D: true,
  complexity: "complex",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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

const InteractiveCardWall = ({
  cards = defaultCards,
  columns = 3,
  gap = 20,
  depth = 40,
  className,
}) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerRect, setContainerRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  
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
  
  // Full component implementation

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

export default InteractiveCardWall;`,
  dependencies: ["framer-motion"],
};

export default InteractiveCardWallComponentItem;

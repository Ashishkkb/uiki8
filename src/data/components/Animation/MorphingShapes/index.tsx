
import React from 'react';
import { ComponentItem } from "@/types/component";
import MorphingShapes from './MorphingShapesComponent';

const MorphingShapesComponentItem: ComponentItem = {
  id: 109,
  name: "Morphing Shapes Animation",
  description: "Colorful floating shapes that transform and respond to cursor movement",
  category: "Animation",
  framework: "React",
  language: "TypeScript",
  tags: ["Shapes", "Morphing", "Interactive", "Motion", "Background"],
  isNew: true,
  component: () => <MorphingShapes />,
  code: `import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MorphingShapesProps {
  className?: string;
  backgroundColor?: string;
  colors?: string[];
  shapesCount?: number;
  speed?: number;
  autoplay?: boolean;
  interactive?: boolean;
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'pentagon' | 'hexagon' | 'star';

interface Shape {
  id: number;
  type: ShapeType;
  color: string;
  size: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
}

const generateShapePath = (type: ShapeType): string => {
  switch (type) {
    case 'circle':
      return '';
    case 'square':
      return '';
    case 'triangle':
      return 'polygon(50% 0%, 0% 100%, 100% 100%)';
    case 'pentagon':
      return 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
    case 'hexagon':
      return 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
    case 'star':
      return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    default:
      return '';
  }
};

const MorphingShapes: React.FC<MorphingShapesProps> = ({
  className = "",
  backgroundColor = "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
  colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"],
  shapesCount = 10,
  speed = 1,
  autoplay = true,
  interactive = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const shapeTypes: ShapeType[] = ['circle', 'square', 'triangle', 'pentagon', 'hexagon', 'star'];
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const generateShapes = () => {
      const newShapes: Shape[] = [];
      
      for (let i = 0; i < shapesCount; i++) {
        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 50 + 30; // 30px to 80px
        
        newShapes.push({
          id: i,
          type,
          color,
          size,
          x: Math.random() * 100, // 0% to 100%
          y: Math.random() * 100, // 0% to 100%
          rotation: Math.random() * 360,
          delay: Math.random() * 2
        });
      }
      
      setShapes(newShapes);
    };
    
    generateShapes();
  }, [shapesCount, colors]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
    
    if (!isHovering) {
      setIsHovering(true);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[400px] overflow-hidden rounded-lg",
        className
      )}
      style={{ background: backgroundColor }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {shapes.map((shape) => {
        // Calculate distance to mouse for interactive mode
        const distanceToMouse = interactive && isHovering
          ? Math.sqrt(
              Math.pow(mousePosition.x - shape.x, 2) + 
              Math.pow(mousePosition.y - shape.y, 2)
            )
          : 100;
        
        // Determine if this shape should morph based on mouse proximity
        const shouldMorph = interactive && isHovering && distanceToMouse < 30;
        const nextTypeIndex = shouldMorph 
          ? (shapeTypes.indexOf(shape.type) + 1) % shapeTypes.length
          : shapeTypes.indexOf(shape.type);
        const morphToType = shapeTypes[nextTypeIndex];
        
        return (
          <motion.div
            key={shape.id}
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              clipPath: shouldMorph 
                ? generateShapePath(morphToType) 
                : generateShapePath(shape.type),
              opacity: 0.8,
              boxShadow: \`0 0 20px \${shape.color}80\`
            }}
            animate={{
              left: \`calc(\${shouldMorph ? mousePosition.x : shape.x}% - \${shape.size / 2}px)\`,
              top: \`calc(\${shouldMorph ? mousePosition.y : shape.y}% - \${shape.size / 2}px)\`,
              rotate: shouldMorph ? shape.rotation + 180 : shape.rotation,
              scale: shouldMorph ? 1.5 : 1
            }}
            initial={{
              left: \`calc(\${shape.x}% - \${shape.size / 2}px)\`,
              top: \`calc(\${shape.y}% - \${shape.size / 2}px)\`,
              rotate: shape.rotation,
              scale: 0
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 100,
              duration: 3 / speed,
              delay: autoplay ? shape.delay : 0,
              repeat: autoplay ? Infinity : 0,
              repeatType: "reverse",
              repeatDelay: 2 / speed
            }}
          />
        );
      })}
      
      {/* Instructional text */}
      {interactive && (
        <div className="absolute bottom-6 left-0 right-0 text-center text-white opacity-50">
          <p>Move your cursor to interact with the shapes</p>
        </div>
      )}
    </div>
  );
};

export default MorphingShapes;`
};

export default MorphingShapesComponentItem;

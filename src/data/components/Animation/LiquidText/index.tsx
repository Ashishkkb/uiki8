
import React from 'react';
import { ComponentItem } from "@/types/component";
import LiquidText from './LiquidTextComponent';

const LiquidTextComponentItem: ComponentItem = {
  id: 106,
  name: "Liquid Text Animation",
  description: "Interactive text effect that responds to cursor movement with fluid, wave-like animations",
  category: "Animation",
  framework: "React",
  language: "TypeScript",
  tags: ["Text", "Interactive", "Cursor", "Liquid", "Motion"],
  isNew: true,
  component: () => <LiquidText />,
  code: `import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidTextProps {
  text?: string;
  subText?: string;
  className?: string;
  textColor?: string;
  highlightColor?: string;
  backgroundColor?: string;
  speed?: number;
}

const getRandomNum = (min: number, max: number) => Math.random() * (max - min) + min;

const LiquidText: React.FC<LiquidTextProps> = ({
  text = "Liquid Text Effect",
  subText = "Move your cursor over the text",
  className = "",
  textColor = "#fff",
  highlightColor = "#7c3aed",
  backgroundColor = "#111827",
  speed = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [letters, setLetters] = React.useState<{ char: string; delay: number }[]>([]);
  
  // Split text into characters with random delays
  useEffect(() => {
    const chars = text.split('').map(char => ({
      char,
      delay: getRandomNum(0, 1)
    }));
    setLetters(chars);
  }, [text]);

  // Track mouse position
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[400px] flex flex-col items-center justify-center overflow-hidden rounded-lg",
        className
      )}
      style={{ backgroundColor }}
      onMouseMove={handleMouseMove}
    >
      {/* Gradient blob that follows the cursor */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-70 blur-3xl pointer-events-none"
        style={{
          background: \`radial-gradient(circle, \${highlightColor} 0%, rgba(0,0,0,0) 70%)\`,
        }}
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          mass: 1
        }}
      />
      
      {/* Text container */}
      <div className="z-10 flex flex-wrap justify-center max-w-4xl">
        {letters.map((letter, index) => {
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - (index * 20 + containerRef.current?.offsetWidth / 2 - text.length * 10 || 0), 2) +
            Math.pow(mousePosition.y - (containerRef.current?.offsetHeight / 2 || 0), 2)
          );
          
          const maxDistance = 150;
          const isNearMouse = distance < maxDistance;
          
          return (
            <motion.span
              key={index}
              className="text-5xl md:text-7xl font-bold inline-block whitespace-nowrap mx-1"
              style={{ 
                color: textColor,
                textShadow: isNearMouse ? \`0 0 10px \${highlightColor}\` : 'none',
              }}
              animate={{
                y: isNearMouse 
                  ? Math.sin(index * 0.3) * 20 - 10 
                  : Math.sin(index * 0.1 + Date.now() * 0.001 * speed) * 5,
                scale: isNearMouse ? 1.2 : 1,
                rotate: isNearMouse 
                  ? Math.sin(index) * 10 
                  : Math.sin(index * 0.1 + Date.now() * 0.001 * speed) * 5,
                filter: isNearMouse 
                  ? \`hue-rotate(\${Math.sin(Date.now() * 0.001) * 360}deg)\` 
                  : 'none'
              }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                duration: 0.1,
              }}
            >
              {letter.char === ' ' ? '\\u00A0' : letter.char}
            </motion.span>
          );
        })}
      </div>
      
      {/* Subtitle */}
      <motion.p
        className="text-lg text-gray-300 mt-12 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {subText}
      </motion.p>
    </div>
  );
};

export default LiquidText;`
};

export default LiquidTextComponentItem;

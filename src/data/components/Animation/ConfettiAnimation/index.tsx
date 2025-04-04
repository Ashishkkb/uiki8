
import React from 'react';
import { ComponentItem } from "@/types/component";
import ConfettiAnimation from './ConfettiAnimationComponent';

const ConfettiAnimationComponentItem: ComponentItem = {
  id: 108,
  name: "Confetti Animation",
  description: "Celebrate success with a burst of colorful confetti animation triggered by a button click",
  category: "Animation",
  framework: "React",
  language: "TypeScript",
  tags: ["Confetti", "Celebration", "Button", "Interactive", "Motion"],
  isNew: true,
  component: () => <ConfettiAnimation />,
  code: `import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Circle, Square, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfettiAnimationProps {
  message?: string;
  buttonText?: string;
  confettiCount?: number;
  duration?: number;
  className?: string;
  colors?: string[];
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  type: 'square' | 'circle' | 'star';
  color: string;
  size: number;
  delay: number;
  xVelocity: number;
  yVelocity: number;
  rotationVelocity: number;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({
  message = "Congratulations!",
  buttonText = "Celebrate!",
  confettiCount = 100,
  duration = 5000,
  className = "",
  colors = ["#ef4444", "#f59e0b", "#14b8a6", "#3b82f6", "#8b5cf6", "#ec4899"]
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const triggerConfetti = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Generate confetti pieces
    const newConfetti: ConfettiPiece[] = [];
    
    for (let i = 0; i < confettiCount; i++) {
      const type = ['square', 'circle', 'star'][Math.floor(Math.random() * 3)] as 'square' | 'circle' | 'star';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5; // 5px to 15px
      
      newConfetti.push({
        id: i,
        x: 50, // Start from center horizontally
        y: 50, // Start from center vertically
        rotation: Math.random() * 360,
        type,
        color,
        size,
        delay: Math.random() * 500, // Random delay for staggered effect
        xVelocity: (Math.random() - 0.5) * 100, // Random horizontal velocity
        yVelocity: (Math.random() - 0.5) * 50 - 20, // Mostly upward with some variation
        rotationVelocity: (Math.random() - 0.5) * 360 // Random rotation velocity
      });
    }
    
    setConfetti(newConfetti);
    
    // Reset after duration
    setTimeout(() => {
      setIsAnimating(false);
      setConfetti([]);
    }, duration);
  };
  
  // Render confetti piece based on type
  const renderConfettiPiece = (piece: ConfettiPiece) => {
    switch (piece.type) {
      case 'square':
        return <Square className="w-full h-full" />;
      case 'circle':
        return <Circle className="w-full h-full" />;
      case 'star':
        return <Star className="w-full h-full" />;
      default:
        return <Square className="w-full h-full" />;
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden border border-border/50 bg-card rounded-lg p-8 text-center flex flex-col items-center gap-8",
        isAnimating ? "overflow-visible" : "overflow-hidden",
        className
      )}
      style={{ minHeight: '300px' }}
    >
      <h2 className="text-2xl font-bold">{message}</h2>
      <Button onClick={triggerConfetti} variant="default" size="lg">
        {buttonText}
      </Button>
      
      {/* Confetti container */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{
                width: piece.size,
                height: piece.size,
                color: piece.color,
                zIndex: 50
              }}
              initial={{
                x: \`\${piece.x}%\`,
                y: \`\${piece.y}%\`,
                rotate: piece.rotation,
                opacity: 0,
                scale: 0
              }}
              animate={{
                x: [
                  \`\${piece.x}%\`,
                  \`\${piece.x + piece.xVelocity}%\`,
                  \`\${piece.x + piece.xVelocity * 2}%\`
                ],
                y: [
                  \`\${piece.y}%\`,
                  \`\${piece.y + piece.yVelocity}%\`,
                  \`\${piece.y + 120}%\` // Always fall down eventually
                ],
                rotate: [
                  piece.rotation,
                  piece.rotation + piece.rotationVelocity,
                  piece.rotation + piece.rotationVelocity * 2
                ],
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5]
              }}
              transition={{
                duration: duration / 1000,
                delay: piece.delay / 1000,
                ease: "easeOut"
              }}
            >
              {renderConfettiPiece(piece)}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfettiAnimation;`
};

export default ConfettiAnimationComponentItem;

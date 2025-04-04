
import React, { useState, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface ParticleButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  particleColor?: string;
  buttonColor?: string;
  textColor?: string;
  particleCount?: number;
  duration?: number;
  icon?: React.ReactNode;
}

const ParticleButton: React.FC<ParticleButtonProps> = ({
  text = "Click Me",
  onClick,
  className = "",
  particleColor = "#7c3aed",
  buttonColor = "#4c1d95",
  textColor = "#ffffff",
  particleCount = 30,
  duration = 1000,
  icon
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particles = useRef<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    direction: { x: number; y: number };
  }>>([]);
  
  // Create particles
  const createParticles = useCallback(() => {
    if (!buttonRef.current) return [];
    
    const rect = buttonRef.current.getBoundingClientRect();
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Generate random position inside the button
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      
      // Random size between 4 and 10
      const size = Math.random() * 6 + 4;
      
      // Random direction
      const direction = {
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20
      };
      
      // Random color variations based on the particleColor
      let color = particleColor;
      if (Math.random() > 0.7) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        color = `rgb(${r}, ${g}, ${b})`;
      }
      
      newParticles.push({
        id: i,
        x,
        y,
        size,
        color,
        direction
      });
    }
    
    return newParticles;
  }, [particleCount, particleColor]);
  
  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      particles.current = createParticles();
      
      // Call the onClick handler if provided
      if (onClick) onClick();
      
      // Reset animation after duration
      setTimeout(() => {
        setIsAnimating(false);
      }, duration);
    }
  };
  
  return (
    <div className="relative inline-block">
      <motion.button
        ref={buttonRef}
        className={cn(
          "relative z-10 px-6 py-3 rounded-lg font-medium transition-transform active:scale-95 focus:outline-none overflow-hidden",
          className
        )}
        style={{
          backgroundColor: buttonColor,
          color: textColor
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {icon || <Sparkles className="w-4 h-4" />}
          {text}
        </span>
        
        {/* Button glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background: `radial-gradient(circle, ${particleColor} 0%, rgba(0,0,0,0) 70%)`,
          }}
          animate={isAnimating ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
      
      {/* Particles */}
      {isAnimating && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {particles.current.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                top: particle.y,
                left: particle.x,
                zIndex: 5,
              }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                x: particle.direction.x * (Math.random() * 10 + 10),
                y: particle.direction.y * (Math.random() * 10 + 10),
                opacity: 0,
                scale: Math.random() * 2 + 0.5,
              }}
              transition={{
                duration: Math.random() * 1 + 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticleButton;

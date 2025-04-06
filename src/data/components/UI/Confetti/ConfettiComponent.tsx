
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface ConfettiProps {
  active: boolean;
  count?: number;
  colors?: string[];
  duration?: number;
  gravity?: number;
  particleSize?: [number, number];
  className?: string;
  onComplete?: () => void;
}

const ConfettiComponent: React.FC<ConfettiProps> = ({
  active,
  count = 200,
  colors = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7', '#FC6E9D'],
  duration = 3000,
  gravity = 0.9,
  particleSize = [6, 12],
  className,
  onComplete
}) => {
  const [particles, setParticles] = useState<Array<JSX.Element>>([]);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (active && !isActive) {
      setIsActive(true);
      generateParticles();
      
      const timer = setTimeout(() => {
        setIsActive(false);
        setParticles([]);
        if (onComplete) onComplete();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [active]);

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const generateParticles = () => {
    const newParticles = [];
    const documentWidth = window.innerWidth;
    const documentHeight = window.innerHeight;
    
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = randomInRange(particleSize[0], particleSize[1]);
      const tilt = randomInRange(-70, 70);
      const initialX = randomInRange(0, documentWidth);
      const initialY = randomInRange(-100, -10);
      const finalX = initialX + randomInRange(-100, 100);
      const finalY = randomInRange(documentHeight * 0.7, documentHeight);
      
      newParticles.push(
        <div
          key={i}
          className="absolute bg-current rounded-sm"
          style={{
            color: color,
            width: `${size}px`,
            height: `${size * 0.6}px`,
            transform: `rotate(${tilt}deg)`,
            left: `${initialX}px`,
            top: `${initialY}px`,
            animation: `
              move-${i} ${duration}ms ease-in forwards,
              fade-out ${duration * 0.8}ms ease-in forwards
            `,
          }}
        />
      );
      
      // Add keyframe animation dynamically
      const keyframes = `
        @keyframes move-${i} {
          0% { transform: translate(0, 0) rotate(${tilt}deg); }
          100% { transform: translate(${finalX - initialX}px, ${finalY}px) rotate(${tilt}deg); }
        }
        @keyframes fade-out {
          0%, 80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `;
      
      const style = document.createElement('style');
      style.innerHTML = keyframes;
      document.head.appendChild(style);
    }
    
    setParticles(newParticles);
  };

  if (!isActive) return null;

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-50", className)}>
      {particles}
    </div>
  );
};

export default ConfettiComponent;

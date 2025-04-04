
import React from 'react';
import { ComponentItem } from "@/types/component";
import ParticleText from './ParticleTextComponent';

const ParticleTextComponentItem: ComponentItem = {
  id: 103,
  name: "Particle Text Effect",
  description: "Interactive text that explodes into particles on hover",
  category: "Animation",
  framework: "React",
  language: "TypeScript",
  tags: ["Particles", "Canvas", "Animation", "Interactive", "Text"],
  isNew: true,
  component: () => <ParticleText />,
  code: `import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  speedX: number;
  speedY: number;
  originalX: number;
  originalY: number;
}

interface ParticleTextProps {
  text: string;
  className?: string;
  particleColor?: string;
  particleCount?: number;
  explodeOnHover?: boolean;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
}

const ParticleText = ({
  text,
  className = "",
  particleColor = "#7c3aed",
  particleCount = 800,
  explodeOnHover = true,
  textColor = "transparent",
  fontSize = "3rem",
  fontWeight = "bold"
}: ParticleTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const textRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isExploded, setIsExploded] = useState(false);
  
  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current || !textRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const textElement = textRef.current;
    const rect = textElement.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    setDimensions({ width, height });
    
    // Create particles
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      particles.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        color: particleColor,
        alpha: Math.random() * 0.8 + 0.2,
        speedX: 0,
        speedY: 0,
        originalX: x,
        originalY: y
      });
    }
    
    particlesRef.current = particles;
    
    // Start animation
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(particle => {
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        if (isExploded) {
          // Move away from original position
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Slow down
          particle.speedX *= 0.98;
          particle.speedY *= 0.98;
          
          // Fade out
          particle.alpha *= 0.99;
        } else {
          // Move back to original position
          particle.x += (particle.originalX - particle.x) * 0.05;
          particle.y += (particle.originalY - particle.y) * 0.05;
          
          // Restore alpha
          particle.alpha += (0.8 - particle.alpha) * 0.05;
        }
      });
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [particleColor, particleCount, isExploded]);
  
  const handleExplode = () => {
    if (!explodeOnHover) return;
    
    setIsExploded(true);
    
    // Set explosion velocities
    particlesRef.current.forEach(particle => {
      const dx = particle.x - dimensions.width / 2;
      const dy = particle.y - dimensions.height / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize
      const nx = dx / distance;
      const ny = dy / distance;
      
      particle.speedX = nx * (Math.random() * 5 + 2);
      particle.speedY = ny * (Math.random() * 5 + 2);
    });
    
    // Reset after some time
    setTimeout(() => {
      setIsExploded(false);
    }, 2000);
  };
  
  return (
    <div 
      className={cn("relative inline-block", className)}
      onMouseEnter={handleExplode}
      style={{ fontSize, fontWeight }}
    >
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-10"
      />
      <div 
        ref={textRef}
        className="relative"
        style={{ color: textColor }}
      >
        {text}
      </div>
    </div>
  );
};

const ParticleTextDemo = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 space-y-12">
      <div className="text-center">
        <h3 className="text-sm text-muted-foreground mb-3">Hover to Explode</h3>
        <ParticleText 
          text="PARTICLES!"
          particleColor="#7c3aed"
          className="text-center"
          fontSize="4rem"
          textColor="#7c3aed"
        />
      </div>
      
      <div className="text-center">
        <h3 className="text-sm text-muted-foreground mb-3">Different Colors</h3>
        <ParticleText 
          text="AMAZING"
          particleColor="#ec4899"
          className="text-center"
          fontSize="3.5rem"
          textColor="#ec4899"
        />
      </div>
    </div>
  );
};

export default ParticleTextDemo;`
};

export default ParticleTextComponentItem;

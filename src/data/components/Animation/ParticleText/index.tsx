import { ComponentItem } from "@/types/component";
import ParticleTextComponent from "./ParticleTextComponent";

const ParticleTextComponentItem: ComponentItem = {
  id: 43,
  name: "Particle Text Animation",
  category: "Animation",
  framework: "React",
  description: "An interactive particle text animation that transforms text into thousands of particles that respond to mouse interaction.",
  component: ParticleTextComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "dark",
  tags: ["Animation", "Interactive", "Particles", "Text Effects", "Motion"],
  isNew: true,
  fileSize: "14kb",
  complexity: "complex",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from "@/lib/utils";

interface ParticleTextProps {
  text?: string;
  subText?: string;
  particleSize?: number;
  particleDensity?: number;
  colors?: string[];
  interactive?: boolean;
  fontSize?: number;
  className?: string;
  onComplete?: () => void;
}

const ParticleText = ({
  text = "Interactive",
  subText = "Particle Text Animation",
  particleSize = 6,
  particleDensity = 10,
  colors = ["#7C3AED", "#EC4899", "#3B82F6", "#10B981", "#F59E0B"],
  interactive = true,
  fontSize = 120,
  className,
  onComplete,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const animationControls = useAnimationControls();
  
  // Generate particles from text
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Setup text rendering
    ctx.fillStyle = 'white';
    ctx.font = \`bold \${fontSize}px sans-serif\`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Render text to canvas (hidden)
    ctx.fillText(text, width / 2, height / 2);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, width, height).data;
    
    // Clear canvas after getting data
    ctx.clearRect(0, 0, width, height);
    
    // Generate particles
    const newParticles = [];
    const pixelDensity = particleDensity;
    
    for (let y = 0; y < height; y += pixelDensity) {
      for (let x = 0; x < width; x += pixelDensity) {
        const index = (y * width + x) * 4;
        const alpha = imageData[index + 3];
        
        // Only create particles where the text is (alpha > 0)
        if (alpha > 128) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const size = Math.random() * particleSize + particleSize / 2;
          
          newParticles.push({
            id: newParticles.length,
            x: Math.random() * width,
            y: Math.random() * height,
            originX: x,
            originY: y,
            size,
            color,
            opacity: Math.random() * 0.5 + 0.5,
          });
        }
      }
    }
    
    setParticles(newParticles);
    setHasInitialized(true);
  }, [text, fontSize, colors, particleSize, particleDensity]);
  
  // Initialize animation sequence
  useEffect(() => {
    if (hasInitialized && !isAnimating) {
      setIsAnimating(true);
      animationControls.start("animate");
    }
  }, [hasInitialized, isAnimating, animationControls]);
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle mouse interaction
  const handleMouseMove = (e) => {
    if (!interactive || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  
  const handleMouseLeave = () => {
    setMousePosition(null);
  };
  
  // Variants for animation
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.003,
        delayChildren: 0.2,
      }
    },
  };
  
  const particleVariants = {
    initial: (particle) => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      opacity: 0,
      scale: 0,
    }),
    animate: (particle) => ({
      x: particle.originX,
      y: particle.originY,
      opacity: particle.opacity,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 1.5,
      }
    }),
  };

  // Get distance between two points
  const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };
  
  return (
    <div 
      className={cn(
        "relative w-full h-[400px] overflow-hidden bg-gradient-to-b from-background to-background/80 rounded-lg shadow-md border border-border/10",
        className
      )}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"
      />
      
      <motion.div
        className="relative w-full h-full"
        variants={containerVariants}
        initial="initial"
        animate={animationControls}
        onAnimationComplete={() => {
          if (onComplete) onComplete();
        }}
      >
        {/* Render particles */}
        {particles.map((particle) => {
          // Calculate repulsion if mouse is near
          let x = particle.originX;
          let y = particle.originY;
          
          if (mousePosition) {
            const distance = getDistance(particle.originX, particle.originY, mousePosition.x, mousePosition.y);
            const repulsionRadius = 100;
            
            if (distance < repulsionRadius) {
              const repulsionForce = (1 - distance / repulsionRadius) * 80;
              const angle = Math.atan2(particle.originY - mousePosition.y, particle.originX - mousePosition.x);
              
              x += Math.cos(angle) * repulsionForce;
              y += Math.sin(angle) * repulsionForce;
            }
          }
          
          return (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
              }}
              custom={particle}
              variants={particleVariants}
              animate={mousePosition ? { x, y } : undefined}
              transition={mousePosition ? { type: "spring", damping: 20, stiffness: 300 } : undefined}
            />
          );
        })}
      </motion.div>
      
      {/* Subtitle */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <motion.p 
          className="text-xl font-medium text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {subText}
        </motion.p>
      </div>
    </div>
  );
};

export default ParticleText;`,
  dependencies: ["framer-motion"],
};

export default ParticleTextComponentItem;

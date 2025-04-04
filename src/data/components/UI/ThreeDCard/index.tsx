
import React from 'react';
import { ComponentItem } from "@/types/component";
import { Card } from "@/components/ui/card";
import ThreeDCardComponent from './ThreeDCardComponent';

const ThreeDCardComponent: ComponentItem = {
  id: 101,
  name: "3D Rotating Card",
  description: "Interactive 3D card with perspective and rotation effects for modern interfaces",
  category: "UI",
  framework: "React",
  language: "TypeScript",
  tags: ["3D", "Animation", "Interactive", "Card"],
  is3D: true,
  isNew: true,
  component: () => <ThreeDCardComponent />,
  code: `import React, { useState } from 'react';
import { Card } from "@/components/ui/card";

interface ThreeDCardProps {
  className?: string;
  children?: React.ReactNode;
}

export const ThreeDCard = ({ 
  className = "",
  children 
}: ThreeDCardProps) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className={\`relative transition-all duration-200 ease-linear \${className}\`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-full transition-all duration-200 ease-out"
        style={{
          transform: isHovered
            ? \`rotateX(\${rotate.x}deg) rotateY(\${rotate.y}deg)\`
            : "rotateX(0) rotateY(0)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const ThreeDCardDemo = () => {
  return (
    <ThreeDCard className="w-full max-w-md">
      <Card className="w-full rounded-xl overflow-hidden border border-border/60 bg-gradient-to-br from-background/80 to-background shadow-xl backdrop-blur relative p-6 h-80 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 z-0" />
        
        <div className="z-10 relative">
          <div className="text-sm text-background-foreground/60 font-medium">Premium Plan</div>
          <h3 className="text-2xl font-bold mt-1">$ 49.99 / mo</h3>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <p>All premium features</p>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <p>Priority support</p>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <p>Advanced analytics</p>
            </div>
          </div>
        </div>
        
        <button className="mt-8 w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium z-10 hover:opacity-90 transition-opacity">
          Choose Plan
        </button>
      </Card>
    </ThreeDCard>
  );
};

export default ThreeDCardDemo;`
};

export default ThreeDCardComponent;

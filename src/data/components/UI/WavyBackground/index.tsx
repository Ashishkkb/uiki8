
import { ComponentItem } from "@/types/component";
import WavyBackgroundComponent from "./WavyBackgroundComponent";

const WavyBackgroundComponentItem: ComponentItem = {
  id: 52,
  name: "Wavy Background",
  category: "UI",
  framework: "React",
  description: "A customizable animated wavy background component that adds a modern, fluid aesthetic to your UI.",
  component: WavyBackgroundComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "dark",
  tags: ["ui", "background", "animation", "waves", "gradient"],
  isNew: true,
  fileSize: "4.8kb",
  complexity: "medium",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  dependencies: ["framer-motion"],
  code: `import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "medium" | "fast";
  waveOpacity?: number;
  animate?: boolean;
}

const WavyBackground: React.FC<WavyBackgroundProps> = ({
  children,
  className,
  colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
  waveWidth = 50,
  backgroundFill = "transparent",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  animate = true
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Convert speed to duration in seconds
  const speedMap = {
    slow: 25,
    medium: 15,
    fast: 10
  };
  
  const duration = speedMap[speed];
  
  // Generate a random number within a range
  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };
  
  // Generate wave path data
  const generateWavePath = (width: number, height: number, segmentCount: number, amplitude: number) => {
    const segmentWidth = width / segmentCount;
    let path = \`M 0 \${height / 2}\`;
    
    for (let i = 0; i <= segmentCount; i++) {
      const x = i * segmentWidth;
      const y = height / 2 + (i % 2 === 0 ? amplitude : -amplitude);
      path += \` L \${x} \${y}\`;
    }
    
    path += \` L \${width} \${height / 2} L \${width} \${height} L 0 \${height} Z\`;
    return path;
  };
  
  return (
    <div className={cn("relative overflow-hidden flex items-center justify-center", className)}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full z-0"
        viewBox={\`0 0 \${waveWidth * 4} 200\`}
        preserveAspectRatio="none"
        style={{ filter: \`blur(\${blur}px)\` }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            {colors.map((color, index) => (
              <stop
                key={index}
                offset={\`\${(index / (colors.length - 1)) * 100}%\`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>
        
        {/* Background fill */}
        <rect x="0" y="0" width="100%" height="100%" fill={backgroundFill} />
        
        {/* Animated waves */}
        {[...Array(5)].map((_, i) => {
          const amplitude = randomInRange(20, 60);
          const segmentCount = Math.floor(randomInRange(5, 10));
          
          return (
            <g key={i}>
              <motion.path
                d={generateWavePath(waveWidth * 4, 200, segmentCount, amplitude)}
                fill="url(#gradient)"
                opacity={waveOpacity / (i + 1)}
                animate={animate ? {
                  x: [-waveWidth * 4, 0],
                } : undefined}
                transition={{
                  duration: duration + i * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </g>
          );
        })}
      </svg>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default WavyBackground;`,
};

export default WavyBackgroundComponentItem;

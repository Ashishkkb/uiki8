
import React, { useRef, useEffect } from 'react';
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
    let path = `M 0 ${height / 2}`;
    
    for (let i = 0; i <= segmentCount; i++) {
      const x = i * segmentWidth;
      const y = height / 2 + (i % 2 === 0 ? amplitude : -amplitude);
      path += ` L ${x} ${y}`;
    }
    
    path += ` L ${width} ${height / 2} L ${width} ${height} L 0 ${height} Z`;
    return path;
  };
  
  // Demo content for the component
  const DemoContent = () => (
    <div className="flex flex-col items-center justify-center space-y-6 text-center p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm">
          Animated Wavy Background
        </h1>
        <p className="mt-2 text-lg text-white/90 max-w-xl mx-auto">
          A beautiful animated wavy background component that adds visual interest to your UI
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-md p-4 md:p-8 rounded-xl border border-white/20">
          <h2 className="text-xl font-semibold text-white">Customizable Options</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80 text-left">
            <li className="flex items-start">
              <span className="bg-white/20 rounded-full p-1 mr-2 mt-0.5">✓</span>
              <span>Multiple color options</span>
            </li>
            <li className="flex items-start">
              <span className="bg-white/20 rounded-full p-1 mr-2 mt-0.5">✓</span>
              <span>Adjustable wave speed & opacity</span>
            </li>
            <li className="flex items-start">
              <span className="bg-white/20 rounded-full p-1 mr-2 mt-0.5">✓</span>
              <span>Customizable blur effect</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
  
  return (
    <div className={cn("relative overflow-hidden flex items-center justify-center", className)}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full z-0"
        viewBox={`0 0 ${waveWidth * 4} 200`}
        preserveAspectRatio="none"
        style={{ filter: `blur(${blur}px)` }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            {colors.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
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
        {children || <DemoContent />}
      </div>
    </div>
  );
};

export default WavyBackground;

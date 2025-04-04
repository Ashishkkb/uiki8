
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  sliderColor?: string;
  sliderWidth?: number;
  initialPosition?: number;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
  sliderColor = "#fff",
  sliderWidth = 2,
  initialPosition = 50,
}) => {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleTouchStart = () => {
    setIsDragging(true);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  const calculatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    
    const { left, width } = containerRef.current.getBoundingClientRect();
    let newPosition = ((clientX - left) / width) * 100;
    
    // Constrain the position between 0 and 100
    newPosition = Math.max(0, Math.min(100, newPosition));
    
    setSliderPosition(newPosition);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    calculatePosition(e.clientX);
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    calculatePosition(e.touches[0].clientX);
  };
  
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);
  
  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full aspect-video overflow-hidden rounded-lg", className)}
    >
      {/* After Image (Background) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ backgroundImage: `url(${afterImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      {/* Before Image (Foreground) */}
      <div 
        className="absolute inset-0 h-full"
        style={{ 
          width: `${sliderPosition}%`,
          backgroundImage: `url(${beforeImage})`,
          backgroundSize: `cover`,
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Slider Control */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ 
          left: `calc(${sliderPosition}% - ${sliderWidth / 2}px)`,
          width: `${sliderWidth}px`,
          backgroundColor: sliderColor,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: sliderColor }}
        >
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M9 6L15 12L9 18" 
              stroke="black" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M15 6L9 12L15 18" 
              stroke="black" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 text-sm rounded">
        {beforeLabel}
      </div>
      
      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 text-sm rounded">
        {afterLabel}
      </div>
    </div>
  );
};

export default ImageComparison;

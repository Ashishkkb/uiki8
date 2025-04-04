
import { ComponentItem } from "@/types/component";
import RatingComponent from "./RatingComponent";

const RatingComponentItem: ComponentItem = {
  id: 46,
  name: "Rating",
  category: "UI",
  framework: "React",
  description: "A star rating component with support for half-stars, custom sizes, and read-only mode.",
  component: RatingComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["ui", "rating", "stars", "feedback", "review"],
  isNew: true,
  fileSize: "3.2kb",
  complexity: "medium",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingProps {
  defaultValue?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  precision?: 'full' | 'half';
  onChange?: (value: number) => void;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  defaultValue = 0,
  max = 5,
  size = 'md',
  readonly = false,
  precision = 'full',
  onChange,
  className
}) => {
  const [value, setValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (readonly) return;
    
    if (precision === 'half') {
      const rect = e.currentTarget.getBoundingClientRect();
      const halfPoint = rect.width / 2;
      const position = e.clientX - rect.left;
      
      if (position <= halfPoint) {
        setHoverValue(index - 0.5);
      } else {
        setHoverValue(index);
      }
    } else {
      setHoverValue(index);
    }
  };
  
  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverValue(null);
  };
  
  const handleClick = (newValue: number) => {
    if (readonly) return;
    setValue(newValue);
    if (onChange) onChange(newValue);
  };
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-8 w-8';
      default: return 'h-6 w-6';
    }
  };
  
  const getStarColor = (index: number) => {
    const displayValue = hoverValue !== null ? hoverValue : value;
    
    if (index <= displayValue) {
      return 'text-yellow-400 fill-yellow-400';
    }
    
    if (precision === 'half' && index - 0.5 <= displayValue) {
      return 'text-yellow-400 fill-yellow-400 star-half';
    }
    
    return 'text-muted-foreground';
  };
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer relative",
              readonly && "cursor-default"
            )}
            onMouseMove={(e) => handleMouseMove(e, index + 1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(precision === 'half' && hoverValue === index + 0.5 ? index + 0.5 : index + 1)}
          >
            <Star 
              className={cn(
                getSizeClass(),
                getStarColor(index + 1),
                "transition-colors"
              )}
              strokeWidth={1.5}
            />
          </div>
        ))}
      </div>
      
      {!readonly && (
        <span className="ml-2 text-sm text-muted-foreground">
          {hoverValue !== null ? hoverValue : value} of {max}
        </span>
      )}
    </div>
  );
};

export default Rating;`,
};

export default RatingComponentItem;

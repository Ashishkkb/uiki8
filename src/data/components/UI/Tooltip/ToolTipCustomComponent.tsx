
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

interface TooltipCustomProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  contentClassName?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  arrow?: boolean;
  delay?: number;
  maxWidth?: string;
  disabled?: boolean;
  interactive?: boolean;
}

const TooltipCustomComponent: React.FC<TooltipCustomProps> = ({
  children,
  content,
  className,
  contentClassName,
  position = 'top',
  arrow = true,
  delay = 300,
  maxWidth = '250px',
  disabled = false,
  interactive = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    
    setIsVisible(false);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2"
  };

  const arrowPositionClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent"
  };

  return (
    <div 
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={interactive ? undefined : handleMouseLeave}
    >
      {children}
      
      {isVisible && (
        <div 
          className={cn(
            "absolute z-50 px-3 py-2 text-sm rounded-md bg-popover text-popover-foreground shadow-md",
            positionClasses[position],
            interactive && "pointer-events-auto",
            contentClassName
          )}
          style={{ maxWidth }}
          role="tooltip"
        >
          {arrow && (
            <div 
              className={cn(
                "absolute w-0 h-0 border-4 border-popover",
                arrowPositionClasses[position]
              )} 
            />
          )}
          {content}
        </div>
      )}
    </div>
  );
};

export default TooltipCustomComponent;

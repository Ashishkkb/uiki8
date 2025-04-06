
import React from 'react';
import { ComponentItem } from "@/types/component";
import LoadingDotsComponent from "./LoadingDotsComponent";

const LoadingDotsComponentItem: ComponentItem = {
  id: 113,
  name: "Loading Dots",
  category: "UI",
  framework: "React",
  description: "A flexible loading indicator with animated dots and multiple animation styles.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'elastic' | 'pulse' | 'bounce';
}

const LoadingDots: React.FC<LoadingDotsProps> = ({
  className,
  color,
  size = 'md',
  variant = 'elastic'
}) => {
  const sizeConfig = {
    sm: {
      dot: 'h-1 w-1',
      spacing: 'gap-1'
    },
    md: {
      dot: 'h-2 w-2',
      spacing: 'gap-1.5'
    },
    lg: {
      dot: 'h-3 w-3',
      spacing: 'gap-2'
    }
  };

  // Animation classes based on variant
  const getAnimationClass = (dotIndex: number) => {
    const baseDelay = dotIndex * 0.15;
    
    switch (variant) {
      case 'elastic':
        return \`animate-[loading-dots-elastic_1.5s_infinite_\${baseDelay}s]\`;
      case 'pulse':
        return \`animate-[loading-dots-pulse_1.5s_infinite_\${baseDelay}s]\`;
      case 'bounce':
        return \`animate-[loading-dots-bounce_1.2s_infinite_\${baseDelay}s]\`;
      default:
        return \`animate-[loading-dots-elastic_1.5s_infinite_\${baseDelay}s]\`;
    }
  };

  // Dynamically add these keyframes to the document
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = \`
      @keyframes loading-dots-elastic {
        0%, 80%, 100% { transform: scale(0.6); }
        40% { transform: scale(1); }
      }
      
      @keyframes loading-dots-pulse {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
      
      @keyframes loading-dots-bounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-8px); }
      }
    \`;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        sizeConfig[size].spacing,
        className
      )}
      aria-label="Loading"
    >
      {[0, 1, 2].map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-full",
            sizeConfig[size].dot,
            getAnimationClass(i)
          )}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default LoadingDots;`,
  component: LoadingDotsComponent,
  tags: ["UI", "loading", "animation", "feedback"],
  isNew: true,
  fileSize: "1.9 KB",
  complexity: "simple"
};

export default LoadingDotsComponentItem;

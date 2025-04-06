
import React from 'react';
import { ComponentItem } from "@/types/component";
import GlassCardComponent from "./GlassCardComponent";

const GlassCardComponentItem: ComponentItem = {
  id: 116,
  name: "Glass Card",
  category: "UI",
  framework: "React",
  description: "A glassmorphism-style card component with customizable blur, opacity, and hover effects.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  opacity?: 'light' | 'medium' | 'heavy';
  border?: boolean;
  hoverEffect?: boolean;
  clickEffect?: boolean;
  background?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  blur = 'md',
  opacity = 'medium',
  border = true,
  hoverEffect = false,
  clickEffect = false,
  background
}) => {
  const blurValues = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };

  const opacityValues = {
    light: 'bg-white/10 dark:bg-black/10',
    medium: 'bg-white/20 dark:bg-black/20',
    heavy: 'bg-white/30 dark:bg-black/30'
  };

  return (
    <div
      className={cn(
        'rounded-xl p-6',
        blurValues[blur],
        opacityValues[opacity],
        border && 'border border-white/20 dark:border-white/10',
        hoverEffect && 'transition-transform hover:scale-[1.01] hover:shadow-lg',
        clickEffect && 'active:scale-[0.98] cursor-pointer',
        className
      )}
      style={background ? { backgroundImage: background } : undefined}
    >
      {children}
    </div>
  );
};

export default GlassCard;`,
  component: GlassCardComponent,
  tags: ["UI", "card", "glassmorphism", "container"],
  isNew: true,
  fileSize: "1.1 KB",
  complexity: "simple"
};

export default GlassCardComponentItem;

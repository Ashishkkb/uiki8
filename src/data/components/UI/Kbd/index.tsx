
import React from 'react';
import { ComponentItem } from "@/types/component";
import KbdComponent from "./KbdComponent";

const KbdComponentItem: ComponentItem = {
  id: 107,
  name: "Keyboard Key",
  category: "UI",
  framework: "React",
  description: "A component for displaying keyboard keys and shortcuts in a stylized format.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";

interface KbdProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'subtle';
}

const Kbd: React.FC<KbdProps> = ({
  children,
  className,
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: "text-xs px-1 py-0.5 min-w-[1.2rem]",
    md: "text-xs px-1.5 py-1 min-w-[1.6rem]",
    lg: "text-sm px-2 py-1 min-w-[2rem]"
  };

  const variantClasses = {
    default: "bg-muted border border-border shadow-sm",
    outlined: "bg-transparent border border-border",
    subtle: "bg-muted/50 border-none"
  };

  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded font-mono font-medium",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </kbd>
  );
};

export default Kbd;`,
  component: KbdComponent,
  tags: ["UI", "keyboard", "shortcuts", "accessibility"],
  isNew: true,
  fileSize: "0.8 KB",
  complexity: "simple"
};

export default KbdComponentItem;

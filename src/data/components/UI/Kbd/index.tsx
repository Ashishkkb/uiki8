
import React from 'react';
import KbdComponent from './KbdComponent';
import { ComponentItem } from '@/types/component';

const KbdComponentItem: ComponentItem = {
  id: 109,
  name: "Keyboard Key",
  category: "UI",
  framework: "React",
  description: "A component for displaying keyboard shortcuts or key combinations.",
  component: () => (
    <div className="space-y-8 w-full max-w-md">
      <div>
        <p className="text-sm mb-3 text-muted-foreground">Default Kbd</p>
        <div className="flex flex-wrap gap-2">
          <KbdComponent>A</KbdComponent>
          <KbdComponent>B</KbdComponent>
          <KbdComponent>C</KbdComponent>
          <KbdComponent>Shift</KbdComponent>
          <KbdComponent>Enter</KbdComponent>
        </div>
      </div>
      
      <div>
        <p className="text-sm mb-3 text-muted-foreground">Keyboard Combinations</p>
        <div className="flex items-center gap-1 flex-wrap">
          <KbdComponent>⌘</KbdComponent>
          <span className="text-xs text-muted-foreground mx-1">+</span>
          <KbdComponent>K</KbdComponent>
          <span className="text-xs text-muted-foreground mx-2">or</span>
          <KbdComponent>Ctrl</KbdComponent>
          <span className="text-xs text-muted-foreground mx-1">+</span>
          <KbdComponent>K</KbdComponent>
        </div>
      </div>
      
      <div>
        <p className="text-sm mb-3 text-muted-foreground">Outlined Style</p>
        <div className="flex flex-wrap gap-2">
          <KbdComponent variant="outlined">Tab</KbdComponent>
          <KbdComponent variant="outlined">Esc</KbdComponent>
          <KbdComponent variant="outlined">Space</KbdComponent>
        </div>
      </div>
      
      <div>
        <p className="text-sm mb-3 text-muted-foreground">Subtle Style</p>
        <div className="flex flex-wrap gap-2">
          <KbdComponent variant="subtle">↑</KbdComponent>
          <KbdComponent variant="subtle">→</KbdComponent>
          <KbdComponent variant="subtle">↓</KbdComponent>
          <KbdComponent variant="subtle">←</KbdComponent>
        </div>
      </div>
      
      <div>
        <p className="text-sm mb-3 text-muted-foreground">Different Sizes</p>
        <div className="flex items-end gap-2">
          <KbdComponent size="sm">S</KbdComponent>
          <KbdComponent size="md">M</KbdComponent>
          <KbdComponent size="lg">L</KbdComponent>
        </div>
      </div>
    </div>
  ),
  code: `import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";

type KbdSize = 'sm' | 'md' | 'lg';
type KbdVariant = 'default' | 'outlined' | 'subtle';

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: KbdSize;
  variant?: KbdVariant;
}

const Kbd = forwardRef<HTMLElement, KbdProps>(({
  children,
  className,
  size = 'md',
  variant = 'default',
  ...props
}, ref) => {
  return (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded font-mono font-medium transition-colors",
        size === 'sm' && "text-xs px-1 py-0.5 min-w-[1.2rem]",
        size === 'md' && "text-xs px-1.5 py-1 min-w-[1.6rem]",
        size === 'lg' && "text-sm px-2 py-1 min-w-[2rem]",
        variant === 'default' && "bg-muted border border-border shadow-sm",
        variant === 'outlined' && "bg-transparent border border-border",
        variant === 'subtle' && "bg-muted/50 border-none",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
});

Kbd.displayName = "Kbd";

export default Kbd;`,
  tags: ["ui", "keyboard", "shortcut", "key"],
  isNew: true,
};

export default KbdComponentItem;

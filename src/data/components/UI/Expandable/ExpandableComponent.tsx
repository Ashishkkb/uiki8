
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface ExpandableProps {
  children: React.ReactNode;
  summary: React.ReactNode;
  className?: string;
  contentClassName?: string;
  summaryClassName?: string;
  defaultExpanded?: boolean;
  collapsible?: boolean;
  icon?: React.ReactNode;
  animated?: boolean;
  onChange?: (expanded: boolean) => void;
}

const ExpandableComponent: React.FC<ExpandableProps> = ({
  children,
  summary,
  className,
  contentClassName,
  summaryClassName,
  defaultExpanded = false,
  collapsible = true,
  icon,
  animated = true,
  onChange
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [contentHeight, setContentHeight] = useState<number | 'auto'>(defaultExpanded ? 'auto' : 0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(expanded ? contentRef.current.scrollHeight : 0);
    }
  }, [expanded]);

  useEffect(() => {
    if (expanded && contentRef.current) {
      // Set to 'auto' after animation completes so content can grow if needed
      const timer = setTimeout(() => {
        if (expanded) {
          setContentHeight('auto');
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [contentHeight, expanded]);

  const handleToggle = () => {
    if (!collapsible && expanded) return;
    
    if (contentRef.current && expanded) {
      // When collapsing, first set explicit height before animation
      setContentHeight(contentRef.current.scrollHeight);
      
      // Force a reflow before changing height to 0
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      contentRef.current.offsetHeight;
    }

    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    
    if (onChange) {
      onChange(newExpandedState);
    }
  };

  return (
    <div className={cn("border rounded-md", className)}>
      <button
        type="button"
        className={cn(
          "flex items-center justify-between w-full px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          expanded ? "rounded-t-md" : "rounded-md",
          summaryClassName
        )}
        onClick={handleToggle}
        aria-expanded={expanded}
      >
        <span className="font-medium">{summary}</span>
        <span className={cn(
          "transition-transform duration-200",
          expanded ? "rotate-180" : "rotate-0"
        )}>
          {icon || <ChevronDown className="h-5 w-5" />}
        </span>
      </button>
      
      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden",
          animated ? "transition-all duration-300 ease-in-out" : "",
          contentClassName
        )}
        style={{ height: typeof contentHeight === 'number' ? `${contentHeight}px` : contentHeight }}
        aria-hidden={!expanded}
      >
        <div className="p-4 border-t">{children}</div>
      </div>
    </div>
  );
};

export default ExpandableComponent;

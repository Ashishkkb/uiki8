
import React from 'react';
import { ComponentItem } from "@/types/component";
import Timeline from './TimelineComponent';

const TimelineComponentItem: ComponentItem = {
  id: 106,
  name: "Interactive Timeline",
  description: "Animated timeline component for displaying chronological events with various styles and orientations",
  category: "UI",
  framework: "React",
  language: "TypeScript",
  tags: ["Timeline", "Animation", "Progress", "Event", "Interactive"],
  isNew: true,
  component: () => <Timeline />,
  code: `import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Milestone, ExternalLink } from "lucide-react";

interface TimelineItem {
  id: string | number;
  title: string;
  date: string;
  description: string;
  icon?: React.ReactNode;
  status?: 'complete' | 'current' | 'upcoming';
  link?: {
    url: string;
    label: string;
  };
  extra?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  animate?: boolean;
  orientation?: 'vertical' | 'horizontal';
  iconSize?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'modern' | 'minimal';
}

const Timeline = ({
  items,
  className,
  animate = true,
  orientation = 'vertical',
  iconSize = 'md',
  variant = 'default',
}: TimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };
  
  const iconContainerStyles = {
    default: 'rounded-full bg-background border-2 border-primary',
    modern: 'rounded-lg bg-primary text-primary-foreground shadow-lg',
    minimal: 'rounded-full bg-muted',
  };
  
  const timelineVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  const timelineItemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const getStatusIcon = (status: TimelineItem['status'], customIcon?: React.ReactNode) => {
    if (customIcon) return customIcon;
    
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="text-primary" />;
      case 'current':
        return <Milestone className="text-primary" />;
      case 'upcoming':
      default:
        return <Circle className="text-muted-foreground" />;
    }
  };

  return (
    <div 
      className={cn(
        "relative", 
        orientation === 'horizontal' ? "w-full overflow-x-auto" : "",
        className
      )}
    >
      <motion.div
        className={cn(
          "relative",
          orientation === 'vertical' 
            ? "pl-8 border-l border-border" 
            : "flex items-start gap-4 py-8"
        )}
        variants={animate ? timelineVariants : undefined}
        initial={animate ? "hidden" : undefined}
        animate={animate ? "show" : undefined}
      >
        {items.map((item, index) => {
          const itemRef = useRef<HTMLDivElement>(null);
          const isInView = useInView(itemRef, { once: true, amount: 0.3 });
          
          const isActive = activeIndex === index;
          const status = item.status || (index === 0 ? 'complete' : index === 1 ? 'current' : 'upcoming');
          
          return (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              ref={itemRef}
              isInView={isInView}
              isActive={isActive}
              setActiveIndex={setActiveIndex}
              orientation={orientation}
              iconSize={iconSizeClasses[iconSize]}
              iconContainerStyle={iconContainerStyles[variant]}
              variants={animate ? timelineItemVariants : undefined}
              getStatusIcon={getStatusIcon}
              totalItems={items.length}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

interface TimelineItemProps {
  item: TimelineItem;
  index: number;
  isInView: boolean;
  isActive: boolean;
  setActiveIndex: (index: number) => void;
  orientation: 'vertical' | 'horizontal';
  iconSize: string;
  iconContainerStyle: string;
  variants?: any;
  getStatusIcon: (status: TimelineItem['status'], customIcon?: React.ReactNode) => React.ReactNode;
  totalItems: number;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ 
    item, 
    index, 
    isInView, 
    isActive, 
    setActiveIndex, 
    orientation, 
    iconSize,
    iconContainerStyle,
    variants,
    getStatusIcon,
    totalItems
  }, ref) => {
    const {
      title,
      date,
      description,
      icon,
      status,
      link,
      extra
    } = item;
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative group",
          orientation === 'vertical' 
            ? "mb-8 last:mb-0" 
            : "min-w-[250px] max-w-xs flex-shrink-0"
        )}
        variants={variants}
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(-1)}
      >
        {/* Timeline node */}
        <div 
          className={cn(
            "absolute flex items-center justify-center",
            orientation === 'vertical' 
              ? "-left-12 top-0" 
              : "top-0 left-1/2 -translate-x-1/2 -mt-4"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center transition-all",
              iconSize,
              iconContainerStyle,
              isActive ? "scale-125" : ""
            )}
          >
            {getStatusIcon(status, icon)}
          </div>
          
          {orientation === 'horizontal' && (
            <div className="absolute top-10 w-px h-20 bg-border -z-10" />
          )}
        </div>
        
        {/* Timeline connector line for horizontal */}
        {orientation === 'horizontal' && index < totalItems - 1 && (
          <div className="absolute top-0 left-[calc(50%+16px)] right-0 h-px bg-border -z-10" />
        )}
        
        {/* Content */}
        <AnimatePresence>
          <motion.div 
            className={cn(
              "p-4 rounded-lg bg-card border border-border/50 shadow-sm",
              "transition-all duration-300 ease-in-out",
              isActive ? "ring-2 ring-primary ring-offset-2" : "hover:shadow-md hover:border-primary/30"
            )}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
              scale: isInView ? 1 : 0.95, 
              opacity: isInView ? 1 : 0,
              transition: { duration: 0.5, delay: index * 0.1 }
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg">{title}</h3>
              <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                {date}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            
            {link && (
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            
            {extra && (
              <div className="mt-3 pt-3 border-t border-border/40">
                {extra}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }
);

TimelineItem.displayName = "TimelineItem";

const TimelineDemo = () => {
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      title: "Project Inception",
      date: "Jan 2023",
      description: "Initial planning and concept development phase for the new product launch.",
      status: 'complete',
      link: {
        url: "#",
        label: "View project brief"
      }
    },
    {
      id: 2,
      title: "Design Phase",
      date: "Mar 2023",
      description: "User interface design, wireframing, and user experience testing completed.",
      status: 'complete'
    },
    {
      id: 3,
      title: "Development",
      date: "Jun 2023",
      description: "Core features implementation and integration with existing systems.",
      status: 'current',
      link: {
        url: "#",
        label: "View GitHub repo"
      }
    },
    {
      id: 4,
      title: "Beta Testing",
      date: "Aug 2023",
      description: "Limited release to beta testers for feedback and bug reporting.",
      status: 'upcoming'
    },
    {
      id: 5,
      title: "Public Launch",
      date: "Oct 2023",
      description: "Official product launch with marketing campaign and press release.",
      status: 'upcoming'
    }
  ];

  return (
    <div className="space-y-10 p-2">
      <div>
        <h3 className="text-sm text-muted-foreground mb-3">Vertical Timeline (Default)</h3>
        <Timeline 
          items={timelineItems} 
          animate={true}
          variant="default"
        />
      </div>
      
      <div>
        <h3 className="text-sm text-muted-foreground mb-3">Horizontal Timeline (Modern)</h3>
        <Timeline 
          items={timelineItems.slice(0, 4)} 
          orientation="horizontal"
          animate={true}
          variant="modern"
          className="py-6"
        />
      </div>
    </div>
  );
};

export default TimelineDemo;`
};

export default TimelineComponentItem;

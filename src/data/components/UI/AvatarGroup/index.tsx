
import React from 'react';
import { ComponentItem } from "@/types/component";
import AvatarGroupComponent from "./AvatarGroupComponent";

const AvatarGroupComponentItem: ComponentItem = {
  id: 123,
  name: "Avatar Group",
  category: "UI",
  framework: "React",
  description: "A component for displaying a group of avatars with overlap and count indication.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  spacing?: 'tight' | 'normal' | 'loose';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showCount?: boolean;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 5,
  spacing = 'normal',
  size = 'md',
  className,
  showCount = true
}) => {
  const childrenArray = React.Children.toArray(children);
  const totalAvatars = childrenArray.length;
  const visibleAvatars = Math.min(totalAvatars, max);
  const remainingCount = totalAvatars - visibleAvatars;
  
  const spacingClasses = {
    tight: '-mr-2',
    normal: '-mr-3',
    loose: '-mr-4'
  };
  
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {childrenArray.slice(0, visibleAvatars).map((child, index) => (
          <div 
            key={index} 
            className={cn(
              "relative rounded-full border-2 border-background inline-block",
              spacingClasses[spacing]
            )}
            style={{ zIndex: visibleAvatars - index }}
          >
            {child}
          </div>
        ))}
        
        {showCount && remainingCount > 0 && (
          <div 
            className={cn(
              "relative rounded-full bg-muted flex items-center justify-center font-medium text-muted-foreground border-2 border-background",
              spacingClasses[spacing],
              sizeClasses[size]
            )}
            style={{ zIndex: 0 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarGroup;`,
  component: AvatarGroupComponent,
  tags: ["UI", "avatar", "user", "profile", "group"],
  isNew: true,
  fileSize: "1.7 KB",
  complexity: "medium"
};

export default AvatarGroupComponentItem;

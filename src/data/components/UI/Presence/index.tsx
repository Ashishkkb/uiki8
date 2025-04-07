
import React from 'react';
import { ComponentItem } from "@/types/component";
import PresenceComponent from "./PresenceComponent";

const PresenceComponentItem: ComponentItem = {
  id: 127,
  name: "Presence",
  category: "UI",
  framework: "React",
  description: "A component for displaying user presence status with various states and animations.",
  code: `import React from 'react';
import { cn } from "@/lib/utils";

type StatusType = 'online' | 'offline' | 'away' | 'busy' | 'invisible';

interface PresenceProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  ringColor?: string;
  className?: string;
  showStatusText?: boolean;
}

const Presence: React.FC<PresenceProps> = ({
  status,
  size = 'md',
  animated = true,
  ringColor = 'bg-background',
  className,
  showStatusText = false
}) => {
  const statusClasses: Record<StatusType, string> = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-amber-400",
    busy: "bg-red-500",
    invisible: "bg-transparent border-2 border-gray-300"
  };

  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4"
  };

  const ringClasses = {
    sm: "p-0.5",
    md: "p-0.5",
    lg: "p-[3px]"
  };

  const statusText: Record<StatusType, string> = {
    online: "Online",
    offline: "Offline",
    away: "Away",
    busy: "Do not disturb",
    invisible: "Invisible"
  };

  return (
    <div className="inline-flex items-center">
      <div className={cn(
        "rounded-full",
        ringClasses[size],
        ringColor
      )}>
        <div
          className={cn(
            "rounded-full",
            statusClasses[status],
            sizeClasses[size],
            animated && status === 'online' && "animate-pulse",
            className
          )}
        />
      </div>
      
      {showStatusText && (
        <span className="ml-1.5 text-xs font-medium text-muted-foreground">
          {statusText[status]}
        </span>
      )}
    </div>
  );
};

export default Presence;`,
  component: PresenceComponent,
  tags: ["UI", "status", "online", "presence", "indicator"],
  isNew: true,
  fileSize: "1.6 KB",
  complexity: "simple"
};

export default PresenceComponentItem;

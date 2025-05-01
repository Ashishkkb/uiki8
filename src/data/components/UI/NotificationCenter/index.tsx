
import React from 'react';
import { ComponentItem } from "@/types/component";
import NotificationCenterComponent from "./NotificationCenterComponent";

const NotificationCenterComponentItem: ComponentItem = {
  id: 164,
  name: "Notification Center",
  category: "UI",
  framework: "React",
  description: "A notification center component for displaying and managing notifications.",
  component: NotificationCenterComponent,
  tags: ["ui", "notifications", "alerts", "messages"],
  isNew: true,
  fileSize: "3.2 KB",
  complexity: "medium",
  code: `import React, { useState } from 'react';
import { Bell, Check, Trash2, X, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export type NotificationVariant = 'default' | 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: string;
  title: string;
  description?: string;
  time: Date;
  read: boolean;
  variant?: NotificationVariant;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onRemove?: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemove,
  onClearAll,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const getVariantIcon = (variant: NotificationVariant = 'default') => {
    switch (variant) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return \`\${diffInMinutes} min\${diffInMinutes > 1 ? 's' : ''} ago\`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return \`\${diffInHours} hour\${diffInHours > 1 ? 's' : ''} ago\`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return \`\${diffInDays} day\${diffInDays > 1 ? 's' : ''} ago\`;
  };

  const handleMarkAsRead = (id: string) => {
    if (onMarkAsRead) {
      onMarkAsRead(id);
    }
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  const handleRemove = (id: string) => {
    if (onRemove) {
      onRemove(id);
    }
  };

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("relative", className)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive p-0 text-xs text-destructive-foreground"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-full max-w-sm p-0" 
        align="end" 
        sideOffset={5}
        onInteractOutside={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleMarkAllAsRead}
                className="h-8 text-xs"
              >
                <Check className="mr-1 h-3.5 w-3.5" />
                Mark all as read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={handleClearAll}
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Clear all
            </Button>
          </div>
        </div>
        
        <ScrollArea className="max-h-[450px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-10 w-10 text-muted-foreground/50" />
              <h4 className="mt-2 font-medium">No notifications</h4>
              <p className="text-xs text-muted-foreground">
                When you get notifications, they'll show up here.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 px-4 py-3 transition-colors",
                    !notification.read && "bg-muted/50"
                  )}
                >
                  <div className="mt-1">
                    {getVariantIcon(notification.variant)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium leading-none">
                        {notification.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleRemove(notification.id)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    {notification.description && (
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(notification.time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;`
};

export default NotificationCenterComponentItem;

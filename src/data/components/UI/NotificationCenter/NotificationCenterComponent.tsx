
import React, { useState } from 'react';
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

type NotificationVariant = 'default' | 'info' | 'warning' | 'success' | 'error';

interface Notification {
  id: string;
  title: string;
  description?: string;
  time: Date;
  read: boolean;
  variant?: NotificationVariant;
}

const NotificationCenterComponent = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Your account has been created',
      description: 'Welcome to our platform! Get started by completing your profile.',
      time: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      variant: 'success'
    },
    {
      id: '2',
      title: 'New message received',
      description: 'You have a new message from John Doe.',
      time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      variant: 'default'
    },
    {
      id: '3',
      title: 'Password reset requested',
      description: 'A password reset was requested for your account.',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
      variant: 'warning'
    },
    {
      id: '4',
      title: 'System maintenance',
      description: 'The system will be undergoing maintenance tomorrow at 2 AM UTC.',
      time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      read: true,
      variant: 'info'
    },
    {
      id: '5',
      title: 'Payment failed',
      description: 'Your recent payment attempt failed. Please update your payment method.',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
      variant: 'error'
    }
  ]);
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
        return <Bell className="h-4 w-4 text-muted-foreground" />;
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
      return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleRemove = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
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
        
        <ScrollArea className="max-h-[300px] overflow-y-auto">
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

export default NotificationCenterComponent;

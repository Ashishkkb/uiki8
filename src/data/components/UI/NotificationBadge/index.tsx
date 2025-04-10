
import { ComponentItem } from "@/types/component";
import NotificationBadgeComponent from "./NotificationBadgeComponent";

const NotificationBadgeComponentItem: ComponentItem = {
  id: 206,
  name: "Notification Badge",
  description: "A notification badge with popover displaying recent notifications",
  category: "UI",
  component: NotificationBadgeComponent,
  code: `import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample notifications data
const defaultNotifications = [
  {
    id: '1',
    title: 'New message',
    message: 'You received a new message from Jane',
    time: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    read: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'Payment successful',
    message: 'Your payment has been processed successfully',
    time: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    read: true,
    type: 'success'
  }
];

export const NotificationBadge = ({
  notifications = defaultNotifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemove,
  maxHeight = 350,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);

  // Use local or prop notifications based on whether handlers are provided
  const usingLocalState = !onMarkAsRead && !onMarkAllAsRead && !onRemove;
  const activeNotifications = usingLocalState ? localNotifications : notifications;
  
  const unreadCount = activeNotifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    if (onMarkAsRead) {
      onMarkAsRead(id);
    } else {
      setLocalNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    }
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    } else {
      setLocalNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
    }
  };

  const handleRemove = (id) => {
    if (onRemove) {
      onRemove(id);
    } else {
      setLocalNotifications(prev =>
        prev.filter(notif => notif.id !== id)
      );
    }
  };

  const formatTimeAgo = (time) => {
    try {
      const date = new Date(time);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 60) return \`\${diffMins}m ago\`;
      
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return \`\${diffHours}h ago\`;
      
      return date.toLocaleDateString();
    } catch (e) {
      return time;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative"
        >
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        {activeNotifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          <ScrollArea className="max-h-[350px]">
            {activeNotifications.map((notification) => (
              <div
                key={notification.id}
                className={\`p-4 border-b \${!notification.read ? 'bg-muted/30' : ''}\`}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTimeAgo(notification.time)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleRemove(notification.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 h-7 text-xs"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            ))}
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["notification", "badge", "popover", "alert"]
};

export default NotificationBadgeComponentItem;

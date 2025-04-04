
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { X, Bell, Info, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationProps {
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  action?: React.ReactNode;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  className?: string;
}

const NotificationDemo = () => {
  const [notifications, setNotifications] = useState<(NotificationProps & { id: string })[]>([
    {
      id: '1',
      title: 'New message received',
      description: 'You have a new message from Jane Smith.',
      type: 'info'
    },
    {
      id: '2',
      title: 'Payment successful',
      description: 'Your payment of $49.99 has been processed.',
      type: 'success'
    }
  ]);
  
  const handleClose = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  const addNotification = (type: 'info' | 'success' | 'warning' | 'error') => {
    const typeMap = {
      info: { title: 'Information', desc: 'This is an informational notification.' },
      success: { title: 'Success', desc: 'Operation completed successfully.' },
      warning: { title: 'Warning', desc: 'Please be aware of this important notice.' },
      error: { title: 'Error', desc: 'An error occurred while processing your request.' }
    };
    
    const newNotification = {
      id: crypto.randomUUID(),
      title: typeMap[type].title,
      description: typeMap[type].desc,
      type,
      autoClose: true
    };
    
    setNotifications(prev => [...prev, newNotification]);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => addNotification('info')}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Info
        </button>
        <button 
          onClick={() => addNotification('success')}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
        >
          Success
        </button>
        <button 
          onClick={() => addNotification('warning')}
          className="px-3 py-1 bg-amber-500 text-white rounded text-sm"
        >
          Warning
        </button>
        <button 
          onClick={() => addNotification('error')}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Error
        </button>
      </div>
      
      <div className="fixed bottom-4 right-4 flex flex-col gap-3 max-w-[350px] z-50">
        <AnimatePresence>
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              {...notification}
              onClose={() => handleClose(notification.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Notification: React.FC<NotificationProps> = ({
  title,
  description,
  type = 'neutral',
  action,
  onClose,
  autoClose = false,
  autoCloseDelay = 5000,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Allow exit animation to play
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Allow exit animation to play
  };
  
  // Get icon and colors based on notification type
  const getTypeStyles = () => {
    switch (type) {
      case 'info':
        return { icon: <Info />, bg: 'bg-blue-50 dark:bg-blue-950', text: 'text-blue-900 dark:text-blue-50', iconColor: 'text-blue-500' };
      case 'success':
        return { icon: <CheckCircle />, bg: 'bg-green-50 dark:bg-green-950', text: 'text-green-900 dark:text-green-50', iconColor: 'text-green-500' };
      case 'warning':
        return { icon: <AlertCircle />, bg: 'bg-amber-50 dark:bg-amber-950', text: 'text-amber-900 dark:text-amber-50', iconColor: 'text-amber-500' };
      case 'error':
        return { icon: <AlertCircle />, bg: 'bg-red-50 dark:bg-red-950', text: 'text-red-900 dark:text-red-50', iconColor: 'text-red-500' };
      default:
        return { icon: <Bell />, bg: 'bg-background', text: 'text-foreground', iconColor: 'text-primary' };
    }
  };
  
  const { icon, bg, text, iconColor } = getTypeStyles();
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "p-4 rounded-lg shadow-lg border border-border/40",
            bg,
            text,
            className
          )}
        >
          <div className="flex items-start gap-3">
            <div className={cn("p-1", iconColor)}>
              {icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{title}</h4>
              {description && (
                <p className="text-xs mt-1 opacity-80">{description}</p>
              )}
              
              {action && (
                <div className="mt-2">
                  {action}
                </div>
              )}
            </div>
            
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {autoClose && (
            <div className="mt-2 w-full bg-muted/30 h-1 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary/70 rounded-full"
                style={{
                  width: '100%',
                  animation: `shrink ${autoCloseDelay / 1000}s linear forwards`
                }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDemo;

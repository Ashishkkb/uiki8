
import React from 'react';
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react";

export interface ToastProps {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

const ToastPreview = ({
  variant = 'default',
  title = "Toast Notification",
  description = "This is a toast notification with a description.",
  action,
  duration = 5000
}: ToastProps) => {
  const { toast } = useToast();

  const getIcon = () => {
    switch (variant) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      default: return null;
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'success': return 'border-green-200 bg-green-50 text-green-900';
      case 'error': return 'border-red-200 bg-red-50 text-red-900';
      case 'warning': return 'border-amber-200 bg-amber-50 text-amber-900';
      case 'info': return 'border-blue-200 bg-blue-50 text-blue-900';
      default: return '';
    }
  };

  const handleShowToast = () => {
    toast({
      title,
      description,
      action: action ? (
        <ToastAction altText={action.label} onClick={action.onClick}>
          {action.label}
        </ToastAction>
      ) : undefined,
      duration,
      className: getVariantClass()
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <Button onClick={() => handleShowToast()} className="w-full">
          Show Toast
        </Button>
        <Button 
          variant="outline" 
          onClick={() => toast({
            title: "Multiple Toasts",
            description: "You can show multiple toasts at once!",
            duration: 3000
          })}
          className="w-full"
        >
          Show Another
        </Button>
      </div>
      
      <div className="border rounded-lg p-4 max-w-md w-full shadow-sm">
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1">
            <h3 className="font-medium text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
        {action && (
          <div className="mt-3 flex justify-end">
            <Button size="sm" variant="outline" className="h-8 text-xs">
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToastPreview;

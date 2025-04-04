
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info, HelpCircle, Settings, Copy, Calendar } from "lucide-react";

export interface TooltipComponentProps {
  variant?: 'default' | 'info' | 'warning';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  content?: string;
  title?: string;
  showArrow?: boolean;
}

const TooltipPreview = ({
  variant = 'default',
  placement = 'top',
  content = "Helpful information about this feature",
  title,
  showArrow = true
}: TooltipComponentProps) => {
  
  const getTooltipClass = () => {
    switch (variant) {
      case 'info': return 'bg-blue-50 text-blue-900 border border-blue-200';
      case 'warning': return 'bg-amber-50 text-amber-900 border border-amber-200';
      default: return '';
    }
  };
  
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'info': return <Info className="h-4 w-4" />;
      case 'help': return <HelpCircle className="h-4 w-4" />;
      case 'settings': return <Settings className="h-4 w-4" />;
      case 'copy': return <Copy className="h-4 w-4" />;
      case 'calendar': return <Calendar className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-wrap gap-4 justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                {getIcon('info')}
                <span>Hover me</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent 
              side={placement}
              className={getTooltipClass()}
              sideOffset={5}
            >
              {title && <div className="font-medium text-sm mb-1">{title}</div>}
              <p className="text-xs">{content}</p>
              {!showArrow && <div className="arrow" />}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                {getIcon('help')}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className={getTooltipClass()}>
              <p className="text-xs">Get help with this feature</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                {getIcon('settings')}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className={getTooltipClass()}>
              <p className="text-xs">Adjust settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="border rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Document Title</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  {getIcon('copy')}
                </Button>
              </TooltipTrigger>
              <TooltipContent className={getTooltipClass()}>
                <p className="text-xs">Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          This is a sample document with tooltips on interactive elements.
          Try hovering over the buttons to see tooltips in action.
        </p>
        <div className="mt-4 flex items-center text-xs text-muted-foreground">
          <span>Created:</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="h-auto p-0 ml-1 text-xs">
                  <span className="flex items-center gap-1">
                    April 1, 2025
                    {getIcon('calendar')}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className={getTooltipClass()}>
                <p className="text-xs">Document creation date</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default TooltipPreview;

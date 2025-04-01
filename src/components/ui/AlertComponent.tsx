
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Info, CheckCircle, XCircle } from "lucide-react";

export interface AlertComponentProps {
  variant?: 'default' | 'destructive' | 'success' | 'info';
  title?: string;
  description?: string;
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  variant = 'default',
  title = "Alert Title",
  description = "This is the alert description with additional information."
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'destructive': return <XCircle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'info': return <Info className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    return variant === 'success' || variant === 'info' ? 'default' : variant;
  };

  return (
    <Alert variant={getVariant() as 'default' | 'destructive'} className={
      variant === 'success' ? 'border-green-500 text-green-700 bg-green-50' :
      variant === 'info' ? 'border-blue-500 text-blue-700 bg-blue-50' : ''
    }>
      <div className="flex items-center gap-2">
        {getIcon()}
        <AlertTitle>{title}</AlertTitle>
      </div>
      <AlertDescription className="mt-2">
        {description}
      </AlertDescription>
    </Alert>
  );
};

export default AlertComponent;

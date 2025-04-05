
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children?: React.ReactNode;
}

const InfoCardComponent: React.FC<InfoCardProps> = ({
  title,
  description,
  icon: Icon,
  iconClassName,
  className,
  headerClassName,
  contentClassName,
  variant = 'default',
  children,
}) => {
  const variantStyles = {
    default: {
      card: "bg-card",
      icon: "text-foreground",
    },
    success: {
      card: "bg-green-50 border-green-200",
      icon: "text-green-600 bg-green-100",
    },
    warning: {
      card: "bg-yellow-50 border-yellow-200",
      icon: "text-yellow-600 bg-yellow-100",
    },
    danger: {
      card: "bg-red-50 border-red-200",
      icon: "text-red-600 bg-red-100",
    },
    info: {
      card: "bg-blue-50 border-blue-200",
      icon: "text-blue-600 bg-blue-100",
    },
  };

  return (
    <Card className={cn(variantStyles[variant].card, className)}>
      <CardHeader className={cn("flex flex-row items-center gap-4", headerClassName)}>
        {Icon && (
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full p-2", 
            variantStyles[variant].icon,
            iconClassName
          )}>
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div>
          <CardTitle className={cn("text-lg")}>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </CardHeader>
      {children && (
        <CardContent className={cn("pt-0", contentClassName)}>
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default InfoCardComponent;

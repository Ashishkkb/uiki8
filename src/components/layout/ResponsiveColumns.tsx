
import React from "react";
import { cn } from "@/lib/utils";

export interface ResponsiveColumnsProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
  equalHeight?: boolean;
  breakout?: boolean;
}

const ResponsiveColumns: React.FC<ResponsiveColumnsProps> = ({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 4,
  className = "",
  equalHeight = true,
  breakout = false,
}) => {
  // Generate the column classes based on the provided configuration
  const colClasses = [
    columns.sm ? `sm:grid-cols-${columns.sm}` : "",
    columns.md ? `md:grid-cols-${columns.md}` : "",
    columns.lg ? `lg:grid-cols-${columns.lg}` : "",
    columns.xl ? `xl:grid-cols-${columns.xl}` : "",
  ].filter(Boolean).join(" ");
  
  return (
    <div
      className={cn(
        "grid grid-cols-1",
        colClasses,
        `gap-${gap}`,
        equalHeight ? "auto-rows-fr" : "",
        breakout ? "overflow-x-auto -mx-4 px-4 md:-mx-6 md:px-6" : "",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ResponsiveColumns;

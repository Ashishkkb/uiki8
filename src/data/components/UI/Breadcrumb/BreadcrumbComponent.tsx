
import React from 'react';
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  homeIcon?: boolean;
  maxItems?: number;
  truncate?: boolean;
}

const BreadcrumbComponent: React.FC<BreadcrumbProps> = ({
  items = [], // Provide default empty array for items
  className,
  separator,
  homeIcon = true,
  maxItems = 0,
  truncate = false
}) => {
  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];
  
  const displayedItems = maxItems > 0 && safeItems.length > maxItems
    ? [
        ...safeItems.slice(0, 1),
        { label: '...', href: '#', icon: null },
        ...safeItems.slice(safeItems.length - (maxItems - 1))
      ]
    : safeItems;

  // Return early with simple message if no items
  if (displayedItems.length === 0) {
    return <nav className={cn("flex text-sm text-muted-foreground", className)}>No breadcrumb items</nav>;
  }

  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm">
        {displayedItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-muted-foreground">
                {separator || <ChevronRight className="h-4 w-4" />}
              </span>
            )}
            
            <a 
              href={item.href}
              className={cn(
                "flex items-center text-muted-foreground hover:text-foreground",
                index === displayedItems.length - 1 ? "font-medium text-foreground" : "",
                truncate && "max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
              )}
            >
              {index === 0 && homeIcon ? (
                <Home className="mr-1 h-3.5 w-3.5" />
              ) : item.icon}
              
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbComponent;

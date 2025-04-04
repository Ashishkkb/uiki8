
import React from 'react';
import { ComponentItem } from "@/types/component";
import { ChevronRight, Home } from "lucide-react";

const BreadcrumbsDemo = () => {
  return (
    <nav className="flex">
      <ol className="flex items-center space-x-1 text-sm">
        <li>
          <a href="#" className="flex items-center text-muted-foreground hover:text-foreground">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </a>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </li>
        <li>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Components
          </a>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </li>
        <li>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Navigation
          </a>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </li>
        <li>
          <span className="font-medium text-foreground">
            Breadcrumbs
          </span>
        </li>
      </ol>
    </nav>
  );
};

const BreadcrumbsComponentData: ComponentItem = {
  id: 411,
  name: "Breadcrumbs",
  category: "Navigation",
  framework: "React",
  description: "A breadcrumb navigation component that helps users keep track of their location within the application",
  code: `import React from "react";
import { ChevronRight, Home, CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
  className,
}) => {
  return (
    <nav className={cn("flex", className)}>
      <ol className="flex items-center space-x-1 text-sm">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          
          return (
            <React.Fragment key={index}>
              <li>
                {isLastItem ? (
                  <span className="font-medium text-foreground flex items-center">
                    {item.icon}
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href || "#"}
                    className="text-muted-foreground hover:text-foreground flex items-center"
                  >
                    {item.icon}
                    {item.label === "Home" && !item.icon ? (
                      <>
                        <Home className="h-4 w-4" />
                        <span className="sr-only">Home</span>
                      </>
                    ) : (
                      item.label
                    )}
                  </a>
                )}
              </li>
              
              {!isLastItem && (
                <li className="flex items-center">
                  {separator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;`,
  component: BreadcrumbsDemo,
  tags: ["navigation", "breadcrumbs", "path", "location"],
  fileSize: "1.5 KB",
  price: "Free",
  complexity: "simple",
  lastUpdated: "2023-12-10"
};

export default BreadcrumbsComponentData;

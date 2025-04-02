
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ComponentFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const ComponentFilters: React.FC<ComponentFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2 pb-6 border-b border-border/20 mb-8">
      <Button
        variant={!selectedCategory ? "default" : "outline"}
        size="sm"
        className={cn(
          "rounded-full",
          !selectedCategory ? "bg-primary text-primary-foreground" : ""
        )}
        onClick={() => onSelectCategory(null)}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full",
            selectedCategory === category ? "bg-primary text-primary-foreground" : ""
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default ComponentFilters;

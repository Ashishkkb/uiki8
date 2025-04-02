
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
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={!selectedCategory ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectCategory(null)}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default ComponentFilters;

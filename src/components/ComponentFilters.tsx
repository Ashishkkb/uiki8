
import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

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
  const { theme } = useTheme();
  
  // Theme-specific styling for buttons
  const activeButtonStyle = "bg-primary text-primary-foreground hover:bg-primary/90";
  const inactiveButtonStyle = theme === 'dark' 
    ? "bg-transparent border-[#9b87f5]/30 text-foreground hover:bg-accent" 
    : "bg-transparent border-[#9b87f5]/20 text-foreground hover:bg-accent";

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!selectedCategory ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectCategory(null)}
        className={!selectedCategory ? activeButtonStyle : inactiveButtonStyle}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className={selectedCategory === category ? activeButtonStyle : inactiveButtonStyle}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default ComponentFilters;

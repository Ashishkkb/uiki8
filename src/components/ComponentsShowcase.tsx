
import React, { useState, useEffect, memo } from "react";
import { getAllComponents } from "@/data/components/registry";
import ComponentFilters from "./ComponentFilters";
import ComponentCard from "./ComponentCard";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface ComponentsShowcaseProps {
  initialCategory?: string | null;
  searchQuery?: string;
}

// Memoize the component to prevent unnecessary re-renders
const ComponentsShowcase: React.FC<ComponentsShowcaseProps> = memo(({
  initialCategory = null,
  searchQuery = "",
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const componentsArray = getAllComponents() || [];
  
  // Filter out any null or undefined items
  const allComponents = componentsArray.filter(comp => comp !== null && comp !== undefined);
  
  // Extract unique categories, with fallback to empty array
  const categories = Array.from(
    new Set(allComponents.filter(comp => comp && comp.category).map(component => component.category))
  ).sort();
  
  // Filter components by selected category and search query
  const filteredComponents = allComponents.filter((component) => {
    if (!component) return false;
    
    const matchesCategory = selectedCategory 
      ? component.category === selectedCategory 
      : true;
      
    const matchesSearch = searchQuery
      ? ((component.name && component.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (component.description && component.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (component.tags && component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))))
      : true;
    
    return matchesCategory && matchesSearch;
  });

  // Reset category when initialCategory prop changes
  useEffect(() => {
    if (initialCategory !== undefined) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  return (
    <div>
      {/* Only show filters when not in category-specific view */}
      {initialCategory === null && categories.length > 0 && (
        <ComponentFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}
      
      {/* Masonry grid layout for components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component) => (
          <ComponentCard
            key={component.id}
            component={component}
          />
        ))}
      </div>
      
      {filteredComponents.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No components found</h3>
          <p className="mt-2 text-center text-muted-foreground">
            {searchQuery ? (
              <>No results for "{searchQuery}". Try another search term.</>
            ) : (
              <>No components found in this category.</>
            )}
          </p>
        </div>
      )}
    </div>
  );
});

ComponentsShowcase.displayName = "ComponentsShowcase";

export default ComponentsShowcase;

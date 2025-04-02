
import React, { useState } from "react";
import { getAllComponents } from "@/data/components/registry";
import ComponentFilters from "./ComponentFilters";
import ComponentCard from "./ComponentCard";
import { cn } from "@/lib/utils";

const ComponentsShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const allComponents = getAllComponents();
  
  // Extract unique categories
  const categories = Array.from(
    new Set(allComponents.map((component) => component.category))
  ).sort();
  
  // Filter components by selected category
  const filteredComponents = selectedCategory
    ? allComponents.filter((component) => component.category === selectedCategory)
    : allComponents;

  return (
    <div>
      <ComponentFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component) => (
          <ComponentCard
            key={component.id}
            component={component}
          />
        ))}
      </div>
      
      {filteredComponents.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-card">
          <p className="text-lg text-muted-foreground">No components found.</p>
        </div>
      )}
    </div>
  );
};

export default ComponentsShowcase;

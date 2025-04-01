
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ComponentFilters from "./ComponentFilters";
import ComponentCard from "./ComponentCard";
import  componentsList  from "@/data/reactComponents";

const ComponentsShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter components based on category and search query
  const filteredComponents = componentsList.filter((component) => {
    // Filter by category
    if (selectedCategory && component.category !== selectedCategory) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !component.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !component.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(component.tags && component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    ) {
      return false;
    }

    return true;
  });

  // Get unique categories
  const categories = Array.from(
    new Set(componentsList.map((component) => component.category))
  );

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">React Components</h2>
          <p className="mt-4 text-xl text-gray-600">
            Browse our collection of high-quality React components
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div className="w-full md:w-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search components..."
              className="pl-10 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <ComponentFilters 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {filteredComponents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900">No components found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
            <Button className="mt-4" onClick={() => {
              setSearchQuery("");
              setSelectedCategory(null);
            }}>Clear filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentsShowcase;

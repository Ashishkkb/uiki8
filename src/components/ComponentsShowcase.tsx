
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ComponentFilters from "./ComponentFilters";
import ComponentCard from "./ComponentCard";
import componentsList from "@/data/reactComponents";

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
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F2FCE2] to-[#FEF7CD]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#555]">Enchanted Components</h2>
          <p className="mt-4 text-xl text-[#666]">
            Browse our collection of magical React components
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div className="w-full md:w-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-[#8A898C]" />
            </div>
            <Input
              type="search"
              placeholder="Search components..."
              className="pl-10 w-full md:w-80 border-[#ccc] bg-white/80 backdrop-blur-sm"
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
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-[#D3E4FD]">
            <h3 className="text-lg font-medium text-[#555]">No components found</h3>
            <p className="mt-2 text-[#8A898C]">Try adjusting your search or filter criteria</p>
            <Button 
              className="mt-4 bg-gradient-to-r from-[#6A9D80] to-[#87B5A2] hover:opacity-90 transition-opacity" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

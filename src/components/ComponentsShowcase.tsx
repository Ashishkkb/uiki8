
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ComponentFilters from "./ComponentFilters";
import ComponentCard from "./ComponentCard";
import { getAllComponents } from "@/data/components";
import { useTheme } from "@/hooks/useTheme";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const ComponentsShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const componentsPerPage = 5;
  const { theme } = useTheme();
  
  // Get all components from the registry
  const allComponents = getAllComponents();

  // Filter components based on category and search query
  const filteredComponents = allComponents.filter((component) => {
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

  // Pagination logic
  const totalPages = Math.ceil(filteredComponents.length / componentsPerPage);
  const indexOfLastComponent = currentPage * componentsPerPage;
  const indexOfFirstComponent = indexOfLastComponent - componentsPerPage;
  const currentComponents = filteredComponents.slice(indexOfFirstComponent, indexOfLastComponent);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get unique categories
  const categories = Array.from(
    new Set(allComponents.map((component) => component.category))
  );

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      // If 5 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        // Add ellipsis if current page is away from start
        pageNumbers.push("ellipsis1");
      }
      
      // Add page numbers around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        // Add ellipsis if current page is away from end
        pageNumbers.push("ellipsis2");
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // Theme-specific styling
  const containerBg = theme === 'dark' 
    ? 'from-[#2D3748]/90 to-[#1A1F2C]/90' 
    : 'from-gray-50 to-white';
  
  const searchBg = theme === 'dark'
    ? 'border-[#9b87f5]/30 bg-[#1A1F2C]/50 text-white backdrop-blur-sm'
    : 'border-[#9b87f5]/20 bg-white text-gray-700';
    
  const errorMsgBg = theme === 'dark'
    ? 'bg-[#1A1F2C]/60 backdrop-blur-sm border border-[#9b87f5]/20'
    : 'bg-white backdrop-blur-sm border border-[#9b87f5]/10';

  return (
    <div className={`py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b ${containerBg} rounded-xl transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Modern Components</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Build powerful applications with our MERN-inspired components
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div className="w-full md:w-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search components..."
              className={`pl-10 w-full md:w-80 ${searchBg}`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          
          <ComponentFilters 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reset to first page on filter change
            }}
          />
        </div>

        {filteredComponents.length === 0 ? (
          <div className={`text-center py-16 ${errorMsgBg} rounded-lg`}>
            <h3 className="text-lg font-medium text-foreground">No components found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria</p>
            <Button 
              className="mt-4 bg-gradient-to-r from-[#9b87f5] to-[#7C3AED] hover:opacity-90 transition-opacity" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setCurrentPage(1);
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-6">
              {currentComponents.map((component) => (
                <ComponentCard key={component.id} component={component} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="cursor-pointer hover:bg-accent text-foreground"
                        />
                      </PaginationItem>
                    )}
                    
                    {getPageNumbers().map((pageNumber, index) => (
                      pageNumber === "ellipsis1" || pageNumber === "ellipsis2" ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={index}>
                          <PaginationLink
                            isActive={currentPage === pageNumber}
                            onClick={() => handlePageChange(Number(pageNumber))}
                            className={`cursor-pointer ${
                              currentPage === pageNumber 
                                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                                : "text-foreground hover:bg-accent"
                            }`}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="cursor-pointer hover:bg-accent text-foreground"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ComponentsShowcase;


import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CustomPaginationProps {
  totalPages: number;
  initialPage?: number;
  siblingsCount?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  initialPage = 1,
  siblingsCount = 1,
  onPageChange,
  className,
  showFirstLast = false,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };
  
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always include first page
    pageNumbers.push(1);
    
    // Calculate range of pages around current page
    const leftSibling = Math.max(2, currentPage - siblingsCount);
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingsCount);
    
    // Add ellipsis if needed
    if (leftSibling > 2) {
      pageNumbers.push('ellipsis-start');
    }
    
    // Add pages around current page
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }
    
    // Add ellipsis if needed
    if (rightSibling < totalPages - 1) {
      pageNumbers.push('ellipsis-end');
    }
    
    // Always include last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <Pagination className={className}>
      <PaginationContent>
        {showFirstLast && currentPage > 1 && (
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => handlePageChange(1)}
            >
              <span className="sr-only">First page</span>
              <span>«</span>
            </Button>
          </PaginationItem>
        )}
        
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => handlePageChange(currentPage - 1)}
            className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis-start' || page === 'ellipsis-end' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
        
        {showFirstLast && currentPage < totalPages && (
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => handlePageChange(totalPages)}
            >
              <span className="sr-only">Last page</span>
              <span>»</span>
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

const PaginationDemo = () => {
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(3);
  const [page3, setPage3] = useState(1);
  
  // Mock data for product list
  const products = [
    { id: 1, name: "Product 1", description: "A high-quality item for everyday use", price: "$19.99" },
    { id: 2, name: "Product 2", description: "Premium solution for professional needs", price: "$49.99" },
    { id: 3, name: "Product 3", description: "Affordable option with great features", price: "$29.99" },
    { id: 4, name: "Product 4", description: "Luxurious item with exceptional quality", price: "$99.99" },
    { id: 5, name: "Product 5", description: "Practical solution for common problems", price: "$14.99" },
  ];
  
  return (
    <div className="space-y-12">
      {/* Basic pagination example */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Pagination</h3>
        <div className="p-4 border rounded-md">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Page {page}</h3>
            <p className="text-muted-foreground">Showing content for the selected page</p>
          </div>
          <CustomPagination 
            totalPages={5} 
            initialPage={page}
            onPageChange={setPage}
          />
        </div>
      </div>
      
      {/* Product list with pagination */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Paginated Product List</h3>
        <div className="space-y-6">
          <div className="space-y-4">
            {products.map(product => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                    <div className="font-medium">{product.price}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing page {page2} of 10
            </p>
            <CustomPagination 
              totalPages={10} 
              initialPage={page2}
              onPageChange={setPage2}
              siblingsCount={2}
            />
          </div>
        </div>
      </div>
      
      {/* Advanced pagination with first/last buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Advanced Pagination</h3>
        <div className="p-4 border rounded-md flex flex-col items-center gap-4">
          <div className="text-center">
            <h3 className="text-xl font-medium">Photo Gallery</h3>
            <p className="text-muted-foreground">Browse through our collection of images</p>
          </div>
          
          <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-bold">Image {page3}</h3>
              <p className="text-muted-foreground">Gallery image preview</p>
            </div>
          </div>
          
          <CustomPagination 
            totalPages={20} 
            initialPage={page3}
            onPageChange={setPage3}
            showFirstLast={true}
            siblingsCount={1}
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationDemo;

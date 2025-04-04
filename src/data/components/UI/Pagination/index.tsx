
import { ComponentItem } from "@/types/component";
import PaginationComponent from "./PaginationComponent";

const PaginationComponentItem: ComponentItem = {
  id: 60,
  name: "Pagination",
  category: "UI",
  framework: "React",
  description: "A pagination component for navigating through multi-page content.",
  component: PaginationComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["UI", "pagination", "navigation", "pages"],
  isNew: true,
  fileSize: "2.8kb",
  complexity: "medium",
  lastUpdated: "2025-04-04",
  author: "Lovable UI",
  code: `import React, { useState } from 'react';
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

export default CustomPagination;`,
};

export default PaginationComponentItem;

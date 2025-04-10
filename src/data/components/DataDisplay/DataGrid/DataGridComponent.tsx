
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
}

interface DataGridProps {
  columns: Column[];
  data: any[];
  className?: string;
  rowClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
  pagination?: boolean;
  pageSize?: number;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
}

const DataGridComponent: React.FC<DataGridProps> = ({
  columns = [],
  data = [],
  className,
  rowClassName,
  headerClassName,
  cellClassName,
  pagination = true,
  pageSize = 10,
  striped = true,
  hoverable = true,
  bordered = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages based on data length and page size
  const totalPages = Math.ceil((data?.length || 0) / pageSize);
  
  // Get the current page's data
  const paginatedData = pagination
    ? data?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : data;

  // Generate the page links for pagination
  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageLinks.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pageLinks.push('ellipsis');
    }
  }

  // Filter and deduplicate ellipsis
  const uniquePageLinks = pageLinks.filter((link, index, self) => {
    if (link === 'ellipsis') {
      return self.indexOf('ellipsis') === index;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      <div className={cn("rounded-md border", bordered ? "border" : "", className)}>
        <Table>
          <TableHeader className={headerClassName}>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} style={column.width ? { width: column.width } : undefined}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData?.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex}
                className={cn(
                  rowClassName,
                  striped && rowIndex % 2 !== 0 ? "bg-muted/50" : "",
                  hoverable ? "hover:bg-muted cursor-pointer" : ""
                )}
              >
                {columns.map((column) => (
                  <TableCell key={`${rowIndex}-${column.key}`} className={cellClassName}>
                    {column.render 
                      ? column.render(row[column.key], row) 
                      : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {uniquePageLinks.map((link, index) => 
              link === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={`page-${link}`}>
                  <PaginationLink
                    isActive={currentPage === link}
                    onClick={() => setCurrentPage(link as number)}
                    className="cursor-pointer"
                  >
                    {link}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default DataGridComponent;

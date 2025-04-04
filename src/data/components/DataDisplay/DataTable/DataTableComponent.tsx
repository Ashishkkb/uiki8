
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronsUpDown, 
  Filter, 
  Search, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Define the shape of our table data
type Status = 'active' | 'inactive' | 'pending';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: Status;
  lastActive: string;
}

// Sample data for the table
const sampleData: User[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Admin', status: 'active', lastActive: '2023-03-25' },
  { id: '2', name: 'Michael Chen', email: 'mike.c@example.com', role: 'User', status: 'inactive', lastActive: '2023-02-14' },
  { id: '3', name: 'Emily Davis', email: 'emily.d@example.com', role: 'Editor', status: 'active', lastActive: '2023-03-28' },
  { id: '4', name: 'Robert Wilson', email: 'rob.w@example.com', role: 'User', status: 'pending', lastActive: '2023-03-20' },
  { id: '5', name: 'Jessica Smith', email: 'jess.s@example.com', role: 'Admin', status: 'active', lastActive: '2023-03-27' },
  { id: '6', name: 'David Thompson', email: 'david.t@example.com', role: 'Editor', status: 'inactive', lastActive: '2023-01-05' },
  { id: '7', name: 'Amanda Brown', email: 'amanda.b@example.com', role: 'User', status: 'pending', lastActive: '2023-03-15' },
  { id: '8', name: 'James Miller', email: 'james.m@example.com', role: 'User', status: 'active', lastActive: '2023-03-26' },
];

// Define column configuration
interface Column {
  id: keyof User;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: User) => React.ReactNode;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role', sortable: true },
  { 
    id: 'status', 
    label: 'Status', 
    sortable: true,
    render: (value) => {
      const statusMap = {
        active: { label: 'Active', class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
        inactive: { label: 'Inactive', class: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
        pending: { label: 'Pending', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
      };
      
      const status = value as Status;
      return (
        <Badge variant="outline" className={cn('font-normal', statusMap[status].class)}>
          {statusMap[status].label}
        </Badge>
      );
    } 
  },
  { id: 'lastActive', label: 'Last Active' },
];

const DataTable = () => {
  const [data, setData] = useState<User[]>(sampleData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Filter data based on search query
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort data based on selected column and direction
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);
  
  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle sort click
  const handleSort = (columnId: keyof User) => {
    if (sortColumn === columnId) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };
  
  // Render sort icon
  const renderSortIcon = (columnId: keyof User) => {
    if (sortColumn !== columnId) {
      return <ChevronsUpDown className="ml-1 h-3 w-3 text-muted-foreground" />;
    }
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="ml-1 h-3 w-3 text-primary" /> 
      : <ChevronDown className="ml-1 h-3 w-3 text-primary" />;
  };
  
  return (
    <div className="w-full space-y-4">
      {/* Table controls */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8 w-full sm:w-[250px]"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Columns</span>
          </Button>
        </div>
      </div>
      
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="whitespace-nowrap">
                  {column.sortable ? (
                    <button
                      className="flex items-center font-medium"
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                      {renderSortIcon(column.id)}
                    </button>
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  {columns.map((column) => (
                    <TableCell key={`${row.id}-${column.id}`}>
                      {column.render 
                        ? column.render(row[column.id], row)
                        : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {sortedData.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

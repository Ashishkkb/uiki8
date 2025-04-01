
import React from 'react';
import { ComponentItem } from "@/types/component";

const TableComponent: ComponentItem = {
  id: 7,
  name: "Table",
  category: "UI",
  framework: "React",
  description: "A fully featured table component with sorting, pagination, and selection",
  code: `import React, { useState } from 'react';

type TableColumn<T> = {
  header: string;
  accessor: keyof T | ((row: T) => any);
  cell?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
};

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  keyField: keyof T;
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  striped?: boolean;
  bordered?: boolean;
};

function Table<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  selectable = false,
  pagination = false,
  pageSize = 10,
  striped = false,
  bordered = false
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  // Sorting
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return;
    
    const accessor = column.accessor;
    const accessorKey = typeof accessor === 'string' ? accessor : null;
    
    if (!accessorKey) return;

    if (sortColumn === accessorKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(accessorKey);
      setSortDirection('asc');
    }
  };

  // Apply sorting
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const accessor = typeof columns.find(col => 
        typeof col.accessor === 'string' && col.accessor === sortColumn
      )?.accessor === 'function' 
        ? (row: T) => (columns.find(col => 
            typeof col.accessor === 'function' && col.accessor.toString() === sortColumn.toString()
          )?.accessor as Function)(row)
        : (row: T) => row[sortColumn as keyof T];

      const valueA = typeof accessor === 'function' ? accessor(a) : a[sortColumn];
      const valueB = typeof accessor === 'function' ? accessor(b) : b[sortColumn];

      if (valueA === valueB) return 0;

      if (valueA === null || valueA === undefined) return 1;
      if (valueB === null || valueB === undefined) return -1;

      if (typeof valueA === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }

      return sortDirection === 'asc' 
        ? valueA - valueB 
        : valueB - valueA;
    });
  }, [data, sortColumn, sortDirection, columns]);

  // Pagination
  const pageCount = Math.ceil(sortedData.length / pageSize);
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pagination, currentPage, pageSize]);

  // Selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const newSelectedRows: Record<string, boolean> = {};
    
    paginatedData.forEach(row => {
      const key = String(row[keyField]);
      newSelectedRows[key] = isChecked;
    });
    
    setSelectedRows(newSelectedRows);
  };

  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, row: T) => {
    const key = String(row[keyField]);
    const isChecked = e.target.checked;
    
    setSelectedRows(prev => ({
      ...prev,
      [key]: isChecked
    }));
  };

  const isAllSelected = paginatedData.length > 0 && paginatedData.every(
    row => selectedRows[String(row[keyField])]
  );

  // Cell value accessor
  const getCellValue = (column: TableColumn<T>, row: T) => {
    const accessor = column.accessor;
    if (typeof accessor === 'function') {
      return accessor(row);
    }
    return row[accessor];
  };

  return (
    <div className="overflow-x-auto">
      <table className={\`min-w-full divide-y divide-gray-200 \${bordered ? 'border border-gray-200' : ''}\`}>
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th scope="col" className="px-6 py-3 w-px">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={
                  \`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider \${
                    column.sortable ? 'cursor-pointer select-none' : ''
                  }\`
                }
                onClick={() => column.sortable && handleSort(column)}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && sortColumn === column.accessor && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((row, rowIndex) => {
            const key = String(row[keyField]);
            const isSelected = selectedRows[key];
            
            return (
              <tr
                key={key}
                className={
                  \`\${isSelected ? 'bg-blue-50' : ''} \${
                    striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''
                  }\`
                }
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={!!isSelected}
                      onChange={(e) => handleSelectRow(e, row)}
                    />
                  </td>
                )}
                
                {columns.map((column, colIndex) => {
                  const cellValue = getCellValue(column, row);
                  
                  return (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.cell ? column.cell(cellValue, row) : cellValue}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {pagination && pageCount > 1 && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={
                \`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md \${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }\`
              }
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
              disabled={currentPage === pageCount}
              className={
                \`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md \${
                  currentPage === pageCount
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }\`
              }
            >
              Next
            </button>
          </div>
          
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, sortedData.length)}
                </span>{' '}
                of <span className="font-medium">{sortedData.length}</span> results
              </p>
            </div>
            
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className={
                    \`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium \${
                      currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }\`
                  }
                >
                  <span className="sr-only">First</span>
                  ⟨⟨
                </button>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={
                    \`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium \${
                      currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }\`
                  }
                >
                  <span className="sr-only">Previous</span>
                  ⟨
                </button>
                
                {Array.from({ length: Math.min(5, pageCount) }).map((_, i) => {
                  const pageNumber = currentPage <= 3
                    ? i + 1
                    : currentPage >= pageCount - 2
                      ? pageCount - 4 + i
                      : currentPage - 2 + i;
                  
                  if (pageNumber <= 0 || pageNumber > pageCount) return null;
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={
                        \`relative inline-flex items-center px-4 py-2 border \${
                          currentPage === pageNumber
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        } text-sm font-medium\`
                      }
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
                  disabled={currentPage === pageCount}
                  className={
                    \`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium \${
                      currentPage === pageCount ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }\`
                  }
                >
                  <span className="sr-only">Next</span>
                  ⟩
                </button>
                <button
                  onClick={() => setCurrentPage(pageCount)}
                  disabled={currentPage === pageCount}
                  className={
                    \`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium \${
                      currentPage === pageCount ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }\`
                  }
                >
                  <span className="sr-only">Last</span>
                  ⟩⟩
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;`,
  tags: ["UI", "table", "data", "sorting", "pagination"],
  isNew: false,
  fileSize: "11.8 KB",
  price: "19.99"
};

export default TableComponent;

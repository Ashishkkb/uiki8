
import React from "react";

export interface GridComponentProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
  rowGap?: number;
  columnGap?: number;
  responsive?: boolean;
}

const GridComponent: React.FC<GridComponentProps> = ({
  children,
  columns = 2,
  gap = 4,
  className = "",
  rowGap,
  columnGap,
  responsive = true,
}) => {
  // Define column gap styles
  const colGap = columnGap !== undefined ? columnGap : gap;
  const rowG = rowGap !== undefined ? rowGap : gap;
  
  // Calculate the grid template columns based on number of columns
  const gridCols = `grid-cols-${columns}`;
  
  // For responsive grids, define breakpoints
  const responsiveClasses = responsive
    ? `grid-cols-1 sm:grid-cols-2 md:${columns >= 3 ? 'grid-cols-3' : 'grid-cols-2'} lg:${gridCols}`
    : gridCols;

  return (
    <div
      className={`grid ${responsiveClasses} gap-${rowG} gap-x-${colGap} ${className}`}
    >
      {children}
    </div>
  );
};

export default GridComponent;

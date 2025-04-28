
import React from 'react';
import { ComponentItem } from "@/types/component";
import HeatMapComponent from "./HeatMapComponent";

const HeatMapComponentItem: ComponentItem = {
  id: 150,
  name: "Heat Map",
  category: "Data Display",
  framework: "React",
  description: "A visual representation of data where values are represented as colors.",
  component: HeatMapComponent,
  tags: ["visualization", "data", "chart", "heatmap"],
  isNew: true,
  fileSize: "2.4 KB",
  complexity: "complex",
  code: `import React, { useState, useCallback } from 'react';

type CellData = {
  x: number;
  y: number;
  value: number;
};

type HeatMapProps = {
  data: CellData[];
  width?: number;
  height?: number;
  cellSize?: number;
  colorRange?: string[];
  className?: string;
};

export const HeatMap = ({ 
  data, 
  width = 600, 
  height = 400,
  cellSize = 30,
  colorRange = ["#f8696b", "#ffffff", "#63acff"],
  className,
  ...props 
}) => {
  // Find min and max values for normalization
  const minValue = Math.min(...data.map(cell => cell.value));
  const maxValue = Math.max(...data.map(cell => cell.value));
  
  // Calculate grid dimensions
  const xMax = Math.max(...data.map(cell => cell.x)) + 1;
  const yMax = Math.max(...data.map(cell => cell.y)) + 1;
  
  const gridWidth = xMax * cellSize;
  const gridHeight = yMax * cellSize;
  
  // Function to get color based on value
  const getColor = (value) => {
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    
    if (normalizedValue <= 0.5) {
      // Interpolate between first and second colors
      const ratio = normalizedValue * 2;
      return interpolateColor(colorRange[0], colorRange[1], ratio);
    } else {
      // Interpolate between second and third colors
      const ratio = (normalizedValue - 0.5) * 2;
      return interpolateColor(colorRange[1], colorRange[2], ratio);
    }
  };
  
  // Helper function to interpolate between two hex colors
  const interpolateColor = (color1, color2, ratio) => {
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    
    const r = Math.round(r1 + ratio * (r2 - r1));
    const g = Math.round(g1 + ratio * (g2 - g1));
    const b = Math.round(b1 + ratio * (b2 - b1));
    
    return \`#\${r.toString(16).padStart(2, '0')}\${g.toString(16).padStart(2, '0')}\${b.toString(16).padStart(2, '0')}\`;
  };

  return (
    <div 
      className={className} 
      style={{ width: \`\${width}px\`, height: \`\${height}px\`, overflow: 'auto' }}
      {...props}
    >
      <div className="relative" style={{ width: \`\${gridWidth}px\`, height: \`\${gridHeight}px\` }}>
        {data.map((cell, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: cell.x * cellSize,
              top: cell.y * cellSize,
              width: cellSize,
              height: cellSize,
              backgroundColor: getColor(cell.value),
              border: '1px solid rgba(0,0,0,0.1)',
            }}
            title={\`Value: \${cell.value.toFixed(2)}\`}
          />
        ))}
      </div>
    </div>
  );
};`
};

export default HeatMapComponentItem;

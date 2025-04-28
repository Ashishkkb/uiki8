
import React from 'react';
import { ComponentItem } from "@/types/component";
import HeatMapComponent from "./HeatMapComponent";

const HeatMapComponentItem: ComponentItem = {
  id: "heatmap-visualization",
  name: "Heat Map",
  category: "Data Display",
  framework: "React",
  description: "A dynamic heat map visualization for displaying data density with customizable colors and controls",
  code: `import React, { useState, useCallback } from 'react';

type CellData = {
  x: number;
  y: number;
  value: number;
};

type HeatMapProps = {
  data?: CellData[];
  width?: number;
  height?: number;
  colorRange?: string[];
  showControls?: boolean;
};

const HeatMap: React.FC<HeatMapProps> = ({
  data,
  width = 500,
  height = 400,
  colorRange = ["#f8696b", "#ffffff", "#63acff"],
  showControls = true
}) => {
  const [cellSize, setCellSize] = useState<number>(30);
  const [opacity, setOpacity] = useState<number>(0.9);
  const [colorScale, setColorScale] = useState<string>("Red-Blue");
  
  // UI implementation with controls and visualization
  // ...

  return (
    <div className="heat-map-container">
      {/* Controls for cell size, color scale, opacity */}
      {/* Heat map grid visualization */}
      {/* Color legend */}
    </div>
  );
};

export default HeatMap;`,
  component: HeatMapComponent,
  tags: ["data visualization", "charts", "heat map", "interactive"],
  isNew: true,
  fileSize: "4.8 KB",
  price: "0"
};

export default HeatMapComponentItem;

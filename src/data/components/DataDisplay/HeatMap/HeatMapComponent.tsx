
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

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

const generateMockData = (rows: number, cols: number): CellData[] => {
  const data: CellData[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      data.push({
        x,
        y,
        value: Math.random(),
      });
    }
  }
  return data;
};

const defaultColorScales = {
  "Red-Blue": ["#f8696b", "#ffffff", "#63acff"],
  "Green-Purple": ["#63be7b", "#ffffff", "#8e77ab"],
  "Yellow-Blue": ["#ffeb84", "#ffffff", "#63acff"],
  "Heat": ["#ffffff", "#fecc64", "#f8696b"],
  "Spectral": ["#5e4fa2", "#f7f7f7", "#a50026"]
};

const HeatMapComponent: React.FC<HeatMapProps> = ({
  data: providedData,
  width = 500,
  height = 400,
  colorRange = defaultColorScales["Red-Blue"],
  showControls = true
}) => {
  const [cellSize, setCellSize] = useState<number>(30);
  const [opacity, setOpacity] = useState<number>(0.9);
  const [colorScale, setColorScale] = useState<string>("Red-Blue");
  
  // Use provided data or mock data
  const data = providedData || generateMockData(10, 15);
  
  // Find min and max values for normalization
  const minValue = Math.min(...data.map(cell => cell.value));
  const maxValue = Math.max(...data.map(cell => cell.value));
  
  // Calculate grid dimensions
  const xMax = Math.max(...data.map(cell => cell.x)) + 1;
  const yMax = Math.max(...data.map(cell => cell.y)) + 1;
  
  const gridWidth = xMax * cellSize;
  const gridHeight = yMax * cellSize;
  
  // Function to get color based on value
  const getColor = useCallback((value: number) => {
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    const colors = defaultColorScales[colorScale as keyof typeof defaultColorScales];
    
    if (normalizedValue <= 0.5) {
      // Interpolate between first and second colors
      const ratio = normalizedValue * 2;
      return interpolateColor(colors[0], colors[1], ratio);
    } else {
      // Interpolate between second and third colors
      const ratio = (normalizedValue - 0.5) * 2;
      return interpolateColor(colors[1], colors[2], ratio);
    }
  }, [minValue, maxValue, colorScale]);
  
  // Helper function to interpolate between two hex colors
  const interpolateColor = (color1: string, color2: string, ratio: number) => {
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    
    const r = Math.round(r1 + ratio * (r2 - r1));
    const g = Math.round(g1 + ratio * (g2 - g1));
    const b = Math.round(b1 + ratio * (b2 - b1));
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Heat Map Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        {showControls && (
          <div className="mb-4 space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="color-scale">Color Scale</Label>
              <Select value={colorScale} onValueChange={setColorScale}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select color scale" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(defaultColorScales).map(scale => (
                    <SelectItem key={scale} value={scale}>{scale}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="cell-size">Cell Size: {cellSize}px</Label>
              </div>
              <Slider 
                id="cell-size"
                min={15} 
                max={50} 
                step={1} 
                value={[cellSize]} 
                onValueChange={(values) => setCellSize(values[0])} 
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="opacity">Opacity: {opacity.toFixed(1)}</Label>
              </div>
              <Slider 
                id="opacity"
                min={0.1} 
                max={1} 
                step={0.1} 
                value={[opacity]} 
                onValueChange={(values) => setOpacity(values[0])} 
              />
            </div>
          </div>
        )}
        
        <div className="relative overflow-auto border rounded-md p-2" style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}>
          <div style={{ width: `${gridWidth}px`, height: `${gridHeight}px`, position: 'relative' }}>
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
                  opacity: opacity,
                  border: '1px solid rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                }}
                title={`Value: ${cell.value.toFixed(2)}`}
              />
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center">
            <div className="text-xs mr-2">Low</div>
            <div className="flex h-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 10,
                    height: 16,
                    backgroundColor: getColor(minValue + ((maxValue - minValue) * i) / 19),
                  }}
                />
              ))}
            </div>
            <div className="text-xs ml-2">High</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatMapComponent;

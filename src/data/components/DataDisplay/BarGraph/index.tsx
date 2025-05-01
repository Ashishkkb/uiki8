
import React from 'react';
import { ComponentItem } from "@/types/component";
import BarGraphComponent from "./BarGraphComponent";

const BarGraphComponentItem: ComponentItem = {
  id: 153,
  name: "Bar Graph",
  category: "Data Display",
  framework: "React",
  description: "A customizable bar graph component for visualizing comparative data.",
  component: BarGraphComponent,
  tags: ["data", "chart", "visualization", "graph", "bar"],
  isNew: true,
  fileSize: "2.3 KB",
  complexity: "medium",
  code: `import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface BarGraphProps {
  data: Array<Record<string, any>>;
  barKeys: string[];
  xAxisKey: string;
  height?: number;
  colors?: string[];
  className?: string;
}

export const BarGraph: React.FC<BarGraphProps> = ({ 
  data, 
  barKeys, 
  xAxisKey, 
  height = 300, 
  colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"],
  className 
}) => {
  // Generate colors for all keys if not enough colors provided
  const barColors = barKeys.map((_, i) => colors[i % colors.length]);
  
  return (
    <div className={className} style={{ width: '100%', height: \`\${height}px\` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {barKeys.map((key, index) => (
            <Bar 
              key={key}
              dataKey={key} 
              fill={barColors[index]} 
              radius={[4, 4, 0, 0]} 
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;`
};

export default BarGraphComponentItem;

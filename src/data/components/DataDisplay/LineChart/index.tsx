
import React from 'react';
import { ComponentItem } from "@/types/component";
import LineChartComponent from "./LineChartComponent";

const LineChartComponentItem: ComponentItem = {
  id: 154,
  name: "Line Chart",
  category: "Data Display",
  framework: "React",
  description: "A responsive line chart for visualizing trends over time or sequences.",
  component: LineChartComponent,
  tags: ["data", "chart", "visualization", "line", "trend"],
  isNew: true,
  fileSize: "2.1 KB",
  complexity: "medium",
  code: `import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: Array<Record<string, any>>;
  lineKeys: string[];
  xAxisKey: string;
  height?: number;
  colors?: string[];
  className?: string;
  strokeWidth?: number;
  showDots?: boolean;
}

export const LineChartComponent: React.FC<LineChartProps> = ({
  data,
  lineKeys,
  xAxisKey,
  height = 300,
  colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"],
  className,
  strokeWidth = 2,
  showDots = true,
}) => {
  // Generate colors for all keys if not enough colors provided
  const lineColors = lineKeys.map((_, i) => colors[i % colors.length]);

  return (
    <div className={className} style={{ width: '100%', height: \`\${height}px\` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {lineKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={lineColors[index]}
              activeDot={{ r: 8 }}
              strokeWidth={strokeWidth}
              dot={showDots}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;`
};

export default LineChartComponentItem;

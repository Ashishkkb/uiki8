
import React from 'react';
import { ComponentItem } from "@/types/component";
import AreaChartComponent from "./AreaChartComponent";

const AreaChartComponentItem: ComponentItem = {
  id: 156,
  name: "Area Chart",
  category: "Data Display",
  framework: "React",
  description: "A filled area chart for visualizing volume and cumulative data over time.",
  component: AreaChartComponent,
  tags: ["data", "chart", "visualization", "area", "volume"],
  isNew: true,
  fileSize: "2.2 KB",
  complexity: "medium",
  code: `import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AreaChartProps {
  data: Array<Record<string, any>>;
  areaKeys: string[];
  xAxisKey: string;
  height?: number;
  colors?: string[];
  className?: string;
  stackAreas?: boolean;
  areaOpacity?: number;
}

export const AreaChartComponent: React.FC<AreaChartProps> = ({
  data,
  areaKeys,
  xAxisKey,
  height = 300,
  colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"],
  className,
  stackAreas = false,
  areaOpacity = 0.5,
}) => {
  // Generate colors for all keys if not enough colors provided
  const areaColors = areaKeys.map((_, i) => colors[i % colors.length]);

  return (
    <div className={className} style={{ width: '100%', height: \`\${height}px\` }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
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
          {areaKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={areaColors[index]}
              fill={areaColors[index]}
              fillOpacity={areaOpacity}
              stackId={stackAreas ? "1" : index.toString()}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;`
};

export default AreaChartComponentItem;

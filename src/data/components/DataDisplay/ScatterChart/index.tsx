
import React from 'react';
import { ComponentItem } from "@/types/component";
import ScatterChartComponent from "./ScatterChartComponent";

const ScatterChartComponentItem: ComponentItem = {
  id: 158,
  name: "Scatter Chart",
  category: "Data Display",
  framework: "React",
  description: "A scatter chart for visualizing the correlation between two variables.",
  component: ScatterChartComponent,
  tags: ["data", "chart", "visualization", "scatter", "correlation"],
  isNew: true,
  fileSize: "2.0 KB",
  complexity: "medium",
  code: `import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis } from 'recharts';

interface ScatterChartProps {
  data: Array<{ [key: string]: any }[]>;
  dataNames: string[];
  xAxisKey: string;
  yAxisKey: string;
  zAxisKey?: string;
  height?: number;
  colors?: string[];
  className?: string;
  dotSize?: number;
  showCartesianGrid?: boolean;
}

export const ScatterChartComponent: React.FC<ScatterChartProps> = ({
  data,
  dataNames,
  xAxisKey,
  yAxisKey,
  zAxisKey,
  height = 300,
  colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"],
  className,
  dotSize = 60,
  showCartesianGrid = true,
}) => {
  return (
    <div className={className} style={{ width: '100%', height: \`\${height}px\` }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" opacity={0.1} />}
          <XAxis dataKey={xAxisKey} type="number" name="x-axis" />
          <YAxis dataKey={yAxisKey} type="number" name="y-axis" />
          {zAxisKey && <ZAxis dataKey={zAxisKey} type="number" range={[50, 1000]} name="z-axis" />}
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          {data.map((scatterData, index) => (
            <Scatter
              key={dataNames[index] || \`scatter-\${index}\`}
              name={dataNames[index] || \`Series \${index + 1}\`}
              data={scatterData}
              fill={colors[index % colors.length]}
              shape="circle"
              legendType="circle"
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterChartComponent;`
};

export default ScatterChartComponentItem;

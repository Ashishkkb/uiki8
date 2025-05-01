
import React from 'react';
import { ComponentItem } from "@/types/component";
import PieChartComponent from "./PieChartComponent";

const PieChartComponentItem: ComponentItem = {
  id: 155,
  name: "Pie Chart",
  category: "Data Display",
  framework: "React",
  description: "A pie chart component for visualizing proportional data and part-to-whole relationships.",
  component: PieChartComponent,
  tags: ["data", "chart", "visualization", "pie", "proportion"],
  isNew: true,
  fileSize: "2.0 KB",
  complexity: "medium",
  code: `import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

interface PieChartProps {
  data: DataItem[];
  colors?: string[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  className?: string;
  showLegend?: boolean;
}

export const PieChartComponent: React.FC<PieChartProps> = ({
  data,
  colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F", "#FFBB28"],
  height = 300,
  innerRadius = 0,
  outerRadius = 80,
  className,
  showLegend = true,
}) => {
  // Generate colors for all data points if not enough colors provided
  const chartColors = data.map((_, i) => colors[i % colors.length]);

  return (
    <div className={className} style={{ width: '100%', height: \`\${height}px\` }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => \`\${name}: \${(percent * 100).toFixed(0)}%\`}
          >
            {data.map((entry, index) => (
              <Cell key={\`cell-\${index}\`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => \`\${value}\`} />
          {showLegend && <Legend layout="vertical" verticalAlign="middle" align="right" />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;`
};

export default PieChartComponentItem;

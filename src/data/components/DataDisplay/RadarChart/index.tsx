
import React from 'react';
import { ComponentItem } from "@/types/component";
import RadarChartComponent from "./RadarChartComponent";

const RadarChartComponentItem: ComponentItem = {
  id: 157,
  name: "Radar Chart",
  category: "Data Display",
  framework: "React",
  description: "A radar chart for visualizing multivariate data across multiple quantitative variables.",
  component: RadarChartComponent,
  tags: ["data", "chart", "visualization", "radar", "multivariate"],
  isNew: true,
  fileSize: "2.1 KB",
  complexity: "medium",
  code: `import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

interface RadarChartProps {
  data: Array<Record<string, any>>;
  dataKey: string;
  nameKey: string;
  height?: number;
  colors?: string[];
  className?: string;
  fillOpacity?: number;
  radarDataKeys: string[];
}

export const RadarChartComponent: React.FC<RadarChartProps> = ({
  data,
  dataKey,
  nameKey,
  height = 300,
  colors = ["#8884d8", "#82ca9d", "#ffc658"],
  className,
  fillOpacity = 0.6,
  radarDataKeys
}) => {
  return (
    <div className={className} style={{ width: '100%', height: \`\${height}px\` }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey={nameKey} />
          <PolarRadiusAxis />
          <Tooltip />
          {radarDataKeys.map((key, index) => (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={fillOpacity}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;`
};

export default RadarChartComponentItem;

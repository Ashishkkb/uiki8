
import React from 'react';
import { ComponentItem } from "@/types/component";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 }
];

const BarChartPreview = () => (
  <ResponsiveContainer width="100%" height="100%">
    <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#6A9D80" />
    </RechartsBarChart>
  </ResponsiveContainer>
);

const BarChartComponent: ComponentItem = {
  id: 72,
  name: "Bar Chart",
  category: "Chart",
  framework: "React",
  description: "A responsive bar chart component for visualizing comparative data",
  code: `import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

type DataItem = {
  name: string;
  [key: string]: string | number;
};

type BarChartProps = {
  data: DataItem[];
  bars: {
    dataKey: string;
    color?: string;
    name?: string;
    stackId?: string;
  }[];
  xAxisDataKey?: string;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  hideGrid?: boolean;
  hideLegend?: boolean;
  hideTooltip?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
  height?: number | string;
  layout?: 'horizontal' | 'vertical';
};

const CustomBarChart = ({
  data,
  bars = [{ dataKey: 'value', color: '#6A9D80' }],
  xAxisDataKey = 'name',
  hideXAxis = false,
  hideYAxis = false,
  hideGrid = false,
  hideLegend = false,
  hideTooltip = false,
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
  height = 300,
  layout = 'horizontal'
}: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={margin}
        layout={layout}
      >
        {!hideGrid && <CartesianGrid strokeDasharray="3 3" />}
        {!hideXAxis && <XAxis dataKey={xAxisDataKey} />}
        {!hideYAxis && <YAxis />}
        {!hideTooltip && <Tooltip />}
        {!hideLegend && <Legend />}
        
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            name={bar.name || bar.dataKey}
            fill={bar.color || \`hsl(\${(index * 60) % 360}, 70%, 60%)\`}
            stackId={bar.stackId}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;`,
  component: BarChartPreview,
  tags: ["chart", "bar", "data", "visualization"],
  fileSize: "1.9 KB",
  price: "0",
  complexity: "medium",
  lastUpdated: "2024-01-05",
  license: "MIT",
  dependencies: ["recharts"]
};

export default BarChartComponent;

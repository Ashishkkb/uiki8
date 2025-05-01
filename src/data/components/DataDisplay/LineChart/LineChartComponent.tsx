
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value1: 400, value2: 240 },
  { name: 'Feb', value1: 300, value2: 139 },
  { name: 'Mar', value1: 200, value2: 980 },
  { name: 'Apr', value1: 278, value2: 390 },
  { name: 'May', value1: 189, value2: 480 },
  { name: 'Jun', value1: 239, value2: 380 },
];

const LineChartComponent = () => {
  return (
    <div className="w-full h-[300px]">
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value1" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="value2" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;

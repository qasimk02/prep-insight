// src/components/Charts/BarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({ data, dataKeys, names }) => {
  console.log(JSON.stringify(data));
  return (
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="test" />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataKeys.map((key, index) => (
          <Bar key={key} dataKey={key} fill={['#0088FE', '#E63946', '#FFBB28'][index]} name={names[index]} />
        ))}
      </BarChart>
  );
};

export default CustomBarChart;
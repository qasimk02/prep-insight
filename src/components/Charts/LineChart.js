import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Dot } from 'recharts';
import styles from './Charts.module.css';

const CustomLineChart = ({ data, dataKey, name }) => {
  const renderDot = (props) => {
    const { cx, cy, payload, index } = props;
  
    if (index === 0) {
      return (
        <>
          <Dot {...props} fill="#8884d8" />
          <text x={cx} y={cy - 5} fontSize={10} textAnchor="middle" fill="#333">
            {payload[dataKey]}
          </text>
        </>
      );
    }
  
    const prevPayload = data[index - 1];
    const currentValue = payload[dataKey];
    const prevValue = prevPayload[dataKey];
  
    let dotColor = "#8884d8"; // Default color
  
    if (dataKey === "score" || dataKey === "correct" || dataKey === "total") {
      dotColor = currentValue > prevValue ? "blue" : "red";
    } else {
      dotColor = currentValue > prevValue ? "red" : "blue";
    }
  
    return (
      <>
        <Dot {...props} fill={dotColor} />
        <text x={cx} y={cy - 5} fontSize={10} textAnchor="middle" fill="#333">
          {currentValue}
        </text>
      </>
    );
  };

  return (
    <div className={styles.chartContainer}>
      <LineChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="test" />
        <YAxis />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#8884d8"
          name={name}
          dot={renderDot}
        />
      </LineChart>
    </div>
  );
};

export default CustomLineChart;
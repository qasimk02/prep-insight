import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Dot } from 'recharts';
import styles from './Charts.module.css';

const CustomLineChart = ({ data, dataKey, name }) => {
  const renderDot = (props) => {
    const { payload, index } = props;
    if (index === 0) {
      return <Dot {...props} fill="#8884d8" />; // Default color for the first point
    }

    const prevPayload = data[index - 1];
    const currentValue = payload[dataKey];
    const prevValue = prevPayload[dataKey];

    let dotColor = '#8884d8'; // Default color

    if (dataKey === 'score' || dataKey === 'correct' || dataKey === 'total') { // Apply logic only for score
      dotColor = currentValue > prevValue ? 'blue' : 'red';
    } else {
      dotColor = currentValue > prevValue ? 'red' : 'blue';
    }

    return <Dot {...props} fill={dotColor} />;
  };

  return (
    <div className={styles.chartContainer}>
      <LineChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="test" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#8884d8"
          name={name}
          dot={renderDot} // Use the custom dot rendering function
        />
      </LineChart>
    </div>
  );
};

export default CustomLineChart;
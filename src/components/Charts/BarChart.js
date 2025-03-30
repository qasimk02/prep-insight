import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LabelList,
} from "recharts";

const CustomBarChart = ({ data, dataKeys, names }) => {
  return (
    <div style={{ width: "100%", overflowX: "auto", paddingBottom: "10px" }}>
      <BarChart
        width={window.innerWidth < 600 ? 400 : 600} // Adjust width dynamically
        height={300}
        data={data}
        margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="test" tick={{ fontSize: 12 }} />
        <YAxis />
        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: "12px",
            paddingTop: "10px",
            overflowX: "auto",
          }}
        />
        {dataKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={["#0088FE", "#E63946", "#FFBB28"][index]}
            name={names[index]}
          >
            {/* Show Y values on bars */}
            <LabelList dataKey={key} position="top" fontSize={12} fill="#000" />
          </Bar>
        ))}
      </BarChart>
    </div>
  );
};

export default CustomBarChart;

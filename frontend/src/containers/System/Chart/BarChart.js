import React from "react";
import "./BarChart.scss";
import { PieChart, Pie, Tooltip } from "recharts";

const App = () => {
  const data = [
    { name: "Tổng số bác sĩ đã được đặt lịch", users: 4 },
    { name: "Tổng số bệnh nhân đã đặt lịch", users: 20 },

    { name: "Tổng số lần bị hủy lịch", users: 6 },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h1>BIỂU ĐỒ THỐNG KÊ THEO THÁNG</h1>
      <div className="App">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default App;

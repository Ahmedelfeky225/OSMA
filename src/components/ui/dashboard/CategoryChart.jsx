"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Electronics", value: 35, color: "#11cad3" },
  { name: "Clothing", value: 25, color: "#0ea5e9" },
  { name: "Books", value: 20, color: "#8b5cf6" },
  { name: "Home", value: 20, color: "#f59e0b" },
];

export default function CategoryChart() {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

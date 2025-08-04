"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";

const data = [
  { name: "Jan", revenue: 2400, profit: 1400 },
  { name: "Feb", revenue: 3600, profit: 2100 },
  { name: "Mar", revenue: 4800, profit: 2800 },
  { name: "Apr", revenue: 3000, profit: 1800 },
  { name: "May", revenue: 5400, profit: 3200 },
  { name: "Jun", revenue: 4500, profit: 2700 },
];

export default function SalesChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            className="text-xs"
          />
          <YAxis axisLine={false} tickLine={false} className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Bar dataKey="revenue" fill="#11cad3" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { name: "يناير", sales: 400, revenue: 2400 },
  { name: "فبراير", sales: 600, revenue: 3600 },
  { name: "مارس", sales: 800, revenue: 4800 },
  { name: "أبريل", sales: 500, revenue: 3000 },
  { name: "مايو", sales: 900, revenue: 5400 },
  { name: "يونيو", sales: 750, revenue: 4500 },
];

export default function Chart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1c283b" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1c283b" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            className="opacity-20"
            stroke="#1c283b"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            className="text-xs"
            tick={{ fill: "#1c283b", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            className="text-xs"
            tick={{ fill: "#1c283b", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #1c283b20",
              borderRadius: "12px",
              boxShadow:
                "0 10px 25px -5px rgba(28, 40, 59, 0.1), 0 10px 10px -5px rgba(28, 40, 59, 0.04)",
              backdropFilter: "blur(10px)",
            }}
            labelStyle={{ color: "#1c283b", fontWeight: "600" }}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#1c283b"
            strokeWidth={3}
            fill="url(#colorSales)"
            dot={{ fill: "#1c283b", strokeWidth: 2, r: 4 }}
            activeDot={{
              r: 6,
              fill: "#1c283b",
              strokeWidth: 2,
              stroke: "#fff",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

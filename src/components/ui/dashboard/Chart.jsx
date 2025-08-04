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
              <stop
                offset="5%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="sales"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            fill="url(#colorSales)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

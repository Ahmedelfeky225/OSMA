"use client";

import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Grid3X3,
} from "lucide-react";

const iconMap = {
  users: Users,
  products: Package,
  sales: DollarSign,
  categories: Grid3X3,
};

export default function StatsCard({ title, value, change, trend, icon }) {
  const Icon = iconMap[icon] || Package;
  const isPositive = trend === "up";

  return (
    <div className="relative overflow-hidden bg-card backdrop-blur-sm rounded-xl shadow-sm border border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {title}
            </p>
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-bold tracking-tight text-card-foreground">
                {value}
              </h3>
              {change && (
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 ${
                    isPositive
                      ? "bg-[#7a99c0] text-accent border border-accent/20"
                      : "bg-destructive/10 text-destructive border border-destructive/20"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {change}
                </span>
              )}
            </div>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-125 transition-transform duration-500" />
      </div>
    </div>
  );
}

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
    <div className="relative overflow-hidden bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
              {change && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    isPositive
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
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
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#11cad3]/10">
            <Icon className="h-6 w-6 text-[#11cad3]" />
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#11cad3]/5 to-transparent opacity-50 -z-50" />
      </div>
    </div>
  );
}

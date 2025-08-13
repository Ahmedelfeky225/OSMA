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
    <div className="relative overflow-hidden bg-white/80 dark:bg-[#1c283b]/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#7a99c0]/80 dark:text-[#7a99c0]/80 uppercase tracking-wide">
              {title}
            </p>
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-bold tracking-tight text-[#7a99c0] dark:text-[#7a99c0]">
                {value}
              </h3>
              {change && (
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                    isPositive
                      ? "bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 text-green-800 dark:text-green-300"
                      : "bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 text-red-800 dark:text-red-300"
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
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1c283b]/10 to-[#2d3748]/10 dark:from-[#1c283b]/20 dark:to-[#2d3748]/20 group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-7 w-7 text-[#7a99c0] dark:text-[#7a99c0]" />
          </div>
        </div>

        {/* Enhanced decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c283b]/5 via-transparent to-[#2d3748]/5 opacity-60 group-hover:opacity-80 transition-opacity duration-300 -z-10" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#1c283b]/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform duration-500" />
      </div>
    </div>
  );
}

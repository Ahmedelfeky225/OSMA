"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BarChart3, TrendingUp, Users, ShoppingBag } from "lucide-react";
import Sidebar from "@/components/ui/dashboard/Sidebar";
import Navbar from "@/components/ui/dashboard/Navbar";
import StatsCard from "@/components/ui/dashboard/StatsCard";
import Chart from "@/components/ui/dashboard/Chart";
import SalesChart from "@/components/ui/dashboard/SalesChart";
import CategoryChart from "@/components/ui/dashboard/CategoryChart";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = useTranslations("dashboard");

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto py-6 px-3 space-y-6">
          {/* Welcome Section */}
          <div className="flex flex-col gap-2">
            <h1 className="md:text-3xl text-lg font-bold tracking-tight">
              {t("welcome")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{t("overview")}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title={t("stats.users")}
              value="230"
              change="+12%"
              trend="up"
              icon="users"
            />
            <StatsCard
              title={t("stats.products")}
              value="120"
              change="+5%"
              trend="up"
              icon="products"
            />
            <StatsCard
              title={t("stats.sales")}
              value="$15,430"
              change="+23%"
              trend="up"
              icon="sales"
            />
            <StatsCard
              title={t("stats.categories")}
              value="12"
              change="+2%"
              trend="up"
              icon="categories"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-xl font-semibold leading-none tracking-tight flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#11cad3]" />
                  {t("charts.salesAnalysis")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("charts.salesDescription")}
                </p>
              </div>
              <div className="p-6 pt-0">
                <Chart />
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-xl font-semibold leading-none tracking-tight flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#11cad3]" />
                  {t("charts.revenueAnalysis")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("charts.revenueDescription")}
                </p>
              </div>
              <div className="p-6 pt-0">
                <SalesChart />
              </div>
            </div>
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Category Distribution */}
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-xl font-semibold leading-none tracking-tight flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-[#11cad3]" />
                  {t("charts.categoryDistribution")}
                </h3>
              </div>
              <div className="p-6 pt-0">
                <CategoryChart />
              </div>
            </div>

            {/* User Growth */}
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-xl font-semibold leading-none tracking-tight flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#11cad3]" />
                  {t("charts.userGrowth")}
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  {t("charts.comingSoon")}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-xl font-semibold leading-none tracking-tight">
                  {t("recentActivity.title")}
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="w-2 h-2 bg-[#11cad3] rounded-full"></div>
                    <p className="text-sm">{t("recentActivity.newUser")}</p>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">{t("recentActivity.newProduct")}</p>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm">{t("recentActivity.newOrder")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

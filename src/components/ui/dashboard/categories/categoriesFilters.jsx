"use client";

import { useState } from "react";
import { Search, X, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoriesFilters({ onFiltersChange, locale, t }) {
  const [filters, setFilters] = useState({
    search: "",
    status: "all", // all, active, inactive
    sortBy: "createdAt", // createdAt, name, productsCount
    sortOrder: "desc", // asc, desc
  });

  const isRTL = locale === "ar";

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      search: "",
      status: "all",
      sortBy: "createdAt",
      sortOrder: "desc",
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters =
    filters.search ||
    filters.status !== "all" ||
    filters.sortBy !== "createdAt";

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search
              className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 ${
                isRTL ? "right-3" : "left-3"
              }`}
            />
            <input
              type="text"
              placeholder={t("filters.searchPlaceholder")}
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className={`w-full ${
                isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
              } py-3 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 transition-all duration-200`}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="lg:w-48">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 transition-all duration-200 ${
              isRTL ? "text-right" : "text-left"
            }`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <option value="all">{t("filters.allStatuses")}</option>
            <option value="active">{t("filters.active")}</option>
            <option value="inactive">{t("filters.inactive")}</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="lg:w-48">
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 transition-all duration-200 ${
              isRTL ? "text-right" : "text-left"
            }`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <option value="createdAt">{t("filters.sortByDate")}</option>
            <option value="name">{t("filters.sortByName")}</option>
            <option value="productsCount">{t("filters.sortByProducts")}</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="lg:w-32">
          <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 transition-all duration-200 ${
              isRTL ? "text-right" : "text-left"
            }`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <option value="desc">{t("filters.descending")}</option>
            <option value="asc">{t("filters.ascending")}</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="lg:w-auto flex items-center gap-2 rounded-sm bg-transparent"
          >
            <X className="h-4 w-4" />
            {t("filters.clear")}
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              <Search className="h-3 w-3" />
              {filters.search}
            </span>
          )}
          {filters.status !== "all" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
              {filters.status === "active" ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <XCircle className="h-3 w-3" />
              )}
              {t(`filters.${filters.status}`)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

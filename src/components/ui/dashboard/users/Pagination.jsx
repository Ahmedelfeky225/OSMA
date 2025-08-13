"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/router";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const generatePageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push("ellipsis-start");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 3) {
        pages.push("ellipsis-end");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const handlePageClick = (page) => {
    if (page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-xl">
      {/* Page Info */}
      <div className="flex items-center">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("pagination.page")} {currentPage} {t("pagination.of")}{" "}
            {totalPages}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
          className={`group flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            currentPage === 1 || isLoading
              ? "text-gray-400 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500"
              : "text-gray-600 bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-500 dark:hover:text-blue-400 shadow-sm hover:shadow-md"
          }`}
          aria-label={t("pagination.previous")}
        >
          {isRTL ? (
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          ) : (
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          )}
          <span className="hidden sm:inline">{t("pagination.previous")}</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-3">
          {pageNumbers.map((page, index) => {
            if (typeof page === "string" && page.includes("ellipsis")) {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex items-center justify-center w-10 h-10 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              );
            }

            const isCurrentPage = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                disabled={isLoading}
                className={`relative w-10 h-10 text-sm font-semibold rounded-lg transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
                  isCurrentPage
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20"
                    : "text-gray-600 bg-white border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-500 dark:hover:text-blue-400 shadow-sm hover:shadow-md"
                }`}
                aria-label={`${t("pagination.goToPage")} ${page}`}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {page}
                {isCurrentPage && (
                  <div className="absolute inset-0 rounded-lg bg-white/20 animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || isLoading}
          className={`group flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            currentPage === totalPages || isLoading
              ? "text-gray-400 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500"
              : "text-gray-600 bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-500 dark:hover:text-blue-400 shadow-sm hover:shadow-md"
          }`}
          aria-label={t("pagination.next")}
        >
          <span className="hidden sm:inline">{t("pagination.next")}</span>
          {isRTL ? (
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          ) : (
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {locale === "ar" ? "جاري التحميل..." : "Loading..."}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useCallback, useTransition } from "react";

const Paginator = ({ paginate }) => {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = paginate?.currentPage || 1;
  const lastPage = paginate?.totalPages || 1;

  // ✅ استخدام useTransition لإدارة حالة التحميل
  const [isPending, startTransition] = useTransition();

  const navigateToPage = useCallback(
    (page) => {
      if (page < 1 || page > lastPage || page === currentPage) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());

      const newUrl = `${pathname}?${params.toString()}`;

      // ✅ استخدام startTransition لتحسين الأداء
      startTransition(() => {
        router.push(newUrl);
      });
    },
    [searchParams, router, pathname, lastPage, currentPage]
  );

  const getPages = () => {
    const pages = [];
    const maxVisiblePages = 6;

    if (lastPage <= maxVisiblePages) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(lastPage);
      } else if (currentPage >= lastPage - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = lastPage - 3; i <= lastPage; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(lastPage);
      }
    }

    return pages;
  };

  const pages = getPages();

  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      navigateToPage(currentPage - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage < lastPage) {
      navigateToPage(currentPage + 1);
    }
  };

  const handlePageClick = (e, page) => {
    e.preventDefault();
    if (typeof page === "number") {
      navigateToPage(page);
    }
  };

  return (
    <section className="py-8 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* ✅ إضافة Loading State */}
        {isPending && (
          <div className="flex items-center justify-center gap-0.5 py-4">
            <span className="ml-2 text-sm text-slate-600 dark:text-gray-400">
              {locale === "ar" ? " جاري التحميل..." : "loading..."}
            </span>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#7a99c0]"></div>
          </div>
        )}

        {/* Mobile Pagination */}
        <div className="flex justify-between items-center sm:hidden gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1 || isPending}
            className={`group  flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
              currentPage === 1 || isPending
                ? "bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed"
                : "bg-white cursor-pointer dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-[#7a99c0] hover:text-white shadow-lg hover:shadow-xl border border-slate-200 dark:border-gray-600"
            }`}
          >
            {locale === "en" ? (
              <ChevronLeftIcon className="w-4 h-4" />
            ) : (
              <ChevronRightIcon className="w-4 h-4" />
            )}
            <span>{locale === "en" ? "Previous" : "السابق"}</span>
          </button>

          {/* Current Page Info */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] text-white rounded-xl shadow-lg">
            <span className="text-sm font-medium">
              {currentPage} {locale === "en" ? "of" : "من"} {lastPage}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === lastPage || isPending}
            className={`group  flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
              currentPage === lastPage || isPending
                ? "bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed"
                : "bg-white cursor-pointer dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-[#7a99c0] hover:text-white shadow-lg hover:shadow-xl border border-slate-200 dark:border-gray-600"
            }`}
          >
            <span>{locale === "en" ? "Next" : "التالي"}</span>
            {locale === "en" ? (
              <ChevronRightIcon className="w-4 h-4" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Desktop Pagination */}
        <div className="hidden sm:flex items-center justify-center">
          <nav className="flex items-center gap-2" aria-label="Pagination">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1 || isPending}
              className={`group flex items-center justify-center w-12 h-12 rounded-xl font-medium transition-all duration-300 ${
                currentPage === 1 || isPending
                  ? "bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white cursor-pointer  dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-[#7a99c0] hover:text-white shadow-lg hover:shadow-xl border border-slate-200 dark:border-gray-600 hover:-translate-y-1"
              }`}
            >
              <span className="sr-only">
                {locale === "en" ? "Previous" : "السابق"}
              </span>
              {locale === "en" ? (
                <ChevronLeftIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>

            {/* Page Numbers */}
            {pages.map((page, i) =>
              page === "..." ? (
                <div
                  key={i}
                  className="flex items-center justify-center w-12 h-12 text-slate-500 dark:text-gray-400 font-bold"
                >
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-slate-400 dark:bg-gray-500 rounded-full animate-pulse delay-100"></div>
                    <div className="w-1 h-1 bg-slate-400 dark:bg-gray-500 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              ) : (
                <button
                  key={i}
                  onClick={(e) => handlePageClick(e, page)}
                  disabled={isPending}
                  className={`group relative flex items-center justify-center w-12 h-12 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    page === currentPage
                      ? "bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] text-white shadow-lg transform scale-110 border-2 border-white dark:border-gray-800"
                      : isPending
                      ? "bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed"
                      : "bg-white cursor-pointer dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-[#7a99c0] hover:text-white shadow-lg hover:shadow-xl border border-slate-200 dark:border-gray-600 hover:-translate-y-1 hover:scale-105"
                  }`}
                >
                  {page}
                  {page === currentPage && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7a99c0]/20 to-[#5a7ba0]/20 animate-pulse"></div>
                  )}
                </button>
              )
            )}

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentPage === lastPage || isPending}
              className={`group flex  items-center justify-center w-12 h-12 rounded-xl font-medium transition-all duration-300 ${
                currentPage === lastPage || isPending
                  ? "bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white cursor-pointer dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-[#7a99c0] hover:text-white shadow-lg hover:shadow-xl border border-slate-200 dark:border-gray-600 hover:-translate-y-1"
              }`}
            >
              <span className="sr-only">
                {locale === "en" ? "Next" : "التالي"}
              </span>
              {locale === "en" ? (
                <ChevronRightIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <ChevronLeftIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </nav>
        </div>

        {/* Page Info */}
        <div className="hidden sm:flex items-center justify-center mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-slate-200 dark:border-gray-600">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0]"></div>
            <span className="text-sm text-slate-600 dark:text-gray-400">
              {locale === "en"
                ? `Page ${currentPage} of ${lastPage} • ${
                    paginate?.total || 0
                  } total items`
                : `الصفحة ${currentPage} من ${lastPage} • ${
                    paginate?.total || 0
                  } عنصر إجمالي`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Paginator;

"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations, useLocale } from "next-intl";
import { Plus, Search, Grid, List, Loader2 } from "lucide-react";
import {
  fetchCategories,
  deleteCategory,
  clearState,
} from "@/store/categories/categories";
import CategoriesTable from "@/components/ui/dashboard/categories/categoriesTable";
import toast from "react-hot-toast";
import Navbar from "@/components/ui/dashboard/Navbar";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const locale = useLocale();
  const t = useTranslations("categories");
  const tCommon = useTranslations("common");
  const { categories, isLoading, error, message, pagination } = useSelector(
    (state) => state.categories
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    category: null,
  });

  const isRTL = locale === "ar";

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message, {
        duration: 4000,
        style: { background: "var(--primary-color)", color: "white" },
      });
      dispatch(clearState());
    }
    if (error) {
      toast.error(error, {
        duration: 4000,
        style: { background: "#EF4444", color: "white" },
      });
      dispatch(clearState());
    }
  }, [message, error, dispatch]);

  const handleDelete = async (category) => {
    setDeleteDialog({ open: true, category });
  };

  const confirmDelete = async () => {
    if (deleteDialog.category) {
      await dispatch(deleteCategory(deleteDialog.category._id));
      setDeleteDialog({ open: false, category: null });
    }
  };

  const handleEdit = (categoryId) => {
    window.location.href = `/admin/categories/edit/${categoryId}`;
  };

  const filteredCategories = categories.filter((category) => {
    const searchLower = searchTerm.toLowerCase();
    const nameAr = category.translations?.ar?.name?.toLowerCase() || "";
    const nameEn = category.translations?.en?.name?.toLowerCase() || "";
    const slug = category.slug?.toLowerCase() || "";
    return (
      nameAr.includes(searchLower) ||
      nameEn.includes(searchLower) ||
      slug.includes(searchLower)
    );
  });

  const getCategoryName = (category) => {
    return locale === "ar"
      ? category.translations?.ar?.name
      : category.translations?.en?.name;
  };

  if (isLoading && categories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600 dark:text-gray-300">
            {tCommon("loading")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />{" "}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 md:py-8">
        <div className="sm:max-w-[90%] max-w-[95%] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {t("title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
                {t("description")}
              </p>
            </div>
            <button
              onClick={() =>
                (window.location.href = "/admin/categories/create")
              }
              className="px-4 sm:px-6 py-2 sm:py-3 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-sm transform hover:scale-105 min-w-fit"
              style={{
                background:
                  "linear-gradient(to right, var(--primary-color), #3B82F6)",
              }}
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">{t("addCategory")}</span>
              <span className="sm:hidden">{tCommon("add")}</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t("totalCategories")}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {categories.length}
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Grid className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 mb-6 sm:mb-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              <div className="flex-1 max-w-full lg:max-w-md">
                <div className="relative">
                  <Search
                    className={`absolute ${
                      isRTL ? "right-3" : "left-3"
                    } top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5`}
                  />
                  <input
                    type="text"
                    placeholder={t("searchPlaceholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full ${
                      isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                    } py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm sm:text-base transition-all duration-200`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-end">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 sm:p-3 rounded-lg transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  title={t("tableView")}
                >
                  <List className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 sm:p-3 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  title={t("gridView")}
                >
                  <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories Table */}
          {viewMode === "table" && (
            <CategoriesTable
              categories={filteredCategories}
              onEdit={handleEdit}
              onDelete={handleDelete}
              locale={locale}
              t={t}
            />
          )}

          {/* Delete Confirmation Dialog */}
          {deleteDialog.open && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-4 sm:p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t("confirmDelete")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base leading-relaxed">
                  {t("deleteConfirmMessage", {
                    name: getCategoryName(deleteDialog.category),
                  })}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() =>
                      setDeleteDialog({ open: false, category: null })
                    }
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 order-2 sm:order-1"
                  >
                    {tCommon("cancel")}
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 hover:shadow-sm transform hover:scale-105 order-1 sm:order-2"
                  >
                    {tCommon("delete")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

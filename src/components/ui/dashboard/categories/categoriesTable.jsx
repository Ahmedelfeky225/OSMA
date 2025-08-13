"use client";
import { Edit, Trash2, Calendar, Hash } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
  locale,
}) {
  // <CHANGE> Using next-intl for translations instead of prop
  const t = useTranslations("categories");

  const getCategoryName = (category) => {
    return locale === "ar"
      ? category.translations?.ar?.name
      : category.translations?.en?.name;
  };

  const getSecondaryName = (category) => {
    return locale === "ar"
      ? category.translations?.en?.name
      : category.translations?.ar?.name;
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Hash className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t("noCategories")}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            {t("noCategoriesDescription")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200/50 dark:border-gray-600/50">
              <th className="px-6 py-4 text-right">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Hash className="w-4 h-4" />
                  {t("categoryName")}
                </div>
              </th>
              <th className="px-6 py-4 text-right">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {t("slug")}
                </div>
              </th>
              <th className="px-6 py-4 text-right">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  {/* <CHANGE> Using translation for creation date */}
                  {t("createdAt")}
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {t("actions")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {categories.map((category, index) => (
              <tr
                key={category._id}
                className="group bg-white/50 dark:bg-slate-800/50 hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-all duration-200 ease-in-out"
              >
                <td className="px-6 py-5">
                  <div className="space-y-1">
                    <div className="font-semibold text-gray-900 dark:text-white text-base leading-tight">
                      {getCategoryName(category)}
                    </div>
                    {getSecondaryName(category) && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {getSecondaryName(category)}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {category.slug}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {/* <CHANGE> Using locale-specific date formatting */}
                    {new Date(category.createdAt).toLocaleDateString(
                      locale === "ar" ? "ar-EG" : "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onEdit(category._id)}
                      className="group/btn relative p-2.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                      title={t("edit")}
                    >
                      <Edit className="h-4 w-4" />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        {t("edit")}
                      </div>
                    </button>
                    <button
                      onClick={() => onDelete(category)}
                      className="group/btn relative p-2.5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                      title={t("delete")}
                    >
                      <Trash2 className="h-4 w-4" />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        {t("delete")}
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

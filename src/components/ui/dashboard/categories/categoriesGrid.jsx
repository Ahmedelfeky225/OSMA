"use client";

import { Edit, Trash2, CheckCircle, XCircle, Package, Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CategoriesGrid({
  categories,
  onEdit,
  onDelete,
  locale,
  t,
}) {
  const isRTL = locale === "ar";

  const getCategoryName = (category) => {
    return locale === "ar"
      ? category.translations?.ar?.name || category.name
      : category.translations?.en?.name || category.name;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 flex-grow">
      {categories.map((category) => (
        <Card
          key={category._id}
          className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <CardHeader className="p-6 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-gray-500 rounded-full flex items-center justify-center">
              <Tag className="h-8 w-8 text-white" />
            </div>

            <h3
              className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {getCategoryName(category)}
            </h3>

            <code className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-sm font-mono text-gray-700 dark:text-gray-300">
              {category.slug}
            </code>
          </CardHeader>

          <CardContent className="p-6 flex-grow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("grid.status")}:
                </span>
                {category.isActive ? (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {t("grid.active")}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                    <XCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {t("grid.inactive")}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("grid.products")}:
                </span>
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <Package className="h-4 w-4" />
                  <span className="text-lg font-bold">
                    {category.productsCount || 0}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {t("grid.createdAt")}:{" "}
                  {new Date(category.createdAt).toLocaleDateString(locale)}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(category._id)}
              className="flex-1 rounded-lg border-gray-300 hover:border-blue-500 transition-colors"
            >
              <Edit className="h-4 w-4 mr-2" /> {t("grid.edit")}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(category)}
              className="flex-1 rounded-lg"
              style={{
                background: "linear-gradient(to right, #ef4444, #dc2626)",
                border: "none",
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" /> {t("grid.delete")}
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
              <Tag className="h-10 w-10 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t("grid.noCategories")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t("grid.noCategoriesDescription")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

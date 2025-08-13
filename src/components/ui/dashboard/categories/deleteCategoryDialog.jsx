"use client";
import { AlertTriangle, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DeleteCategoryDialog({
  category,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  locale,
  t,
}) {
  const isRTL = locale === "ar";

  const getCategoryName = (category) => {
    if (!category) return "";
    return locale === "ar"
      ? category.translations?.ar?.name || category.name
      : category.translations?.en?.name || category.name;
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md" dir={isRTL ? "rtl" : "ltr"}>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            {t("deleteDialog.title")}
          </AlertDialogTitle>
          <AlertDialogDescription
            className={isRTL ? "text-right" : "text-left"}
          >
            {t("deleteDialog.description")}
            {category && (
              <span className="font-semibold text-gray-900 dark:text-white">
                "{getCategoryName(category)}"
              </span>
            )}
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>

        {category?.productsCount > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-sm p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className={isRTL ? "text-right" : "text-left"}>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  {t("deleteDialog.warning")}
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                  {t("deleteDialog.productsWarning", {
                    count: category.productsCount,
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-sm"
          >
            {t("deleteDialog.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(category)}
            disabled={isDeleting}
            className="rounded-sm bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {t("deleteDialog.deleting")}
              </>
            ) : (
              t("deleteDialog.confirm")
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

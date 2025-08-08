import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Assuming shadcn/ui AlertDialog
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button

export default function DeleteProductDialog({
  isOpen,
  onClose,
  onConfirm,
  productName,
  isRTL,
  t,
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-sm" dir={isRTL ? "rtl" : "ltr"}>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteDialog.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteDialog.description", { productName })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" className="rounded-sm" onClick={onClose}>
              {t("deleteDialog.cancel")}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="rounded-sm"
              onClick={onConfirm}
            >
              {t("deleteDialog.confirm")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

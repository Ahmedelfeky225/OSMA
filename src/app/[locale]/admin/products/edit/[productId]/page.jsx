"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

import { fetchSingleProduct, clearState } from "@/store/products"; // تم تغيير fetchProductById إلى fetchSingleProduct
import ProductForm from "@/components/ui/dashboard/products/productForm"; // Adjust path if needed

export default function EditProductPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const t = useTranslations("products"); // Assuming 'products' namespace for form translations
  const { currentProduct, isLoading, error, message } = useSelector(
    (state) => state.products
  ); // تم تغيير selectedProduct إلى currentProduct

  const productId = params.productId;

  useEffect(() => {
    if (productId) {
      dispatch(fetchSingleProduct(productId)); // تم تغيير fetchProductById إلى fetchSingleProduct
    }
    // Clear state when component unmounts or productId changes
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, productId]);

  if (isLoading && !currentProduct) {
    // تم تغيير selectedProduct إلى currentProduct
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-red-500 text-lg">
        <p>{t("errorFetchingProduct")}</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!currentProduct && !isLoading) {
    // تم تغيير selectedProduct إلى currentProduct
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-500 text-lg">
        <p>{t("productNotFound")}</p>
      </div>
    );
  }

  return (
    <ProductForm initialData={currentProduct} /> // تم تغيير selectedProduct إلى currentProduct
  );
}

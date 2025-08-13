"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import toast from "react-hot-toast";
import { Package, Table, LayoutGrid, PlusCircle, Loader2 } from "lucide-react";

import {
  fetchProducts,
  deleteProduct,
  setFilters,
  clearState,
} from "@/store/products";
import { fetchCategories } from "@/store/categories";
import ProductsTable from "@/components/ui/dashboard/products/productsTable";
import ProductsGrid from "@/components/ui/dashboard/products/productsGrid";
import ProductFilters from "@/components/ui/dashboard/products/productFilters";
import PaginationControls from "@/components/ui/dashboard/products/paginationControls";
import DeleteProductDialog from "@/components/ui/dashboard/products/deleteProductDialog";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Bu
import Navbar from "@/components/ui/dashboard/Navbar";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("productsPage"); // New translation namespace
  const tCommon = useTranslations("common"); // Common translations like "Add New"

  const { products, isLoading, error, message, pagination, filters } =
    useSelector((state) => state.products);
  const { categories, isLoading: categoriesLoading } = useSelector(
    (state) => state.categories
  );

  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadProducts = useCallback(() => {
    dispatch(fetchProducts({ ...filters, page: pagination.currentPage }));
  }, [dispatch, filters, pagination.currentPage]);

  useEffect(() => {
    loadProducts();
    dispatch(fetchCategories());
  }, [loadProducts, dispatch]);

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

  const handleFilterChange = useCallback(
    (newFilters) => {
      dispatch(setFilters({ ...filters, ...newFilters }));
      dispatch(fetchProducts({ ...filters, ...newFilters, page: 1 }));
    },
    [dispatch, filters]
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setFilters({ ...filters, page }));
      dispatch(fetchProducts({ ...filters, page }));
    },
    [dispatch, filters]
  );

  const handleEdit = (productId) => {
    router.push(`/admin/products/edit/${productId}`);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await dispatch(deleteProduct(productToDelete._id));
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
      loadProducts();
    }
  };

  const isRTL = locale === "ar";

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />{" "}
      <div className="w-[90%] max-w-[90%] mx-auto px-6 py-8 flex flex-col flex-grow">
        {/* Added flex-grow here */}
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className={isRTL ? "text-right" : "text-left"}>
              <h1
                className="text-3xl font-bold tracking-tight flex items-center gap-3"
                style={{ color: "var(--primary-color)" }}
              >
                <Package className="h-8 w-8" />
                {t("manageProducts")}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                {t("manageProductsDescription")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push("/admin/products/create")}
              className="flex items-center gap-2 px-6 py-3 rounded-sm text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              style={{
                background: `linear-gradient(to right, var(--primary-color), #3B82F6)`,
              }}
            >
              <PlusCircle className="h-4 w-4" />
              {tCommon("addNew")}
            </Button>
          </div>
        </div>
        {/* Filters and View Toggle */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
            categoriesLoading={categoriesLoading}
            isRTL={isRTL}
            t={t}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("table")}
              className={`rounded-sm ${
                viewMode === "table" ? "bg-gray-200 dark:bg-gray-700" : ""
              }`}
            >
              <Table className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={`rounded-sm ${
                viewMode === "grid" ? "bg-gray-200 dark:bg-gray-700" : ""
              }`}
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {/* Products Display */}
        {isLoading && (
          <div className="flex justify-center items-center h-64 flex-grow">
            {" "}
            {/* Added flex-grow */}
            <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
          </div>
        )}
        {!isLoading && products.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 text-lg py-10 flex-grow">
            {" "}
            {/* Added flex-grow */}
            {t("noProductsFound")}
          </div>
        )}
        {!isLoading && products.length > 0 && (
          <>
            {viewMode === "table" ? (
              <ProductsTable
                products={products}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                locale={locale}
                t={t}
              />
            ) : (
              <ProductsGrid
                products={products}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                locale={locale}
                t={t}
              />
            )}

            <PaginationControls
              pagination={pagination}
              onPageChange={handlePageChange}
              isRTL={isRTL}
              t={t}
            />
          </>
        )}
        <DeleteProductDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          productName={
            productToDelete?.translations?.[locale]?.name ||
            productToDelete?.translations?.en?.name ||
            ""
          }
          isRTL={isRTL}
          t={t}
        />
      </div>
    </div>
  );
}

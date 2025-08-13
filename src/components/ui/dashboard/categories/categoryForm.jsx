"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import {
  createCategory,
  updateCategory,
  fetchSingleCategory,
  clearCurrentCategory,
} from "@/store/categories/categories";

export default function CategoryForm({ categoryId = null }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations();

  const { currentCategory, isLoading, error } = useSelector(
    (state) => state.categories
  );

  const [activeTab, setActiveTab] = useState("ar");
  const [formData, setFormData] = useState({
    ar: { name: "" },
    en: { name: "" },
    slug: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSingleCategory(categoryId));
    } else {
      dispatch(clearCurrentCategory());
    }

    return () => {
      dispatch(clearCurrentCategory());
    };
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (currentCategory && categoryId) {
      setFormData({
        ar: { name: currentCategory.translations?.ar?.name || "" },
        en: { name: currentCategory.translations?.en?.name || "" },
        slug: currentCategory.slug || "",
      });
    }
  }, [currentCategory, categoryId]);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "ar_name") {
      setFormData((prev) => ({
        ...prev,
        ar: { name: value },
      }));
    } else if (name === "en_name") {
      setFormData((prev) => ({
        ...prev,
        en: { name: value },
        slug: generateSlug(value), // Auto-generate slug from English name
      }));
    } else if (name === "slug") {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }

    // Clear errors
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ar.name.trim()) {
      newErrors.ar_name = t("forms.required");
    }
    if (!formData.en.name.trim()) {
      newErrors.en_name = t("forms.required");
    }
    if (!formData.slug.trim()) {
      newErrors.slug = t("forms.required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const categoryData = {
        ar: { name: formData.ar.name.trim() },
        en: { name: formData.en.name.trim() },
        slug: formData.slug.trim(),
      };

      if (categoryId) {
        await dispatch(
          updateCategory({ categoryId: categoryId, categoryData })
        ).unwrap();
      } else {
        await dispatch(createCategory(categoryData)).unwrap();
      }

      router.push("/admin/categories");
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  if (isLoading && categoryId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Use gradient for spinner loading */}
          <div
            className="w-8 h-8 border-4 border-transparent rounded-full animate-spin"
            style={{
              background:
                "linear-gradient(to right, var(--primary-color), #3B82F6)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 4px), white 0)",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), white 0)",
            }}
          ></div>
          <p className="text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div
          className="rounded-xl shadow-xl p-8 border border-gray-700"
          style={{ backgroundColor: "#1c283b" }}
        >
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            {categoryId
              ? t("categories.editCategory")
              : t("categories.addCategory")}
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2 mb-8 p-1 bg-gray-700 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab("ar")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "ar"
                    ? "bg-gray-600 text-white shadow-sm"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Languages className="h-4 w-4 inline mr-2" />
                العربية
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "en"
                    ? "bg-gray-600 text-white shadow-sm"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Languages className="h-4 w-4 inline mr-2" />
                English
              </button>
            </div>

            {activeTab === "ar" && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t("categories.categoryName")} ({t("forms.arabicContent")})
                </label>
                <input
                  type="text"
                  name="ar_name"
                  value={formData.ar.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-white ${
                    errors.ar_name ? "border-red-500" : "border-gray-600"
                  }`}
                  placeholder={t("categories.categoryName")}
                  dir="rtl"
                />
                {errors.ar_name && (
                  <p className="mt-1 text-sm text-red-400">{errors.ar_name}</p>
                )}
              </div>
            )}

            {activeTab === "en" && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t("categories.categoryName")} ({t("forms.englishContent")})
                </label>
                <input
                  type="text"
                  name="en_name"
                  value={formData.en.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-white ${
                    errors.en_name ? "border-red-500" : "border-gray-600"
                  }`}
                  placeholder={t("categories.categoryName")}
                />
                {errors.en_name && (
                  <p className="mt-1 text-sm text-red-400">{errors.en_name}</p>
                )}
              </div>
            )}

            {/* Slug - always visible */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                {t("categories.slug")}
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-white ${
                  errors.slug ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="category-slug"
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-400">{errors.slug}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-8">
              {/* Use gradient for submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background:
                    "linear-gradient(to right, var(--primary-color), #3B82F6)",
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    {/* Use gradient for button spinner */}
                    <div
                      className="w-4 h-4 border-2 border-transparent rounded-full animate-spin"
                      style={{
                        background:
                          "linear-gradient(to right, white, rgba(255,255,255,0.5))",
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent calc(100% - 2px), white 0)",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), white 0)",
                      }}
                    ></div>
                    {t("common.loading")}
                  </div>
                ) : categoryId ? (
                  t("categories.updateCategory")
                ) : (
                  t("categories.createCategory")
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/categories")}
                className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-200 hover:scale-105"
              >
                {t("common.cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

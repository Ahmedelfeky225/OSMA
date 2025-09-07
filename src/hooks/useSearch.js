"use client";
import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { useLocale } from "next-intl";

export function useSearch() {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState({
    topProducts: [],
    trending: [],
  });
  const [recentSearches, setRecentSearches] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("recentSearches");
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        return [];
      }
    }
    return [];
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  // ✅ إصلاح الـ API base URL
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const loadSuggestions = useCallback(async () => {
    try {
      setError(null);
      // console.log("🔄 Loading suggestions...");

      // ✅ استخدام الـ URL الصحيح
      const response = await fetch(
        `${API_BASE_URL}/products?suggestions=true&limit=6`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            appId: process.env.NEXT_PUBLIC_APPID || "",
          },
        }
      );

      // console.log("Suggestions Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("📊 Suggestions Response:", data);

      // ✅ إصلاح معالجة الـ response - الـ API بيرجع topProducts و trending مباشرة
      if (data && data.success) {
        // معالجة المنتجات المقترحة من topProducts
        const topProducts = (data.topProducts || [])
          .map((product) => {
            // التعامل مع الشكل الجديد للبيانات
            const nameAr =
              product.nameAr ||
              product.translations?.ar?.name ||
              "منتج غير محدد";
            const nameEn =
              product.nameEn ||
              product.translations?.en?.name ||
              "Unnamed Product";
            const name = locale === "ar" ? nameAr : nameEn;

            return {
              id: product.id || product._id,
              name,
              image: product.image || product.images?.[0] || null,
              brand: product.brand || "Unknown",
              price: product.price || product.finalPrice || 0,
              currency: product.currency || "OMR",
              rating: product.rating || product.averageRating || 0,
              reviews: product.reviews || product.numReviews || 0,
            };
          })
          .filter(
            (product) =>
              product.name &&
              product.name !== "منتج غير محدد" &&
              product.name !== "Unnamed Product"
          );

        // معالجة الـ trending brands
        const trending = (data.trending || []).filter(Boolean);

        // console.log(
        //   `✅ Processed: ${topProducts.length} products, ${trending.length} brands`
        // );
        setSuggestions({ topProducts, trending });
      } else {
        // console.error("Failed to load suggestions:", data);
        setError("Failed to load suggestions");
        setSuggestions({ topProducts: [], trending: [] });
      }
    } catch (error) {
      // console.error("Failed to load suggestions:", error);
      setError("Failed to load suggestions. Please try again.");
      setSuggestions({ topProducts: [], trending: [] });
    }
  }, [locale, API_BASE_URL]);

  const performSearch = useCallback(
    async (query) => {
      if (!query.trim() || query.trim().length < 3) {
        setSearchResults([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // console.log(`🔍 Performing search for: "${query}"`);

        // ✅ استخدام الـ URL الصحيح
        const response = await fetch(
          `${API_BASE_URL}/products?search=${encodeURIComponent(
            query
          )}&limit=6`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              appId: process.env.NEXT_PUBLIC_APPID || "",
            },
          }
        );

        // console.log("Search Response Status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          // console.error("API Error Response:", errorText);
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        // console.log("Search API Response:", data);

        // ✅ معالجة الـ response للبحث
        if (data && data.products && Array.isArray(data.products)) {
          const formattedProducts = data.products
            .map((product) => {
              // التعامل مع الشكل الجديد للبيانات
              const nameAr =
                product.nameAr || product.translations?.ar?.name || "";
              const nameEn =
                product.nameEn || product.translations?.en?.name || "";
              const name = locale === "ar" ? nameAr : nameEn;

              if (!name) return null;

              return {
                id: product.id || product._id,
                name,
                price: product.price || product.finalPrice || 0,
                originalPrice: product.originalPrice || product.price,
                currency: product.currency || "OMR",
                image: product.image || product.images?.[0] || null,
                brand: product.brand || "",
                category:
                  product.category?.translations?.[locale]?.name ||
                  product.category?.translations?.en?.name ||
                  product.category?.name ||
                  "",
                stock: product.stock || 0,
                rating: product.rating || product.averageRating || 0,
                reviews: product.reviews || product.numReviews || 0,
                discount: product.discount || 0,
                size: product.size || "",
                concentration: product.concentration || "",
              };
            })
            .filter(Boolean);

          // console.log(`✅ Found ${formattedProducts.length} products`);
          setSearchResults(formattedProducts);
        } else {
          // console.error("Unexpected response format:", data);
          setError("No products found");
          setSearchResults([]);
        }
      } catch (error) {
        // console.error("Search error:", error);

        // رسائل خطأ أكثر وضوحاً
        if (error.message.includes("Failed to fetch")) {
          setError("Connection failed. Please check your internet connection.");
        } else if (error.message.includes("500")) {
          setError("Server error. Please try again later.");
        } else {
          setError("Search failed. Please try again.");
        }

        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [locale, API_BASE_URL]
  );

  const saveToRecentSearches = useCallback(
    (query) => {
      if (!query.trim()) return;
      try {
        const newRecentSearches = [
          query,
          ...recentSearches.filter((s) => s !== query),
        ].slice(0, 5);
        setRecentSearches(newRecentSearches);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "recentSearches",
            JSON.stringify(newRecentSearches)
          );
        }
      } catch (error) {
        // console.error("Error saving recent search:", error);
      }
    },
    [recentSearches]
  );

  const clearRecentSearches = useCallback(() => {
    try {
      setRecentSearches([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem("recentSearches");
      }
    } catch (error) {
      // console.error("Error clearing recent searches:", error);
    }
  }, []);

  const removeRecentSearch = useCallback(
    (searchToRemove) => {
      try {
        const newRecentSearches = recentSearches.filter(
          (search) => search !== searchToRemove
        );
        setRecentSearches(newRecentSearches);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "recentSearches",
            JSON.stringify(newRecentSearches)
          );
        }
      } catch (error) {
        // console.error("Error removing recent search:", error);
      }
    },
    [recentSearches]
  );

  const cleanup = useCallback(() => {
    console.log("Search cleanup called");
  }, []);

  useEffect(() => {
    performSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, performSearch]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    error,
    recentSearches,
    saveToRecentSearches,
    clearRecentSearches,
    removeRecentSearch,
    suggestions,
    loadSuggestions,
    cleanup,
  };
}

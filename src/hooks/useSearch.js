"use client";

import { useState, useCallback, useMemo } from "react";
import { useDebounce } from "./useDebounce";
import { useLocale } from "next-intl";

export function useSearch() {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState({
    topProducts: [],
    trending: [],
  });
  const [recentSearches, setRecentSearches] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recentSearches");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // زيادة الـ debounce delay لتقليل الطلبات
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const loadSuggestions = useCallback(async () => {
    try {
      // ✅ استخدام products endpoint مع suggestions parameter
      const response = await fetch("/api/products?limit=10&suggestions=true");
      const data = await response.json();

      console.log("📊 Suggestions Response:", data);

      if (response.ok && data.success) {
        // معالجة المنتجات المقترحة مع كل البيانات
        const topProducts = (data.topProducts || [])
          .map((product) => ({
            id: product.id,
            name: locale === "ar" ? product.nameAr : product.nameEn,
            image: product.image,
            brand: product.brand,
            price: product.price,
            currency: product.currency,
          }))
          .filter((product) => product.name); // إزالة المنتجات بدون أسماء

        const trending = (data.trending || []).filter(Boolean); // إزالة القيم الفارغة

        setSuggestions({ topProducts, trending });
      } else {
        console.error("Failed to load suggestions:", data);
        setSuggestions({ topProducts: [], trending: [] });
      }
    } catch (error) {
      console.error("Failed to load suggestions:", error);
      setSuggestions({ topProducts: [], trending: [] });
    }
  }, [locale]);

  const performSearch = useCallback(
    async (query) => {
      // ✅ عدم البحث إلا إذا كان النص 3 أحرف أو أكثر
      if (!query.trim() || query.trim().length < 3) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log(`🔍 Performing search for: "${query}"`);

        // ✅ استخدام products endpoint مع search parameter
        const response = await fetch(
          `/api/products?search=${encodeURIComponent(query)}&limit=6`
        );
        const data = await response.json();

        console.log("Search API Response:", data);

        if (response.ok && data.success) {
          const products = data.products || [];

          const formattedProducts = products
            .map((product) => {
              // اختيار اللغة المناسبة حسب الـ locale
              const name = locale === "ar" ? product.nameAr : product.nameEn;

              // إذا لم يكن هناك اسم، تجاهل المنتج
              if (!name) return null;

              return {
                id: product.id,
                name,
                price: product.price,
                currency: product.currency,
                image: product.image,
                brand: product.brand,
                category: product.category,
                stock: product.stock,
                rating: product.rating,
                reviews: product.reviews,
                discount: product.discount,
                size: product.size,
                concentration: product.concentration,
              };
            })
            .filter(Boolean); // إزالة المنتجات التي لا تحتوي على اسم

          setSearchResults(formattedProducts);
        } else {
          console.error("Search API Error:", data.error || "Unknown error");
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [locale]
  );

  const saveToRecentSearches = useCallback(
    (query) => {
      if (!query.trim()) return;

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
    },
    [recentSearches]
  );

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("recentSearches");
    }
  }, []);

  const removeRecentSearch = useCallback(
    (searchToRemove) => {
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
    },
    [recentSearches]
  );

  useMemo(() => {
    performSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, performSearch]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    recentSearches,
    saveToRecentSearches,
    clearRecentSearches,
    removeRecentSearch,
    suggestions,
    loadSuggestions,
  };
}

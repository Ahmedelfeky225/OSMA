// // "use client";

// // import { useState, useCallback, useMemo } from "react";
// // import { useDebounce } from "./useDebounce";
// // import { useLocale } from "next-intl";

// // export function useSearch() {
// //   const locale = useLocale();
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [suggestions, setSuggestions] = useState({
// //     topProducts: [],
// //     trending: [],
// //   });
// //   const [recentSearches, setRecentSearches] = useState(() => {
// //     if (typeof window !== "undefined") {
// //       const saved = localStorage.getItem("recentSearches");
// //       return saved ? JSON.parse(saved) : [];
// //     }
// //     return [];
// //   });

// //   // زيادة الـ debounce delay لتقليل الطلبات
// //   const debouncedSearchQuery = useDebounce(searchQuery, 500);

// //   const loadSuggestions = useCallback(async () => {
// //     try {
// //       // ✅ استخدام products endpoint مع suggestions parameter
// //       const response = await fetch("/api/products?limit=10&suggestions=true");
// //       const data = await response.json();

// //       console.log("📊 Suggestions Response:", data);

// //       if (response.ok && data.success) {
// //         // معالجة المنتجات المقترحة مع كل البيانات
// //         const topProducts = (data.topProducts || [])
// //           .map((product) => ({
// //             id: product.id,
// //             name: locale === "ar" ? product.nameAr : product.nameEn,
// //             image: product.image,
// //             brand: product.brand,
// //             price: product.price,
// //             currency: product.currency,
// //           }))
// //           .filter((product) => product.name); // إزالة المنتجات بدون أسماء

// //         const trending = (data.trending || []).filter(Boolean); // إزالة القيم الفارغة

// //         setSuggestions({ topProducts, trending });
// //       } else {
// //         console.error("Failed to load suggestions:", data);
// //         setSuggestions({ topProducts: [], trending: [] });
// //       }
// //     } catch (error) {
// //       console.error("Failed to load suggestions:", error);
// //       setSuggestions({ topProducts: [], trending: [] });
// //     }
// //   }, [locale]);

// //   const performSearch = useCallback(
// //     async (query) => {
// //       // ✅ عدم البحث إلا إذا كان النص 3 أحرف أو أكثر
// //       if (!query.trim() || query.trim().length < 3) {
// //         setSearchResults([]);
// //         setIsLoading(false);
// //         return;
// //       }

// //       setIsLoading(true);
// //       try {
// //         console.log(`🔍 Performing search for: "${query}"`);

// //         // ✅ استخدام products endpoint مع search parameter
// //         const response = await fetch(
// //           `/api/products?search=${encodeURIComponent(query)}&limit=6`
// //         );
// //         const data = await response.json();

// //         console.log("Search API Response:", data);

// //         if (response.ok && data.success) {
// //           const products = data.products || [];

// //           const formattedProducts = products
// //             .map((product) => {
// //               // اختيار اللغة المناسبة حسب الـ locale
// //               const name = locale === "ar" ? product.nameAr : product.nameEn;

// //               // إذا لم يكن هناك اسم، تجاهل المنتج
// //               if (!name) return null;

// //               return {
// //                 id: product.id,
// //                 name,
// //                 price: product.price,
// //                 currency: product.currency,
// //                 image: product.image,
// //                 brand: product.brand,
// //                 category: product.category,
// //                 stock: product.stock,
// //                 rating: product.rating,
// //                 reviews: product.reviews,
// //                 discount: product.discount,
// //                 size: product.size,
// //                 concentration: product.concentration,
// //               };
// //             })
// //             .filter(Boolean); // إزالة المنتجات التي لا تحتوي على اسم

// //           setSearchResults(formattedProducts);
// //         } else {
// //           console.error("Search API Error:", data.error || "Unknown error");
// //           setSearchResults([]);
// //         }
// //       } catch (error) {
// //         console.error("Search error:", error);
// //         setSearchResults([]);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     },
// //     [locale]
// //   );

// //   const saveToRecentSearches = useCallback(
// //     (query) => {
// //       if (!query.trim()) return;

// //       const newRecentSearches = [
// //         query,
// //         ...recentSearches.filter((s) => s !== query),
// //       ].slice(0, 5);
// //       setRecentSearches(newRecentSearches);

// //       if (typeof window !== "undefined") {
// //         localStorage.setItem(
// //           "recentSearches",
// //           JSON.stringify(newRecentSearches)
// //         );
// //       }
// //     },
// //     [recentSearches]
// //   );

// //   const clearRecentSearches = useCallback(() => {
// //     setRecentSearches([]);
// //     if (typeof window !== "undefined") {
// //       localStorage.removeItem("recentSearches");
// //     }
// //   }, []);

// //   const removeRecentSearch = useCallback(
// //     (searchToRemove) => {
// //       const newRecentSearches = recentSearches.filter(
// //         (search) => search !== searchToRemove
// //       );
// //       setRecentSearches(newRecentSearches);

// //       if (typeof window !== "undefined") {
// //         localStorage.setItem(
// //           "recentSearches",
// //           JSON.stringify(newRecentSearches)
// //         );
// //       }
// //     },
// //     [recentSearches]
// //   );

// //   useMemo(() => {
// //     performSearch(debouncedSearchQuery);
// //   }, [debouncedSearchQuery, performSearch]);

// //   return {
// //     searchQuery,
// //     setSearchQuery,
// //     searchResults,
// //     isLoading,
// //     recentSearches,
// //     saveToRecentSearches,
// //     clearRecentSearches,
// //     removeRecentSearch,
// //     suggestions,
// //     loadSuggestions,
// //   };
// // }
// "use client";
// import { useState, useCallback, useEffect } from "react";
// import { useDebounce } from "./useDebounce";
// import { useLocale } from "next-intl";

// export function useSearch() {
//   const locale = useLocale();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [suggestions, setSuggestions] = useState({
//     topProducts: [],
//     trending: [],
//   });

//   const [recentSearches, setRecentSearches] = useState(() => {
//     if (typeof window !== "undefined") {
//       try {
//         const saved = localStorage.getItem("recentSearches");
//         return saved ? JSON.parse(saved) : [];
//       } catch (error) {
//         // console.error("Error loading recent searches:", error);
//         return [];
//       }
//     }
//     return [];
//   });

//   const debouncedSearchQuery = useDebounce(searchQuery, 800);

//   const loadSuggestions = useCallback(async () => {
//     try {
//       setError(null);

//       // console.log("🔄 Loading suggestions...");

//       const response = await fetch(
//         "http://localhost:5000/api/products?suggestions=true",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             appId: process.env.NEXT_PUBLIC_APPID || "",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       // console.log("📊 Suggestions Response:", data);

//       if (data && data.success) {
//         // معالجة المنتجات المقترحة
//         const topProducts = (data.topProducts || [])
//           .map((product) => {
//             // التأكد من وجود الاسم
//             const nameAr = product.nameAr || "منتج غير محدد";
//             const nameEn = product.nameEn || "Unnamed Product";
//             const name = locale === "ar" ? nameAr : nameEn;

//             return {
//               id: product.id,
//               name,
//               image: product.image,
//               brand: product.brand || "Unknown",
//               price: product.price || 0,
//               currency: product.currency || "OMR",
//               rating: product.rating || 0,
//               reviews: product.reviews || 0,
//             };
//           })
//           .filter(
//             (product) =>
//               product.name &&
//               product.name !== "منتج غير محدد" &&
//               product.name !== "Unnamed Product"
//           );

//         const trending = (data.trending || []).filter(Boolean);

//         // console.log(
//         //   `✅ Processed: ${topProducts.length} products, ${trending.length} brands`
//         // );

//         setSuggestions({ topProducts, trending });
//       } else {
//         // console.error("Failed to load suggestions:", data);
//         setError("Failed to load suggestions");
//         setSuggestions({ topProducts: [], trending: [] });
//       }
//     } catch (error) {
//       // console.error("Failed to load suggestions:", error);
//       setError("Failed to load suggestions. Please try again.");
//       setSuggestions({ topProducts: [], trending: [] });
//     }
//   }, [locale]);

//   const performSearch = useCallback(
//     async (query) => {
//       if (!query.trim() || query.trim().length < 3) {
//         setSearchResults([]);
//         setIsLoading(false);
//         setError(null);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         // console.log(`🔍 Performing search for: "${query}"`);

//         const response = await fetch(
//           `http://localhost:5000/api/products?search=${encodeURIComponent(
//             query
//           )}&limit=6`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               appId: process.env.NEXT_PUBLIC_APPID || "",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         // console.log("Search API Response:", data);

//         if (data && data.success) {
//           const products = data.products || [];
//           const formattedProducts = products
//             .map((product) => {
//               const nameAr = product.nameAr || "";
//               const nameEn = product.nameEn || "";
//               const name = locale === "ar" ? nameAr : nameEn;

//               if (!name) return null;

//               return {
//                 id: product.id,
//                 name,
//                 price: product.price || 0,
//                 originalPrice: product.originalPrice,
//                 currency: product.currency || "OMR",
//                 image: product.image,
//                 brand: product.brand || "",
//                 category:
//                   product.category?.translations?.[locale]?.name ||
//                   product.category?.name ||
//                   "",
//                 stock: product.stock || 0,
//                 rating: product.rating || 0,
//                 reviews: product.reviews || 0,
//                 discount: product.discount || 0,
//                 size: product.size || "",
//                 concentration: product.concentration || "",
//               };
//             })
//             .filter(Boolean);

//           setSearchResults(formattedProducts);
//         } else {
//           // console.error("Search API Error:", data?.error || "Unknown error");
//           setError(data?.error || "Search failed");
//           setSearchResults([]);
//         }
//       } catch (error) {
//         // console.error("Search error:", error);
//         setError("Search failed. Please try again.");
//         setSearchResults([]);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [locale]
//   );

//   const saveToRecentSearches = useCallback(
//     (query) => {
//       if (!query.trim()) return;

//       try {
//         const newRecentSearches = [
//           query,
//           ...recentSearches.filter((s) => s !== query),
//         ].slice(0, 5);

//         setRecentSearches(newRecentSearches);

//         if (typeof window !== "undefined") {
//           localStorage.setItem(
//             "recentSearches",
//             JSON.stringify(newRecentSearches)
//           );
//         }
//       } catch (error) {
//         // console.error("Error saving recent search:", error);
//       }
//     },
//     [recentSearches]
//   );

//   const clearRecentSearches = useCallback(() => {
//     try {
//       setRecentSearches([]);
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("recentSearches");
//       }
//     } catch (error) {
//       // console.error("Error clearing recent searches:", error);
//     }
//   }, []);

//   const removeRecentSearch = useCallback(
//     (searchToRemove) => {
//       try {
//         const newRecentSearches = recentSearches.filter(
//           (search) => search !== searchToRemove
//         );
//         setRecentSearches(newRecentSearches);

//         if (typeof window !== "undefined") {
//           localStorage.setItem(
//             "recentSearches",
//             JSON.stringify(newRecentSearches)
//           );
//         }
//       } catch (error) {
//         // console.error("Error removing recent search:", error);
//       }
//     },
//     [recentSearches]
//   );

//   const cleanup = useCallback(() => {
//     // No cleanup needed for regular fetch, but we keep the function for compatibility
//     // console.log("🧹 Search cleanup called");
//   }, []);

//   useEffect(() => {
//     performSearch(debouncedSearchQuery);
//   }, [debouncedSearchQuery, performSearch]);

//   return {
//     searchQuery,
//     setSearchQuery,
//     searchResults,
//     isLoading,
//     error,
//     recentSearches,
//     saveToRecentSearches,
//     clearRecentSearches,
//     removeRecentSearch,
//     suggestions,
//     loadSuggestions,
//     cleanup,
//   };
// }

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
      console.log("🔄 Loading suggestions...");

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

      console.log("Suggestions Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📊 Suggestions Response:", data);

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

        console.log(
          `✅ Processed: ${topProducts.length} products, ${trending.length} brands`
        );
        setSuggestions({ topProducts, trending });
      } else {
        console.error("Failed to load suggestions:", data);
        setError("Failed to load suggestions");
        setSuggestions({ topProducts: [], trending: [] });
      }
    } catch (error) {
      console.error("Failed to load suggestions:", error);
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
        console.log(`🔍 Performing search for: "${query}"`);

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

        console.log("Search Response Status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error Response:", errorText);
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Search API Response:", data);

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

          console.log(`✅ Found ${formattedProducts.length} products`);
          setSearchResults(formattedProducts);
        } else {
          console.error("Unexpected response format:", data);
          setError("No products found");
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);

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
        console.error("Error saving recent search:", error);
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
      console.error("Error clearing recent searches:", error);
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
        console.error("Error removing recent search:", error);
      }
    },
    [recentSearches]
  );

  const cleanup = useCallback(() => {
    console.log("🧹 Search cleanup called");
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

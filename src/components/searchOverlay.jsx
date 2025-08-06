"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  FireIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useSearch } from "@/hooks/useSearch";
import clsx from "clsx";

// Enhanced Loading Spinner Component
const LoadingSpinner = ({ size = "sm", text = "" }) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <div
        className={`animate-spin rounded-full border-2 border-transparent border-t-current ${sizeClasses[size]}`}
      />
      {text && <span className="text-sm animate-pulse">{text}</span>}
    </div>
  );
};

// Enhanced Skeleton Loading Component
const SearchResultSkeleton = () => (
  <div className="space-y-3">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse" />
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-2/3 animate-pulse" />
        </div>
      </motion.div>
    ))}
  </div>
);

// Enhanced Error Component
const SearchError = ({ error, onRetry }) => {
  const tSearch = useTranslations("Search");
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
      </motion.div>
      <h3 className="text-lg font-semibold text-red-600 mb-2">Oops!</h3>
      <p className="text-red-600/80 mb-6 max-w-sm mx-auto">{error}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium cursor-pointer"
      >
        {tSearch("retry") || "Try Again"}
      </motion.button>
    </motion.div>
  );
};

// Enhanced Product Image Component
const ProductImage = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || imageError) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center rounded-xl`}
      >
        <span className="text-2xl">📦</span>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden rounded-xl`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse flex items-center justify-center">
          <LoadingSpinner size="xs" />
        </div>
      )}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`${className} object-cover transition-all duration-300 ${
          isLoading ? "opacity-0 scale-110" : "opacity-100 scale-100"
        }`}
        onError={() => setImageError(true)}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
      />
    </div>
  );
};

// Enhanced Empty State Component
const EmptyState = ({ type, locale, icon, title, description }) => {
  const defaultMessages = {
    noProducts: {
      icon: "🔍",
      title: { ar: "لا توجد منتجات مميزة", en: "No featured products" },
      description: {
        ar: "جرب البحث عن شيء آخر",
        en: "Try searching for something else",
      },
    },
    noBrands: {
      icon: "🏷️",
      title: { ar: "لا توجد علامات تجارية", en: "No brands available" },
      description: { ar: "سنضيف المزيد قريباً", en: "More coming soon" },
    },
    noData: {
      icon: "📭",
      title: { ar: "لا توجد بيانات", en: "No data available" },
      description: { ar: "حاول مرة أخرى لاحقاً", en: "Please try again later" },
    },
  };

  const message = defaultMessages[type] || defaultMessages.noData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="text-6xl mb-4"
      >
        {icon || message.icon}
      </motion.div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title || message.title[locale]}
      </h3>
      <p className="text-foreground/60 text-sm max-w-sm mx-auto">
        {description || message.description[locale]}
      </p>
    </motion.div>
  );
};

export const SearchOverlay = ({ isOpen, onClose, onSearch }) => {
  const inputRef = useRef(null);
  const router = useRouter();
  const t = useTranslations("Index");
  const tSearch = useTranslations("Search");
  const locale = useLocale();

  const {
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
  } = useSearch();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [navigatingToProduct, setNavigatingToProduct] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // Enhanced close handler
  const handleClose = useCallback(() => {
    if (isClosing) return; // منع الإغلاق المتعدد

    setIsClosing(true);
    setNavigatingToProduct(null);
    setSelectedIndex(-1);

    // إغلاق فوري بدون delay
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 100);
  }, [onClose, isClosing]);

  useEffect(() => {
    if (isOpen) {
      loadSuggestions();
      // منع scroll مع حفظ موضع الصفحة بطريقة محسنة
      const scrollY = window.scrollY;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.classList.add("search-overlay-open");

      // حفظ الـ scroll position
      document.body.setAttribute("data-scroll-y", scrollY.toString());
    } else {
      // استعادة الـ scroll position بطريقة محسنة
      const scrollY = document.body.getAttribute("data-scroll-y");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.classList.remove("search-overlay-open");
      document.body.removeAttribute("data-scroll-y");

      if (scrollY) {
        // استعادة الـ scroll بدون animation
        window.scrollTo(0, parseInt(scrollY));
        // إعادة تفعيل smooth scrolling بعد delay قصير
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = "";
        }, 100);
      }
    }

    return () => {
      // تنظيف شامل عند unmount
      document.documentElement.style.scrollBehavior = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.classList.remove("search-overlay-open");
      document.body.removeAttribute("data-scroll-y");
    };
  }, [isOpen, loadSuggestions]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          const product = searchResults[selectedIndex];
          handleProductClick(product.id);
        } else {
          handleSearch(searchQuery);
        }
      } else if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
      }
    },
    [searchQuery, searchResults, selectedIndex, handleClose]
  );

  const handleSearch = useCallback(
    (query) => {
      if (!query.trim()) return;
      saveToRecentSearches(query);
      setNavigatingToProduct("search");
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      onSearch(query);
      setTimeout(() => {
        setNavigatingToProduct(null);
        handleClose();
      }, 800);
    },
    [saveToRecentSearches, router, onSearch, handleClose]
  );

  const handleProductClick = useCallback(
    (productId) => {
      setNavigatingToProduct(productId);
      router.push(`/products/${productId}`);
      setTimeout(() => {
        setNavigatingToProduct(null);
        handleClose();
      }, 800);
    },
    [router, handleClose]
  );

  const handleSuggestionClick = useCallback(
    (suggestion) => {
      setSearchQuery(suggestion);
      handleSearch(suggestion);
    },
    [handleSearch, setSearchQuery]
  );

  const handleSuggestedProductClick = useCallback(
    (product) => {
      handleProductClick(product.id);
    },
    [handleProductClick]
  );

  const renderSearchResults = () => {
    if (isLoading) {
      return <SearchResultSkeleton />;
    }

    if (error) {
      return <SearchError error={error} onRetry={() => loadSuggestions()} />;
    }

    if (searchQuery.trim() && searchQuery.trim().length < 3) {
      return (
        <EmptyState
          type="noData"
          locale={locale}
          icon="⌨️"
          title={locale === "ar" ? "اكتب أكثر للبحث" : "Keep typing..."}
          description={
            locale === "ar"
              ? "اكتب 3 أحرف على الأقل للبحث"
              : "Type at least 3 characters to search"
          }
        />
      );
    }

    if (searchResults.length > 0) {
      return (
        <div className="space-y-4">
          <div className="space-y-3">
            {searchResults.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={clsx(
                  "group relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border",
                  selectedIndex === index
                    ? "bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--primary-color)]/5 border-[var(--primary-color)]/30 shadow-lg scale-[1.02]"
                    : "hover:bg-gradient-to-r hover:from-[var(--card)]/30 hover:to-[var(--card)]/10 border-transparent hover:border-[var(--primary-color)]/20 hover:shadow-md hover:scale-[1.01]",
                  navigatingToProduct === product.id && "opacity-60 scale-95"
                )}
                onClick={() => handleProductClick(product.id)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {/* Enhanced Loading overlay */}
                <AnimatePresence>
                  {navigatingToProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10"
                    >
                      <div className="text-[var(--primary-color)]">
                        <LoadingSpinner size="md" text="Loading..." />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-16 h-16 flex-shrink-0 relative">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-[var(--primary-color)] transition-colors duration-300 truncate text-lg">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-foreground/70 mt-1">
                    <span className="text-[var(--primary-color)] font-bold text-base">
                      {product.price} {product.currency}
                    </span>
                    {product.originalPrice &&
                      product.originalPrice !== product.price && (
                        <span className="line-through text-gray-400">
                          {product.originalPrice} {product.currency}
                        </span>
                      )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/60 mt-1">
                    {product.brand && product.brand !== "Unknown" && (
                      <span className="bg-[var(--card)]/50 px-2 py-1 rounded-full">
                        {product.brand}
                      </span>
                    )}
                    {product.size && (
                      <span className="bg-[var(--card)]/50 px-2 py-1 rounded-full">
                        {product.size}
                      </span>
                    )}
                    {product.rating > 0 && (
                      <span className="bg-[var(--card)]/50 px-2 py-1 rounded-full flex items-center gap-1">
                        ⭐ {product.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow indicator */}
                <motion.div
                  className="text-[var(--primary-color)] opacity-0 group-hover:opacity-100 transition-all duration-300"
                  animate={{ x: selectedIndex === index ? 0 : -10 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSearch(searchQuery)}
            disabled={navigatingToProduct === "search"}
            className="w-full py-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)]/80 text-white rounded-xl hover:from-[var(--primary-color)]/90 hover:to-[var(--primary-color)]/70 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {navigatingToProduct === "search" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white"
                >
                  <LoadingSpinner size="sm" text="Searching..." />
                </motion.div>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {tSearch("viewAllResults", { count: searchResults.length }) ||
                    `View all ${searchResults.length} results`}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      );
    }

    if (searchQuery.trim() && searchQuery.trim().length >= 3) {
      return (
        <EmptyState
          type="noProducts"
          locale={locale}
          icon="🔍"
          title={
            tSearch("noResultsFound", { query: searchQuery }) ||
            `No results for "${searchQuery}"`
          }
          description={
            locale === "ar"
              ? "جرب كلمات مختلفة أو تصفح جميع المنتجات"
              : "Try different keywords or browse all products"
          }
        />
      );
    }

    return null;
  };

  const renderSuggestions = () => (
    <div className="space-y-8">
      {/* Top Products */}
      {suggestions.topProducts && suggestions.topProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <FireIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-lg text-foreground">
              {tSearch("suggestedProducts") || "Featured Products"}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.topProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={clsx(
                  "group relative flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-[var(--card)]/30 hover:to-[var(--card)]/10 rounded-xl cursor-pointer transition-all duration-300 border border-transparent hover:border-[var(--primary-color)]/20 hover:shadow-md",
                  navigatingToProduct === product.id && "opacity-60 scale-95"
                )}
                onClick={() => handleSuggestedProductClick(product)}
              >
                <AnimatePresence>
                  {navigatingToProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10"
                    >
                      <div className="text-[var(--primary-color)]">
                        <LoadingSpinner size="sm" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-12 h-12 flex-shrink-0">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground group-hover:text-[var(--primary-color)] transition-colors duration-300 truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <span className="text-[var(--primary-color)] font-semibold">
                      {product.price} {product.currency}
                    </span>
                    {product.rating > 0 && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          ⭐ {product.rating.toFixed(1)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Trending Brands */}
      {suggestions.trending && suggestions.trending.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-lg text-foreground">
              {tSearch("suggestedKeywords") || "Popular Brands"}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.trending.map((brand, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSuggestionClick(brand)}
                className="px-4 py-2 bg-gradient-to-r from-[var(--card)]/50 to-[var(--card)]/30 hover:from-[var(--primary-color)] hover:to-[var(--primary-color)]/80 hover:text-white rounded-full text-sm font-medium transition-all duration-300 border border-transparent hover:border-[var(--primary-color)]/30 shadow-sm hover:shadow-md cursor-pointer"
              >
                {brand}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-lg text-foreground">
                {tSearch("recentSearches") || "Recent Searches"}
              </h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearRecentSearches}
              className="text-sm text-foreground/60 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
            >
              <TrashIcon className="w-4 h-4" />
              {tSearch("clearAll") || "Clear"}
            </motion.button>
          </div>
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center justify-between hover:bg-gradient-to-r hover:from-[var(--card)]/30 hover:to-[var(--card)]/10 rounded-lg transition-all duration-300 border border-transparent hover:border-[var(--primary-color)]/20"
              >
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => handleSuggestionClick(search)}
                  className="flex-1 text-left px-4 py-3 text-foreground/80 hover:text-[var(--primary-color)] font-medium transition-colors duration-300 cursor-pointer"
                >
                  {search}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRecentSearch(search);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-2 text-foreground/60 hover:text-red-500 transition-all duration-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Complete Empty State */}
      {(!suggestions.topProducts || suggestions.topProducts.length === 0) &&
        (!suggestions.trending || suggestions.trending.length === 0) &&
        recentSearches.length === 0 && (
          <EmptyState
            type="noData"
            locale={locale}
            icon="🔍"
            title={
              locale === "ar" ? "ابدأ بالكتابة للبحث" : "Start typing to search"
            }
            description={
              locale === "ar"
                ? "أو تصفح المنتجات من القائمة الرئيسية"
                : "Or browse products from the main menu"
            }
          />
        )}
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Enhanced backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={handleClose}
            style={{ touchAction: "none" }}
          />

          {/* Enhanced search overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.3,
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[90vh] max-w-4xl xl:max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-[9999] border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
            style={{
              maxHeight: "calc(100vh - 2rem)",
              maxWidth: "calc(100vw - 2rem)",
            }}
          >
            {/* Enhanced header */}
            <div className="sticky top-0 z-20 px-3 py-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon
                    className={`absolute ${
                      locale === "en" ? "right-4" : "left-4"
                    } top-1/2 -translate-y-1/2 sm:w-6 sm:h-6 w-5 h-5 text-[var(--primary-color)]`}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedIndex(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={t("searchPlaceholder") || "Search products..."}
                    className="w-full ps-4  py-3 text-sm sm:text-base bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:border-[var(--primary-color)] focus:ring-4 focus:ring-[var(--primary-color)]/20 transition-all duration-300 text-foreground placeholder:text-foreground/50"
                    autoComplete="off"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300 cursor-pointer ${
                    locale === "ar" ? "order-first" : ""
                  }`}
                  aria-label="Close search"
                >
                  <XMarkIcon className="w-6 h-6 text-foreground/60 " />
                </motion.button>
              </div>
            </div>

            {/* Enhanced content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
              <div className="p-4 sm:p-6 min-h-full">
                {searchQuery.trim()
                  ? renderSearchResults()
                  : renderSuggestions()}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

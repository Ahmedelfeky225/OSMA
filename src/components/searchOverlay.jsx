"use client";

import { useRef, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useSearch } from "@/hooks/useSearch";

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
    recentSearches,
    saveToRecentSearches,
    clearRecentSearches,
    removeRecentSearch,
    suggestions,
    loadSuggestions,
  } = useSearch();

  // جلب الاقتراحات عند فتح الـ overlay
  useEffect(() => {
    if (isOpen) {
      loadSuggestions();
    }
  }, [isOpen, loadSuggestions]);

  // Focus input when overlay opens
  useMemo(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSearch = useCallback(
    (query) => {
      if (!query.trim()) return;

      saveToRecentSearches(query);
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      onSearch(query);
      onClose();
    },
    [saveToRecentSearches, router, onSearch, onClose]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearch(searchQuery);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [handleSearch, searchQuery, onClose]
  );

  const handleProductClick = useCallback(
    (productId) => {
      console.log("🔗 Navigating to product:", productId);
      router.push(`/products/${productId}`);
      onClose();
    },
    [router, onClose]
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
      console.log("🔗 Navigating to suggested product:", product.id);
      router.push(`/products/${product.id}`);
      onClose();
    },
    [router, onClose]
  );

  const renderSearchResults = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)]"></div>
          <span className="ml-3 text-foreground">{tSearch("searching")}</span>
        </div>
      );
    }

    // إظهار رسالة للمستخدم إذا كان النص أقل من 3 أحرف
    if (searchQuery.trim() && searchQuery.trim().length < 3) {
      return (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⌨️</div>
          <p className="text-muted-foreground">
            {locale === "ar"
              ? "اكتب 3 أحرف على الأقل للبحث"
              : "Type at least 3 characters to search"}
          </p>
        </div>
      );
    }

    if (searchResults.length > 0) {
      return (
        <>
          <div className="space-y-3 mb-6">
            {searchResults.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  {product.image ? (
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <span className="text-xs">{tSearch("image")}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-[var(--primary-color)] font-semibold">
                      {product.price} {product.currency}
                    </span>
                    {product.brand && (
                      <>
                        <span>•</span>
                        <span>{product.brand}</span>
                      </>
                    )}
                    {product.size && (
                      <>
                        <span>•</span>
                        <span>{product.size}</span>
                      </>
                    )}
                    {product.rating > 0 && (
                      <>
                        <span>•</span>
                        <span>⭐ {product.rating}</span>
                      </>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                        {product.discount}% {locale === "ar" ? "خصم" : "OFF"}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => handleSearch(searchQuery)}
            className="w-full py-3 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--primary-color)]/90 transition-colors font-medium cursor-pointer"
          >
            {tSearch("viewAllResults", { count: searchResults.length })}
          </button>
        </>
      );
    }

    if (searchQuery.trim() && searchQuery.trim().length >= 3) {
      return (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-muted-foreground mb-4">
            {tSearch("noResultsFound", { query: searchQuery })}
          </p>
          <button
            onClick={() => handleSearch(searchQuery)}
            className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--primary-color)]/90 transition-colors cursor-pointer"
          >
            {tSearch("searchAllProducts")}
          </button>
        </div>
      );
    }

    return null;
  }, [
    isLoading,
    searchResults,
    searchQuery,
    tSearch,
    handleProductClick,
    handleSearch,
    locale,
  ]);

  const renderSuggestions = useMemo(
    () => (
      <div className="p-6 space-y-6">
        {/* Top Products - المنتجات المميزة من الـ API */}
        {suggestions.topProducts && suggestions.topProducts.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-[var(--primary-color)]">🔥</span>
              {tSearch("suggestedProducts")}
            </h3>
            <div className="space-y-2">
              {suggestions.topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                  onClick={() => handleSuggestedProductClick(product)}
                >
                  <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    {product.image ? (
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <span className="text-xs">{tSearch("image")}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground hover:text-[var(--primary-color)] transition-colors truncate">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-[var(--primary-color)] font-semibold">
                        {product.price} {product.currency}
                      </span>
                      {product.brand && (
                        <>
                          <span>•</span>
                          <span>{product.brand}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending - العلامات التجارية من الـ API */}
        {suggestions.trending && suggestions.trending.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-[var(--primary-color)]">📈</span>
              {tSearch("suggestedKeywords")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.trending.map((brand, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(brand)}
                  className="px-3 py-1 bg-muted hover:bg-[var(--primary-color)] hover:text-white rounded-full text-sm transition-colors cursor-pointer"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-[var(--primary-color)]">🕒</span>
                {tSearch("recentSearches")}
              </h3>
              <button
                onClick={clearRecentSearches}
                className="text-sm text-muted-foreground hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1"
                title={tSearch("clearAll")}
              >
                <TrashIcon className="w-4 h-4" />
                {tSearch("clearAll")}
              </button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between group hover:bg-muted rounded-lg transition-colors"
                >
                  <button
                    onClick={() => handleSuggestionClick(search)}
                    className="flex-1 text-left px-3 py-2 text-foreground hover:text-[var(--primary-color)] cursor-pointer"
                  >
                    {search}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecentSearch(search);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-red-500 transition-all cursor-pointer"
                    title={tSearch("remove")}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* لو مفيش اقتراحات من الـ API */}
        {(!suggestions.topProducts || suggestions.topProducts.length === 0) &&
          (!suggestions.trending || suggestions.trending.length === 0) &&
          recentSearches.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-muted-foreground mb-4">
                {tSearch("startTyping")}
              </p>
            </div>
          )}
      </div>
    ),
    [
      suggestions,
      recentSearches,
      tSearch,
      handleSuggestionClick,
      handleSuggestedProductClick,
      clearRecentSearches,
      removeRecentSearch,
    ]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Search Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-16 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-[100%] h-screen bg-[var(--bg-navbar)] rounded-md shadow-2xl z-[101]  overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-border bg-gradient-to-r from-muted/50 to-background">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-[var(--primary-color)]" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t("searchPlaceholder")}
                    className="w-full pl-11 md:pl-14 pr-3 md:pr-4 py-3 md:py-4 text-base md:text-lg bg-background border-2 border-border rounded-full outline-none focus:border-[var(--primary-color)] focus:shadow-lg transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors cursor-pointer"
                  aria-label={tSearch("closeSearch")}
                >
                  <XMarkIcon className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] md:max-h-[60vh] overflow-y-auto bg-[var(--bg-navbar)]">
              {searchQuery.trim() ? (
                <div className="p-4 md:p-6">{renderSearchResults}</div>
              ) : (
                renderSuggestions
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

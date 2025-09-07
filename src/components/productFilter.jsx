"use client";

import {
  useState,
  useEffect,
  useCallback,
  useTransition,
  useRef,
  useMemo,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Search,
  DollarSign,
  Star,
  Package,
  MessageSquare,
  Percent,
  Calendar,
  Crown,
  SortAsc,
  Filter,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";

/**
 * ProductFilters Component
 *
 * A comprehensive product filtering component that synchronizes with URL parameters
 * for shareable and bookmarkable filtered results. Built for Next.js with full
 * internationalization support and production-ready error handling.
 *
 * Features:
 * - Range sliders with dual handles (min/max)
 * - Real-time URL synchronization
 * - Accessibility support
 * - Dark/light mode support
 * - Performance optimized with memoization
 */

const ProductFilters = ({
  minPriceRange = 0,
  maxPriceRange = 1000,
  preservePage = false,
}) => {
  const t = useTranslations("filters");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Refs for persistent values and error handling
  const isInitialized = useRef(false);
  const errorTimeoutRef = useRef(null);

  // --- State Management ---
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(minPriceRange);
  const [maxPrice, setMaxPrice] = useState(maxPriceRange);
  const [rating, setRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [minReviews, setMinReviews] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [sort, setSort] = useState("newest");
  const [expandedPanel, setExpandedPanel] = useState("panel-price");
  const [error, setError] = useState(null);

  // useTransition for non-blocking UI updates
  const [isPending, startTransition] = useTransition();

  const currentSearchParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  // --- Synchronization with URL ---
  useEffect(() => {
    if (!isInitialized.current) {
      setSearch(currentSearchParams.get("search") || "");
      setMinPrice(Number(currentSearchParams.get("minPrice")) || minPriceRange);
      setMaxPrice(Number(currentSearchParams.get("maxPrice")) || maxPriceRange);
      setRating(Number(currentSearchParams.get("rating")) || 0);
      setInStock(currentSearchParams.get("inStock") === "true");
      setMinReviews(Number(currentSearchParams.get("minReviews")) || 0);
      setMinDiscount(Number(currentSearchParams.get("minDiscount")) || 0);
      setStartDate(currentSearchParams.get("startDate") || "");
      setEndDate(currentSearchParams.get("endDate") || "");
      setIsFeatured(currentSearchParams.get("isFeatured") === "true");
      setSort(currentSearchParams.get("sort") || "newest");

      isInitialized.current = true;
    }
  }, [currentSearchParams, minPriceRange, maxPriceRange]);

  // --- Error Handling ---
  const clearError = useCallback(() => {
    setError(null);
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
  }, []);

  const showError = useCallback((message) => {
    setError(message);
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = setTimeout(() => {
      setError(null);
    }, 5000);
  }, []);

  // --- Filter Logic ---
  const applyFilters = useCallback(() => {
    try {
      clearError();

      // Validate price range
      if (minPrice > maxPrice) {
        showError("الحد الأدنى للسعر لا يمكن أن يكون أكبر من الحد الأقصى");
        return;
      }

      // Validate price values
      if (minPrice < minPriceRange || minPrice > maxPriceRange) {
        showError("الحد الأدنى للسعر خارج النطاق المسموح");
        return;
      }

      if (maxPrice < minPriceRange || maxPrice > maxPriceRange) {
        showError("الحد الأقصى للسعر خارج النطاق المسموح");
        return;
      }

      const newSearchParams = new URLSearchParams();

      if (search.trim()) newSearchParams.set("search", search.trim());
      
      // إرسال معاملات السعر للفلتر على finalPrice (السعر النهائي بعد الخصم)
      // لضمان أن الـ API يطبق الفلتر على السعر الصحيح
      newSearchParams.set("minFinalPrice", minPrice.toString());
      newSearchParams.set("maxFinalPrice", maxPrice.toString());
      
      if (rating > 0) newSearchParams.set("rating", rating.toString());
      if (inStock) newSearchParams.set("inStock", "true");
      if (minReviews > 0)
        newSearchParams.set("minReviews", minReviews.toString());
      if (minDiscount > 0)
        newSearchParams.set("minDiscount", minDiscount.toString());
      if (startDate) newSearchParams.set("startDate", startDate);
      if (endDate) newSearchParams.set("endDate", endDate);
      if (isFeatured) newSearchParams.set("isFeatured", "true");
      if (sort) newSearchParams.set("sort", sort);

      if (!preservePage) {
        newSearchParams.set("page", "1");
      } else {
        const currentPage = searchParams.get("page");
        if (currentPage) {
          newSearchParams.set("page", currentPage);
        }
      }

      const queryString = newSearchParams.toString();
      startTransition(() => {
        router.push(`?${queryString}`);
      });
    } catch (err) {
      console.error("Error applying filters:", err);
      showError("حدث خطأ أثناء تطبيق الفلاتر");
    }
  }, [
    search,
    minPrice,
    maxPrice,
    rating,
    inStock,
    minReviews,
    minDiscount,
    startDate,
    endDate,
    isFeatured,
    sort,
    router,
    minPriceRange,
    maxPriceRange,
    preservePage,
    searchParams,
    clearError,
    showError,
  ]);

  const resetFilters = useCallback(() => {
    try {
      clearError();
      setSearch("");
      setMinPrice(minPriceRange);
      setMaxPrice(maxPriceRange);
      setRating(0);
      setInStock(false);
      setMinReviews(0);
      setMinDiscount(0);
      setStartDate("");
      setEndDate("");
      setIsFeatured(false);
      setSort("newest");
      setExpandedPanel("panel-price");

      startTransition(() => {
        router.push(`?page=1`);
      });
    } catch (err) {
      console.error("Error resetting filters:", err);
      showError("حدث خطأ أثناء إعادة تعيين الفلاتر");
    }
  }, [minPriceRange, maxPriceRange, router, clearError, showError]);

  const hasFilterChanges = useCallback(() => {
    const currentSearch = currentSearchParams.get("search") || "";
    const currentMinPrice =
      Number(currentSearchParams.get("minPrice")) || minPriceRange;
    const currentMaxPrice =
      Number(currentSearchParams.get("maxPrice")) || maxPriceRange;
    const currentRating = Number(currentSearchParams.get("rating")) || 0;
    const currentInStock = currentSearchParams.get("inStock") === "true";
    const currentMinReviews =
      Number(currentSearchParams.get("minReviews")) || 0;
    const currentMinDiscount =
      Number(currentSearchParams.get("minDiscount")) || 0;
    const currentStartDate = currentSearchParams.get("startDate") || "";
    const currentEndDate = currentSearchParams.get("endDate") || "";
    const currentIsFeatured = currentSearchParams.get("isFeatured") === "true";
    const currentSort = currentSearchParams.get("sort") || "newest";

    return (
      search !== currentSearch ||
      minPrice !== currentMinPrice ||
      maxPrice !== currentMaxPrice ||
      rating !== currentRating ||
      inStock !== currentInStock ||
      minReviews !== currentMinReviews ||
      minDiscount !== currentMinDiscount ||
      startDate !== currentStartDate ||
      endDate !== currentEndDate ||
      isFeatured !== currentIsFeatured ||
      sort !== currentSort
    );
  }, [
    search,
    minPrice,
    maxPrice,
    rating,
    inStock,
    minReviews,
    minDiscount,
    startDate,
    endDate,
    isFeatured,
    sort,
    currentSearchParams,
    minPriceRange,
    maxPriceRange,
  ]);

  // --- Reusable Components ---
  const FilterSection = useMemo(() => {
    return ({ id, title, icon: Icon, children, isExpanded }) => (
      <div className="border border-slate-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
        <button
          onClick={() => setExpandedPanel(expandedPanel === id ? "" : id)}
          className="cursor-pointer w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] flex items-center justify-center">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-800 dark:text-gray-200">
              {title}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500 dark:text-gray-400" />
          )}
        </button>
        {isExpanded && (
          <div className="p-4 pt-4 border-t border-slate-100 dark:border-gray-700">
            {children}
          </div>
        )}
      </div>
    );
  }, [expandedPanel]);

  // Enhanced RangeSlider with proper dual-handle functionality
  const RangeSlider = useMemo(() => {
    return ({
      min,
      max,
      value,
      onChange,
      step = 1,
      formatValue = (v) => v,
    }) => {
      const minPercent = ((value[0] - min) / (max - min)) * 100;
      const maxPercent = ((value[1] - min) / (max - min)) * 100;

      const handleMinChange = useCallback(
        (e) => {
          const newMin = Number(e.target.value);
          // التأكد من أن الحد الأدنى لا يتجاوز الحد الأقصى
          if (newMin >= min && newMin <= value[1]) {
            onChange([newMin, value[1]]);
          }
        },
        [value, onChange, min]
      );

      const handleMaxChange = useCallback(
        (e) => {
          const newMax = Number(e.target.value);
          // التأكد من أن الحد الأقصى لا يقل عن الحد الأدنى
          if (newMax <= max && newMax >= value[0]) {
            onChange([value[0], newMax]);
          }
        },
        [value, onChange, max]
      );

      // معالج منفصل للتعامل مع المقابض المتداخلة
      const handleSliderChange = useCallback(
        (e, isMin) => {
          const newValue = Number(e.target.value);
          
          if (isMin) {
            // للحد الأدنى - التأكد من عدم تجاوز الحد الأقصى
            const clampedValue = Math.min(newValue, value[1]);
            if (clampedValue >= min) {
              onChange([clampedValue, value[1]]);
            }
          } else {
            // للحد الأقصى - التأكد من عدم النزول عن الحد الأدنى
            const clampedValue = Math.max(newValue, value[0]);
            if (clampedValue <= max) {
              onChange([value[0], clampedValue]);
            }
          }
        },
        [value, onChange, min, max]
      );

      // التحقق من صحة القيم عند التحميل
      useEffect(() => {
        let newValue = [...value];
        let hasChanges = false;

        // التأكد من أن الحد الأدنى لا يتجاوز الحد الأقصى
        if (newValue[0] > newValue[1]) {
          newValue[0] = newValue[1];
          hasChanges = true;
        }

        // التأكد من أن القيم ضمن النطاق المسموح
        if (newValue[0] < min) {
          newValue[0] = min;
          hasChanges = true;
        }

        if (newValue[1] > max) {
          newValue[1] = max;
          hasChanges = true;
        }

        if (hasChanges) {
          onChange(newValue);
        }
      }, [value, min, max, onChange]);

      return (
        <div className="space-y-4">
          <div className="relative px-2">
            {/* Track Background */}
            <div className="h-2 bg-slate-200 dark:bg-gray-600 rounded-full"></div>

            {/* Active Track */}
            <div
              className="absolute top-0 h-2 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] rounded-full"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            ></div>

            {/* Min Range Input */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value[0]}
              onChange={(e) => handleSliderChange(e, true)}
              className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
              aria-label={`الحد الأدنى: ${formatValue(value[0])}`}
              style={{ 
                zIndex: value[0] > max - (max - min) / 2 ? 25 : 20,
                pointerEvents: 'auto'
              }}
            />

            {/* Max Range Input */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value[1]}
              onChange={(e) => handleSliderChange(e, false)}
              className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
              aria-label={`الحد الأقصى: ${formatValue(value[1])}`}
              style={{ 
                zIndex: value[1] < min + (max - min) / 2 ? 25 : 10,
                pointerEvents: 'auto'
              }}
            />
          </div>

          {/* Value Display */}
          <div className="flex justify-between">
            <div className="bg-slate-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
                {formatValue(value[0])}
              </span>
            </div>
            <div className="bg-slate-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
                {formatValue(value[1])}
              </span>
            </div>
          </div>
        </div>
      );
    };
  }, []);

  // Enhanced SingleRangeSlider with better accessibility
  const SingleRangeSlider = useMemo(() => {
    return ({
      min,
      max,
      value,
      onChange,
      step = 1,
      trackColor,
      thumbColor,
      formatValue = (v) => v,
    }) => {
      const valuePercent = ((value - min) / (max - min)) * 100;

      const handleChange = useCallback(
        (e) => {
          const newValue = Number(e.target.value);
          if (newValue >= min && newValue <= max) {
            onChange(newValue);
          }
        },
        [onChange, min, max]
      );

      return (
        <div className="space-y-4">
          <div className="relative px-2">
            <div className="h-2 bg-slate-200 dark:bg-gray-600 rounded-full"></div>
            <div
              className={`absolute top-0 h-2 ${trackColor} rounded-full`}
              style={{ width: `${valuePercent}%` }}
            ></div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleChange}
              className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider z-20"
              aria-label={`القيمة الحالية: ${formatValue(value)}`}
            />
          </div>
          <div className="text-center">
            <div className="inline-block bg-slate-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
                {formatValue(value)}
              </span>
            </div>
          </div>
        </div>
      );
    };
  }, []);

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-gray-700">
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
          <p className="text-red-700 dark:text-red-300 text-sm font-medium">
            {error}
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] bg-clip-text text-transparent">
              {t("title")}
            </h2>
            <span className="text-[#7a99c0] dark:text-[#8fa5c8] font-medium text-xs">
              {t("brand")}
            </span>
          </div>
        </div>
        <button
          onClick={resetFilters}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 text-slate-600 dark:text-gray-400 hover:text-[#7a99c0] dark:hover:text-[#8fa5c8] transition-colors duration-200 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm font-medium">{t("resetFilters")}</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Search Filter */}
        <FilterSection
          id="panel-search"
          title={t("sections.search.title")}
          icon={Search}
          isExpanded={expandedPanel === "panel-search"}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t("sections.search.placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-slate-800 dark:text-gray-200 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7a99c0] focus:border-transparent transition-all duration-200"
            />
          </div>
        </FilterSection>

        {/* Price Range Filter - يعمل على finalPrice (السعر النهائي بعد الخصم) */}
        <FilterSection
          id="panel-price"
          title={t("sections.price.title")}
          icon={DollarSign}
          isExpanded={expandedPanel === "panel-price"}
        >
          <div className="mb-2">
            <p className="text-xs text-slate-500 dark:text-gray-400">
              {t("sections.price.note", { defaultValue: "الفلتر يعمل على السعر النهائي (بعد الخصم)" })}
            </p>
          </div>
          <RangeSlider
            min={minPriceRange}
            max={maxPriceRange}
            value={[minPrice, maxPrice]}
            onChange={([min, max]) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
            formatValue={(v) => `${v} ${t("currency.omr")}`}
          />
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection
          id="panel-rating"
          title={t("sections.rating.title")}
          icon={Star}
          isExpanded={expandedPanel === "panel-rating"}
        >
          <SingleRangeSlider
            min={0}
            max={5}
            step={1}
            value={rating}
            onChange={setRating}
            trackColor="bg-gradient-to-r from-yellow-400 to-yellow-500"
            thumbColor="border-yellow-500"
            formatValue={(v) => `${v} ${t("units.stars")}`}
          />
        </FilterSection>

        {/* In Stock Filter */}
        <FilterSection
          id="panel-inStock"
          title={t("sections.stock.title")}
          icon={Package}
          isExpanded={expandedPanel === "panel-inStock"}
        >
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-5 h-5 text-[#7a99c0] bg-white dark:bg-gray-700 border-slate-300 dark:border-gray-600 rounded focus:ring-[#7a99c0] focus:ring-2"
            />
            <span className="text-slate-700 dark:text-gray-300">
              {t("sections.stock.label")}
            </span>
          </label>
        </FilterSection>

        {/* Min Reviews Filter */}
        <FilterSection
          id="panel-minReviews"
          title={t("sections.reviews.title")}
          icon={MessageSquare}
          isExpanded={expandedPanel === "panel-minReviews"}
        >
          <SingleRangeSlider
            min={0}
            max={100}
            step={1}
            value={minReviews}
            onChange={setMinReviews}
            trackColor="bg-gradient-to-r from-blue-400 to-blue-500"
            thumbColor="border-blue-500"
            formatValue={(v) => `${v} ${t("units.reviews")}`}
          />
        </FilterSection>

        {/* Min Discount Filter */}
        <FilterSection
          id="panel-minDiscount"
          title={t("sections.discount.title")}
          icon={Percent}
          isExpanded={expandedPanel === "panel-minDiscount"}
        >
          <SingleRangeSlider
            min={0}
            max={100}
            step={5}
            value={minDiscount}
            onChange={setMinDiscount}
            trackColor="bg-gradient-to-r from-green-400 to-green-500"
            thumbColor="border-green-500"
            formatValue={(v) => `${v}% ${t("units.discount")}`}
          />
        </FilterSection>

        {/* Date Range Filter */}
        <FilterSection
          id="panel-dateRange"
          title={t("sections.date.title")}
          icon={Calendar}
          isExpanded={expandedPanel === "panel-dateRange"}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                {t("sections.date.startDate")}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-slate-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a99c0] focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                {t("sections.date.endDate")}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-slate-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a99c0] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </FilterSection>

        {/* Is Featured Filter */}
        <FilterSection
          id="panel-isFeatured"
          title={t("sections.featured.title")}
          icon={Crown}
          isExpanded={expandedPanel === "panel-isFeatured"}
        >
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-5 h-5 text-[#7a99c0] bg-white dark:bg-gray-700 border-slate-300 dark:border-gray-600 rounded focus:ring-[#7a99c0] focus:ring-2"
            />
            <span className="text-slate-700 dark:text-gray-300">
              {t("sections.featured.label")}
            </span>
          </label>
        </FilterSection>

        {/* Sort By */}
        <FilterSection
          id="panel-sortBy"
          title={t("sections.sort.title")}
          icon={SortAsc}
          isExpanded={expandedPanel === "panel-sortBy"}
        >
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-slate-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7a99c0] focus:border-transparent transition-all duration-200"
          >
            <option value="newest">{t("sections.sort.options.newest")}</option>
            <option value="price-asc">
              {t("sections.sort.options.priceAsc")}
            </option>
            <option value="price-desc">
              {t("sections.sort.options.priceDesc")}
            </option>
            <option value="rating-desc">
              {t("sections.sort.options.ratingDesc")}
            </option>
            <option value="rating-asc">
              {t("sections.sort.options.ratingAsc")}
            </option>
          </select>
        </FilterSection>
      </div>

      {/* Apply Button */}
      {hasFilterChanges() && (
        <button
          onClick={applyFilters}
          disabled={isPending}
          className="cursor-pointer w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] hover:from-[#5a7ba0] hover:to-[#7a99c0] text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#7a99c0]/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t("applying")}</span>
            </>
          ) : (
            <>
              <Filter className="w-5 h-5" />
              <span>{t("applyFilters")}</span>
            </>
          )}
        </button>
      )}

      {/* Enhanced CSS for dual-handle range sliders */}
      <style jsx global>{`
        /* Webkit browsers (Chrome, Safari, Edge) */
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #7a99c0;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          margin-top: -6px;
          transition: all 0.2s ease-in-out;
          position: relative;
          z-index: 10;
        }

        /* Firefox */
        .range-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #7a99c0;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease-in-out;
          border: none;
        }

        /* Webkit track styling */
        .range-slider::-webkit-slider-runnable-track {
          background: transparent;
          height: 8px;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Firefox track styling */
        .range-slider::-moz-range-track {
          background: transparent;
          height: 8px;
          border-radius: 4px;
          cursor: pointer;
          border: none;
        }

        /* Enhanced hover and focus states */
        .range-slider:hover::-webkit-slider-thumb,
        .range-slider:focus::-webkit-slider-thumb {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(122, 153, 192, 0.4);
          border-color: #5a7ba0;
          z-index: 20;
        }

        .range-slider:hover::-moz-range-thumb,
        .range-slider:focus::-moz-range-thumb {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(122, 153, 192, 0.4);
          border-color: #5a7ba0;
        }

        /* Active state for better feedback */
        .range-slider:active::-webkit-slider-thumb {
          transform: scale(1.2);
          box-shadow: 0 6px 16px rgba(122, 153, 192, 0.5);
          z-index: 30;
        }

        .range-slider:active::-moz-range-thumb {
          transform: scale(1.2);
          box-shadow: 0 6px 16px rgba(122, 153, 192, 0.5);
        }

        /* Dark mode adjustments */
        .dark .range-slider::-webkit-slider-thumb {
          background: #f8fafc;
          border-color: #8fa5c8;
        }

        .dark .range-slider::-moz-range-thumb {
          background: #f8fafc;
          border-color: #8fa5c8;
        }

        .dark .range-slider:hover::-webkit-slider-thumb,
        .dark .range-slider:focus::-webkit-slider-thumb {
          border-color: #7a99c0;
          box-shadow: 0 4px 12px rgba(143, 165, 200, 0.4);
        }

        .dark .range-slider:hover::-moz-range-thumb,
        .dark .range-slider:focus::-moz-range-thumb {
          border-color: #7a99c0;
          box-shadow: 0 4px 12px rgba(143, 165, 200, 0.4);
        }

        /* Ensure proper z-index for overlapping thumbs */
        .range-slider[style*="z-index: 25"]::-webkit-slider-thumb {
          z-index: 25 !important;
        }

        .range-slider[style*="z-index: 20"]::-webkit-slider-thumb {
          z-index: 20 !important;
        }

        .range-slider[style*="z-index: 10"]::-webkit-slider-thumb {
          z-index: 10 !important;
        }

        /* تحسين التفاعل مع المقابض */
        .range-slider {
          touch-action: none;
        }

        .range-slider::-webkit-slider-thumb {
          touch-action: none;
          -webkit-tap-highlight-color: transparent;
        }

        .range-slider::-moz-range-thumb {
          touch-action: none;
        }

        /* تحسين الاستجابة للمس */
        @media (hover: none) and (pointer: coarse) {
          .range-slider::-webkit-slider-thumb {
            height: 24px;
            width: 24px;
          }
          
          .range-slider::-moz-range-thumb {
            height: 24px;
            width: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductFilters;

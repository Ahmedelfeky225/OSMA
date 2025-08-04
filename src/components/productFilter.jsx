"use client";

import { useState, useEffect, useCallback, useTransition, useRef } from "react";
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

const ProductFilters = ({
  minPriceRange = 0,
  maxPriceRange = 1000,
  preservePage = false,
}) => {
  const t = useTranslations("filters");
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ إضافة ref لتتبع آخر page تم معالجته
  const lastProcessedPage = useRef(null);
  const isInitialized = useRef(false);

  // حالة الفلاتر المحلية
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

  // حالة الأكورديون المفتوح حاليًا
  const [expandedPanel, setExpandedPanel] = useState("panel-price");

  const handleChange = (panel) => {
    setExpandedPanel(expandedPanel === panel ? "" : panel);
  };

  // استخدام useTransition لإدارة حالة التحميل
  const [isPending, startTransition] = useTransition();

  // ✅ مزامنة حالة الفلاتر مع الـ URL (مع تجاهل تغييرات الـ page)
  useEffect(() => {
    const currentPage = searchParams.get("page");

    // ✅ تحديث الفلاتر فقط في الحالات التالية:
    // 1. التحميل الأولي
    // 2. تغيير في الفلاتر (وليس الـ page فقط)
    if (
      !isInitialized.current ||
      (currentPage === lastProcessedPage.current && isInitialized.current)
    ) {
      setSearch(searchParams.get("search") || "");
      setMinPrice(Number(searchParams.get("minPrice")) || minPriceRange);
      setMaxPrice(Number(searchParams.get("maxPrice")) || maxPriceRange);
      setRating(Number(searchParams.get("rating")) || 0);
      setInStock(searchParams.get("inStock") === "true");
      setMinReviews(Number(searchParams.get("minReviews")) || 0);
      setMinDiscount(Number(searchParams.get("minDiscount")) || 0);
      setStartDate(searchParams.get("startDate") || "");
      setEndDate(searchParams.get("endDate") || "");
      setIsFeatured(searchParams.get("isFeatured") === "true");
      setSort(searchParams.get("sort") || "newest");

      isInitialized.current = true;
    }

    // ✅ تحديث آخر page تم معالجته
    lastProcessedPage.current = currentPage;
  }, [searchParams, minPriceRange, maxPriceRange]);

  // ✅ تحديث الـ URL عند تغيير أي فلتر (بدون تأثير على الـ page إذا كان preservePage = true)
  const applyFilters = useCallback(
    (resetPage = true) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      // ✅ فقط إعادة تعيين الصفحة إذا لم يكن preservePage مفعل
      if (resetPage && !preservePage) {
        current.set("page", "1");
      }

      // تطبيق الفلاتر
      search ? current.set("search", search) : current.delete("search");
      minPrice !== minPriceRange
        ? current.set("minPrice", minPrice.toString())
        : current.delete("minPrice");
      maxPrice !== maxPriceRange
        ? current.set("maxPrice", maxPrice.toString())
        : current.delete("maxPrice");
      rating > 0
        ? current.set("rating", rating.toString())
        : current.delete("rating");
      inStock ? current.set("inStock", "true") : current.delete("inStock");
      minReviews > 0
        ? current.set("minReviews", minReviews.toString())
        : current.delete("minReviews");
      minDiscount > 0
        ? current.set("minDiscount", minDiscount.toString())
        : current.delete("minDiscount");
      startDate
        ? current.set("startDate", startDate)
        : current.delete("startDate");
      endDate ? current.set("endDate", endDate) : current.delete("endDate");
      isFeatured
        ? current.set("isFeatured", "true")
        : current.delete("isFeatured");
      sort ? current.set("sort", sort) : current.delete("sort");

      const query = current.toString();
      startTransition(() => {
        router.push(`?${query}`);
      });
    },
    [
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
      searchParams,
      router,
      minPriceRange,
      maxPriceRange,
      preservePage,
      startTransition,
    ]
  );

  const resetFilters = () => {
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

    const current = new URLSearchParams();
    // ✅ إعادة تعيين الصفحة إلى 1 فقط عند reset
    current.set("page", "1");
    startTransition(() => {
      router.push(`?${current.toString()}`);
    });
  };

  // ✅ دالة للتحقق من وجود تغييرات في الفلاتر (بدون مقارنة الـ page)
  const hasFilterChanges = useCallback(() => {
    const currentSearch = searchParams.get("search") || "";
    const currentMinPrice =
      Number(searchParams.get("minPrice")) || minPriceRange;
    const currentMaxPrice =
      Number(searchParams.get("maxPrice")) || maxPriceRange;
    const currentRating = Number(searchParams.get("rating")) || 0;
    const currentInStock = searchParams.get("inStock") === "true";
    const currentMinReviews = Number(searchParams.get("minReviews")) || 0;
    const currentMinDiscount = Number(searchParams.get("minDiscount")) || 0;
    const currentStartDate = searchParams.get("startDate") || "";
    const currentEndDate = searchParams.get("endDate") || "";
    const currentIsFeatured = searchParams.get("isFeatured") === "true";
    const currentSort = searchParams.get("sort") || "newest";

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
    searchParams,
    minPriceRange,
    maxPriceRange,
  ]);

  const FilterSection = ({ id, title, icon: Icon, children, isExpanded }) => (
    <div className="border border-slate-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
      <button
        onClick={() => handleChange(id)}
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

  const RangeSlider = ({
    min,
    max,
    value,
    onChange,
    step = 1,
    formatValue = (v) => v,
  }) => (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400">
        <span>
          {t("range.min")}: {formatValue(value[0])}
        </span>
        <span>
          {t("range.max")}: {formatValue(value[1])}
        </span>
      </div>
      <div className="relative px-2">
        {/* Track Background */}
        <div className="h-2 bg-slate-200 dark:bg-gray-600 rounded-full"></div>

        {/* Active Track */}
        <div
          className="absolute top-0 h-2 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] rounded-full"
          style={{
            left: `${((value[0] - min) / (max - min)) * 100}%`,
            width: `${((value[1] - value[0]) / (max - min)) * 100}%`,
          }}
        ></div>

        {/* Min Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => {
            const newMin = Math.min(Number(e.target.value), value[1] - step);
            onChange([newMin, value[1]]);
          }}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
        />

        {/* Max Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => {
            const newMax = Math.max(Number(e.target.value), value[0] + step);
            onChange([value[0], newMax]);
          }}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
        />

        {/* Min Thumb */}
        <div
          className="absolute top-1/2 w-5 h-5 bg-white border-2 border-[#7a99c0] rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ left: `${((value[0] - min) / (max - min)) * 100}%` }}
        ></div>

        {/* Max Thumb */}
        <div
          className="absolute top-1/2 w-5 h-5 bg-white border-2 border-[#7a99c0] rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ left: `${((value[1] - min) / (max - min)) * 100}%` }}
        ></div>
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

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] bg-clip-text text-transparent">
              {t("title")}
            </h2>
            <span className="text-[#7a99c0] dark:text-[#8fa5c8] font-medium text-sm">
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

        {/* Price Range Filter */}
        <FilterSection
          id="panel-price"
          title={t("sections.price.title")}
          icon={DollarSign}
          isExpanded={expandedPanel === "panel-price"}
        >
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
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400">
              <span>
                {t("range.min")}: {rating} {t("units.stars")}
              </span>
            </div>
            <div className="relative px-2">
              {/* Track Background */}
              <div className="h-2 bg-slate-200 dark:bg-gray-600 rounded-full"></div>

              {/* Active Track */}
              <div
                className="absolute top-0 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                style={{
                  width: `${(rating / 5) * 100}%`,
                }}
              ></div>

              {/* Range Input */}
              <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
              />

              {/* Thumb */}
              <div
                className="absolute top-1/2 w-5 h-5 bg-white border-2 border-yellow-500 rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
                style={{ left: `${(rating / 5) * 100}%` }}
              ></div>
            </div>

            {/* Stars Display */}
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`w-6 h-6 ${
                    star <= rating
                      ? "text-yellow-400"
                      : "text-slate-300 dark:text-gray-600"
                  }`}
                >
                  ⭐
                </div>
              ))}
            </div>
          </div>
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
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400">
              <span>
                {t("range.min")}: {minReviews} {t("units.reviews")}
              </span>
            </div>
            <div className="relative px-2">
              {/* Track Background */}
              <div className="h-2 bg-slate-200 dark:bg-gray-600 rounded-full"></div>

              {/* Active Track */}
              <div
                className="absolute top-0 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                style={{
                  width: `${(minReviews / 100) * 100}%`,
                }}
              ></div>

              {/* Range Input */}
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={minReviews}
                onChange={(e) => setMinReviews(Number(e.target.value))}
                className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
              />

              {/* Thumb */}
              <div
                className="absolute top-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
                style={{ left: `${(minReviews / 100) * 100}%` }}
              ></div>
            </div>

            {/* Value Display */}
            <div className="text-center">
              <div className="inline-block bg-slate-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
                  {minReviews} {t("units.reviews")}
                </span>
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Min Discount Filter */}
        <FilterSection
          id="panel-minDiscount"
          title={t("sections.discount.title")}
          icon={Percent}
          isExpanded={expandedPanel === "panel-minDiscount"}
        >
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400">
              <span>
                {t("range.min")}: {minDiscount}%
              </span>
            </div>
            <div className="relative px-2">
              {/* Track Background */}
              <div className="h-2 bg-slate-200 dark:bg-gray-600 rounded-full"></div>

              {/* Active Track */}
              <div
                className="absolute top-0 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                style={{
                  width: `${(minDiscount / 100) * 100}%`,
                }}
              ></div>

              {/* Range Input */}
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={minDiscount}
                onChange={(e) => setMinDiscount(Number(e.target.value))}
                className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
              />

              {/* Thumb */}
              <div
                className="absolute top-1/2 w-5 h-5 bg-white border-2 border-green-500 rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
                style={{ left: `${(minDiscount / 100) * 100}%` }}
              ></div>
            </div>

            {/* Value Display */}
            <div className="text-center">
              <div className="inline-block bg-slate-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
                  {minDiscount}% {t("units.discount")}
                </span>
              </div>
            </div>
          </div>
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

      {/* Apply Button - يظهر فقط إذا كان هناك تغييرات */}
      {hasFilterChanges() && (
        <button
          onClick={() => applyFilters(!preservePage)} // ✅ تمرير !preservePage
          disabled={isPending}
          className="cursor-pointer w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] hover:from-[#5a7ba0] hover:to-[#7a99c0] text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#7a99c0]/25 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse"
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

      <style jsx global>{`
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
          pointer-events: none;
        }

        .range-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
          pointer-events: none;
        }

        .range-slider::-webkit-slider-track {
          background: transparent;
          height: 8px;
          border-radius: 4px;
        }

        .range-slider::-moz-range-track {
          background: transparent;
          height: 8px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default ProductFilters;

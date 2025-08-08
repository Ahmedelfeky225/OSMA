import { Input } from "@/components/ui/input"; // Assuming shadcn/ui Input
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming shadcn/ui Select
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

export default function ProductFilters({
  filters,
  onFilterChange,
  categories,
  categoriesLoading,
  isRTL,
  t,
}) {
  const getCategoryName = (category) => {
    return isRTL
      ? category?.translations?.ar?.name || category?.name
      : category?.translations?.en?.name || category?.name;
  };

  const handleSelectChange = (filterName, value) => {
    // Convert "all" back to an empty string for the actual filter state
    const newValue = value === "all" ? "" : value;
    onFilterChange({ [filterName]: newValue });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
      {/* Search Input */}
      <div className="relative w-full md:w-1/3">
        <Input
          type="text"
          placeholder={t("filters.searchPlaceholder")}
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="pl-10 pr-4 py-2 rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 w-full"
          dir={isRTL ? "rtl" : "ltr"}
        />
        <Search
          className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 ${
            isRTL ? "right-3" : "left-3"
          }`}
        />
      </div>

      {/* Category Filter */}
      <div className="w-full md:w-1/4">
        <Select
          value={filters.category || "all"}
          onValueChange={(value) => handleSelectChange("category", value)}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <SelectTrigger className="w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
            <SelectValue placeholder={t("filters.selectCategory")} />
          </SelectTrigger>
          <SelectContent className="rounded-sm">
            <SelectItem value="all">{t("filters.allCategories")}</SelectItem>
            {categoriesLoading ? (
              <SelectItem value="loading" disabled>
                {t("filters.categoriesLoading")}
              </SelectItem>
            ) : (
              categories.map((cat) => (
                <SelectItem
                  key={cat._id}
                  value={cat._id}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {getCategoryName(cat)}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Stock Status Filter */}
      <div className="w-full md:w-1/4">
        <Select
          value={filters.inStock || "all"}
          onValueChange={(value) => handleSelectChange("inStock", value)}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <SelectTrigger className="w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
            <SelectValue placeholder={t("filters.stockStatus")} />
          </SelectTrigger>
          <SelectContent className="rounded-sm">
            <SelectItem value="all">{t("filters.allStock")}</SelectItem>
            <SelectItem value="true">{t("filters.inStock")}</SelectItem>
            <SelectItem value="false">{t("filters.outOfStock")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort By */}
      <div className="w-full md:w-1/4">
        <Select
          value={filters.sort}
          onValueChange={(value) => onFilterChange({ sort: value })}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <SelectTrigger className="w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
            <SelectValue placeholder={t("filters.sortBy")} />
          </SelectTrigger>
          <SelectContent className="rounded-sm">
            <SelectItem value="newest">{t("filters.newest")}</SelectItem>
            <SelectItem value="oldest">{t("filters.oldest")}</SelectItem>
            <SelectItem value="priceAsc">{t("filters.priceAsc")}</SelectItem>
            <SelectItem value="priceDesc">{t("filters.priceDesc")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

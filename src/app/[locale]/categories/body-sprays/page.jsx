import Paginator from "@/components/Paginator";
import ProductCard from "@/components/ui/productCard";
import ProductFilters from "@/components/productFilter";
import SearchInput from "@/components/searchInput";
import { fetchInterceptor } from "@/utils/fetchInterceptor";
import { getLocale } from "next-intl/server";

const bodySprayPage = async ({ searchParams }) => {
  console.log("searchParams:", searchParams);
  const locale = await getLocale();

  // ✅ إضافة await للـ searchParams
  const resolvedSearchParams = await searchParams;

  const page = resolvedSearchParams?.page || 1;

  // استخراج جميع الفلاتر من searchParams المحلولة
  const {
    search,
    minPrice,
    maxPrice,
    rating,
    inStock,
    minReviews,
    minDiscount,
    startDate,
    endDate,
    brand,
  } = resolvedSearchParams;

  // بناء كائن الـ params لتمريره إلى fetchInterceptor
  const params = {
    page: page,
    limit: 10,
    ...(search && { search }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    ...(rating && { rating }),
    ...(inStock && { inStock }),
    ...(minReviews && { minReviews }),
    ...(minDiscount && { minDiscount }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    // تم إزالة فلتر 'brand' من هنا أيضًا لأنه لن يتم تمريره من الـ UI
    // ...(brand && { brand }),
  };

  const data = await fetchInterceptor("products/category/body-sprays", {
    method: "GET",
    params: params,
  });

  // Calculate minPriceRange and maxPriceRange from the fetched products
  let calculatedMinPriceRange = Number.POSITIVE_INFINITY;
  let calculatedMaxPriceRange = 0;

  if (data?.products && data.products.length > 0) {
    data.products.forEach((product) => {
      if (product.finalPrice < calculatedMinPriceRange) {
        calculatedMinPriceRange = product.finalPrice;
      }
      if (product.finalPrice > calculatedMaxPriceRange) {
        calculatedMaxPriceRange = product.finalPrice;
      }
    });
  } else {
    // Fallback values if no products are returned or array is empty
    calculatedMinPriceRange = 0;
    calculatedMaxPriceRange = 1000; // Default max price if no products
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[90%] mx-auto py-16">
      {/* Filter Sidebar */}
      <aside className="flex-1">
        <ProductFilters
          minPriceRange={calculatedMinPriceRange}
          maxPriceRange={calculatedMaxPriceRange}
          preservePage={true} // ✅ إضافة preservePage لمنع تداخل الفلاتر مع الـ pagination
        />
      </aside>

      {/* Products List */}
      <main className="xl:flex-3 lg:flex-2 sm:flex-1">
        <SearchInput />

        {/* Loading State */}
        {!data?.products && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7a99c0]"></div>
          </div>
        )}

        {/* No Products Found */}
        {data?.products && data.products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-500 dark:text-gray-400 text-lg">
              لم يتم العثور على منتجات
            </div>
          </div>
        )}

        {/* Products Grid */}
        {data?.products && data.products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-3 2xl:gap-7">
            {data.products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {data?.totalPages > 1 && <Paginator paginate={data} />}
      </main>
    </div>
  );
};

export default bodySprayPage;

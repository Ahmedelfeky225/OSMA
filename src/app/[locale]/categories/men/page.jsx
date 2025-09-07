import Paginator from "@/components/Paginator";
import ProductCard from "@/components/ui/productCard";
import ProductFilters from "@/components/productFilter";
import SearchInput from "@/components/searchInput";
import { fetchInterceptor } from "@/utils/fetchInterceptor";
import { getLocale } from "next-intl/server";

// ✅ اجعل الدالة async وتفكك searchParams بشكل آمن
const OffersPage = async ({ searchParams }) => {
  const locale = await getLocale();

  // ⛳️ تحويل searchParams إلى كائن URLSearchParams للتعامل الصحيح
  const paramsObj = new URLSearchParams(searchParams?.toString() || "");

  const page = parseInt(paramsObj.get("page") || "1");

  const search = paramsObj.get("search");
  const minFinalPrice = paramsObj.get("minFinalPrice");
  const maxFinalPrice = paramsObj.get("maxFinalPrice");
  const rating = paramsObj.get("rating");
  const inStock = paramsObj.get("inStock");
  const minReviews = paramsObj.get("minReviews");
  const minDiscount = paramsObj.get("minDiscount");
  const startDate = paramsObj.get("startDate");
  const endDate = paramsObj.get("endDate");
  const sort = paramsObj.get("sort");
  const brand = paramsObj.get("brand");

  const params = {
    page,
    limit: 10,
    ...(search && { search }),
    ...(minFinalPrice && { minFinalPrice }),
    ...(maxFinalPrice && { maxFinalPrice }),
    ...(rating && { rating }),
    ...(inStock && { inStock }),
    ...(minReviews && { minReviews }),
    ...(minDiscount && { minDiscount }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(sort && { sort }),
    // ...(brand && { brand }), // موقوف حالياً
  };

  const data = await fetchInterceptor("products/category/men", {
    method: "GET",
    params,
  });

  let calculatedMinPriceRange = Number.POSITIVE_INFINITY;
  let calculatedMaxPriceRange = 0;

  if (data?.products?.length > 0) {
    data.products.forEach((product) => {
      if (product.finalPrice < calculatedMinPriceRange) {
        calculatedMinPriceRange = product.finalPrice;
      }
      if (product.finalPrice > calculatedMaxPriceRange) {
        calculatedMaxPriceRange = product.finalPrice;
      }
    });
  } else {
    calculatedMinPriceRange = 0;
    calculatedMaxPriceRange = 1000;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[90%] mx-auto pt-[120px]  sm:pt-[130px] sm:pb-16">
      {/* Filter Sidebar */}
      {data?.products?.length > 1 && (
        <aside className="flex-1">
          <ProductFilters
            minPriceRange={calculatedMinPriceRange}
            maxPriceRange={calculatedMaxPriceRange}
            preservePage={true} // ✅ إضافة preservePage لمنع تداخل الفلاتر مع الـ pagination
          />
        </aside>
      )}

      {/* Products List */}
      <main className="xl:flex-3 lg:flex-2 sm:flex-1">
        {data?.products?.length > 1 && <SearchInput />}
        {data?.products && data.products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-500 dark:text-gray-400 text-2xl">
              {locale == "en"
                ? "No Products Found"
                : "  لم يتم العثور على منتجات"}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-3 2xl:gap-7">
          {data?.products?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>

        {data.totalPages > 1 && <Paginator paginate={data} />}
      </main>
    </div>
  );
};

export default OffersPage;

export const dynamic = "force-dynamic";

import Paginator from "@/components/Paginator";
import ProductCard from "@/components/ui/productCard";
import ProductFilters from "@/components/productFilter";
import SearchInput from "@/components/searchInput";
import { fetchInterceptor } from "@/utils/fetchInterceptor";
import { getLocale } from "next-intl/server";

export default async function OffersPage({ searchParams }) {
  const locale = await getLocale();

  // الحل هنا: نستخدم await قبل الوصول إلى خصائص searchParams
  const {
    page,
    search,
    minFinalPrice,
    maxFinalPrice,
    rating,
    inStock,
    minReviews,
    minDiscount,
    startDate,
    endDate,
    sort,
  } = await searchParams;

  const params = {
    page: page || 1, // ✅ نستخدم القيمة هنا ونعطيها قيمة افتراضية
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
  };

  const data = await fetchInterceptor("products/offers", {
    method: "GET",
    params,
  });

  let calculatedMinPriceRange = Number.POSITIVE_INFINITY;
  let calculatedMaxPriceRange = 0;

  if (data?.products?.length > 0) {
    for (const product of data.products) {
      if (product.finalPrice < calculatedMinPriceRange) {
        calculatedMinPriceRange = product.finalPrice;
      }
      if (product.finalPrice > calculatedMaxPriceRange) {
        calculatedMaxPriceRange = product.finalPrice;
      }
    }
  } else {
    calculatedMinPriceRange = 0;
    calculatedMaxPriceRange = 1000;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[90%] mx-auto pt-[120px]  sm:pt-[130px] sm:pb-16">
      <aside className="flex-1">
        <ProductFilters
          minPriceRange={calculatedMinPriceRange}
          maxPriceRange={calculatedMaxPriceRange}
        />
      </aside>

      <main className="xl:flex-3 lg:flex-2 sm:flex-1 ">
        <SearchInput />
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-3 2xl:gap-7">
          {data?.products?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
        {data?.totalPages > 1 && <Paginator paginate={data} />}
      </main>
    </div>
  );
}

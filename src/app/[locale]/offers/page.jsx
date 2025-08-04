export const dynamic = "force-dynamic";

import Paginator from "@/components/Paginator";
import ProductCard from "@/components/ui/productCard";
import ProductFilters from "@/components/productFilter";
import SearchInput from "@/components/searchInput";
import { fetchInterceptor } from "@/utils/fetchInterceptor";
import { getLocale } from "next-intl/server";

export default async function OffersPage({ searchParams }) {
  const locale = await getLocale();

  const page = searchParams?.page || 1;
  const search = searchParams?.search;
  const minPrice = searchParams?.minPrice;
  const maxPrice = searchParams?.maxPrice;
  const rating = searchParams?.rating;
  const inStock = searchParams?.inStock;
  const minReviews = searchParams?.minReviews;
  const minDiscount = searchParams?.minDiscount;
  const startDate = searchParams?.startDate;
  const endDate = searchParams?.endDate;

  const params = {
    page,
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
    <div className="flex flex-col md:flex-row gap-6 max-w-[90%] mx-auto py-6 sm:py-16">
      <aside className="flex-1">
        <ProductFilters
          minPriceRange={calculatedMinPriceRange}
          maxPriceRange={calculatedMaxPriceRange}
        />
      </aside>

      <main className="xl:flex-3 lg:flex-2 sm:flex-1">
        <SearchInput />
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-3 2xl:gap-7">
          {data?.products?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
        {data.totalPages > 1 && <Paginator paginate={data} />}
      </main>
    </div>
  );
}

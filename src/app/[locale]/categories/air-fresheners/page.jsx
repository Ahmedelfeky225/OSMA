import Paginator from "@/components/Paginator";
import ProductCard from "@/components/ui/productCard";
import ProductFilters from "@/components/productFilter"; // استيراد مكون الفلاتر الجديد
import SearchInput from "@/components/searchInput"; // استيراد مكون البحث الجديد
import { fetchInterceptor } from "@/utils/fetchInterceptor";
import { getLocale } from "next-intl/server";

const offersPage = async ({ searchParams }) => {
  const locale = await getLocale();
  const page = searchParams?.page || 1;

  // استخراج جميع الفلاتر من searchParams
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
  } = searchParams;

  // بناء كائن الـ params لتمريره إلى fetchInterceptor
  const params = {
    page: page,
    limit: 10, // يمكنك تعديل هذا الحد إذا لزم الأمر
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

  const data = await fetchInterceptor("products/category/air-fresheners", {
    method: "GET",
    params: params, // تمرير جميع الفلاتر المستخرجة
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
    // You might want to fetch global min/max price from a separate endpoint
    // or set sensible defaults if no products are found.
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
        />
      </aside>
      {/* Products List */}
      <main className="xl:flex-3 lg:flex-2 sm:flex-1">
        <SearchInput /> {/* Add the search input here */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-3 2xl:gap-7">
          {data?.products?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
        {/***** Products ******/}
        {data.totalPages > 1 && <Paginator paginate={data} />}
      </main>
    </div>
  );
};

export default offersPage;

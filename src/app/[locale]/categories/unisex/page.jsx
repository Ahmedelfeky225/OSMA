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
    minFinalPrice,
    maxFinalPrice,
    rating,
    inStock,
    minReviews,
    minDiscount,
    startDate,
    endDate,
    sort,
    brand,
  } = searchParams;

  // بناء كائن الـ params لتمريره إلى fetchInterceptor
  const params = {
    page: page,
    limit: 10, // يمكنك تعديل هذا الحد إذا لزم الأمر
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
    // تم إزالة فلتر 'brand' من هنا أيضًا لأنه لن يتم تمريره من الـ UI
    // ...(brand && { brand }),
  };

  const data = await fetchInterceptor("products/category/unisex", {
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
        {/***** Products ******/}
        {data.totalPages > 1 && <Paginator paginate={data} />}
      </main>
    </div>
  );
};

export default offersPage;

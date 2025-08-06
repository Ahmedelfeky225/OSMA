"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/productCard";
import ProductFilters from "@/components/productFilter";
import SearchInput from "@/components/searchInput";
import Paginator from "@/components/Paginator";

const Wrapper = ({ locale }) => {
  const [data, setData] = useState(null);
  const [minPriceRange, setMinPriceRange] = useState(0);
  const [maxPriceRange, setMaxPriceRange] = useState(1000);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      startTransition(async () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("locale", locale); // Add locale to params

        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }products/category/body-sprays?${params.toString()}`
        );
        const json = await res.json();

        // استخراج أقل وأعلى سعر من المنتجات
        if (json?.products?.length > 0) {
          const prices = json.products.map((p) => p.finalPrice);
          setMinPriceRange(Math.min(...prices));
          setMaxPriceRange(Math.max(...prices));
        } else {
          setMinPriceRange(0);
          setMaxPriceRange(1000);
        }

        setData(json);
      });
    };

    fetchProducts();
  }, [searchParams, locale]);

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[90%] mx-auto py-16">
      {/* Sidebar Filters */}
      <aside className="flex-1">
        <ProductFilters
          minPriceRange={minPriceRange}
          maxPriceRange={maxPriceRange}
          preservePage={true}
        />
      </aside>

      {/* Main Content */}
      <main className="xl:flex-3 lg:flex-2 sm:flex-1">
        <SearchInput />
        {isPending && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7a99c0]"></div>
          </div>
        )}
        {!data?.products && !isPending && (
          <div className="text-center py-12 text-slate-500 dark:text-gray-400">
            لم يتم العثور على منتجات
          </div>
        )}
        {data?.products?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-3 2xl:gap-7">
            {data.products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}
        a{data?.totalPages > 1 && <Paginator paginate={data} />}
      </main>
    </div>
  );
};

export default Wrapper;

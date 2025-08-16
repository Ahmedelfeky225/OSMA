// app/[locale]/offers/loading.js

import React from "react";
import ProductCardSkeleton from "@/components/productCardSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[90%] mx-auto pt-[120px]  sm:pt-[130px] sm:pb-16">
      <aside className="md:w-1/4">
        <div className="h-96 bg-gray-100 animate-pulse rounded-md" />
      </aside>
      <main className="md:w-3/4">
        <div className="h-12 mb-4 bg-gray-100 animate-pulse rounded-md" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </main>
    </div>
  );
}

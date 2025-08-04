const ProductCardSkeleton = () => {
  return (
    <div className="relative group bg-[#00d9ff05] flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 shadow-md animate-pulse">
      {/* Image Placeholder */}
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-sm bg-gray-200">
        {/* Optional: Discount Tag Placeholder */}
        <div className="absolute top-4 left-4 m-2">
          <div className="h-5 w-12 rounded-[2px] bg-gray-300"></div>
        </div>
      </div>

      <div className="relative mt-4 px-5 pb-5">
        {/* Product Name Placeholder */}
        <div className="h-5 w-3/4 rounded bg-gray-200 mb-[2px]"></div>
        {/* Product Description Placeholder */}
        <div className="h-4 w-full rounded bg-gray-200"></div>

        <div className="mt-2 mb-5 flex items-center justify-between">
          {/* Price Placeholder */}
          <div className="h-7 w-1/3 rounded bg-gray-200"></div>
          {/* Original Price Placeholder (if discount exists) */}
          <div className="h-4 w-1/4 rounded bg-gray-200 ml-2"></div>
        </div>

        {/* WhatsApp Button Placeholder */}
        <div className="h-10 w-full rounded-sm bg-gray-200"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

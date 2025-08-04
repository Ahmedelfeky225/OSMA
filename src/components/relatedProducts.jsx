"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import ProductCard from "@/components/ui/productCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RelatedProducts = ({ productId }) => {
  const t = useTranslations("products");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!productId) return;

      setLoading(true);
      setError(null);

      try {
        // استخدام fetchInterceptor (سيتم استدعاؤها من server component)
        const response = await fetch(`/api/products/${productId}/related`);

        if (!response.ok) {
          throw new Error("Failed to fetch related products");
        }

        const data = await response.json();
        setRelatedProducts(data?.data || []);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  if (loading) {
    return <RelatedProductsSkeleton />;
  }

  if (error || !relatedProducts?.length) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#7a99c0]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#5a7ba0]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isRTL ? "rtl" : "ltr"}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#7a99c0]/30 to-transparent max-w-24"></div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] bg-clip-text text-transparent whitespace-nowrap">
              {t("related_products") || "منتجات مشابهة"}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#7a99c0]/30 to-transparent max-w-24"></div>
          </div>
          <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("related_products_description") ||
              "اكتشف منتجات مشابهة قد تعجبك"}
          </p>
        </div>

        {/* Products Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              el: ".swiper-pagination-custom",
              clickable: true,
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            dir={isRTL ? "rtl" : "ltr"}
            className="related-products-swiper"
          >
            {relatedProducts.map((product, index) => (
              <SwiperSlide key={product._id || index} className="h-auto">
                <div className="h-full">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className={`swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 ${
              isRTL ? "right-4" : "left-4"
            } z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-600 dark:text-gray-300 hover:bg-[#7a99c0] hover:text-white hover:border-[#7a99c0] transition-all duration-300 hover:scale-110 group`}
          >
            {isRTL ? (
              <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>

          <button
            className={`swiper-button-next-custom absolute top-1/2 -translate-y-1/2 ${
              isRTL ? "left-4" : "right-4"
            } z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-600 dark:text-gray-300 hover:bg-[#7a99c0] hover:text-white hover:border-[#7a99c0] transition-all duration-300 hover:scale-110 group`}
          >
            {isRTL ? (
              <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom flex justify-center mt-8 gap-2"></div>
        </div>
      </div>

      <style jsx global>{`
        .related-products-swiper {
          padding: 20px 0 60px 0;
          overflow: visible;
        }

        .related-products-swiper .swiper-slide {
          height: auto;
          display: flex;
        }

        /* Custom Bullets */
        .custom-bullet {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(122, 153, 192, 0.3);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .custom-bullet::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(45deg, #7a99c0, #5a7ba0);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .custom-bullet:hover {
          transform: scale(1.2);
          background: rgba(122, 153, 192, 0.5);
        }

        .custom-bullet:hover::before {
          opacity: 0.3;
        }

        .custom-bullet-active {
          background: linear-gradient(45deg, #7a99c0, #5a7ba0);
          border-color: rgba(255, 255, 255, 0.3);
          transform: scale(1.3);
          box-shadow: 0 4px 12px rgba(122, 153, 192, 0.4);
        }

        .custom-bullet-active::before {
          opacity: 1;
        }

        /* RTL Support */
        .related-products-swiper[dir="rtl"] .swiper-slide {
          direction: rtl;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .related-products-swiper {
            padding: 10px 0 50px 0;
          }

          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            width: 40px;
            height: 40px;
          }

          .custom-bullet {
            width: 10px;
            height: 10px;
          }
        }

        /* Smooth transitions for all elements */
        .related-products-swiper * {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

// Loading skeleton component
const RelatedProductsSkeleton = () => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className={`text-center mb-12 ${isRTL ? "rtl" : "ltr"}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
            <div className="h-px flex-1 bg-slate-200 dark:bg-gray-700 max-w-24 animate-pulse"></div>
            <div className="h-8 w-48 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse"></div>
            <div className="h-px flex-1 bg-slate-200 dark:bg-gray-700 max-w-24 animate-pulse"></div>
          </div>
          <div className="h-4 w-96 bg-slate-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
        </div>

        {/* Products Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-slate-200 dark:bg-gray-700"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-slate-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-8 bg-slate-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-10 bg-slate-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;

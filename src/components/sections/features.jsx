"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "../ui/productCard";
import SwiperReusable from "../swiper";
import { SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "use-intl";
import { Crown, Sparkles } from "lucide-react";

const Features = ({ exclusiveData }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstance = useRef(null);
  const t = useTranslations("Index");

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header مع شعار OSMA */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-[#7a99c0] dark:text-[#8fa5c8] font-semibold text-lg">
              OSMA
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7a99c0]/10 to-[#5a7ba0]/10 rounded-full border border-[#7a99c0]/20">
              <Crown className="w-5 h-5 text-[#7a99c0]" />
              <span className="text-[#7a99c0] dark:text-[#8fa5c8] font-medium text-sm">
                مجموعة حصرية
              </span>
            </div>
          </div>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] bg-clip-text text-transparent mb-4">
            {t("exclusiveTitle")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] mx-auto rounded-full"></div>

          {/* <p className="text-slate-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            اكتشف مجموعتنا الحصرية من أفخر العطور المختارة بعناية لتناسب ذوقك
            المميز
          </p> */}
        </div>

        {/* Decorative elements */}
        <div className="absolute left-10 top-20 w-32 h-32 bg-gradient-to-br from-[#7a99c0]/5 to-transparent rounded-full blur-xl"></div>
        <div className="absolute right-10 bottom-20 w-24 h-24 bg-gradient-to-br from-[#5a7ba0]/5 to-transparent rounded-full blur-xl"></div>

        <div className="relative">
          {/* الأسهم المحسنة - مثل الأقسام الأخرى */}
          {isLargeScreen && (
            <>
              <button
                ref={prevRef}
                className="cursor-pointer absolute left-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 text-[#7a99c0] rounded-full hover:bg-[#7a99c0] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200 dark:border-gray-700 flex items-center justify-center group"
              >
                <ChevronLeftIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button
                ref={nextRef}
                className="cursor-pointer absolute right-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 text-[#7a99c0] rounded-full hover:bg-[#7a99c0] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200 dark:border-gray-700 flex items-center justify-center group"
              >
                <ChevronRightIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          <SwiperReusable
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={20}
            loop={false}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
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
            navigation={isLargeScreen}
            pagination={!isLargeScreen}
            navigationPrevRef={prevRef}
            navigationNextRef={nextRef}
            paginationRef={paginationRef}
            onSwiper={(swiper) => (swiperInstance.current = swiper)}
            className="features-swiper pb-20 lg:pb-8"
          >
            {exclusiveData?.products.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="group relative">
                  {/* Exclusive Badge */}
                  {/* <div className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-300">
                    <div className="flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      <span className="mt-1">حصري</span>
                    </div>
                  </div> */}

                  {/* Sparkle effect */}
                  <div className="absolute -top-1 -left-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                  </div>

                  {/* Product Card with enhanced styling */}
                  <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-gray-700 group-hover:-translate-y-2">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7a99c0]/0 to-[#5a7ba0]/0 group-hover:from-[#7a99c0]/5 group-hover:to-[#5a7ba0]/5 transition-all duration-500 rounded-2xl"></div>

                    <ProductCard product={product} />

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-2xl"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperReusable>
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-12">
          <button className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] text-white rounded-full hover:shadow-lg hover:shadow-[#7a99c0]/25 transition-all duration-300 font-medium">
            <Crown className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>عرض المجموعة الحصرية</span>
            <ChevronLeftIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div> */}
      </div>

      {/* الـ Bullets المخصصة - مضمونة الظهور */}
      <style jsx global>{`
        .features-swiper .swiper-pagination {
          position: relative !important;
          bottom: 0 !important;
          margin-top: 20px !important;
          height: auto !important;
        }

        .features-swiper .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background: transparent !important;
          border: 2px solid #7a99c0 !important;
          border-radius: 50% !important;
          opacity: 0.4 !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          position: relative !important;
          cursor: pointer !important;
          margin: 0 6px !important;
          display: inline-block !important;
        }

        .features-swiper .swiper-pagination-bullet::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 4px;
          height: 4px;
          background: linear-gradient(135deg, #7a99c0, #5a7ba0);
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .features-swiper .swiper-pagination-bullet::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 20px;
          height: 20px;
          border: 1px solid rgba(122, 153, 192, 0.2);
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .features-swiper .swiper-pagination-bullet:hover {
          opacity: 0.8 !important;
          transform: scale(1.1) !important;
          border-color: #5a7ba0 !important;
        }

        .features-swiper .swiper-pagination-bullet:hover::after {
          transform: translate(-50%, -50%) scale(1);
        }

        .features-swiper .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: linear-gradient(135deg, #7a99c0, #5a7ba0) !important;
          border-color: #7a99c0 !important;
          transform: scale(1.2) !important;
          box-shadow: 0 0 15px rgba(122, 153, 192, 0.3) !important;
        }

        .features-swiper .swiper-pagination-bullet-active::before {
          transform: translate(-50%, -50%) scale(1);
          background: white;
        }

        .features-swiper .swiper-pagination-bullet-active::after {
          transform: translate(-50%, -50%) scale(1);
          border-color: rgba(122, 153, 192, 0.4);
        }

        @media (prefers-color-scheme: dark) {
          .features-swiper .swiper-pagination-bullet {
            border-color: #8fa5c8 !important;
          }

          .features-swiper .swiper-pagination-bullet:hover {
            border-color: #7a99c0 !important;
          }

          .features-swiper .swiper-pagination-bullet-active {
            border-color: #8fa5c8 !important;
            box-shadow: 0 0 15px rgba(143, 165, 200, 0.3) !important;
          }
        }

        /* التأكد من ظهور الـ pagination في الموبايل */
        @media (max-width: 1023px) {
          .features-swiper .swiper-pagination {
            display: block !important;
            visibility: visible !important;
          }
        }

        /* إخفاء الـ pagination في الديسكتوب */
        @media (min-width: 1024px) {
          .features-swiper .swiper-pagination {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Features;

// "use client";
// import { useEffect, useRef, useState } from "react";
// import ProductCard from "../ui/productCard";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
// import { useLocale, useTranslations } from "use-intl";
// import { Percent, Sparkles, Tag } from "lucide-react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const Offers = ({ offersData }) => {
//   const [isLargeScreen, setIsLargeScreen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);
//   const swiperRef = useRef(null);
//   const t = useTranslations("Index");
//   const sectionText = useTranslations("sectionText");
//   const locale = useLocale();

//   useEffect(() => {
//     setMounted(true);
//     const handleResize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (mounted && swiperRef.current && isLargeScreen) {
//       const swiper = swiperRef.current;
//       if (swiper.params && prevRef.current && nextRef.current) {
//         swiper.params.navigation.prevEl = prevRef.current;
//         swiper.params.navigation.nextEl = nextRef.current;
//         swiper.navigation.destroy();
//         swiper.navigation.init();
//         swiper.navigation.update();
//       }
//     }
//   }, [mounted, isLargeScreen]);

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <section className="sm:py-16 pt-12 pb-0 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
//       <div className="max-w-[90%] mx-auto px-4">
//         {/* Header مع شعار OSMA */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 mb-4">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] flex items-center justify-center shadow-lg">
//               <span className="text-white font-bold text-sm">O</span>
//             </div>
//             <span className="text-[#7a99c0] dark:text-[#8fa5c8] font-semibold text-lg">
//               OSMA
//             </span>
//           </div>
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7a99c0]/10 to-[#5a7ba0]/10 rounded-full border border-[#7a99c0]/20">
//               {locale === "ar" && <Tag className="w-5 h-5 text-[#7a99c0]" />}
//               <span className="text-[#7a99c0] dark:text-[#8fa5c8] font-medium text-sm">
//                 {sectionText("special_offers")}
//               </span>
//               {locale === "en" && (
//                 <Tag className="w-5 h-5 text-[#7a99c0] rotate-90" />
//               )}
//             </div>
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] bg-clip-text text-transparent mb-4">
//             {t("offersTitle")}
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] mx-auto rounded-full"></div>
//         </div>

//         <div className="relative">
//           {/* الأسهم للشاشات الكبيرة */}
//           {isLargeScreen && (
//             <>
//               <button
//                 ref={prevRef}
//                 className="cursor-pointer absolute left-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 text-[#7a99c0] rounded-full hover:bg-[#7a99c0] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200 dark:border-gray-700 flex items-center justify-center group"
//               >
//                 <ChevronLeftIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
//               </button>
//               <button
//                 ref={nextRef}
//                 className="cursor-pointer absolute right-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 text-[#7a99c0] rounded-full hover:bg-[#7a99c0] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200 dark:border-gray-700 flex items-center justify-center group"
//               >
//                 <ChevronRightIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
//               </button>
//             </>
//           )}

//           {/* Swiper */}
//           <Swiper
//             modules={[Navigation, Pagination, Autoplay]}
//             spaceBetween={20}
//             slidesPerView={1}
//             slidesPerGroup={1}
//             loop={false}
//             speed={700}
//             touchRatio={2}
//             threshold={1}
//             resistanceRatio={0.85}
//             longSwipesRatio={0.1}
//             breakpoints={{
//               640: { slidesPerView: 1.5, spaceBetween: 16 },
//               768: { slidesPerView: 2, spaceBetween: 20 },
//               1024: { slidesPerView: 3, spaceBetween: 24 },
//               1280: { slidesPerView: 4, spaceBetween: 24 },
//             }}
//             navigation={
//               isLargeScreen
//                 ? {
//                     prevEl: prevRef.current,
//                     nextEl: nextRef.current,
//                   }
//                 : false
//             }
//             pagination={
//               !isLargeScreen
//                 ? {
//                     clickable: true,
//                     dynamicBullets: false,
//                     renderBullet: (index, className) => {
//                       return `<button class="${className} offers-custom-bullet" type="button" aria-label="Go to slide ${
//                         index + 1
//                       }"></button>`;
//                     },
//                   }
//                 : false
//             }
//             onSwiper={(swiper) => {
//               swiperRef.current = swiper;
//             }}
//             className="offers-swiper"
//           >
//             {offersData?.products.map((product, index) => (
//               <SwiperSlide key={index}>
//                 <div className="group relative">
//                   {/* تأثير البريق */}
//                   <div className="absolute -top-1 -left-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                     <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
//                   </div>
//                   {/* كارت المنتج المحسن */}
//                   <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-gray-700 group-hover:-translate-y-2">
//                     <div className="absolute inset-0 bg-gradient-to-br from-[#7a99c0]/0 to-[#5a7ba0]/0 group-hover:from-[#7a99c0]/5 group-hover:to-[#5a7ba0]/5 transition-all duration-500 rounded-2xl"></div>
//                     <ProductCard product={product} />
//                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-2xl"></div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx global>{`
//         /* Offers Swiper Container */
//         .offers-swiper {
//           padding-bottom: 60px !important;
//         }

//         /* Hide pagination on large screens */
//         @media (min-width: 1024px) {
//           .offers-swiper {
//             padding-bottom: 20px !important;
//           }
//           .offers-swiper .swiper-pagination {
//             display: none !important;
//           }
//         }

//         /* Custom Pagination Bullets */
//         .offers-swiper .swiper-pagination {
//           bottom: 0 !important;
//           position: relative !important;
//           margin-top: 30px !important;
//           text-align: center !important;
//         }

//         .offers-swiper .offers-custom-bullet {
//           width: 12px !important;
//           height: 12px !important;
//           background: transparent !important;
//           border: 2px solid #7a99c0 !important;
//           border-radius: 50% !important;
//           opacity: 0.6 !important;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
//           cursor: pointer !important;
//           margin: 0 8px !important; /* مسافة أكبر بين الـ bullets */
//           display: inline-block !important;
//           position: relative !important;
//           outline: none !important;
//           padding: 0 !important;
//           vertical-align: middle !important;
//         }

//         .offers-swiper .offers-custom-bullet:hover {
//           opacity: 0.8 !important;
//           transform: scale(1.1) !important;
//           border-color: #5a7ba0 !important;
//         }

//         .offers-swiper .offers-custom-bullet.swiper-pagination-bullet-active {
//           opacity: 1 !important;
//           background: linear-gradient(135deg, #7a99c0, #5a7ba0) !important;
//           border-color: #7a99c0 !important;
//           transform: scale(1.3) !important;
//           box-shadow: 0 0 15px rgba(122, 153, 192, 0.4) !important;
//         }

//         .offers-swiper .offers-custom-bullet::before {
//           content: "";
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%) scale(0);
//           width: 4px;
//           height: 4px;
//           background: white;
//           border-radius: 50%;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .offers-swiper
//           .offers-custom-bullet.swiper-pagination-bullet-active::before {
//           transform: translate(-50%, -50%) scale(1);
//         }

//         .offers-swiper .offers-custom-bullet::after {
//           content: "";
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%) scale(0);
//           width: 26px;
//           height: 26px;
//           border: 1px solid rgba(122, 153, 192, 0.2);
//           border-radius: 50%;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .offers-swiper .offers-custom-bullet:hover::after {
//           transform: translate(-50%, -50%) scale(1);
//         }

//         .offers-swiper
//           .offers-custom-bullet.swiper-pagination-bullet-active::after {
//           transform: translate(-50%, -50%) scale(1);
//           border-color: rgba(122, 153, 192, 0.4);
//         }

//         /* Dark mode support */
//         @media (prefers-color-scheme: dark) {
//           .offers-swiper .offers-custom-bullet {
//             border-color: #8fa5c8 !important;
//           }

//           .offers-swiper .offers-custom-bullet:hover {
//             border-color: #7a99c0 !important;
//           }

//           .offers-swiper .offers-custom-bullet.swiper-pagination-bullet-active {
//             border-color: #8fa5c8 !important;
//             box-shadow: 0 0 15px rgba(143, 165, 200, 0.4) !important;
//           }

//           .offers-swiper .offers-custom-bullet::after {
//             border-color: rgba(143, 165, 200, 0.2);
//           }

//           .offers-swiper
//             .offers-custom-bullet.swiper-pagination-bullet-active::after {
//             border-color: rgba(143, 165, 200, 0.4);
//           }
//         }

//         /* Mobile specific adjustments */
//         @media (max-width: 640px) {
//           .offers-swiper .offers-custom-bullet {
//             width: 10px !important;
//             height: 10px !important;
//             margin: 0 6px !important;
//           }

//           .offers-swiper .offers-custom-bullet.swiper-pagination-bullet-active {
//             transform: scale(1.4) !important;
//             margin: 0 10px !important;
//           }

//           .offers-swiper .offers-custom-bullet::after {
//             width: 22px !important;
//             height: 22px !important;
//           }
//         }

//         /* Tablet adjustments */
//         @media (min-width: 641px) and (max-width: 1023px) {
//           .offers-swiper .offers-custom-bullet {
//             width: 11px !important;
//             height: 11px !important; /* مسافة متوسطة للتابلت */
//             margin: 0 7px !important;
//           }

//           .features-swiper .features-custom-bullet {
//             margin: 0 6px !important;
//           }
//           .offers-swiper .offers-custom-bullet.swiper-pagination-bullet-active {
//             transform: scale(1.35) !important;
//             margin: 0 10px !important;
//           }

//           .offers-swiper .offers-custom-bullet::after {
//             width: 24px !important;
//             height: 24px !important;
//           }
//         }

//         /* Ensure bullets are visible */
//         .offers-swiper .swiper-pagination-bullet {
//           display: inline-block !important;
//           visibility: visible !important;
//         }

//         .offers-swiper .swiper-pagination {
//           display: block !important;
//           visibility: visible !important;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Offers;

"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "../ui/productCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "use-intl";
import { Percent, Sparkles, Tag } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Offers = ({ offersData }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef(null);

  const t = useTranslations("Index");
  const sectionText = useTranslations("sectionText");
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Custom navigation handlers
  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  // Update direction when locale changes
  useEffect(() => {
    if (mounted && swiperRef.current) {
      const swiper = swiperRef.current;

      const timer = setTimeout(() => {
        // Force update direction
        swiper.changeLanguageDirection(isRTL ? "rtl" : "ltr");
        swiper.update();
        swiper.updateSize();
        swiper.updateSlides();

        // Reset to first slide
        swiper.slideTo(0, 0);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [mounted, locale, isRTL]);

  if (!mounted) {
    return null;
  }

  return (
    <section
      className="sm:py-16 pt-12 pb-0 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-[90%] mx-auto px-4">
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
              {locale === "ar" && <Tag className="w-5 h-5 text-[#7a99c0]" />}
              <span className="text-[#7a99c0] dark:text-[#8fa5c8] font-medium text-sm">
                {sectionText("special_offers")}
              </span>
              {locale === "en" && (
                <Tag className="w-5 h-5 text-[#7a99c0] rotate-90" />
              )}
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] bg-clip-text text-transparent mb-4">
            {t("offersTitle")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* الأسهم للشاشات الكبيرة */}
          {isLargeScreen && (
            <>
              <button
                onClick={handlePrevClick}
                className={`cursor-pointer absolute ${
                  isRTL ? "right-4" : "left-4"
                } top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 text-[#7a99c0] rounded-full hover:bg-[#7a99c0] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200 dark:border-gray-700 flex items-center justify-center group`}
                aria-label={isRTL ? "الشريحة السابقة" : "Previous slide"}
              >
                {isRTL ? (
                  <ChevronRightIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                ) : (
                  <ChevronLeftIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
              </button>
              <button
                onClick={handleNextClick}
                className={`cursor-pointer absolute ${
                  isRTL ? "left-4" : "right-4"
                } top-1/2 z-10 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 text-[#7a99c0] rounded-full hover:bg-[#7a99c0] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200 dark:border-gray-700 flex items-center justify-center group`}
                aria-label={isRTL ? "الشريحة التالية" : "Next slide"}
              >
                {isRTL ? (
                  <ChevronLeftIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                ) : (
                  <ChevronRightIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
              </button>
            </>
          )}

          {/* Swiper */}
          <Swiper
            key={`${locale}-${mounted}-${offersData?.products?.length || 0}`}
            modules={[Navigation, Pagination, Autoplay]}
            dir={isRTL ? "rtl" : "ltr"}
            spaceBetween={20}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={false}
            speed={700}
            touchRatio={2}
            threshold={1}
            resistanceRatio={0.85}
            longSwipesRatio={0.1}
            observer={true}
            observeParents={true}
            centeredSlides={false}
            initialSlide={0}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            navigation={false} // استخدام custom navigation
            pagination={
              !isLargeScreen
                ? {
                    clickable: true,
                    dynamicBullets: false,
                    renderBullet: (index, className) => {
                      return `<button class="${className} offers-custom-bullet" type="button" aria-label="${
                        isRTL
                          ? `انتقل إلى الشريحة ${index + 1}`
                          : `Go to slide ${index + 1}`
                      }"></button>`;
                    },
                  }
                : false
            }
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onInit={(swiper) => {
              swiper.changeLanguageDirection(isRTL ? "rtl" : "ltr");
            }}
            className="offers-swiper"
          >
            {offersData?.products?.map((product, index) => (
              <SwiperSlide key={product._id || index}>
                <div className="group relative">
                  {/* تأثير البريق */}
                  <div
                    className={`absolute -top-1 ${
                      isRTL ? "-right-1" : "-left-1"
                    } z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                  </div>
                  {/* كارت المنتج المحسن */}
                  <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-gray-700 group-hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7a99c0]/0 to-[#5a7ba0]/0 group-hover:from-[#7a99c0]/5 group-hover:to-[#5a7ba0]/5 transition-all duration-500 rounded-2xl"></div>
                    <ProductCard product={product} />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-2xl"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Offers Swiper Container */
        .offers-swiper {
          padding-bottom: 60px !important;
        }

        /* RTL Support for Swiper */
        .offers-swiper[dir="rtl"] .swiper-slide {
          text-align: right;
        }

        /* Hide pagination on large screens */
        @media (min-width: 1024px) {
          .offers-swiper {
            padding-bottom: 20px !important;
          }
          .offers-swiper .swiper-pagination {
            display: none !important;
          }
        }

        /* Custom Pagination Bullets */
        .offers-swiper .swiper-pagination {
          bottom: 0 !important;
          position: relative !important;
          margin-top: 30px !important;
          text-align: center !important;
        }

        .offers-swiper .offers-custom-bullet {
          width: 12px !important;
          height: 12px !important;
          background: transparent !important;
          border: 2px solid #7a99c0 !important;
          border-radius: 50% !important;
          opacity: 0.6 !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer !important;
          margin: 0 8px !important;
          display: inline-block !important;
          position: relative !important;
          outline: none !important;
          padding: 0 !important;
          vertical-align: middle !important;
        }

        .offers-swiper .offers-custom-bullet:hover {
          opacity: 0.8 !important;
          transform: scale(1.1) !important;
          border-color: #5a7ba0 !important;
        }

        .offers-swiper .offers-custom-bullet.swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: linear-gradient(135deg, #7a99c0, #5a7ba0) !important;
          border-color: #7a99c0 !important;
          transform: scale(1.3) !important;
          box-shadow: 0 0 15px rgba(122, 153, 192, 0.4) !important;
        }

        .offers-swiper .offers-custom-bullet::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .offers-swiper
          .offers-custom-bullet.swiper-pagination-bullet-active::before {
          transform: translate(-50%, -50%) scale(1);
        }

        .offers-swiper .offers-custom-bullet::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 26px;
          height: 26px;
          border: 1px solid rgba(122, 153, 192, 0.2);
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .offers-swiper .offers-custom-bullet:hover::after {
          transform: translate(-50%, -50%) scale(1);
        }

        .offers-swiper
          .offers-custom-bullet.swiper-pagination-bullet-active::after {
          transform: translate(-50%, -50%) scale(1);
          border-color: rgba(122, 153, 192, 0.4);
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .offers-swiper .offers-custom-bullet {
            border-color: #8fa5c8 !important;
          }
          .offers-swiper .offers-custom-bullet:hover {
            border-color: #7a99c0 !important;
          }
          .offers-swiper .offers-custom-bullet.swiper-pagination-bullet-active {
            border-color: #8fa5c8 !important;
            box-shadow: 0 0 15px rgba(143, 165, 200, 0.4) !important;
          }
          .offers-swiper .offers-custom-bullet::after {
            border-color: rgba(143, 165, 200, 0.2);
          }
          .offers-swiper
            .offers-custom-bullet.swiper-pagination-bullet-active::after {
            border-color: rgba(143, 165, 200, 0.4);
          }
        }

        /* Mobile specific adjustments */
        @media (max-width: 640px) {
          .offers-swiper .offers-custom-bullet {
            width: 10px !important;
            height: 10px !important;
            margin: 0 6px !important;
          }
          .offers-swiper .offers-custom-bullet.swiper-pagination-bullet-active {
            transform: scale(1.4) !important;
            margin: 0 10px !important;
          }
          .offers-swiper .offers-custom-bullet::after {
            width: 22px !important;
            height: 22px !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 641px) and (max-width: 1023px) {
          .offers-swiper .offers-custom-bullet {
            width: 11px !important;
            height: 11px !important;
            margin: 0 7px !important;
          }
          .offers-swiper .offers-custom-bullet.swiper-pagination-bullet-active {
            transform: scale(1.35) !important;
            margin: 0 10px !important;
          }
          .offers-swiper .offers-custom-bullet::after {
            width: 24px !important;
            height: 24px !important;
          }
        }

        /* Ensure bullets are visible */
        .offers-swiper .swiper-pagination-bullet {
          display: inline-block !important;
          visibility: visible !important;
        }

        .offers-swiper .swiper-pagination {
          display: block !important;
          visibility: visible !important;
        }
      `}</style>
    </section>
  );
};

export default Offers;

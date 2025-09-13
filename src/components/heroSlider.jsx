"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { heroImages } from "@/data";
import { useParams } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSlider = () => {
  const params = useParams();
  const locale = params?.locale || "en";

  return (
    <div className="relative w-full h-[70vw] sm:h-[calc(100vh-90px)] overflow-hidden z-0">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        className="w-full h-full z-0"
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index} className="relative z-0">
            <div
              className="absolute inset-0 bg-cover lg:bg-top bg-no-repeat bg-[0%] z-0"
              style={{ backgroundImage: `url(${image.src})` }}
            />
            {index === 0 && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10" />
                <div className="absolute inset-0 bg-black/30 z-10" />
              </>
            )}

            {index === 0 && (
              <div
                className={`absolute inset-0 flex flex-col justify-center z-20 text-white px-4 sm:px-8 md:px-12 lg:px-20 ${
                  locale === "ar"
                    ? "items-end text-right"
                    : "items-start text-left"
                }`}
              >
                <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl space-y-3 sm:space-y-4 md:space-y-6">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance drop-shadow-2xl">
                    {locale === "ar" ? (
                      <>
                        <span className="block text-sky-200 drop-shadow-lg">
                          اكتشف عالم
                        </span>
                        <span className="block text-white drop-shadow-lg">
                          الجمال الأسطوري
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="block text-sky-200 drop-shadow-lg">
                          Discover
                        </span>
                        <span className="block text-white drop-shadow-lg">
                          Legendary Beauty
                        </span>
                      </>
                    )}
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed text-gray-50 text-pretty drop-shadow-lg">
                    {locale === "ar"
                      ? "عطور فاخرة تحكي قصة جمالك الفريد - خصومات حصرية تصل إلى 55% على مجموعة مختارة من أرقى العطور العالمية"
                      : "Luxury fragrances that tell your unique beauty story - Exclusive discounts up to 55% on our curated collection of world's finest perfumes"}
                  </p>

                  {/* Enhanced button with sky blue color */}
                  <div className="pt-2 sm:pt-4">
                    <a
                      href="/shop"
                      className="group inline-flex items-center gap-2 sm:gap-3 bg-sky-500 hover:bg-sky-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/25 drop-shadow-lg"
                    >
                      <span>
                        {locale === "ar"
                          ? "اكتشف المجموعة"
                          : "Explore Collection"}
                      </span>
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 ${
                          locale === "ar" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 pt-1 sm:pt-2">
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-sky-100 drop-shadow-md">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {locale === "ar" ? "شحن مجاني" : "Free Shipping"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-sky-100 drop-shadow-md">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {locale === "ar" ? "ضمان الجودة" : "Quality Guarantee"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;

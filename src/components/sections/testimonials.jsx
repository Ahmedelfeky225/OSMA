"use client";

import { SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/pagination";
import PaceholderImage from "@/assets/imgs/PaceholderImage.webp";
import CustomImage from "../customImage";
import SwiperReusable from "../swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstance = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
    {
      name: t("name.ahmed"),
      comment: t("comment.ahmed"),
      rating: 5,
      avatar: PaceholderImage,
    },
    {
      name: t("name.sarah"),
      comment: t("comment.sarah"),
      rating: 4,
      avatar: PaceholderImage,
    },
    {
      name: t("name.khaled"),
      comment: t("comment.khaled"),
      rating: 5,
      avatar: PaceholderImage,
    },
    {
      name: t("name.ahmed"),
      comment: t("comment.ahmed"),
      rating: 5,
      avatar: PaceholderImage,
    },
    {
      name: t("name.sarah"),
      comment: t("comment.sarah"),
      rating: 4,
      avatar: PaceholderImage,
    },
    {
      name: t("name.ahmed"),
      comment: t("comment.ahmed"),
      rating: 5,
      avatar: PaceholderImage,
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="sm:py-16 py-12 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-[90%] mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-[#7a99c0] dark:text-[#8fa5c8] font-semibold text-lg">
              OSMA
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] bg-clip-text text-transparent mb-4">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] mx-auto rounded-full"></div>
        </div>

        <div className="relative">
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
            navigation={isLargeScreen}
            pagination={!isLargeScreen}
            navigationPrevRef={prevRef}
            navigationNextRef={nextRef}
            paginationRef={paginationRef}
            onSwiper={(swiper) => (swiperInstance.current = swiper)}
            slidesPerView={1}
            spaceBetween={20}
            loop
            autoplay={{ delay: 4000 }}
            modules={[Autoplay, Pagination]}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="testimonials-swiper pb-16 lg:pb-8"
          >
            {testimonials.map((tst, i) => (
              <SwiperSlide key={i}>
                <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-gray-700 min-h-[280px] flex flex-col">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-8 h-8 text-[#7a99c0]" />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-3 left-3 w-16 h-16 bg-gradient-to-br from-[#7a99c0]/8 to-transparent rounded-full"></div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 bg-gradient-to-br from-[#7a99c0]/5 to-transparent rounded-full"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* User Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <CustomImage
                          src={tst.avatar}
                          alt={tst.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#7a99c0]/20 group-hover:border-[#7a99c0]/40 transition-colors"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            ✓
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 dark:text-gray-200 text-lg">
                          {tst.name}
                        </p>
                        <div className="mt-1">{renderStars(tst.rating)}</div>
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="flex-1 flex items-center">
                      <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-4 italic">
                        "{tst.comment}"
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-gray-700">
                      <div className="w-12 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] rounded-full group-hover:w-16 transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperReusable>
        </div>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background: transparent !important;
          border: 2px solid #7a99c0 !important;
          border-radius: 50% !important;
          opacity: 0.4 !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          margin: 0 6px !important;
        }

        .testimonials-swiper .swiper-pagination-bullet::before {
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

        .testimonials-swiper .swiper-pagination-bullet::after {
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

        .testimonials-swiper .swiper-pagination-bullet:hover {
          opacity: 0.8 !important;
          transform: scale(1.1) !important;
          border-color: #5a7ba0 !important;
        }

        .testimonials-swiper .swiper-pagination-bullet:hover::after {
          transform: translate(-50%, -50%) scale(1);
        }

        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: linear-gradient(135deg, #7a99c0, #5a7ba0) !important;
          border-color: #7a99c0 !important;
          transform: scale(1.2) !important;
          box-shadow: 0 0 15px rgba(122, 153, 192, 0.3) !important;
        }

        .testimonials-swiper .swiper-pagination-bullet-active::before {
          transform: translate(-50%, -50%) scale(1);
          background: white;
        }

        .testimonials-swiper .swiper-pagination-bullet-active::after {
          transform: translate(-50%, -50%) scale(1);
          border-color: rgba(122, 153, 192, 0.4);
        }

        @media (prefers-color-scheme: dark) {
          .testimonials-swiper .swiper-pagination-bullet {
            border-color: #8fa5c8 !important;
          }

          .testimonials-swiper .swiper-pagination-bullet:hover {
            border-color: #7a99c0 !important;
          }

          .testimonials-swiper .swiper-pagination-bullet-active {
            border-color: #8fa5c8 !important;
            box-shadow: 0 0 15px rgba(143, 165, 200, 0.3) !important;
          }
        }
      `}</style>
    </section>
  );
}

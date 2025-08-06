"use client";

import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Truck, ShieldCheck, Headphones, CreditCard, Gift } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function WhyUsSection() {
  const t = useTranslations("why_us");

  const features = [
    {
      text: t("features.shipping"),
      icon: Truck,
      gradient: "from-[#7a99c0] to-[#5a7ba0]",
    },
    {
      text: t("features.authentic"),
      icon: ShieldCheck,
      gradient: "from-[#8fa5c8] to-[#7a99c0]",
    },
    {
      text: t("features.support"),
      icon: Headphones,
      gradient: "from-[#6b8bb5] to-[#5a7ba0]",
    },
    {
      text: t("features.payment"),
      icon: CreditCard,
      gradient: "from-[#7a99c0] to-[#6b8bb5]",
    },
    {
      text: t("features.packaging"),
      icon: Gift,
      gradient: "from-[#5a7ba0] to-[#8fa5c8]",
    },
  ];

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

        {/* Mobile Swiper */}
        <div className="block lg:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} custom-bullet"></span>`;
              },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.3,
              },
              640: {
                slidesPerView: 2.2,
              },
            }}
            className="pb-20"
          >
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <SwiperSlide key={idx}>
                  <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 px-6 py-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-gray-700 min-h-[200px] flex items-center">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    {/* Decorative elements */}
                    <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-[#7a99c0]/8 to-transparent rounded-full"></div>
                    <div className="absolute bottom-3 left-3 w-8 h-8 bg-gradient-to-br from-[#7a99c0]/5 to-transparent rounded-full"></div>

                    <div className="relative z-10 flex items-center gap-4 w-full">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300 flex-shrink-0`}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-base font-semibold text-slate-700 dark:text-gray-200 leading-relaxed flex-1">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 px-6 py-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-gray-700 hover:-translate-y-2 min-h-[200px] flex items-center"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Decorative elements */}
                <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-[#7a99c0]/8 to-transparent rounded-full"></div>
                <div className="absolute bottom-3 left-3 w-8 h-8 bg-gradient-to-br from-[#7a99c0]/5 to-transparent rounded-full"></div>

                <div className="relative z-10 flex flex-col items-center text-center space-y-4 w-full">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-base font-semibold text-slate-700 dark:text-gray-200 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .custom-bullet {
          width: 10px !important;
          height: 10px !important;
          background: transparent !important;
          border: 2px solid #7a99c0 !important;
          border-radius: 50% !important;
          opacity: 0.4 !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          position: relative !important;
          cursor: pointer !important;
          margin: 0 7px !important;
        }

        .custom-bullet::before {
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

        .custom-bullet::after {
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

        .custom-bullet:hover {
          opacity: 0.8 !important;
          transform: scale(1.1) !important;
          border-color: #5a7ba0 !important;
        }

        .custom-bullet:hover::after {
          transform: translate(-50%, -50%) scale(1);
        }

        .swiper-pagination-bullet-active.custom-bullet {
          opacity: 1 !important;
          background: linear-gradient(135deg, #7a99c0, #5a7ba0) !important;
          border-color: #7a99c0 !important;
          transform: scale(1.2) !important;
          box-shadow: 0 0 15px rgba(122, 153, 192, 0.3) !important;
        }

        .swiper-pagination-bullet-active.custom-bullet::before {
          transform: translate(-50%, -50%) scale(1);
          background: white;
        }

        .swiper-pagination-bullet-active.custom-bullet::after {
          transform: translate(-50%, -50%) scale(1);
          border-color: rgba(122, 153, 192, 0.4);
        }

        .swiper-pagination {
          bottom: 10px !important;
          padding: 10 0px !important;
        }

        @media (prefers-color-scheme: dark) {
          .custom-bullet {
            border-color: #8fa5c8 !important;
          }

          .custom-bullet:hover {
            border-color: #7a99c0 !important;
          }

          .swiper-pagination-bullet-active.custom-bullet {
            border-color: #8fa5c8 !important;
            box-shadow: 0 0 15px rgba(143, 165, 200, 0.3) !important;
          }
        }
      `}</style>
    </section>
  );
}

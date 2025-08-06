"use client";
import React, { useEffect, useRef } from "react";
import { Swiper } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  Thumbs,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperReusable = ({
  children,
  modules = [],
  navigation = false,
  pagination = false,
  autoplay = false,
  effect,
  spaceBetween = 20,
  breakpoints = {},
  slidesPerView = 1,
  loop = true,
  slidesPerGroup = 1,
  navigationPrevRef,
  navigationNextRef,
  paginationRef,
  onSwiper,
  className = "",
  ...rest
}) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (
      navigation &&
      swiperRef.current &&
      navigationPrevRef?.current &&
      navigationNextRef?.current
    ) {
      swiperRef.current.params.navigation.prevEl = navigationPrevRef.current;
      swiperRef.current.params.navigation.nextEl = navigationNextRef.current;
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [navigation, navigationPrevRef, navigationNextRef]);

  // تحديث الـ pagination عند تغيير الـ ref
  useEffect(() => {
    if (pagination && swiperRef.current && paginationRef?.current) {
      swiperRef.current.params.pagination.el = paginationRef.current;
      swiperRef.current.pagination.destroy();
      swiperRef.current.pagination.init();
      swiperRef.current.pagination.update();
    }
  }, [pagination, paginationRef]);

  return (
    <>
      <Swiper
        modules={[
          ...modules,
          Navigation,
          Pagination,
          Autoplay,
          EffectFade,
          Thumbs,
        ]}
        navigation={
          navigation
            ? {
                prevEl: navigationPrevRef?.current,
                nextEl: navigationNextRef?.current,
              }
            : false
        }
        pagination={
          pagination
            ? {
                el: paginationRef?.current,
                clickable: true,
                dynamicBullets: false,
                renderBullet: (index, className) => {
                  return `<button class="${className} custom-pagination-bullet" aria-label="Go to slide ${
                    index + 1
                  }"></button>`;
                },
              }
            : false
        }
        autoplay={autoplay}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        loop={loop}
        speed={700}
        touchRatio={2}
        threshold={1}
        resistanceRatio={0.85}
        longSwipesRatio={0.1}
        breakpoints={breakpoints}
        className={className}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (onSwiper) onSwiper(swiper);
        }}
        {...rest}
      >
        {children}
      </Swiper>

      <style jsx global>{`
        /* Custom Pagination Styles */
        .custom-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: transparent !important;
          border: 2px solid #7a99c0 !important;
          border-radius: 50% !important;
          opacity: 0.5 !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
          margin: 0 4px !important;
          display: inline-block !important;
          position: relative !important;
          outline: none !important;
        }

        .custom-pagination-bullet:hover {
          opacity: 0.8 !important;
          transform: scale(1.1) !important;
          border-color: #5a7ba0 !important;
        }

        .custom-pagination-bullet.swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: linear-gradient(135deg, #7a99c0, #5a7ba0) !important;
          border-color: #7a99c0 !important;
          transform: scale(1.3) !important;
          box-shadow: 0 0 12px rgba(122, 153, 192, 0.4) !important;
        }

        .custom-pagination-bullet::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .custom-pagination-bullet.swiper-pagination-bullet-active::before {
          transform: translate(-50%, -50%) scale(1);
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .custom-pagination-bullet {
            border-color: #8fa5c8 !important;
          }

          .custom-pagination-bullet:hover {
            border-color: #7a99c0 !important;
          }

          .custom-pagination-bullet.swiper-pagination-bullet-active {
            border-color: #8fa5c8 !important;
            box-shadow: 0 0 12px rgba(143, 165, 200, 0.4) !important;
          }
        }

        /* Ensure pagination container is visible */
        .swiper-pagination {
          position: static !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          margin-top: 20px !important;
        }

        /* Features specific styles */
        .features-swiper .swiper-pagination {
          margin-top: 30px !important;
        }

        /* Mobile specific adjustments */
        @media (max-width: 1023px) {
          .custom-pagination-bullet {
            width: 10px !important;
            height: 10px !important;
            margin: 0 3px !important;
          }

          .custom-pagination-bullet.swiper-pagination-bullet-active {
            transform: scale(1.4) !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 768px) and (max-width: 1023px) {
          .custom-pagination-bullet {
            width: 11px !important;
            height: 11px !important;
            margin: 0 4px !important;
          }
        }
      `}</style>
    </>
  );
};

export default SwiperReusable;

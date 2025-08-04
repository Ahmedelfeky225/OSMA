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

      swiperRef.current.navigation.destroy(); // مهم علشان تعيد التهيئة
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [navigation, navigationPrevRef, navigationNextRef]);

  return (
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
              renderBullet: (index, className) =>
                `<span class="${className} w-3 h-3 bg-gray-300 rounded-full mx-1 inline-block"></span>`,
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
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
        if (onSwiper) onSwiper(swiper);
      }}
      {...rest}
    >
      {children}
    </Swiper>
  );
};

export default SwiperReusable;

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { heroImages } from "@/data";

// استيراد ستايلات Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSlider = () => {
  return (
    <div className="relative w-full h-[65vw] sm:h-[calc(100vh-90px)] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
        slidesPerView={1}
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image.src})` }}
            />
            <div className="absolute inset-0 bg-black/20 z-0" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;

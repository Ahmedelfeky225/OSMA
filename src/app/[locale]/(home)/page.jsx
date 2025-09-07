import HeroSlider from "@/components/heroSlider";
import CategoriesSection from "@/components/sections/categories";
import Features from "@/components/sections/features";
import Offers from "@/components/sections/offers";
import TestimonialsSection from "@/components/sections/testimonials";
import Video from "@/components/sections/video";
import WhyUsSection from "@/components/sections/whyUs";
import { fetchInterceptor } from "@/utils/fetchInterceptor";
import { useTranslations } from "next-intl";
import React from "react";

const page = async () => {
  // const t = useTranslations("");
  const offersProducts = await fetchInterceptor("products/offers?limit=6", {
    method: "GET",
  });
  const exclusiveProducts = await fetchInterceptor(
    "products/featured?limit=6",
    {
      method: "GET",
    }
  );
  const categories = await fetchInterceptor("categories", {
    method: "GET",
  });

  // console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);

  return (
    <div className=" !pt-[90px]">
      <HeroSlider />
      <Video />
      <Offers offersData={offersProducts} />
      <CategoriesSection categories={categories} />
      <Features exclusiveData={exclusiveProducts} />
      <TestimonialsSection />
      <WhyUsSection />
    </div>
  );
};

export default page;

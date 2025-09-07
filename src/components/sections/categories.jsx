"use client";

import { categories } from "@/data";
import CategoryCard from "@/components/ui/categoriesCard";
import { useTranslations } from "next-intl";
import CustomMarquee from "@/components/customMarquee";

const CategoriesSection = ({ categories: propCategories }) => {
  const t = useTranslations("Index");
  const categoriesToRender = propCategories || categories;

  return (
    <section className="sm:py-12 pb-8 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-[90%] mx-auto">
        <div className="text-center sm:mb-12 mb-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-[#7a99c0] dark:text-[#8fa5c8] font-semibold text-lg">
              OSMA
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] bg-clip-text text-transparent mb-4">
            {t("categoriesTitle")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] mx-auto rounded-full"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute left-10 top-20 w-32 h-32 bg-gradient-to-br from-[#7a99c0]/5 to-transparent rounded-full blur-xl"></div>
        <div className="absolute right-10 bottom-20 w-24 h-24 bg-gradient-to-br from-[#5a7ba0]/5 to-transparent rounded-full blur-xl"></div>

        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

          <CustomMarquee speed={50} pauseOnHover={true} className="py-4">
            {categoriesToRender.map((category, index) => (
              <div
                key={`${category._id}-${index}`}
                className="mx-3 flex-shrink-0 group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-gray-700 group-hover:-translate-y-2">
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7a99c0]/0 to-[#5a7ba0]/0 group-hover:from-[#7a99c0]/5 group-hover:to-[#5a7ba0]/5 transition-all duration-500"></div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-[#7a99c0]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-br from-[#5a7ba0]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CategoryCard category={category} />

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))}
          </CustomMarquee>
        </div>

        {/* Bottom decorative text */}
      </div>
    </section>
  );
};

export default CategoriesSection;

"use client";

import { categories } from "@/data";
import CategoryCard from "@/components/ui/categoriesCard";
import { useTranslations } from "next-intl";
import CustomMarquee from "@/components/customMarquee";

const CategoriesSection = ({ categories: propCategories }) => {
  const t = useTranslations("Index");
  const categoriesToRender = propCategories || categories;
  return (
    <div className="max-w-[90%]  mx-auto pb-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 px-2 md:px-0">
        {t("categoriesTitle")}
      </h2>
      <div className="overflow-hidden">
        <CustomMarquee speed={70} pauseOnHover={true}>
          {categoriesToRender.map((category, index) => (
            // Removed mx-2 from here, as gap-x-4 on parent handles spacing
            <div key={`${category._id}-${index}`} className="flex-shrink-0">
              <CategoryCard category={category} />
            </div>
          ))}
        </CustomMarquee>
      </div>
    </div>
  );
};

export default CategoriesSection;

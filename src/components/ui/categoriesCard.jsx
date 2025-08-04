"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

const CategoryCard = ({ category }) => {
  const locale = useLocale();

  return (
    <div className="group relative block min-w-[280px] mx-2 py-4">
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-gray-700 hover:-translate-y-1 min-h-[150px]">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7a99c0]/0 to-[#5a7ba0]/0 group-hover:from-[#7a99c0]/5 group-hover:to-[#5a7ba0]/5 transition-all duration-500"></div>

        {/* Decorative elements */}
        <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-[#7a99c0]/8 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-3 left-3 w-8 h-8 bg-gradient-to-br from-[#5a7ba0]/8 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Sparkle icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7a99c0]/20 to-[#5a7ba0]/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#7a99c0]" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-6 h-full">
          {/* OSMA Logo SVG */}
          <div className="relative group-hover:scale-110 transition-transform duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 80"
              width="120"
              height="48"
              className="transition-all duration-500 group-hover:drop-shadow-lg"
            >
              <defs>
                <linearGradient
                  id={`categoryGradient-${category.slug}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#7a99c0" />
                  <stop offset="50%" stopColor="#7a99c0ac" />
                  <stop offset="100%" stopColor="#7a99c07e" />
                </linearGradient>
                <filter id={`glow-${category.slug}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <text
                x="100"
                y="50"
                fontFamily="Georgia, serif"
                fontSize="42"
                fontWeight="bold"
                fill={`url(#categoryGradient-${category.slug})`}
                textAnchor="middle"
                letterSpacing="2px"
                filter={`url(#glow-${category.slug})`}
                className="group-hover:animate-pulse"
              >
                OSMA
              </text>
            </svg>

            {/* Decorative ring around logo */}
            <div className="absolute inset-0 rounded-full border-2 border-[#7a99c0]/20 group-hover:border-[#7a99c0]/40 transition-colors duration-500 transform scale-150 opacity-0 group-hover:opacity-100"></div>
          </div>

          {/* Category Name */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-slate-800 dark:text-gray-200 tracking-wide group-hover:text-[#7a99c0] dark:group-hover:text-[#8fa5c8] transition-colors duration-300">
              {category.translations[locale].name}
            </h3>

            {/* Subtitle or description if available */}
            {category.translations[locale].description && (
              <p className="text-sm text-slate-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {category.translations[locale].description}
              </p>
            )}
          </div>

          {/* Action indicator */}
          <div className="flex items-center gap-2 text-[#7a99c0] dark:text-[#8fa5c8] text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            <Link href={`/categories/${category.slug}`}>
              {locale == "ar" ? "استكشف المجموعة" : "Explore the Collection"}
            </Link>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>

        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[#7a99c0]/20 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[#7a99c0]/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Floating shadow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7a99c0]/10 to-[#5a7ba0]/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 transform translate-y-4"></div>
    </div>
  );
};

export default CategoryCard;

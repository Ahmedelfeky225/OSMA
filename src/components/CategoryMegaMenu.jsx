// "use client";

// import { useState } from "react";
// import { Link } from "@/i18n/navigation";
// import { useTranslations } from "next-intl";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import { motion, AnimatePresence } from "framer-motion";

// const CategoryMegaMenu = ({ item }) => {
//   const t = useTranslations("Index");
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       <button className="flex items-center gap-2 text-[15px] font-medium tracking-wide text-foreground hover:text-[var(--primary-color)] transition-colors duration-200 group">
//         {t(item.label)}
//         <ChevronDownIcon
//           className={`w-4 h-4 transition-transform duration-200 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//             transition={{ duration: 0.2, ease: "easeOut" }}
//             className="absolute z-[100] left-2/3 top-full -translate-x-1/2 mt-2 w-[90vw] max-w-[650px] bg-muted shadow-2xl rounded-md p-4 px-3 backdrop-blur-sm"
//           >
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {item.subItems?.slice(0, 6).map((sub, index) => (
//                 <Link
//                   key={index}
//                   href={sub.href}
//                   className="group flex items-center gap-3 p-3 rounded-lg hover:bg-[#cccccc26]"
//                 >
//                   <div className="bg-gradient-to-br ">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 100 140"
//                       fill="none"
//                       className="w-6 h-auto"
//                     >
//                       <defs>
//                         <linearGradient
//                           id={`grad-${index}`}
//                           x1="0"
//                           y1="0"
//                           x2="0"
//                           y2="1"
//                         >
//                           <stop offset="0%" stopColor="var(--primary-color)" />
//                           <stop
//                             offset="100%"
//                             stopColor="var(--primary-color-hover)"
//                           />
//                         </linearGradient>
//                       </defs>
//                       <rect
//                         x="35"
//                         y="5"
//                         width="30"
//                         height="12"
//                         rx="2"
//                         fill="#333"
//                       />
//                       <rect
//                         x="38"
//                         y="17"
//                         width="24"
//                         height="12"
//                         rx="2"
//                         fill="#555"
//                       />
//                       <rect
//                         x="20"
//                         y="32"
//                         width="60"
//                         height="90"
//                         rx="12"
//                         fill={`url(#grad-${index})`}
//                         stroke="var(--primary-color-dark)"
//                         strokeWidth="2"
//                       />
//                       <text
//                         x="50"
//                         y="85"
//                         textAnchor="middle"
//                         fontFamily="Arial, sans-serif"
//                         fontSize="14"
//                         fontWeight="bold"
//                         fill="#fff"
//                       >
//                         OSMA
//                       </text>
//                     </svg>
//                   </div>
//                   <div className="flex flex-col">
//                     <p className="text-sm font-semibold  text-foreground mb-1 group-hover:text-[var(--primary-color)] transition-colors">
//                       {t(sub.label)}
//                     </p>
//                     <p className="text-xs text-muted-foreground hidden sm:block">
//                       {t(`${sub.label}Desc`) || t("defaultDescription")}
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default CategoryMegaMenu;
"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ChevronDown,
  User,
  Users,
  Sparkles,
  SprayCanIcon as Spray,
  Wind,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CategoryMegaMenu = ({ item }) => {
  const t = useTranslations("Index");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef(null);
  const menuRef = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle mouse enter with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    }
  };

  // Handle mobile click
  const handleMobileClick = (e) => {
    if (isMobile) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  // Close on outside click for mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen && isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, isMobile]);

  // Icon mapping for perfume categories
  const getCategoryIcon = (label) => {
    const iconMap = {
      men: User,
      women: Users,
      unisex: Sparkles,
      hair_perfumes: Sparkles,
      body_sprays: Spray,
      air_fresheners: Wind,
    };
    const IconComponent = iconMap[label] || Home;
    return <IconComponent className="w-5 h-5" />;
  };

  // Get category color scheme - Fixed colors for better contrast
  const getCategoryColors = (label) => {
    const colorMap = {
      men: {
        bg: "from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200",
        icon: "text-blue-600",
        text: "group-hover:text-blue-700",
      },
      women: {
        bg: "from-pink-50 to-pink-100 group-hover:from-pink-100 group-hover:to-pink-200",
        icon: "text-pink-600",
        text: "group-hover:text-pink-700",
      },
      unisex: {
        bg: "from-purple-50 to-purple-100 group-hover:from-purple-100 group-hover:to-purple-200",
        icon: "text-purple-600",
        text: "group-hover:text-purple-700",
      },
      hair_perfumes: {
        bg: "from-amber-50 to-amber-100 group-hover:from-amber-100 group-hover:to-amber-200",
        icon: "text-amber-600",
        text: "group-hover:text-amber-700",
      },
      body_sprays: {
        bg: "from-green-50 to-green-100 group-hover:from-green-100 group-hover:to-green-200",
        icon: "text-green-600",
        text: "group-hover:text-green-700",
      },
      air_fresheners: {
        bg: "from-cyan-50 to-cyan-100 group-hover:from-cyan-100 group-hover:to-cyan-200",
        icon: "text-cyan-600",
        text: "group-hover:text-cyan-700",
      },
    };
    return (
      colorMap[label] || {
        bg: "from-gray-50 to-gray-100 group-hover:from-gray-100 group-hover:to-gray-200",
        icon: "text-gray-600",
        text: "group-hover:text-gray-700",
      }
    );
  };

  // Animation variants
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: isRTL ? 20 : -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        onClick={handleMobileClick}
        className={cn(
          "flex items-center gap-2 text-sm font-medium tracking-wide transition-all duration-300 group relative",
          "text-foreground hover:text-primary",
          "px-3 py-2 rounded-lg hover:bg-accent/50",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-accent/50",
          isOpen && isMobile && "text-primary bg-accent/50"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="relative">
          {t(item.label)}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-all duration-300",
            isOpen ? "rotate-180 text-primary" : "group-hover:text-primary"
          )}
        />
      </button>

      {/* Mega Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            dir={isRTL ? "rtl" : "ltr"}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "absolute z-50 mt-2 bg-white dark:bg-gray-900 backdrop-blur-md shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700",
              "min-w-[320px] max-w-[90vw] lg:w-[1000]",
              // Desktop positioning
              "lg:start-[0%]",
              // Mobile positioning
              "left-0 right-0 mx-4 lg:mx-0",
              // Mobile full width on small screens
              "sm:left-1/2 sm:mx-0"
            )}
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {t(item.label)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("categories_description")}
                  </p>
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {item.subItems?.map((sub, index) => {
                  const colors = getCategoryColors(sub.label);
                  return (
                    <motion.div
                      key={sub.href || index}
                      variants={itemVariants}
                      className="group"
                    >
                      <Link
                        href={sub.href}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-xl transition-all duration-300 h-[170px]",
                          "hover:shadow-lg hover:scale-[1.02]",
                          "focus:outline-none focus:ring-2 focus:ring-primary/20",
                          "border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700",
                          "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700",
                          "relative overflow-hidden"
                        )}
                        onClick={() => isMobile && setIsOpen(false)}
                      >
                        {/* Icon */}
                        <div
                          className={cn(
                            "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                            "bg-gradient-to-br shadow-sm group-hover:shadow-md",
                            "group-hover:scale-110",
                            colors.bg
                          )}
                        >
                          <div
                            className={cn(
                              "group-hover:scale-110 transition-transform duration-300",
                              colors.icon
                            )}
                          >
                            {getCategoryIcon(sub.label)}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4
                            className={cn(
                              "font-bold text-base mb-2 transition-colors duration-300",
                              "text-gray-900 dark:text-white",
                              colors.text
                            )}
                          >
                            {t(sub.label)}
                          </h4>
                          <p
                            className={cn(
                              "text-sm leading-relaxed transition-colors duration-300",
                              "text-gray-600 dark:text-gray-400",
                              "group-hover:text-gray-700 dark:group-hover:text-gray-300 line-clamp-3"
                            )}
                          >
                            {t(`${sub.label}_description`)}
                          </p>

                          {/* Popular badge for certain categories */}
                          {(sub.label === "men" || sub.label === "women") && (
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {t("popular")}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Arrow indicator */}
                        <div
                          className={cn(
                            "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                            "opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0",
                            "bg-primary/10 group-hover:bg-primary/20"
                          )}
                        >
                          <ChevronDown className="w-3 h-3 text-primary rotate-[-90deg]" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* View All Link */}
              <motion.div
                variants={itemVariants}
                className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <Link
                  href="/products"
                  className={cn(
                    "flex items-center justify-center gap-3 p-4 rounded-xl transition-all duration-300",
                    "text-primary hover:text-white hover:bg-primary",
                    "border-2 border-primary/20 hover:border-primary",
                    "font-bold text-base shadow-sm hover:shadow-md",
                    "bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary hover:to-primary"
                  )}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{t("view_all_products")}</span>
                  <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                </Link>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-xl pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryMegaMenu;

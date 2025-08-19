// "use client";
// import { useState, useCallback, useEffect } from "react";
// import { Link } from "@/i18n/navigation";
// import { useTranslations, useLocale } from "next-intl";
// import { usePathname, useRouter } from "@/i18n/navigation";
// import {
//   MagnifyingGlassIcon,
//   Bars3Icon,
//   XMarkIcon,
//   UserIcon,
//   ChevronUpIcon,
// } from "@heroicons/react/24/outline";
// import { motion, AnimatePresence } from "framer-motion";
// import CategoryMegaMenu from "./CategoryMegaMenu";
// import { routes } from "@/data/route";
// import UserMenu from "./userMenu";
// import toast from "react-hot-toast";
// import { hideNavbarAndFooter } from "@/utils/hide-navbar-footer";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "@/store/auth";
// import { useTheme } from "next-themes";
// import { SearchOverlay } from "./searchOverlay";
// import enTranslatee from "@/assets/imgs/enTranslate.svg";
// import arTranslatee from "@/assets/imgs/arTranslate.svg";
// import LanguageSwitcher from "./languageSwitcher";
// import SearchInputOverlay from "./searchInputOverlay";
// import Logo from "./Logo";
// import ThemeToggle from "./themeToggle";
// import NavigationLinks from "./navigationLinks";
// import CustomImage from "./customImage";

// export const Navbar = ({ userData }) => {
//   const t = useTranslations("Index");
//   const tLogout = useTranslations("Auth");
//   const router = useRouter();
//   const pathname = usePathname();
//   const locale = useLocale();
//   const dispatch = useDispatch();
//   const { theme, setTheme } = useTheme();
//   const tCommon = useTranslations("");

//   // State management
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   // Check if should hide navbar
//   const shouldHideLayout = hideNavbarAndFooter.some((path) =>
//     pathname.startsWith(path)
//   );

//   // Event handlers
//   const toggleMenu = useCallback(() => {
//     setIsMenuOpen((prev) => !prev);
//   }, []);

//   const changeLanguage = useCallback(
//     (newLocale) => {
//       router.push(pathname, { locale: newLocale });
//     },
//     [router, pathname]
//   );

//   const handleLogout = useCallback(async () => {
//     try {
//       const resultAction = await dispatch(logoutUser());

//       if (logoutUser.fulfilled.match(resultAction)) {
//         toast.success(tLogout("Logout.logoutSuccess"));
//         router.push("/auth/login");
//       } else {
//         const errorMessage =
//           resultAction.payload ||
//           resultAction.error?.message ||
//           tLogout("Logout.logoutFailed");
//         toast.error(errorMessage);
//       }
//     } catch (error) {
//       toast.error(tLogout("Logout.logoutFailed"));
//     }
//   }, [dispatch, router, tLogout]);

//   const handleSearchFocus = useCallback(() => {
//     setIsSearchOverlayOpen(true);
//   }, []);

//   const handleSearchChange = useCallback((e) => {
//     setSearchQuery(e.target.value);
//   }, []);

//   const handleSearchOverlaySearch = useCallback(() => {
//     setSearchQuery("");
//   }, []);

//   const handleThemeToggle = useCallback(() => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   }, [theme, setTheme]);

//   // Scroll to top function
//   const scrollToTop = useCallback(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);

//   // Scroll effect (only for background blur and scroll to top button)
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       // Update scroll state
//       setIsScrolled(currentScrollY > 10);
//       setShowScrollTop(currentScrollY > 300);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [pathname]);

//   // Prevent body scroll when mobile menu is open - محسن
//   useEffect(() => {
//     if (isMenuOpen) {
//       // حفظ الـ scroll position الحالي
//       const scrollY = window.scrollY;

//       // Add the menu-open class to body and html
//       document.body.classList.add("menu-open");
//       document.documentElement.classList.add("menu-open");

//       // حفظ الـ scroll position
//       document.body.setAttribute("data-scroll-y", scrollY.toString());
//     } else {
//       const scrollY = document.body.getAttribute("data-scroll-y");

//       // Remove the menu-open class
//       document.body.classList.remove("menu-open");
//       document.documentElement.classList.remove("menu-open");

//       document.body.removeAttribute("data-scroll-y");

//       // استعادة الـ scroll position
//       if (scrollY) {
//         window.scrollTo(0, Number.parseInt(scrollY));
//       }
//     }

//     return () => {
//       // تنظيف - Remove classes on cleanup
//       document.body.classList.remove("menu-open");
//       document.documentElement.classList.remove("menu-open");
//       document.body.removeAttribute("data-scroll-y");
//     };
//   }, [isMenuOpen]);

//   // Keyboard shortcut for search
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if ((e.metaKey || e.ctrlKey) && e.key === "k") {
//         e.preventDefault();
//         setIsSearchOverlayOpen(true);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   if (shouldHideLayout) {
//     return null;
//   }

//   return (
//     <>
//       <header
//         className={`bg-[var(--bg-navbar)] py-1 backdrop-blur-xl border-b border-border/50 w-full z-[100] fixed top-0 transition-all duration-500 ease-in-out ${
//           isScrolled ? "shadow-lg shadow-black/5 bg-[var(--bg-navbar)]/95" : ""
//         }`}
//       >
//         <div className="w-[95%] sm:w-[95%] max-w-[95%] sm:max-w-[90%] mx-auto sm:px-0">
//           <nav className="flex items-center justify-between gap-x-4 py-4">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <Logo />
//             </div>

//             {/* Navigation Links - Hidden on mobile */}
//             <div className="hidden lg:flex flex-1 justify-center">
//               <NavigationLinks routes={routes} pathname={pathname} t={t} />
//             </div>

//             {/* Right Section */}
//             <div className="flex items-center justify-end gap-x-3 flex-shrink-0 min-w-0">
//               {/* Search - Takes remaining space on desktop */}
//               <div className="hidden sm:block flex-1 max-w-md">
//                 <SearchInputOverlay
//                   searchQuery={searchQuery}
//                   onSearchChange={handleSearchChange}
//                   onSearchFocus={handleSearchFocus}
//                   placeholder={t("searchPlaceholder")}
//                 />
//               </div>

//               {/* Desktop Controls */}
//               <div className="hidden md:flex items-center gap-x-2 lg:gap-x-3 flex-shrink-0">
//                 <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
//                 <LanguageSwitcher
//                   locale={locale}
//                   onChangeLanguage={changeLanguage}
//                 />

//                 {userData ? (
//                   <div className="flex items-center gap-x-2 lg:gap-x-3">
//                     {userData?.user?.role === "admin" && (
//                       <Link
//                         href="/admin/dashboard"
//                         className="inline-flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl hover:bg-[var(--primary-color)] hover:text-white font-medium transition-all duration-300 group border border-transparent hover:border-[var(--primary-color)] cursor-pointer text-sm whitespace-nowrap"
//                       >
//                         <svg
//                           className="w-4 h-4 group-hover:scale-110 transition-transform"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                           />
//                         </svg>
//                         <span>
//                           {locale === "ar" ? "لوحة التحكم" : "Dashboard"}
//                         </span>
//                       </Link>
//                     )}
//                     <UserMenu user={userData} />
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-x-2 lg:gap-x-3">
//                     <Link
//                       href="/auth/login"
//                       className="inline-flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl hover:bg-[var(--primary-color)] hover:text-white font-medium transition-all duration-300 group border border-transparent hover:border-[var(--primary-color)] cursor-pointer text-sm whitespace-nowrap"
//                     >
//                       <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
//                       <span>{t("login")}</span>
//                     </Link>
//                     <div className="w-px h-6 bg-border" />
//                     <Link
//                       href="/auth/register"
//                       className="inline-flex items-center px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90 font-medium transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer text-sm whitespace-nowrap"
//                     >
//                       {t("create-my-account")}
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               {/* Mobile Search Button */}
//               <button
//                 onClick={() => setIsSearchOverlayOpen(true)}
//                 className="sm:hidden p-2 rounded-xl hover:bg-[var(--card)/5] transition-colors cursor-pointer"
//               >
//                 <MagnifyingGlassIcon className="w-5 h-5" />
//               </button>

//               {/* Mobile Menu Toggle */}
//               <button
//                 type="button"
//                 onClick={toggleMenu}
//                 className="lg:hidden inline-flex items-center justify-center rounded-xl p-2.5 text-foreground hover:bg-[var(--card)/5] transition-colors duration-200 cursor-pointer"
//               >
//                 <span className="sr-only">{t("openMenu")}</span>
//                 {isMenuOpen ? (
//                   <XMarkIcon className="w-6 h-6" />
//                 ) : (
//                   <Bars3Icon className="w-6 h-6" />
//                 )}
//               </button>
//             </div>
//           </nav>

//           {/* Mobile Menu */}
//           <AnimatePresence>
//             {isMenuOpen && (
//               <>
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[150] lg:hidden"
//                   onClick={toggleMenu}
//                 />
//                 <motion.div
//                   initial={{ x: "100%" }}
//                   animate={{ x: 0 }}
//                   exit={{ x: "100%" }}
//                   transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                   className="fixed top-0 right-0 w-full h-screen bg-[var(--bg-navbar)] shadow-2xl z-[200] lg:hidden flex flex-col border-l border-border overflow-hidden"
//                   style={{ maxWidth: "100vw", boxSizing: "border-box" }}
//                 >
//                   {/* Mobile Menu Header */}
//                   <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-gradient-to-r from-accent/30 to-transparent flex-shrink-0">
//                     <div onClick={toggleMenu}>
//                       <Logo />
//                     </div>
//                     <button
//                       onClick={toggleMenu}
//                       className="p-2 rounded-xl hover:bg-[var(--card)/5] transition-colors cursor-pointer"
//                     >
//                       <XMarkIcon className="w-6 h-6 text-foreground" />
//                     </button>
//                   </div>

//                   {/* Scrollable Content */}
//                   <div className="flex-1 overflow-y-auto">
//                     <nav className="flex flex-col p-4 sm:p-6 gap-y-4 pb-8">
//                       {/* Mobile Search */}
//                       <button
//                         onClick={() => {
//                           setIsSearchOverlayOpen(true);
//                           setIsMenuOpen(false);
//                         }}
//                         className="relative mb-6 w-full text-left cursor-pointer"
//                       >
//                         <div className="w-full pl-12 pr-4 py-4 text-start rounded-xl bg-transparent text-foreground opacity-50 border border-border text-sm hover:border-[var(--primary-color)]/50 transition-all duration-300">
//                           {t("searchPlaceholder")}
//                         </div>
//                         <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--primary-color)]" />
//                       </button>

//                       {/* Navigation Items */}
//                       <div className="space-y-2">
//                         {routes.map((item, index) => (
//                           <div key={item.label}>
//                             {item.subItems ? (
//                               <CategoryMegaMenu item={item} />
//                             ) : (
//                               <Link
//                                 href={item.href}
//                                 onClick={toggleMenu}
//                                 className={`block text-base font-semibold transition-all duration-300 py-3 px-4 rounded-xl cursor-pointer ${
//                                   pathname === item.href
//                                     ? "text-[var(--primary-color)] bg-[var(--primary-color)]/10 "
//                                     : "text-foreground hover:text-[var(--primary-color)] hover:bg-[var(--card)/5]"
//                                 }`}
//                               >
//                                 {t(item.label)}
//                               </Link>
//                             )}
//                           </div>
//                         ))}
//                       </div>

//                       {/* Mobile Controls Section */}
//                       <div className="border-t border-border pt-6 space-y-6">
//                         {/* Theme Toggle */}
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm font-medium text-foreground">
//                             {theme === "dark"
//                               ? tCommon("common.darkMode")
//                               : tCommon("common.lightMode")}
//                           </span>
//                           <ThemeToggle
//                             theme={theme}
//                             onToggle={handleThemeToggle}
//                           />
//                         </div>

//                         {/* Language Switcher */}
//                         <div>
//                           <p className="text-sm font-medium text-foreground mb-3 tracking-wide">
//                             {tCommon("common.language")}
//                           </p>
//                           <div className="grid grid-cols-2 gap-3">
//                             <button
//                               onClick={() => changeLanguage("ar")}
//                               className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
//                                 locale === "ar"
//                                   ? "bg-[var(--primary-color)] text-white shadow-lg"
//                                   : "bg-[var(--card)] text-foreground hover:bg-accent/80"
//                               }`}
//                             >
//                               <CustomImage
//                                 src={arTranslatee}
//                                 width={20}
//                                 height={24}
//                                 priority={true}
//                                 className="rounded-0"
//                               />
//                               <span className="font-medium text-sm">
//                                 العربية
//                               </span>
//                             </button>
//                             <button
//                               onClick={() => changeLanguage("en")}
//                               className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
//                                 locale === "en"
//                                   ? "bg-[var(--primary-color)] text-white shadow-lg"
//                                   : "bg-[var(--card)] text-foreground hover:bg-[var(--card)/5]"
//                               }`}
//                             >
//                               <CustomImage
//                                 src={enTranslatee}
//                                 width={20}
//                                 height={24}
//                                 priority={true}
//                               />
//                               <span className="font-medium text-sm">
//                                 English
//                               </span>
//                             </button>
//                           </div>
//                         </div>

//                         {/* Mobile Auth Section */}
//                         <div className="border-t border-border pt-6 pb-6">
//                           {userData ? (
//                             <div className="space-y-4">
//                               {userData?.user?.role === "admin" && (
//                                 <Link
//                                   href="/admin/dashboard"
//                                   onClick={toggleMenu}
//                                   className="flex items-center gap-3 w-full px-6 py-4 text-foreground hover:bg-[var(--card)/5] rounded-xl transition-all duration-300 cursor-pointer border border-border hover:border-[var(--primary-color)]/30"
//                                 >
//                                   <svg
//                                     className="w-5 h-5"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                   >
//                                     <path
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       strokeWidth={2}
//                                       d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                                     />
//                                   </svg>
//                                   <span className="font-medium text-base">
//                                     {locale === "ar"
//                                       ? "لوحة التحكم"
//                                       : "Dashboard"}
//                                   </span>
//                                 </Link>
//                               )}
//                               <button
//                                 onClick={handleLogout}
//                                 className="w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 font-semibold cursor-pointer"
//                               >
//                                 {locale === "ar" ? "تسجيل الخروج" : "Logout"}
//                               </button>
//                             </div>
//                           ) : (
//                             <div className="space-y-4">
//                               <Link
//                                 href="/auth/login"
//                                 onClick={toggleMenu}
//                                 className="flex items-center gap-3 w-full px-6 py-4 text-foreground hover:bg-[var(--card)/5] rounded-xl transition-all duration-300 cursor-pointer border border-border hover:border-[var(--primary-color)]/30"
//                               >
//                                 <UserIcon className="w-5 h-5" />
//                                 <span className="font-medium text-base">
//                                   {t("login")}
//                                 </span>
//                               </Link>
//                               <Link
//                                 href="/auth/register"
//                                 onClick={toggleMenu}
//                                 className="flex items-center justify-center w-full px-6 py-4 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--primary-color)]/90 transition-all duration-300 font-semibold shadow-lg cursor-pointer text-base"
//                               >
//                                 {t("create-my-account")}
//                               </Link>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </nav>
//                   </div>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>
//         </div>
//       </header>

//       {/* Scroll to Top Button */}
//       <AnimatePresence>
//         {showScrollTop && (
//           <motion.button
//             initial={{ opacity: 0, scale: 0.8, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, y: 20 }}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={scrollToTop}
//             className={`fixed bottom-20 ${
//               locale === "ar" ? "left-4" : "right-4"
//             } z-[90] w-12 h-12 bg-[var(--primary-color)] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer hover:bg-[var(--primary-color)]/90`}
//             aria-label={locale === "ar" ? "العودة للأعلى" : "Scroll to top"}
//           >
//             <ChevronUpIcon className="w-6 h-6" />
//           </motion.button>
//         )}
//       </AnimatePresence>

//       <SearchOverlay
//         isOpen={isSearchOverlayOpen}
//         onClose={() => setIsSearchOverlayOpen(false)}
//         onSearch={handleSearchOverlaySearch}
//         className="z-[120]"
//       />

//       <style jsx global>{`
//         /* منع الـ scroll بدون تأثير على العناصر الأخرى */
//         body.menu-open {
//           overflow: hidden !important;
//           padding-right: 0px !important;
//           position: fixed !important;
//           width: 100% !important;
//         }

//         html.menu-open {
//           overflow: hidden !important;
//         }

//         /* تأكد من أن الـ navbar يبقى مرئي مع أعلى z-index */
//         .navbar-fixed {
//           position: sticky !important;
//           top: 0 !important;
//           z-index: 100 !important;
//         }

//         /* تحسين الـ mobile menu layering */
//         @media (max-width: 1024px) {
//           .mobile-menu-overlay {
//             z-index: 150 !important;
//           }

//           .mobile-menu-panel {
//             z-index: 200 !important;
//           }
//         }

//         /* منع التداخل مع العناصر الأخرى */
//         .search-overlay {
//           z-index: 120 !important;
//         }

//         .scroll-to-top {
//           z-index: 90 !important;
//         }
//       `}</style>
//     </>
//   );
// };

import React from "react";

export const Navbar = () => {
  return <div>Navbar</div>;
};

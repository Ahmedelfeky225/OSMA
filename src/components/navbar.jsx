"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import CategoryMegaMenu from "./CategoryMegaMenu";
import { routes } from "@/data/route";
import UserMenu from "./userMenu";
import toast from "react-hot-toast";
import { hideNavbarAndFooter } from "@/utils/hide-navbar-footer";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { SearchOverlay } from "./searchOverlay";
import CustomImage from "./customImage";
import enTranslate from "@/assets/imgs/united-states-of-america-flag-square-icon-256.png";
import arTranslate from "@/assets/imgs/saudi-arabia-flag-square-icon-256.png";

export const Navbar = ({ isAuth, user, userData }) => {
  const t = useTranslations("Index");
  const tLogout = useTranslations("Auth");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();

  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  // Memoized values
  const shouldHideHeader = useMemo(() => {
    return hideNavbarAndFooter?.some((path) => {
      if (path.includes(":path*")) {
        const basePath = path.replace("/:path*", "");
        return pathname.startsWith(basePath);
      }
      return pathname === path;
    });
  }, [pathname]);

  // Event handlers
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const changeLanguage = useCallback(
    (newLocale) => {
      router.push(pathname, { locale: newLocale });
    },
    [router, pathname]
  );

  const handleLogout = useCallback(async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      router.push("/auth/login");
      toast.success(tLogout("Logout.logoutSuccess"));
    } else {
      toast.error(result.payload || tLogout("Logout.logoutFailed"));
    }
  }, [dispatch, router, tLogout]);

  const handleSearchFocus = useCallback(() => {
    setIsSearchOverlayOpen(true);
  }, []);

  const handleSearchOverlaySearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleThemeToggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Scroll effect
  // useMemo(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 10);
  //   };

  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useMemo(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (shouldHideHeader) {
    return null;
  }

  return (
    <>
      <header
        className={`bg-[var(--bg-navbar)] py-2 backdrop-blur-md shadow-sm w-full z-50 sticky top-0 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <nav className="mx-auto flex items-center justify-between gap-x-5 py-3 max-w-[90%] px-0 sm:px-4 lg:px-8">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 80"
                width="120"
                height="48"
                className="transition-transform hover:scale-105"
              >
                <defs>
                  <linearGradient
                    id="footerTextGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#7a99c0" />
                    <stop offset="50%" stopColor="#7a99c0ac" />
                    <stop offset="100%" stopColor="#7a99c07e" />
                  </linearGradient>
                </defs>
                <text
                  x="100"
                  y="50"
                  fontFamily="Georgia, serif"
                  fontSize="42"
                  fontWeight="bold"
                  fill="url(#footerTextGradient)"
                  textAnchor="middle"
                  letterSpacing="2px"
                >
                  OSMA
                </text>
              </svg>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden lg:flex text-foreground items-center gap-x-8">
            {routes.map((item) =>
              item.subItems ? (
                <CategoryMegaMenu key={item.label} item={item} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[15px] text-foreground font-medium transition-all duration-200 text-nowrap tracking-wide relative group ${
                    pathname === item.href
                      ? "text-[var(--primary-color)]"
                      : "text-foreground hover:text-[var(--primary-color)]"
                  }`}
                >
                  {t(item.label)}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full ${
                      pathname === item.href ? "w-full" : ""
                    }`}
                  />
                </Link>
              )
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-end gap-x-4 flex-1">
            {/* Enhanced Search */}
            <div className="relative group w-full sm:block hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder={t("searchPlaceholder")}
                className="w-full ps-5 py-3 rounded-full bg-transparent border border-gray-200 outline-none focus:border-[var(--primary-color)] focus:shadow-md text-sm transition-all duration-200 "
                readOnly
              />
              <button
                onClick={handleSearchFocus}
                className="absolute end-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--primary-color)] transition-colors hover:text-[var(--primary-color)]"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Language & Auth Section */}
            <div className="hidden md:flex items-center gap-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={handleThemeToggle}
                className="cursor-pointer p-2 rounded-full border border-border dark:hover:bg-gray-800 hover:bg-gray-100  duration-200 transition"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-orange-300" />
                ) : (
                  <Moon size={18} />
                )}
              </button>

              {/* Language Switcher */}
              <Menu as="div" className="relative">
                <MenuButton className="inline-flex items-center gap-2 text-foreground rounded-full dark:hover:bg-gray-800 hover:bg-gray-300 cursor-pointer px-3 py-2 text-sm transition-colors duration-200 group">
                  <GlobeAltIcon className="w-5 h-5 text-[var(--primary-color)]" />
                  <span className="font-medium">
                    {locale === "ar" ? "العربية" : "English"}
                  </span>
                  <ChevronDownIcon className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                </MenuButton>
                <MenuItems className="absolute z-[1000] right-0 mt-2 w-40 origin-top-right card rounded-xl shadow-xl backdrop-blur-sm">
                  <MenuItem>
                    <button
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300  hover-text rounded-t-xl transition-colors"
                      onClick={() => changeLanguage("ar")}
                    >
                      <CustomImage
                        src={arTranslate}
                        width={20}
                        height={20}
                        priority={true}
                        className="rounded-full"
                      />
                      <span>العربية</span>
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className="cursor-pointer flex items-center gap-3 w-full px-4 py-3 text-sm dark:hover:bg-gray-800 hover:bg-gray-300 rounded-b-xl transition-colors"
                      onClick={() => changeLanguage("en")}
                    >
                      <CustomImage
                        src={enTranslate}
                        width={20}
                        height={20}
                        priority={true}
                        className="rounded-full"
                      />
                      <span> English</span>
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>

              {/* Auth Links */}
              {isAuth && user ? (
                <UserMenu user={userData} onLogout={handleLogout} />
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-50 font-medium transition-colors duration-200 group"
                  >
                    <UserIcon className="w-4 h-4 group-hover:text-[var(--primary-color)] transition-colors" />
                    <span className="text-sm group-hover:text-[var(--primary-color)] transition-colors">
                      {t("login")}
                    </span>
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center px-4 py-2 rounded-full hover:bg-[var(--primary-color)] hover:text-white font-medium transition-all duration-200 text-sm"
                  >
                    {t("create-my-account")}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={toggleMenu}
              className="lg:hidden inline-flex items-center justify-center rounded-full p-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="sr-only">{t("openMenu")}</span>
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu - نفس الكود الأصلي */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-[var(--bg-navbar)] backdrop-blur-sm z-40 lg:hidden"
                onClick={toggleMenu}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 w-full sm:w-[75%] h-screen bg-[var(--bg-navbar)] shadow-2xl z-50 lg:hidden"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <Link href="/" onClick={toggleMenu}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 200 80"
                      width="100"
                      height="60"
                      fill="none"
                    >
                      <text
                        x="100"
                        y="50"
                        fontFamily="Arial, sans-serif"
                        fontSize="36"
                        fontWeight="300"
                        fill="var(--primary-color)"
                        textAnchor="middle"
                      >
                        OSMA
                      </text>
                      <g transform="translate(20, 25)">
                        <rect
                          x="0"
                          y="10"
                          width="12"
                          height="20"
                          rx="2"
                          fill="none"
                          stroke="var(--primary-color)"
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                        />
                        <rect
                          x="2"
                          y="6"
                          width="8"
                          height="6"
                          rx="1"
                          fill="var(--primary-color)"
                        />
                        <circle
                          cx="6"
                          cy="20"
                          r="1"
                          fill="var(--primary-color)"
                          opacity="0.6"
                        />
                      </g>
                      <line
                        x1="60"
                        y1="65"
                        x2="140"
                        y2="65"
                        stroke="var(--primary-color)"
                        strokeWidth="1"
                        opacity="0.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMenu}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-700" />
                  </motion.button>
                </div>
                <nav className="flex flex-col p-6 gap-y-3 overflow-y-auto h-full pb-32">
                  {/* Mobile Search - Enhanced */}
                  <button
                    onClick={() => {
                      setIsSearchOverlayOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="relative mb-4 w-full text-left"
                  >
                    <div className="w-full pl-12 ps-4 py-3 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-500">
                      {t("searchPlaceholder")}
                    </div>
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </button>

                  {/* باقي المحتوى نفس الكود الأصلي */}
                  {routes.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.subItems ? (
                        <CategoryMegaMenu item={item} />
                      ) : (
                        <Link
                          href={item.href}
                          onClick={toggleMenu}
                          className={`block text-[15px] font-semibold transition-colors duration-200 py-3 px-4 rounded-lg ${
                            pathname === item.href
                              ? "text-[var(--primary-color)] bg-[var(--primary-color)]/5"
                              : "text-gray-700 hover:text-[var(--primary-color)] hover:bg-gray-50"
                          }`}
                        >
                          {t(item.label)}
                        </Link>
                      )}
                    </motion.div>
                  ))}

                  {/* Mobile Language Switcher */}
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => changeLanguage("ar")}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                          locale === "ar"
                            ? "bg-[var(--primary-color)] text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-lg">🇸🇦</span>
                        العربية
                      </button>
                      <button
                        onClick={() => changeLanguage("en")}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                          locale === "en"
                            ? "bg-[var(--primary-color)] text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-lg">🇺🇸</span>
                        English
                      </button>
                    </div>
                  </div>

                  {/* Mobile Auth Section */}
                  <div className="border-t border-gray-100 pt-4 space-y-4">
                    {isAuth && user ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                            <UserIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.name || user.email}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                          {locale === "ar" ? "تسجيل الخروج" : "Logout"}
                        </button>
                      </div>
                    ) : (
                      <>
                        <Link
                          href="/auth/login"
                          onClick={toggleMenu}
                          className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <UserIcon className="w-5 h-5" />
                          {t("login")}
                        </Link>
                        <Link
                          href="/auth/register"
                          onClick={toggleMenu}
                          className="flex items-center justify-center w-full px-4 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color-hover)] transition-colors font-medium"
                        >
                          {t("create-my-account")}
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOverlayOpen}
        onClose={() => setIsSearchOverlayOpen(false)}
        onSearch={handleSearchOverlaySearch}
      />
    </>
  );
};

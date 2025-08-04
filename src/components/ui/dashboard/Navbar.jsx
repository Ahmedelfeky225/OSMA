"use client";

import { useState, useEffect } from "react";
import { deleteCookie } from "cookies-next";
import { useLocale, useTranslations } from "next-intl";
import {
  Menu,
  Sun,
  Moon,
  Search,
  Settings,
  User,
  Globe,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/store/auth";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function Navbar({ onToggleSidebar }) {
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const dispatch = useDispatch();
  const tLogout = useTranslations("Auth");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      router.push("/auth/login");
      toast.success(tLogout("Logout.logoutSuccess"));
    } else {
      toast.error(result.payload || tLogout("Logout.logoutFailed"));
    }
  };

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const cleanPath = pathname.replace(/^\/(en|ar)/, "");
    router.push(`/${newLocale}${cleanPath}`);
  };

  if (!mounted) {
    return (
      <header className="h-16 flex items-center justify-between px-6 bg-white backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#11cad3] to-[#0ea5e9] bg-clip-text text-transparent">
              لوحة التحكم
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm relative z-50">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden md:flex items-center gap-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#11cad3] to-[#0ea5e9] bg-clip-text text-transparent">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search - Hidden on mobile */}
        <div className="hidden lg:flex relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-64 pr-10 pl-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11cad3] text-sm transition-colors"
          />
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="تغيير اللغة"
        >
          <Globe className="h-5 w-5 text-[#11cad3]" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="cursor-pointer flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-8 h-8 bg-[#11cad3] rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="hidden sm:block text-sm font-medium">
              {t("admin")}
            </span>
          </button>

          {/* Dropdown Menu */}
          {userMenuOpen && (
            <>
              {/* Overlay لإغلاق القائمة عند الضغط خارجها */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setUserMenuOpen(false)}
              />

              {/* القائمة المنسدلة */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium">{t("admin")}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    admin@example.com
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-right"
                  >
                    <User className="h-4 w-4" />
                    {t("profile")}
                  </button>
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-right"
                  >
                    <Settings className="h-4 w-4" />
                    {t("settings")}
                  </button>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-right"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("logout")}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

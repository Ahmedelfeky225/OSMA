"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Menu,
  Settings,
  User,
  Globe,
  LogOut,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/store/auth";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Navbar({ onToggleSidebar }) {
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const dispatch = useDispatch();
  const tLogout = useTranslations("Auth");
  const { user, loading: userLoading, isAuthenticated } = useAuth();

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

  const handleBack = () => {
    router.back();
  };

  if (!mounted) {
    return (
      <header className="h-16 flex items-center justify-between px-6 bg-white/95 dark:bg-[#1c283b]/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg relative z-50 transition-all duration-300">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5 text-[#7a99c0] dark:text-[#7a99c0]" />
          </button>
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1c283b] to-[#2d3748] rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white/20 rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl animate-pulse"></div>
          <div className="w-9 h-9 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white/95 dark:bg-[#1c283b]/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg relative z-50 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105 active:scale-95"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5 text-[#7a99c0] dark:text-[#7a99c0]" />
        </button>

        <button
          onClick={handleBack}
          className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105 active:scale-95 group"
          title={locale === "ar" ? "العودة للصفحة السابقة" : "Go back"}
        >
          {locale === "ar" ? (
            <ArrowRight className="h-5 w-5 text-[#7a99c0] dark:text-[#7a99c0] group-hover:text-[#5a7a9a] dark:group-hover:text-[#5a7a9a] transition-colors" />
          ) : (
            <ArrowLeft className="h-5 w-5 text-[#7a99c0] dark:text-[#7a99c0] group-hover:text-[#5a7a9a] dark:group-hover:text-[#5a7a9a] transition-colors" />
          )}
        </button>

        <div className="hidden md:flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1c283b] to-[#2d3748] rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <span className="text-white font-bold text-sm">
              {user?.initials || "U"}
            </span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#7a99c0] to-[#5a7a9a] bg-clip-text text-transparent hover:from-[#5a7a9a] hover:to-[#7a99c0] transition-all duration-300">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105 active:scale-95 group relative"
          title={locale === "ar" ? "تغيير اللغة" : "Change Language"}
        >
          <Globe className="h-5 w-5 text-[#7a99c0] dark:text-[#7a99c0] group-hover:text-[#5a7a9a] dark:group-hover:text-[#5a7a9a] transition-colors" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-[#7a99c0] to-[#5a7a9a] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {locale.toUpperCase()}
            </span>
          </span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="cursor-pointer flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105 active:scale-95 group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-[#1c283b] to-[#2d3748] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
              {user?.avatar ? (
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.displayName || "User"}
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <span className="text-white font-bold text-xs">
                  {user?.initials || "U"}
                </span>
              )}
            </div>
            <span className="hidden sm:block text-sm font-semibold text-[#7a99c0] dark:text-[#7a99c0] group-hover:text-[#5a7a9a] dark:group-hover:text-[#5a7a9a] transition-colors">
              {userLoading ? "..." : user?.role || t("admin")}
            </span>
          </button>

          {/* Dropdown Menu */}
          {userMenuOpen && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setUserMenuOpen(false)}
              />

              <div className="absolute top-full right-0 mt-3 w-56 bg-white/95 dark:bg-[#1c283b]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-[#1c283b]/5 to-transparent">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-10 h-10 bg-gradient-to-br from-[#1c283b] to-[#2d3748] rounded-xl flex items-center justify-center shadow-lg">
                      {user?.avatar ? (
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.displayName || "User"}
                          className="w-full h-full rounded-xl object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {user?.initials || "U"}
                        </span>
                      )}
                    </div> */}
                    <div>
                      <p className="text-sm font-semibold text-[#7a99c0] dark:text-[#7a99c0]">
                        {userLoading ? "..." : user?.role || t("admin")}
                      </p>
                      <p className="text-xs text-[#7a99c0]/70 dark:text-[#7a99c0]/70">
                        {userLoading
                          ? "..."
                          : user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  {/* <button
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-all duration-200 text-right group"
                  >
                    <User className="h-4 w-4 text-[#7a99c0] dark:text-[#7a99c0] group-hover:text-[#5a7a9a] dark:group-hover:text-[#5a7a9a] transition-colors" />
                    <span className="text-[#7a99c0] dark:text-[#7a99c0] group-hover:text-[#5a7a9a] dark:group-hover:text-[#5a7a9a] transition-colors font-medium">
                      {t("profile")}
                    </span>
                  </button> */}
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-all duration-200 text-right group"
                  >
                    <Settings className="h-4 w-4 text-[#7a99c0] dark:text-[#7a99c0] group-hover:text-[#5a7a9a] dark:group-hover:text-[#5a7a9a] transition-colors" />
                    <span className="text-[#7a99c0] dark:text-[#7a99c0] group-hover:text-[#5a7a9a] dark:group-hover:text-[#5a7a9a] transition-colors font-medium">
                      {t("settings")}
                    </span>
                  </Link>
                  <hr className="my-2 border-gray-200/50 dark:border-gray-700/50" />
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-all duration-200 text-right group"
                  >
                    <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{t("logout")}</span>
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

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home, Users, Settings, X, Grid3X3, Package } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const t = useTranslations("sidebar");

  const menuItems = [
    { name: t("dashboard"), href: "/admin/dashboard", icon: Home },
    { name: t("products"), href: "/admin/products", icon: Package },
    { name: t("categories"), href: "/admin/categories", icon: Grid3X3 },
    { name: t("users"), href: "/admin/users", icon: Users },
    { name: t("settings"), href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-white/95 dark:bg-[#1c283b]/95 backdrop-blur-md border-l border-gray-200/50 dark:border-gray-700/50 shadow-2xl transition-all duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:flex flex-col`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between border-b border-gray-200/50 dark:border-gray-700/50 px-6 bg-gradient-to-r from-[#1c283b]/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1c283b] to-[#2d3748] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-[#7a99c0] to-[#5a7a9a] bg-clip-text text-transparent">
              {t("adminPanel")}
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
          >
            <X className="h-5 w-5 text-[#7a99c0] dark:text-[#7a99c0]" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-6 py-8 overflow-y-auto">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-[#7a99c0]/70 dark:text-[#7a99c0]/70 uppercase tracking-wider px-3">
              {t("mainMenu")}
            </h3>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-[#1c283b] to-[#2d3748] text-white shadow-lg transform scale-105"
                        : /* Updated inactive menu item colors to use #7a99c0 */ "text-[#7a99c0] dark:text-[#7a99c0] hover:text-[#5a7a9a] dark:hover:text-[#5a7a9a] hover:bg-gray-100/50 dark:hover:bg-gray-800/30 hover:scale-105"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-all duration-200 ${
                        isActive ? "text-white" : "group-hover:scale-110"
                      }`}
                    />
                    {item.name}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-sm"></div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-700/20 backdrop-blur-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1c283b] to-[#2d3748] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-[#7a99c0] dark:text-[#7a99c0]">
                {t("admin")}
              </p>
              <p className="text-xs text-[#7a99c0]/70 dark:text-[#7a99c0]/70 truncate">
                {t("onlineNow")}
              </p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm animate-pulse"></div>
          </div>
        </div>
      </aside>
    </>
  );
}

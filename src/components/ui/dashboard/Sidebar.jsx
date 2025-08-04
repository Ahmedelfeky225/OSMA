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
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-l border-gray-200 dark:border-gray-700 shadow-xl transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:flex flex-col`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#11cad3] to-[#0ea5e9] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-[#11cad3] to-[#0ea5e9] bg-clip-text text-transparent">
              {t("adminPanel")}
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">
              {t("mainMenu")}
            </h3>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#11cad3] text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="w-8 h-8 bg-[#11cad3] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{t("admin")}</p>
              <p className="text-xs text-gray-500 truncate">{t("onlineNow")}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
